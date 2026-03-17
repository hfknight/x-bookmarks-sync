import { Plugin, ItemView, WorkspaceLeaf, Notice, Modal, App, addIcon } from 'obsidian';
import Defuddle from 'defuddle/full';

const VIEW_TYPE = 'x-bookmarks-webview';

class BookmarkSelectionModal extends Modal {
  bookmarks: any[];
  plugin: XBookmarksSync;
  selectedIds: Set<string>;

  constructor(app: App, plugin: XBookmarksSync, bookmarks: any[]) {
    super(app);
    this.plugin = plugin;
    this.bookmarks = bookmarks;
    this.selectedIds = new Set();
  }

  onOpen() {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.createEl('h2', { text: 'Select Bookmarks to Import' });

    const listContainer = contentEl.createDiv({
      cls: 'bookmark-list-container'
    });
    listContainer.style.maxHeight = '400px';
    listContainer.style.overflowY = 'auto';
    listContainer.style.marginBottom = '20px';
    listContainer.style.paddingRight = '10px';

    let newCount = 0;

    this.bookmarks.forEach((bookmark) => {
      const isImported = this.plugin.isTweetImported(bookmark);

      const itemDiv = listContainer.createDiv({ cls: 'bookmark-item' });
      itemDiv.style.display = 'flex';
      itemDiv.style.alignItems = 'flex-start';
      itemDiv.style.marginBottom = '10px';
      itemDiv.style.padding = '10px';
      itemDiv.style.border = '1px solid var(--background-modifier-border)';
      itemDiv.style.borderRadius = '5px';

      const checkbox = itemDiv.createEl('input', { type: 'checkbox' });
      checkbox.style.marginTop = '4px';
      checkbox.style.marginRight = '10px';

      if (isImported) {
        checkbox.disabled = true;
        checkbox.checked = false;
        itemDiv.style.opacity = '0.5';
      } else {
        checkbox.checked = true;
        this.selectedIds.add(bookmark.id);
        newCount++;
      }

      checkbox.onchange = (e) => {
        if ((e.target as HTMLInputElement).checked) {
          this.selectedIds.add(bookmark.id);
        } else {
          this.selectedIds.delete(bookmark.id);
        }
        importBtn.innerText = `Import Selected (${this.selectedIds.size})`;
      };

      const textDiv = itemDiv.createDiv();
      const title = bookmark.text
        ? bookmark.text.substring(0, 80) + '...'
        : 'No text';
      textDiv.createEl('strong', {
        text: `${bookmark.name} (${bookmark.username})`
      });
      textDiv.createEl('br');
      textDiv.createEl('span', { text: title, cls: 'text-muted' });
      textDiv.style.fontSize = '0.9em';

      if (isImported) {
        textDiv.createEl('br');
        const badge = textDiv.createEl('span', { text: 'Already imported' });
        badge.style.color = 'var(--text-error)';
        badge.style.fontSize = '0.85em';
        badge.style.fontWeight = 'bold';
      }
    });

    const btnContainer = contentEl.createDiv();
    btnContainer.style.display = 'flex';
    btnContainer.style.justifyContent = 'flex-end';
    btnContainer.style.gap = '10px';

    const cancelBtn = btnContainer.createEl('button', { text: 'Cancel' });
    cancelBtn.onclick = () => this.close();

    const importBtn = btnContainer.createEl('button', {
      text: `Import Selected (${newCount})`,
      cls: 'mod-cta'
    });
    importBtn.onclick = async () => {
      const toImport = this.bookmarks.filter((b) => this.selectedIds.has(b.id));
      this.close();
      if (toImport.length > 0) {
        await this.plugin.saveBookmarksToVault(toImport);
      } else {
        new Notice('No bookmarks selected for import.');
      }
    };
  }

  onClose() {
    const { contentEl } = this;
    contentEl.empty();
  }
}

class XBookmarksView extends ItemView {
  plugin: XBookmarksSync;
  webview: any;
  extractBtn: HTMLButtonElement;
  copyBtn: HTMLButtonElement;
  closeBtn: HTMLButtonElement;
  currentUrl: string = 'https://x.com/i/bookmarks';
  hintSpan: HTMLElement | null = null;
  isScrolling: boolean = false;
  cancelRequested: boolean = false;
  collectedBookmarks: Map<string, any> = new Map();
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
    return 'X Bookmarks';
  }
  getIcon() {
    return 'x-brand';
  }

  async onOpen() {
    this.isScrolling = false;
    this.cancelRequested = false;
    const container = this.containerEl.children[1];
    container.empty();

    // Toolbar
    const toolbar = container.createDiv({ cls: 'x-bookmarks-toolbar' });
    toolbar.style.padding = '10px';
    toolbar.style.display = 'flex';
    toolbar.style.justifyContent = 'space-between';
    toolbar.style.alignItems = 'center';
    toolbar.style.borderBottom = '1px solid var(--background-modifier-border)';
    toolbar.style.backgroundColor = 'var(--background-secondary)';

    this.hintSpan = toolbar.createEl('span', { cls: 'text-muted' });

    const btnGroup = toolbar.createDiv();
    btnGroup.style.display = 'flex';
    btnGroup.style.gap = '10px';

    this.copyBtn = btnGroup.createEl('button', { text: 'Copy as MD', cls: 'mod-cta' });
    this.copyBtn.style.display = 'none';
    this.copyBtn.onclick = async () => {
      await this.copyAsMarkdown();
    };

    this.syncFromLastLabel = btnGroup.createEl('label');
    this.syncFromLastLabel.style.display = 'flex';
    this.syncFromLastLabel.style.alignItems = 'center';
    this.syncFromLastLabel.style.gap = '4px';
    this.syncFromLastLabel.style.fontSize = '0.9em';
    this.syncFromLastLabel.style.cursor = 'pointer';
    this.syncFromLastCheckbox = this.syncFromLastLabel.createEl('input', { type: 'checkbox' });
    this.syncFromLastCheckbox.checked = true;
    this.syncFromLastCheckbox.onchange = () => {
      this.incrementalMode = this.syncFromLastCheckbox!.checked;
      this.updateToolbar();
    };
    this.syncFromLastLabel.createSpan({ text: 'Sync from last' });

    this.extractBtn = btnGroup.createEl('button', {
      text: 'Extract Bookmarks',
      cls: 'mod-cta'
    });

    this.closeBtn = btnGroup.createEl('button', { text: 'Close' });
    this.closeBtn.onclick = () => {
      this.leaf.detach();
    };

    // Webview wrapper
    const webviewContainer = container.createDiv();
    webviewContainer.style.width = '100%';
    webviewContainer.style.height = 'calc(100% - 50px)';
    webviewContainer.style.backgroundColor = '#fff';

    this.webview = document.createElement('webview');
    this.webview.setAttribute('src', this.currentUrl);
    this.webview.style.width = '100%';
    this.webview.style.height = '100%';

    this.webview.addEventListener('did-navigate', (e: any) => {
      this.currentUrl = e.url;
      this.updateToolbar();
    });
    this.webview.addEventListener('did-navigate-in-page', (e: any) => {
      this.currentUrl = e.url;
      this.updateToolbar();
    });

    this.webview.addEventListener('dom-ready', () => {
      this.webview.insertCSS(`
                header[role="banner"] { display: none !important; }
                div[data-testid="sidebarColumn"] { display: none !important; }
                main[role="main"] { align-items: center !important; }
            `);
      // Install network interceptors early — dom-ready fires before X's React bundle runs,
      // so our patches are in place before X stores any method references.
      // Intercept both fetch and XHR since it's unclear which X uses.
      this.webview.executeJavaScript(`
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
                    var text = String((obj.legacy && (obj.legacy.full_text || obj.legacy.text)) || '');
                    var url = 'https://x.com/' + screenName + '/status/' + id;
                    window.__xbsApiCollected[id] = { id: id, name: String(name || screenName), username: '@' + screenName, text: text, url: url };
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

    webviewContainer.appendChild(this.webview);
    this.updateToolbar();
  }

  updateToolbar() {
    if (!this.hintSpan) return;  // guard against calls before onOpen() completes
    if (this.isScrolling) return; // don't clobber scrolling state

    if (this.currentUrl.includes('/bookmarks')) {
      this.hintSpan.setText('Click to auto-scroll and capture all bookmarks');
      this.extractBtn.innerText = 'Extract Bookmarks';
      this.extractBtn.onclick = async () => { await this.autoScrollAndExtract(); };
      this.copyBtn.style.display = 'none';
    } else {
      this.hintSpan.setText('');
      this.extractBtn.innerText = 'Back to Bookmarks';
      this.extractBtn.onclick = () => { this.loadUrl('https://twitter.com/i/bookmarks'); };
      this.copyBtn.style.display = 'block';
    }
  }

  async copyAsMarkdown() {
    if (!this.webview) return;
    new Notice('Extracting content with Defuddle...');

    try {
      const html = await this.webview.executeJavaScript(
        'document.documentElement.outerHTML'
      );
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');

      const defuddle = new Defuddle(doc, {
        url: this.currentUrl,
        markdown: true,
        contentSelector: 'article[data-testid="tweet"]'
      });

      const result = await defuddle.parseAsync();

      if (result && result.content) {
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
          try {
              const tweets = document.querySelectorAll('article[data-testid="tweet"]');
              const results = [];
              const skipped = [];
              tweets.forEach((tweet, idx) => {
                  try {
                      const textEl = tweet.querySelector('[data-testid="tweetText"]');
                      const text = textEl ? textEl.innerText : '';

                      const userEl = tweet.querySelector('[data-testid="User-Name"]');
                      const userText = userEl ? userEl.innerText : '';
                      const userParts = userText.split('\\n');
                      const name = userParts[0] || 'Unknown';
                      const username = userParts[1] || 'unknown';

                      const linkEl = Array.from(tweet.querySelectorAll('a')).find(a => {
                          const href = typeof a.href === 'string' ? a.href : (a.getAttribute ? a.getAttribute('href') : '');
                          return href && href.includes('/status/');
                      });
                      const url = linkEl ? (typeof linkEl.href === 'string' ? linkEl.href : linkEl.getAttribute('href')) : '';
                      const idMatch = url ? url.match(/status\\/(\\d+)/) : null;
                      const id = idMatch ? idMatch[1] : Date.now().toString() + Math.random().toString().slice(2,5);

                      if (text || url) {
                          results.push({ id: String(id), name: String(name), username: String(username), text: String(text), url: String(url) });
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
  }

  private async pollFlag(): Promise<boolean> {
    const start = Date.now();
    while (Date.now() - start < 3000) {
      await new Promise(resolve => setTimeout(resolve, 100));
      try {
        const val = await this.webview.executeJavaScript('window.__newTweetsAppeared');
        if (val) return true;
      } catch {
        return false; // webview destroyed or navigated — treat as no new tweets
      }
    }
    return false;
  }

  private async cleanup() {
    try {
      await this.webview.executeJavaScript(`
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

      this.setScrollingToolbar(0);

      // Navigate fresh to the bookmarks page so X starts a new API pagination
      // cursor from page 1. Reusing the existing page state causes X to serve
      // from its client-side cache which may have missed some bookmark pages.
      this.webview.setAttribute('src', 'https://x.com/i/bookmarks');
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Reset observer state — authoritative reset for this run
      await this.webview.executeJavaScript('window.__newTweetsAppeared = false; window.__xbsCollected = {}; window.__xbsObserverInstalled = false;');

      // Install observer FIRST so tweets added during page stabilization are captured
      await this.webview.executeJavaScript(`
        if (!window.__xbsObserverInstalled) {
          window.__xbsObserverInstalled = true;
          window.__xbsCollected = window.__xbsCollected || {};

          function __xbsExtractTweet(tweetEl) {
            try {
              const textEl = tweetEl.querySelector('[data-testid="tweetText"]');
              const text = textEl ? textEl.innerText : '';

              const userEl = tweetEl.querySelector('[data-testid="User-Name"]');
              const userText = userEl ? userEl.innerText : '';
              const userParts = userText.split('\\n');
              const name = userParts[0] || 'Unknown';
              const username = userParts[1] || 'unknown';

              const linkEl = Array.from(tweetEl.querySelectorAll('a')).find(a => {
                const href = typeof a.href === 'string' ? a.href : (a.getAttribute ? a.getAttribute('href') : '');
                return href && href.includes('/status/');
              });
              const url = linkEl ? (typeof linkEl.href === 'string' ? linkEl.href : linkEl.getAttribute('href')) : '';
              const idMatch = url ? url.match(/status\\/(\\d+)/) : null;
              const id = idMatch ? idMatch[1] : null;

              if (id && (text || url)) {
                window.__xbsCollected[id] = {
                  id: String(id), name: String(name),
                  username: String(username), text: String(text), url: String(url)
                };
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
          await new Promise(resolve => setTimeout(resolve, 200));
          try {
            const count: number = await this.webview.executeJavaScript(
              `document.querySelectorAll('article[data-testid="tweet"]').length`
            );
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
      const preResult = await this.webview.executeJavaScript(this.getExtractionScript());
      if (preResult && preResult.success && preResult.data) {
        for (const tweet of preResult.data) {
          this.collectedBookmarks.set(tweet.id, tweet);
        }
      }

      // Scroll loop
      while (true) {
        let newThisIteration = 0;
        iterationCount++;

        // Check cancel
        if (this.cancelRequested) {
          await this.cleanup();
          this.cancelRequested = false;
          this.isScrolling = false;
          this.updateToolbar();
          return;
        }

        // Check navigation away
        if (!this.currentUrl.includes('/bookmarks')) {
          await this.cleanup();
          this.isScrolling = false;
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
        await new Promise(resolve => setTimeout(resolve, 500));

        // Primary: merge tweets captured by the observer the instant they entered the DOM
        // (immune to virtual-list unmounting that can happen before DOM extraction runs)
        const observerResult = await this.webview.executeJavaScript(
          '(function(){ return { success: true, data: Object.values(window.__xbsCollected || {}) }; })()'
        );
        if (observerResult && observerResult.success && observerResult.data) {
          for (const tweet of observerResult.data) {
            if (!this.collectedBookmarks.has(tweet.id)) {
              this.collectedBookmarks.set(tweet.id, tweet);
              newThisIteration++;
            }
          }
        }

        // API intercept: merge tweets captured directly from X's GraphQL responses.
        // These arrive before DOM rendering and are immune to virtual-list truncation.
        // JSON.stringify in the webview avoids Electron structured-clone failures.
        const apiJson = await this.webview.executeJavaScript(
          '(function(){ try { return JSON.stringify(Object.values(window.__xbsApiCollected || {})); } catch(e) { return "[]"; } })()'
        );
        const apiResult: any[] = apiJson ? JSON.parse(apiJson) : [];
        for (const tweet of apiResult) {
          if (!this.collectedBookmarks.has(tweet.id)) {
            this.collectedBookmarks.set(tweet.id, tweet);
            newThisIteration++;
          }
        }

        // Fallback: DOM extraction catches tweets without a /status/ URL (no stable id)
        // and any that the observer may have missed
        const result = await this.webview.executeJavaScript(this.getExtractionScript());
        if (result && result.success && result.data) {
          for (const tweet of result.data) {
            if (!this.collectedBookmarks.has(tweet.id)) {
              this.collectedBookmarks.set(tweet.id, tweet);
              newThisIteration++;
            }
          }
        }
        // { success: false } treated as zero new tweets — noNewCount increments normally

        // Update consecutive-zero counter
        if (newThisIteration === 0) {
          noNewCount++;
        } else {
          noNewCount = 0;
        }

        // Update live count in toolbar
        this.setScrollingToolbar(this.collectedBookmarks.size);

        if (noNewCount >= 5 || iterationCount >= 500) {
          break;
        }
      }

      // Final merge: flush anything the observer or API interceptor collected during
      // the last zero-new-content iterations that was never picked up in the loop
      try {
        let finalNew = 0;
        const finalJson = await this.webview.executeJavaScript(`(function(){
          try {
            return JSON.stringify({
              observer: Object.values(window.__xbsCollected || {}),
              api: Object.values(window.__xbsApiCollected || {})
            });
          } catch(e) { return '{"observer":[],"api":[]}'; }
        })()`);
        const finalSources = finalJson ? JSON.parse(finalJson) : { observer: [], api: [] };
        if (finalSources) {
          for (const tweet of [...(finalSources.observer || []), ...(finalSources.api || [])]) {
            if (!this.collectedBookmarks.has(tweet.id)) {
              this.collectedBookmarks.set(tweet.id, tweet);
              finalNew++;
            }
          }
        }
      } catch { /* webview may be gone */ }

      // After loop
      await this.cleanup();
      this.isScrolling = false;
      this.updateToolbar();

      if (this.collectedBookmarks.size === 0) {
        new Notice('No bookmarks found.');
        return;
      }

      new BookmarkSelectionModal(
        this.app,
        this.plugin,
        Array.from(this.collectedBookmarks.values())
      ).open();

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

export default class XBookmarksSync extends Plugin {
  importedIds: Set<string> = new Set();

  async onload() {
    const data = await this.loadData();
    if (data?.importedIds) {
      this.importedIds = new Set(data.importedIds);
    }

    addIcon('x-brand', `<g transform="scale(4.1667)"><path fill="currentColor" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></g>`);

    this.registerView(VIEW_TYPE, (leaf) => new XBookmarksView(leaf, this));

    this.addRibbonIcon('x-brand', 'Open X Bookmarks', () => {
      this.activateView();
    });

    this.addCommand({
      id: 'open-x-bookmarks',
      name: 'Open X Bookmarks View',
      callback: () => {
        this.activateView();
      }
    });

    this.registerObsidianProtocolHandler('x-bookmarks', (params) => {
      if (params.url) {
        this.openUrlInWebview(params.url);
      }
    });
  }

  onunload() {
    this.app.workspace.detachLeavesOfType(VIEW_TYPE);
  }

  async openUrlInWebview(url: string) {
    await this.activateView();
    const leaves = this.app.workspace.getLeavesOfType(VIEW_TYPE);
    if (leaves.length > 0) {
      const view = leaves[0].view as XBookmarksView;
      view.loadUrl(url);
    }
  }

  async activateView() {
    const { workspace } = this.app;

    let leaf = workspace.getLeavesOfType(VIEW_TYPE)[0];

    if (!leaf) {
      const rightLeaf = workspace.getRightLeaf(false);
      if (rightLeaf) {
        await rightLeaf.setViewState({ type: VIEW_TYPE, active: true });
        leaf = rightLeaf;
      }
    }

    if (leaf) {
      workspace.revealLeaf(leaf);
    }
  }

  getFileName(tweet: any): string {
    const tweetDate = tweet.id && /^\d+$/.test(tweet.id)
      ? new Date(Number((BigInt(tweet.id) >> BigInt(22)) + BigInt(1288834974657)))
      : new Date();
    const month = String(tweetDate.getMonth() + 1).padStart(2, '0');
    const day = String(tweetDate.getDate()).padStart(2, '0');
    const year = tweetDate.getFullYear();
    const date = `${year}-${month}-${day}`;

    const author = (tweet.name || 'Unknown')
      .replace(/[\\/:"*?<>|]/g, '')
      .trim();
    let title = (tweet.text || 'Bookmark').split('\n')[0].substring(0, 40);
    title = title.replace(/[\\/:"*?<>|]/g, '').trim();
    if (!title) title = 'Bookmark';

    return `x-bookmarks/${date}-${author}-${title}.md`;
  }

  isTweetImported(tweet: any): boolean {
    if (this.importedIds.has(tweet.id)) return true;
    // Fallback: check file paths for bookmarks imported before the ID set existed
    const oldFileName = `x-bookmarks/Tweet-${tweet.id}.md`;
    const newFileName = this.getFileName(tweet);
    return (
      !!this.app.vault.getAbstractFileByPath(oldFileName) ||
      !!this.app.vault.getAbstractFileByPath(newFileName)
    );
  }

  async saveBookmarksToVault(bookmarks: any[]) {
    const targetFolder = 'x-bookmarks';
    let folder = this.app.vault.getAbstractFileByPath(targetFolder);
    if (!folder) {
      await this.app.vault.createFolder(targetFolder);
    }

    let count = 0;
    for (const tweet of bookmarks) {
      const fileName = this.getFileName(tweet);
      const fileExists = this.app.vault.getAbstractFileByPath(fileName);

      if (!fileExists) {
        const content = this.formatTweet(tweet);
        await this.app.vault.create(fileName, content);
        count++;
      }
      this.importedIds.add(tweet.id);
    }
    await this.saveData({ importedIds: Array.from(this.importedIds) });
    new Notice(`Successfully saved ${count} new bookmarks!`);
  }

  formatTweet(tweet: any) {
    const date = new Date().toISOString().split('T')[0];
    const safeId = `"${tweet.id}"`;
    const safeAuthor = `"${(tweet.name || '').replace(/"/g, '\\"')}"`;
    const safeUsername = `"${(tweet.username || '').replace(/"/g, '\\"')}"`;
    const safeUrl = `"${tweet.url}"`;

    return `---
id: ${safeId}
author: ${safeAuthor}
username: ${safeUsername}
scraped_date: ${date}
url: ${safeUrl}
tags: [twitter, bookmark]
---

# Tweet by ${tweet.name} (${tweet.username})

${tweet.text}

[View on X](${tweet.url}) | [Open in Obsidian Webview](obsidian://x-bookmarks?url=${encodeURIComponent(tweet.url)})
`;
  }
}
