import { ItemView, WorkspaceLeaf, Notice, setIcon } from 'obsidian';
import Defuddle from 'defuddle/full';
import type XBookmarksSync from './main';
import { BookmarkSelectionModal } from './modal';
import { VIEW_TYPE, Tweet } from './types';

const TWEET_OR_ARTICLE_URL = /\/(?:status|article)\/\d+/;

interface ElectronWebview extends HTMLElement {
  executeJavaScript(code: string): Promise<unknown>;
  insertCSS(css: string): Promise<string>;
}

interface ExtractionResult {
  success: boolean;
  data: Tweet[];
  totalArticles?: number;
  skipped?: unknown[];
  error?: string;
}

export class XBookmarksView extends ItemView {
  plugin: XBookmarksSync;
  webview: ElectronWebview | null;
  extractBtn: HTMLButtonElement;
  importBtn: HTMLButtonElement;
  copyBtn: HTMLButtonElement;
  closeBtn: HTMLButtonElement;
  currentUrl: string = 'https://x.com/i/bookmarks';
  hintSpan: HTMLElement | null = null;
  isScrolling: boolean = false;
  cancelRequested: boolean = false;
  collectedBookmarks: Map<string, Tweet> = new Map();
  incrementalMode: boolean = true;
  syncFromLastLabel: HTMLElement | null = null;
  syncFromLastCheckbox: HTMLInputElement | null = null;

  constructor(leaf: WorkspaceLeaf, plugin: XBookmarksSync) {
    super(leaf);
    this.plugin = plugin;
    this.webview = null;
  }

  getViewType() {
    return VIEW_TYPE;
  }
  getDisplayText() {
    return 'X bookmarks';
  }
  getIcon() {
    return 'x-bookmarks-sync';
  }

  onOpen(): Promise<void> {
    this.isScrolling = false;
    this.cancelRequested = false;
    // If opened via protocol handler with a specific URL, use it as the initial URL
    // so the webview never loads the bookmarks page first (avoids a navigation race).
    // Clear pendingOpenUrl here (after consuming) rather than in the caller, so there's
    // no race if Obsidian defers onOpen() past the activateView() await.
    if (this.plugin.pendingOpenUrl) {
      this.currentUrl = this.plugin.pendingOpenUrl;
      this.plugin.pendingOpenUrl = null;
    }
    const container = this.containerEl.children[1];
    container.empty();

    // Toolbar
    const toolbar = container.createDiv({ cls: 'x-bookmarks-toolbar' });

    const leftGroup = toolbar.createDiv({ cls: 'x-bookmarks-toolbar-left' });

    this.syncFromLastLabel = leftGroup.createEl('label', { cls: 'x-bookmarks-sync-label' });
    this.syncFromLastCheckbox = this.syncFromLastLabel.createEl('input', { type: 'checkbox' });
    // Default to unchecked (full sync) if user has never imported any bookmarks
    const hasImported = this.plugin.importedIds.size > 0;
    this.incrementalMode = hasImported;
    this.syncFromLastCheckbox.checked = hasImported;
    this.syncFromLastCheckbox.onchange = () => {
      this.incrementalMode = this.syncFromLastCheckbox!.checked;
      this.updateToolbar();
    };
    this.syncFromLastLabel.createSpan({ text: 'Sync from last' });

    this.hintSpan = leftGroup.createSpan({ cls: 'text-muted x-bookmarks-toolbar-hint' });

    const btnGroup = toolbar.createDiv({ cls: 'x-bookmarks-btn-group' });

    this.importBtn = btnGroup.createEl('button', { text: 'Import article', cls: 'mod-cta' });
    this.importBtn.addClass('is-hidden');
    this.importBtn.onclick = async () => {
      await this.plugin.fetchArticleFromWebview(this.currentUrl);
    };

    this.copyBtn = btnGroup.createEl('button', { text: 'Copy main content', cls: 'mod-cta' });
    this.copyBtn.addClass('is-hidden');
    this.copyBtn.onclick = async () => {
      await this.copyAsMarkdown();
    };

    this.extractBtn = btnGroup.createEl('button', {
      text: 'Extract bookmarks',
      cls: 'mod-cta'
    });
    this.extractBtn.addClass('is-hidden');

    this.closeBtn = btnGroup.createEl('button');
    this.closeBtn.setAttribute('title', 'Close');
    setIcon(this.closeBtn, 'lucide-x');
    this.closeBtn.onclick = () => {
      this.leaf.detach();
    };

    // Webview wrapper
    const webviewContainer = container.createDiv({ cls: 'x-bookmarks-webview-container' });

    this.webview = webviewContainer.createEl('webview' as keyof HTMLElementTagNameMap, {
      cls: 'x-bookmarks-webview',
      attr: { src: this.currentUrl },
    }) as unknown as ElectronWebview;

    this.webview.addEventListener('did-navigate', (e: Event & { url: string }) => {
      this.currentUrl = e.url;
      this.updateToolbar();
    });
    this.webview.addEventListener('did-navigate-in-page', (e: Event & { url: string }) => {
      this.currentUrl = e.url;
      this.updateToolbar();
    });

    this.webview.addEventListener('dom-ready', () => {
      void this.webview!.insertCSS(`
                header[role="banner"] { display: none !important; }
                div[data-testid="sidebarColumn"] { display: none !important; }
                main[role="main"] { align-items: center !important; }
            `);
      // Install network interceptors early — dom-ready fires before X's React bundle runs,
      // so our patches are in place before X stores any method references.
      // Intercept both fetch and XHR since it's unclear which X uses.
      this.webview!.executeJavaScript(`
        if (!window.__xbsIntercepted) {
          window.__xbsIntercepted = true;
          window.__xbsApiCollected = {};

          function __xbsFindTweets(obj, depth) {
            if (!obj || typeof obj !== 'object' || depth > 15) return;
            // Detect a tweet result: has core.user_results and either legacy.id_str or rest_id
            if (obj.core && obj.core.user_results && (obj.rest_id || (obj.legacy && obj.legacy.id_str))) {
              try {
                var userResult = obj.core.user_results.result;
                if (userResult) {
                  // X moved screen_name/name from legacy to core in newer API responses
                  var screenName = (userResult.core && userResult.core.screen_name) || (userResult.legacy && userResult.legacy.screen_name);
                  var name = (userResult.core && userResult.core.name) || (userResult.legacy && userResult.legacy.name);
                  if (screenName) {
                    var id = String((obj.legacy && obj.legacy.id_str) || obj.rest_id);
                    // For long tweets (X Premium), full body is in note_tweet, not legacy.full_text
                    var noteText = obj.note_tweet && obj.note_tweet.note_tweet_results && obj.note_tweet.note_tweet_results.result && obj.note_tweet.note_tweet_results.result.text;
                    var text = String(noteText || (obj.legacy && (obj.legacy.full_text || obj.legacy.text)) || '');
                    var url = 'https://x.com/' + screenName + '/status/' + id;
                    // Photo URLs from extended_entities (preferred) or entities.media
                    var images = [];
                    try {
                      var mediaArr = (obj.legacy && obj.legacy.extended_entities && obj.legacy.extended_entities.media)
                        || (obj.legacy && obj.legacy.entities && obj.legacy.entities.media)
                        || [];
                      for (var mi = 0; mi < mediaArr.length; mi++) {
                        var m = mediaArr[mi];
                        if (m && m.type === 'photo' && m.media_url_https) {
                          var base = String(m.media_url_https).split('?')[0];
                          images.push(base + '?format=jpg&name=large');
                        }
                      }
                    } catch (e) {}
                    var prev = window.__xbsApiCollected[id];
                    // Only replace if the new text is longer (prefer note_tweet over truncated legacy)
                    if (!prev || text.length > String(prev.text || '').length) {
                      var entry = { id: id, name: String(name || screenName), username: '@' + screenName, text: text, url: url };
                      if (images.length > 0) entry.images = images;
                      window.__xbsApiCollected[id] = entry;
                    } else if (prev && images.length > (prev.images ? prev.images.length : 0)) {
                      prev.images = images;
                    }
                  }
                }
              } catch(e) {}
            }
            var items = Array.isArray(obj) ? obj : Object.values(obj);
            for (var i = 0; i < items.length; i++) {
              if (items[i] && typeof items[i] === 'object') __xbsFindTweets(items[i], depth + 1);
            }
          }

          // XHR interceptor
          var __xbsOrigOpen = XMLHttpRequest.prototype.open;
          XMLHttpRequest.prototype.open = function(method, url) {
            this.__xbsUrl = typeof url === 'string' ? url : '';
            return __xbsOrigOpen.apply(this, arguments);
          };

          var __xbsOrigSend = XMLHttpRequest.prototype.send;
          XMLHttpRequest.prototype.send = function() {
            if (this.__xbsUrl && this.__xbsUrl.indexOf('/api/graphql/') !== -1) {
              var xhrSelf = this;
              xhrSelf.addEventListener('load', function() {
                try {
                  // X may set responseType='json', making responseText throw.
                  // Try response (already parsed) first, fall back to responseText.
                  var data;
                  if (xhrSelf.responseType === 'json' || (xhrSelf.responseType === '' && typeof xhrSelf.response === 'object' && xhrSelf.response !== null)) {
                    data = xhrSelf.response;
                  } else {
                    data = JSON.parse(xhrSelf.responseText);
                  }
                  if (data) {
                    var before = Object.keys(window.__xbsApiCollected).length;
                    __xbsFindTweets(data, 0);
                    if (Object.keys(window.__xbsApiCollected).length > before) window.__newTweetsAppeared = true;
                  }
                } catch(e) {}
              });
            }
            return __xbsOrigSend.apply(this, arguments);
          };

          // fetch interceptor
          var __xbsOrigFetch = window.fetch;
          window.fetch = function(input, init) {
            var url = typeof input === 'string' ? input : (input && input.url) ? input.url : String(input);
            var p = __xbsOrigFetch.apply(this, arguments);
            if (url.indexOf('/api/graphql/') !== -1) {
              p = p.then(function(resp) {
                var clone = resp.clone();
                clone.text().then(function(text) {
                  try {
                    var data = JSON.parse(text);
                    __xbsFindTweets(data, 0);
                    window.__newTweetsAppeared = true;
                  } catch(e) {}
                }).catch(function(){});
                return resp;
              });
            }
            return p;
          };
        }
        void 0;
      `).catch(() => {});
    });

    this.updateToolbar();
    return Promise.resolve();
  }

  updateToolbar() {
    if (!this.hintSpan) return;  // guard against calls before onOpen() completes
    if (this.isScrolling) return; // don't clobber scrolling state

    if (this.currentUrl.includes('/bookmarks')) {
      const hint = this.incrementalMode ? 'Incremental' : 'Full scan';
      this.hintSpan.setText(hint);
      this.extractBtn.toggleClass('is-hidden', false);
      this.extractBtn.innerText = 'Extract bookmarks';
      this.extractBtn.onclick = async () => { await this.autoScrollAndExtract(); };
      this.importBtn.toggleClass('is-hidden', true);
      this.copyBtn.toggleClass('is-hidden', true);
      if (this.syncFromLastLabel) this.syncFromLastLabel.toggleClass('is-hidden', false);
    } else {
      this.hintSpan.setText('');
      this.extractBtn.toggleClass('is-hidden', true);
      this.importBtn.toggleClass('is-hidden', !TWEET_OR_ARTICLE_URL.test(this.currentUrl));
      this.copyBtn.toggleClass('is-hidden', false);
      if (this.syncFromLastLabel) this.syncFromLastLabel.toggleClass('is-hidden', true);
    }
  }

  // Field-by-field merge: keep longest text, prefer non-empty for other fields.
  // Returns true only when the tweet is newly added (used to count "new this iteration").
  private mergeBookmark(tweet: Tweet): boolean {
    const existing = this.collectedBookmarks.get(tweet.id);
    if (!existing) {
      this.collectedBookmarks.set(tweet.id, tweet);
      return true;
    }
    const merged: Tweet = { ...existing };
    if ((tweet.text || '').length > (existing.text || '').length) merged.text = tweet.text;
    if (!existing.url && tweet.url) merged.url = tweet.url;
    if (!existing.name && tweet.name) merged.name = tweet.name;
    if (!existing.username && tweet.username) merged.username = tweet.username;
    if (!existing.article && tweet.article) merged.article = tweet.article;
    if ((tweet.images?.length ?? 0) > (existing.images?.length ?? 0)) merged.images = tweet.images;
    this.collectedBookmarks.set(tweet.id, merged);
    return false;
  }

  async copyAsMarkdown() {
    if (!this.webview) return;
    new Notice('Extracting page content…');

    try {
      const html = await this.webview.executeJavaScript(
        'document.documentElement.outerHTML'
      ) as string;
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');

      // Strip replies/parents so Defuddle only sees the focal tweet
      const currentId = this.currentUrl.match(/(?:status|article)\/(\d+)/)?.[1];
      const tweets = Array.from(doc.querySelectorAll('article[data-testid="tweet"]'));
      let focal: Element | null = null;
      if (currentId) {
        focal = tweets.find(t => t.querySelector(`a[href*="/status/${currentId}"]`)) ?? null;
      }
      if (!focal && tweets.length > 0) focal = tweets[0];
      if (focal) {
        tweets.forEach(t => { if (t !== focal) t.remove(); });
      }

      const defuddle = new Defuddle(doc, {
        url: this.currentUrl,
        markdown: true,
        contentSelector: 'article[data-testid="tweet"]'
      });

      const result = await defuddle.parseAsync();

      if (result && result.content) {
        // Clipboard usage is write-only: the plugin never reads the clipboard.
        await navigator.clipboard.writeText(result.content);
        new Notice('Copied to clipboard!');
      } else {
        new Notice('Failed to extract content.');
      }
    } catch (err) {
      console.error(err);
      new Notice('Error extracting content.');
    }
  }

  loadUrl(url: string) {
    this.currentUrl = url;
    if (this.webview) {
      this.webview.setAttribute('src', url);
    }
    this.updateToolbar();
  }

  private getExtractionScript(): string {
    return `
      (function() {
          function __xbsFindImages(tweetEl) {
            try {
              const imgs = tweetEl.querySelectorAll('img');
              const urls = [];
              for (const img of imgs) {
                const src = typeof img.src === 'string' ? img.src : (img.getAttribute ? img.getAttribute('src') || '' : '');
                if (/^https?:\\/\\/pbs\\.twimg\\.com\\/media\\//.test(src)) {
                  const parts = src.split('?');
                  const base = parts[0];
                  const params = new URLSearchParams(parts[1] || '');
                  const format = params.get('format') || 'jpg';
                  const normalized = base + '?format=' + format + '&name=large';
                  if (!urls.includes(normalized)) urls.push(normalized);
                }
              }
              return urls;
            } catch (e) { return []; }
          }

          function __xbsFindArticle(tweetEl) {
            try {
              const anchors = tweetEl.querySelectorAll('a');
              let articleAnchor = null;
              for (const a of anchors) {
                const href = typeof a.href === 'string' ? a.href : (a.getAttribute ? a.getAttribute('href') || '' : '');
                if (/^https?:\\/\\/(?:www\\.)?(?:x|twitter)\\.com\\/[^\\/]+\\/article\\/\\d+/.test(href)) {
                  articleAnchor = a;
                  break;
                }
              }
              if (!articleAnchor) return null;
              const articleUrl = typeof articleAnchor.href === 'string' ? articleAnchor.href : articleAnchor.getAttribute('href');
              const card = articleAnchor.closest('[data-testid^="card."]') || articleAnchor.parentElement;
              const cardText = (card ? card.innerText : articleAnchor.innerText) || '';
              const lines = cardText.split(/\\n+/).map(s => s.trim()).filter(Boolean);
              const title = lines[0] || (articleAnchor.innerText || '').trim() || '';
              const excerpt = lines.slice(1).join('\\n').trim();
              return { url: String(articleUrl), title: String(title), excerpt: String(excerpt) };
            } catch (e) { return null; }
          }

          function __xbsTweetText(el) {
            if (!el) return '';
            let text = el.innerText;
            for (const a of el.querySelectorAll('a')) {
              const mangled = a.innerText;
              const clean = (a.textContent || '').replace(/\\s+/g, '').replace(/…+$/, '');
              if (clean && mangled && text.indexOf(mangled) !== -1) text = text.replace(mangled, clean);
            }
            return text;
          }

          try {
              const tweets = document.querySelectorAll('article[data-testid="tweet"]');
              const results = [];
              const skipped = [];
              tweets.forEach((tweet, idx) => {
                  try {
                      const textEl = tweet.querySelector('[data-testid="tweetText"]');
                      const text = __xbsTweetText(textEl);

                      const userEl = tweet.querySelector('[data-testid="User-Name"]');
                      const userText = userEl ? userEl.innerText : '';
                      const userParts = userText.split('\\n');
                      const name = userParts[0] || 'Unknown';
                      const username = userParts[1] || 'unknown';

                      const linkEl = Array.from(tweet.querySelectorAll('a')).find(a => {
                          const href = typeof a.href === 'string' ? a.href : (a.getAttribute ? a.getAttribute('href') : '');
                          return href && /\\/(?:status|article)\\/\\d+/.test(href);
                      });
                      const url = linkEl ? (typeof linkEl.href === 'string' ? linkEl.href : linkEl.getAttribute('href')) : '';
                      const idMatch = url ? url.match(/(?:status|article)\\/(\\d+)/) : null;
                      const id = idMatch ? idMatch[1] : Date.now().toString() + Math.random().toString().slice(2,5);

                      const article = __xbsFindArticle(tweet);
                      const images = __xbsFindImages(tweet);

                      if (text || url || article || images.length > 0) {
                          const result = { id: String(id), name: String(name), username: String(username), text: String(text), url: String(url) };
                          if (article) result.article = article;
                          if (images.length > 0) result.images = images;
                          results.push(result);
                      } else {
                          skipped.push({ domIndex: idx, hasText: !!text, hasUrl: !!url, hasUserName: !!userEl, outerHTML: tweet.outerHTML.substring(0, 300) });
                      }
                  } catch (e) {
                      skipped.push({ domIndex: idx, error: e.toString() });
                  }
              });
              return { success: true, data: results, totalArticles: tweets.length, skipped };
          } catch (e) {
              return { success: false, error: e.toString() };
          }
      })();
    `;
  }

  private setScrollingToolbar(count: number) {
    if (!this.hintSpan) return;
    this.hintSpan.setText(`Loading bookmarks... ${count} found`);
    this.extractBtn.innerText = 'Cancel';
    this.extractBtn.onclick = () => { this.cancelRequested = true; };
    if (this.syncFromLastLabel) this.syncFromLastLabel.toggleClass('is-hidden', true);
  }

  private async pollFlag(): Promise<boolean> {
    const start = Date.now();
    while (Date.now() - start < 3000) {
      await new Promise(resolve => activeWindow.setTimeout(resolve, 100));
      try {
        const val = await this.webview!.executeJavaScript('window.__newTweetsAppeared') as boolean;
        if (val) return true;
      } catch {
        return false; // webview destroyed or navigated — treat as no new tweets
      }
    }
    return false;
  }

  private async cleanup() {
    try {
      await this.webview!.executeJavaScript(`
        if (window.__xbsObserver) {
          window.__xbsObserver.disconnect();
          window.__xbsObserver = null;
          window.__xbsObserverInstalled = false;
        }
        window.__xbsCollected = {};
      `);
    } catch {
      // webview may already be gone — silently ignore
    }
  }

  private async autoScrollAndExtract() {
    if (!this.webview) return;
    if (this.isScrolling) return;

    try {
      // Setup
      this.isScrolling = true;
      this.cancelRequested = false;
      this.collectedBookmarks = new Map();
      let noNewCount = 0;
      let iterationCount = 0;
      // A re-imported bookmark may sit deep in the timeline past the incremental
      // waterline, so a one-shot flag forces a full scan to guarantee we reach it.
      const fullScanOverride = this.plugin.settings.forceFullScanOnNextSync;
      const incrementalMode = this.incrementalMode && !fullScanOverride;
      const overrideActiveThisRun = fullScanOverride && this.incrementalMode;
      if (overrideActiveThisRun) {
        if (this.syncFromLastCheckbox) this.syncFromLastCheckbox.checked = false;
        new Notice('Re-imported bookmark detected — running a full scan to find it.');
      }

      this.setScrollingToolbar(0);

      // Navigate fresh to the bookmarks page so X starts a new API pagination
      // cursor from page 1. Reusing the existing page state causes X to serve
      // from its client-side cache which may have missed some bookmark pages.
      this.webview.setAttribute('src', 'https://x.com/i/bookmarks');
      await new Promise(resolve => activeWindow.setTimeout(resolve, 1500));

      // Reset observer state — authoritative reset for this run
      await this.webview.executeJavaScript('window.__newTweetsAppeared = false; window.__xbsCollected = {}; window.__xbsObserverInstalled = false;');

      // Install observer FIRST so tweets added during page stabilization are captured
      await this.webview.executeJavaScript(`
        if (!window.__xbsObserverInstalled) {
          window.__xbsObserverInstalled = true;
          window.__xbsCollected = window.__xbsCollected || {};

          function __xbsFindArticle(tweetEl) {
            try {
              const anchors = tweetEl.querySelectorAll('a');
              let articleAnchor = null;
              for (const a of anchors) {
                const href = typeof a.href === 'string' ? a.href : (a.getAttribute ? a.getAttribute('href') || '' : '');
                if (/^https?:\\/\\/(?:www\\.)?(?:x|twitter)\\.com\\/[^\\/]+\\/article\\/\\d+/.test(href)) {
                  articleAnchor = a;
                  break;
                }
              }
              if (!articleAnchor) return null;
              const articleUrl = typeof articleAnchor.href === 'string' ? articleAnchor.href : articleAnchor.getAttribute('href');
              const card = articleAnchor.closest('[data-testid^="card."]') || articleAnchor.parentElement;
              const cardText = (card ? card.innerText : articleAnchor.innerText) || '';
              const lines = cardText.split(/\\n+/).map(s => s.trim()).filter(Boolean);
              const title = lines[0] || (articleAnchor.innerText || '').trim() || '';
              const excerpt = lines.slice(1).join('\\n').trim();
              return { url: String(articleUrl), title: String(title), excerpt: String(excerpt) };
            } catch (e) { return null; }
          }

          function __xbsFindImages(tweetEl) {
            try {
              const imgs = tweetEl.querySelectorAll('img');
              const urls = [];
              for (const img of imgs) {
                const src = typeof img.src === 'string' ? img.src : (img.getAttribute ? img.getAttribute('src') || '' : '');
                if (/^https?:\\/\\/pbs\\.twimg\\.com\\/media\\//.test(src)) {
                  const parts = src.split('?');
                  const base = parts[0];
                  const params = new URLSearchParams(parts[1] || '');
                  const format = params.get('format') || 'jpg';
                  const normalized = base + '?format=' + format + '&name=large';
                  if (!urls.includes(normalized)) urls.push(normalized);
                }
              }
              return urls;
            } catch (e) { return []; }
          }

          function __xbsTweetText(el) {
            if (!el) return '';
            let text = el.innerText;
            for (const a of el.querySelectorAll('a')) {
              const mangled = a.innerText;
              const clean = (a.textContent || '').replace(/\\s+/g, '').replace(/…+$/, '');
              if (clean && mangled && text.indexOf(mangled) !== -1) text = text.replace(mangled, clean);
            }
            return text;
          }

          function __xbsExtractTweet(tweetEl) {
            try {
              const textEl = tweetEl.querySelector('[data-testid="tweetText"]');
              const text = __xbsTweetText(textEl);

              const userEl = tweetEl.querySelector('[data-testid="User-Name"]');
              const userText = userEl ? userEl.innerText : '';
              const userParts = userText.split('\\n');
              const name = userParts[0] || 'Unknown';
              const username = userParts[1] || 'unknown';

              const linkEl = Array.from(tweetEl.querySelectorAll('a')).find(a => {
                const href = typeof a.href === 'string' ? a.href : (a.getAttribute ? a.getAttribute('href') : '');
                return href && /\\/(?:status|article)\\/\\d+/.test(href);
              });
              const url = linkEl ? (typeof linkEl.href === 'string' ? linkEl.href : linkEl.getAttribute('href')) : '';
              const idMatch = url ? url.match(/(?:status|article)\\/(\\d+)/) : null;
              const id = idMatch ? idMatch[1] : null;

              const article = __xbsFindArticle(tweetEl);
              const images = __xbsFindImages(tweetEl);

              if (id && (text || url || article || images.length > 0)) {
                const entry = {
                  id: String(id), name: String(name),
                  username: String(username), text: String(text), url: String(url)
                };
                if (article) entry.article = article;
                if (images.length > 0) entry.images = images;
                window.__xbsCollected[id] = entry;
              }
            } catch(e) {}
          }

          const observer = new MutationObserver((mutations) => {
            for (const m of mutations) {
              for (const node of m.addedNodes) {
                if (node.nodeType === 1) {
                  if (node.matches && node.matches('article[data-testid="tweet"]')) {
                    __xbsExtractTweet(node);
                    window.__newTweetsAppeared = true;
                  } else if (node.querySelectorAll) {
                    const tweets = node.querySelectorAll('article[data-testid="tweet"]');
                    if (tweets.length > 0) {
                      tweets.forEach(t => __xbsExtractTweet(t));
                      window.__newTweetsAppeared = true;
                    }
                  }
                }
              }
            }
          });
          observer.observe(document.body, { childList: true, subtree: true });
          window.__xbsObserver = observer;
        }

        void 0; // ensure executeJavaScript returns undefined, not a function (functions can't be cloned by Electron IPC)
      `);

      // Wait for X's initial render to stabilize before pre-loop.
      // The initial DOM count varies (6 vs 8 across runs) because X finishes
      // rendering asynchronously. Poll until the article count is stable for 500ms.
      {
        let prevCount = -1;
        let stableMs = 0;
        const deadline = Date.now() + 20000;
        while (stableMs < 500 && Date.now() < deadline) {
          await new Promise(resolve => activeWindow.setTimeout(resolve, 200));
          try {
            const count = await this.webview.executeJavaScript(
              `document.querySelectorAll('article[data-testid="tweet"]').length`
            ) as number;
            if (count === prevCount) {
              stableMs += 200;
            } else {
              prevCount = count;
              stableMs = 0;
            }
          } catch { break; }
        }
      }

      // Pre-loop capture: grab tweets already in the stable initial DOM.
      // Observer is already running so anything added during/after this is also caught.
      const preResult = await this.webview.executeJavaScript(this.getExtractionScript()) as ExtractionResult;
      if (preResult && preResult.success && preResult.data) {
        for (const tweet of preResult.data) {
          this.mergeBookmark(tweet);
        }
      }

      // allImportedCount: consecutive scroll iterations where all DOM-visible tweets are already imported.
      // Only used in incremental mode. Pre-loop capture excluded (it's not a scroll result).
      let allImportedCount = 0;

      // Scroll loop
      while (true) {
        let newThisIteration = 0;
        iterationCount++;

        // Check cancel
        if (this.cancelRequested) {
          await this.cleanup();
          this.cancelRequested = false;
          this.isScrolling = false;
          if (overrideActiveThisRun && this.syncFromLastCheckbox) this.syncFromLastCheckbox.checked = this.incrementalMode;
          this.updateToolbar();
          return;
        }

        // Check navigation away
        if (!this.currentUrl.includes('/bookmarks')) {
          await this.cleanup();
          this.isScrolling = false;
          if (overrideActiveThisRun && this.syncFromLastCheckbox) this.syncFromLastCheckbox.checked = this.incrementalMode;
          this.updateToolbar();
          new Notice('Navigated away — bookmark capture cancelled.');
          return;
        }

        // Reset flag before scroll so observer detects only new changes
        await this.webview.executeJavaScript('window.__newTweetsAppeared = false');

        // Scroll to bottom — use max of body/documentElement heights since X may
        // attach scroll listeners to either, and also scroll the largest overflow container
        await this.webview.executeJavaScript(`
          (function() {
            window.scrollTo(0, Math.max(document.body.scrollHeight, document.documentElement.scrollHeight));
            // Also scroll any tall overflow container (X's timeline may live in one)
            let best = null, bestH = 0;
            document.querySelectorAll('div').forEach(function(el) {
              if (el.scrollHeight > el.clientHeight + 200) {
                var s = getComputedStyle(el);
                if (s.overflowY === 'scroll' || s.overflowY === 'auto') {
                  if (el.scrollHeight > bestH) { best = el; bestH = el.scrollHeight; }
                }
              }
            });
            if (best) best.scrollTop = best.scrollHeight;
          })()
        `);

        // Wait for new tweets or timeout, then an extra settling delay so the
        // full batch (not just the first tweet) finishes rendering before we extract
        await this.pollFlag();
        await new Promise(resolve => activeWindow.setTimeout(resolve, 500));

        // Primary: merge tweets captured by the observer the instant they entered the DOM
        // (immune to virtual-list unmounting that can happen before DOM extraction runs)
        const observerResult = await this.webview.executeJavaScript(
          '(function(){ return { success: true, data: Object.values(window.__xbsCollected || {}) }; })()'
        ) as ExtractionResult;
        if (observerResult && observerResult.success && observerResult.data) {
          for (const tweet of observerResult.data) {
            if (this.mergeBookmark(tweet)) newThisIteration++;
          }
        }

        // API intercept: merge tweets captured directly from X's GraphQL responses.
        // These arrive before DOM rendering and are immune to virtual-list truncation.
        // JSON.stringify in the webview avoids Electron structured-clone failures.
        const apiJson = await this.webview.executeJavaScript(
          '(function(){ try { return JSON.stringify(Object.values(window.__xbsApiCollected || {})); } catch(e) { return "[]"; } })()'
        ) as string;
        const apiResult = (apiJson ? JSON.parse(apiJson) : []) as Tweet[];
        for (const tweet of apiResult) {
          if (this.mergeBookmark(tweet)) newThisIteration++;
        }

        // Fallback: DOM extraction catches tweets without a /status/ URL (no stable id)
        // and any that the observer may have missed
        const result = await this.webview.executeJavaScript(this.getExtractionScript()) as ExtractionResult;
        if (result && result.success && result.data) {
          for (const tweet of result.data) {
            if (this.mergeBookmark(tweet)) newThisIteration++;
          }
        }
        // { success: false } treated as zero new tweets — noNewCount increments normally

        // Incremental stop: check if all DOM-visible tweets are already imported.
        // Uses DOM extraction (point-in-time) — not the cumulative observer/API sets.
        // Empty or failed DOM result is inconclusive — allImportedCount is left unchanged (not reset).
        if (incrementalMode && result && result.success && result.data && result.data.length > 0) {
          const allAlreadyImported = result.data.every(
            (t) => this.plugin.importedIds.has(t.id)
          );
          if (allAlreadyImported) {
            allImportedCount++;
          } else {
            allImportedCount = 0;
          }
          if (allImportedCount >= 3) {
            break; // waterline reached — stop scrolling
          }
        }

        // Update consecutive-zero counter
        if (newThisIteration === 0) {
          noNewCount++;
        } else {
          noNewCount = 0;
        }

        // Update live count in toolbar — show verification phase once new tweets stop arriving
        // so the user sees the loop progressing past active loading.
        this.setScrollingToolbar(this.collectedBookmarks.size);
        if (noNewCount > 0 && this.hintSpan) {
          this.hintSpan.setText(`Finalizing — ${this.collectedBookmarks.size} found`);
        }

        if (noNewCount >= 5 || iterationCount >= 500) {
          break;
        }
      }

      // Final merge: flush anything the observer or API interceptor collected during
      // the last zero-new-content iterations that was never picked up in the loop
      try {
        const finalJson = await this.webview.executeJavaScript(`(function(){
          try {
            return JSON.stringify({
              observer: Object.values(window.__xbsCollected || {}),
              api: Object.values(window.__xbsApiCollected || {})
            });
          } catch(e) { return '{"observer":[],"api":[]}'; }
        })()`) as string;
        const finalSources = (finalJson ? JSON.parse(finalJson) : { observer: [], api: [] }) as { observer: Tweet[]; api: Tweet[] };
        if (finalSources) {
          for (const tweet of [...(finalSources.observer || []), ...(finalSources.api || [])]) {
            this.mergeBookmark(tweet);
          }
        }
      } catch { /* webview may be gone */ }

      // After loop
      await this.cleanup();
      this.isScrolling = false;
      if (overrideActiveThisRun && this.syncFromLastCheckbox) this.syncFromLastCheckbox.checked = this.incrementalMode;
      this.updateToolbar();

      // Consume the one-shot full-scan flag now that the scroll reached the bottom.
      // Cancel/navigate-away paths return early above and leave the flag set so the next attempt retries.
      if (fullScanOverride) {
        this.plugin.settings.forceFullScanOnNextSync = false;
        await this.plugin.saveSettings();
      }

      if (this.collectedBookmarks.size === 0) {
        new Notice('No bookmarks found.');
        return;
      }

      const count = this.collectedBookmarks.size;
      if (this.hintSpan) {
        this.hintSpan.setText(`Preparing ${count} bookmark${count !== 1 ? 's' : ''}…`);
      }
      // Yield so the "Preparing…" text actually paints before the modal's synchronous
      // DOM build (300+ items) takes the main thread again.
      await new Promise(resolve => activeWindow.setTimeout(resolve, 16));

      const modal = new BookmarkSelectionModal(
        this.app,
        this.plugin,
        Array.from(this.collectedBookmarks.values())
      );
      // Reset to incremental mode only after the user actually confirms import,
      // not on extraction completion — avoids flipping the checkbox if the modal is cancelled.
      modal.onImportComplete = () => {
        this.incrementalMode = true;
        if (this.syncFromLastCheckbox) this.syncFromLastCheckbox.checked = true;
      };
      modal.onDidClose = () => { this.updateToolbar(); };
      modal.open();

    } catch (err) {
      console.error('autoScrollAndExtract error:', err);
      await this.cleanup();
      this.cancelRequested = false;
      this.isScrolling = false;
      this.updateToolbar();
      new Notice('Error during bookmark capture.');
    }
  }

}
