import { ItemView, WorkspaceLeaf, Notice, setIcon, requestUrl } from 'obsidian';
import Defuddle from 'defuddle/full';
import type XBookmarksSync from './main';
import { BookmarkSelectionModal } from './modal';
import { VIEW_TYPE, Tweet, QuotedTweet } from './types';
import { SyndicationTweet, SyndicationMedia, parseQuotedTweet } from './quoted';

const TWEET_OR_ARTICLE_URL = /\/(?:status|article)\/\d+/;

interface ElectronWebview extends HTMLElement {
  executeJavaScript(code: string): Promise<unknown>;
  insertCSS(css: string): Promise<string>;
  loadURL(url: string): Promise<void>;
}

interface ExtractionResult {
  success: boolean;
  data: Tweet[];
  totalArticles?: number;
  skipped?: unknown[];
  error?: string;
}

// One page of the cursor-pagination walk (parsed from the webview's JSON string).
interface ApiPageResult {
  status?: number;
  cursor?: string | null;
  newCount?: number;
  total?: number;
  ids?: string[];
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
  scanOverlay: HTMLElement | null = null;
  scanLabel: HTMLElement | null = null;
  isScrolling: boolean = false;
  cancelRequested: boolean = false;
  collectedBookmarks: Map<string, Tweet> = new Map();
  incrementalMode: boolean = true;
  // Run-scoped: did this capture stop early at the incremental waterline (rather than by reaching
  // the end of the list)? Such a run proves nothing new about coverage, but doesn't disprove the
  // previous run's proof either — finalizeCapture uses it to leave coverageProven untouched.
  stoppedAtWaterline: boolean = false;
  // Run-scoped: this run overrode the user's "Sync from last" choice, so the scan surface explains
  // why rather than showing the ordinary scanning label.
  showFullScanLabel: boolean = false;
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

    // Scan overlay shown over the (headlessly driven) webview during a capture so progress is
    // legible even when the page doesn't visibly scroll. Built once, toggled via is-hidden.
    this.scanOverlay = webviewContainer.createDiv({ cls: 'x-bookmarks-scan-overlay is-hidden' });
    this.scanOverlay.createDiv({ cls: 'x-bookmarks-scan-grid' });
    const dots = this.scanOverlay.createDiv({ cls: 'x-bookmarks-scan-dots' });
    for (let i = 0; i < 14; i++) dots.createDiv({ cls: 'x-bookmarks-scan-dot' });
    this.scanOverlay.createDiv({ cls: 'x-bookmarks-scan-line' });
    this.scanLabel = this.scanOverlay.createDiv({ cls: 'x-bookmarks-scan-label', text: 'Scanning bookmarks…' });

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
      void this.webview!.executeJavaScript(this.getInterceptorScript()).catch(() => {});
    });

    this.updateToolbar();
    return Promise.resolve();
  }

  // The fetch/XHR network interceptor installed on the main webview's dom-ready: it captures
  // tweet text/photos/video posters from X's GraphQL responses into __xbsApiCollected.
  private getInterceptorScript(): string {
    return `
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
                    var noteResult = obj.note_tweet && obj.note_tweet.note_tweet_results && obj.note_tweet.note_tweet_results.result;
                    var noteText = noteResult && noteResult.text;
                    var text = String(noteText || (obj.legacy && (obj.legacy.full_text || obj.legacy.text)) || '');
                    // Expand t.co -> real url and strip media links (mirrors expandLinks() in quoted.ts).
                    // note_tweet carries its own entity_set; legacy text uses legacy.entities.
                    var urlEnts = (noteText && noteResult.entity_set && noteResult.entity_set.urls)
                      || (obj.legacy && obj.legacy.entities && obj.legacy.entities.urls) || [];
                    var mediaEnts = (obj.legacy && obj.legacy.extended_entities && obj.legacy.extended_entities.media)
                      || (obj.legacy && obj.legacy.entities && obj.legacy.entities.media) || [];
                    for (var ui = 0; ui < urlEnts.length; ui++) {
                      var ue = urlEnts[ui];
                      if (ue && ue.url && ue.expanded_url) text = text.split(ue.url).join(ue.expanded_url);
                    }
                    for (var mxi = 0; mxi < mediaEnts.length; mxi++) {
                      var mx = mediaEnts[mxi];
                      if (mx && mx.url) text = text.split(mx.url).join('');
                    }
                    text = text.replace(/\\s*https?:\\/\\/t\\.co\\/\\w+\\s*$/, '').trim();
                    var url = 'https://x.com/' + screenName + '/status/' + id;
                    // Native X article shared as a post: GraphQL carries the card under
                    // article.article_results.result (title + preview_text). The DOM scrape builds the
                    // same card via __xbsFindArticle; parsing it here gives the API path full parity with
                    // no per-permalink recovery. URL comes from the link entities (what X actually links
                    // to), falling back to the canonical /article/ permalink built from the article id.
                    var articleCard = null;
                    try {
                      var ar = obj.article && obj.article.article_results && obj.article.article_results.result;
                      if (ar && ar.title) {
                        var artUrl = '';
                        for (var aj = 0; aj < urlEnts.length; aj++) {
                          if (urlEnts[aj] && urlEnts[aj].expanded_url && /\\/article\\/\\d+/.test(urlEnts[aj].expanded_url)) { artUrl = urlEnts[aj].expanded_url; break; }
                        }
                        if (!artUrl) artUrl = 'https://x.com/' + screenName + '/article/' + (ar.rest_id || '');
                        articleCard = { url: String(artUrl), title: String(ar.title), excerpt: String(ar.preview_text || '') };
                        // An article post's body text is just the article link, which the "Linked
                        // article" section already renders ("Read full article"). Strip it so the note
                        // doesn't show a bare duplicate URL above the card.
                        if (artUrl) text = text.split(artUrl).join('').trim();
                      }
                    } catch (e) {}
                    // Photo URLs + video/gif poster frames from extended_entities (preferred) or entities.media
                    var images = [];
                    var videoPosters = [];
                    try {
                      var mediaArr = (obj.legacy && obj.legacy.extended_entities && obj.legacy.extended_entities.media)
                        || (obj.legacy && obj.legacy.entities && obj.legacy.entities.media)
                        || [];
                      for (var mi = 0; mi < mediaArr.length; mi++) {
                        var m = mediaArr[mi];
                        if (m && m.media_url_https) {
                          var base = String(m.media_url_https).split('?')[0];
                          if (m.type === 'photo') {
                            images.push(base + '?format=jpg&name=large');
                          } else if (m.type === 'video' || m.type === 'animated_gif') {
                            videoPosters.push(base + '?format=jpg&name=large');
                          }
                        }
                      }
                    } catch (e) {}
                    var prev = window.__xbsApiCollected[id];
                    // Only replace if the new text is longer (prefer note_tweet over truncated legacy)
                    if (!prev || text.length > String(prev.text || '').length) {
                      var entry = { id: id, name: String(name || screenName), username: '@' + screenName, text: text, url: url, fromNote: !!noteText };
                      // Never drop media a prior response already captured: a note_tweet
                      // expansion often carries longer text but no extended_entities.
                      var keepImages = images.length > 0 ? images : (prev && prev.images) || [];
                      var keepPosters = videoPosters.length > 0 ? videoPosters : (prev && prev.videoPosters) || [];
                      if (keepImages.length > 0) entry.images = keepImages;
                      if (keepPosters.length > 0) entry.videoPosters = keepPosters;
                      if (articleCard) entry.article = articleCard;
                      else if (prev && prev.article) entry.article = prev.article;
                      window.__xbsApiCollected[id] = entry;
                    } else if (prev) {
                      if (images.length > (prev.images ? prev.images.length : 0)) prev.images = images;
                      if (videoPosters.length > (prev.videoPosters ? prev.videoPosters.length : 0)) prev.videoPosters = videoPosters;
                      if (articleCard && !prev.article) prev.article = articleCard;
                    }
                    // Flag bookmarks that embed a quoted tweet so the recovery pass folds it in.
                    if (obj.quoted_status_result && window.__xbsApiCollected[id]) window.__xbsApiCollected[id].hasQuote = true;
                  }
                }
              } catch(e) {}
            }
            if (Array.isArray(obj)) {
              for (var i = 0; i < obj.length; i++) {
                if (obj[i] && typeof obj[i] === 'object') __xbsFindTweets(obj[i], depth + 1);
              }
            } else {
              // Skip quoted_status_result: the embedded quoted tweet is folded into the parent's
              // note (via syndication), never collected as a standalone bookmark.
              for (var k in obj) {
                if (k === 'quoted_status_result') continue;
                if (obj[k] && typeof obj[k] === 'object') __xbsFindTweets(obj[k], depth + 1);
              }
            }
          }

          // Expose the parser so the cursor-pagination path reuses identical parsing
          // (same note_tweet/media/quote handling — no drift from the passive path).
          window.__xbsFindTweets = __xbsFindTweets;

          // Capture the first Bookmarks GraphQL request as a live template: the URL carries
          // the current queryId + features, the headers carry the bearer + csrf. Nothing is
          // hardcoded — the cursor-pagination path replays this exact shape. auth_token is
          // never read or stored; the browser attaches it on same-origin fetch.
          function __xbsCaptureTemplate(url, headers) {
            try {
              if (window.__xbsReqTemplate) return;
              if (typeof url !== 'string' || url.indexOf('/api/graphql/') === -1) return;
              if (!/\\/Bookmarks\\?/.test(url)) return;
              var h = {};
              if (headers) {
                if (typeof headers.forEach === 'function') {
                  headers.forEach(function(v, k) { h[String(k).toLowerCase()] = v; });
                } else if (Array.isArray(headers)) {
                  for (var i = 0; i < headers.length; i++) {
                    if (headers[i]) h[String(headers[i][0]).toLowerCase()] = headers[i][1];
                  }
                } else {
                  for (var hk in headers) {
                    if (Object.prototype.hasOwnProperty.call(headers, hk)) h[String(hk).toLowerCase()] = headers[hk];
                  }
                }
              }
              window.__xbsReqTemplate = { url: String(url), headers: h };
            } catch (e) {}
          }

          // End-of-list detector. X's Bookmarks timeline exposes no total count and emits no
          // TimelineTerminateTimeline instruction; it also returns a Bottom cursor on *every*
          // response, including past the end — so cursor absence proves nothing. The one real
          // signal is a TimelineAddEntries carrying cursors but zero TimelineTimelineItem entries:
          // X saying "no more bookmarks". Verified on both capture paths (the passive interceptor
          // sees it during scroll capture, the pagination loop sees it on its own fetches).
          //
          // Latched, never cleared here — the host resets it at the start of each capture run and
          // reads it in finalizeCapture to decide whether coverage was proven.
          //
          // Known assumption: a page served empty *transiently* (e.g. X throttling mid-list) would
          // falsely latch this. Judged acceptable — the API walk already treats its equivalents
          // ('no-new'/'cursor-repeat') as clean stops, so this is strictly better than before.
          function __xbsDetectEndOfList(data) {
            try {
              var root = data && data.data;
              if (!root) return;
              var tlKey = null;
              for (var rk in root) {
                if (Object.prototype.hasOwnProperty.call(root, rk) && /bookmark/i.test(rk)) { tlKey = rk; break; }
              }
              if (!tlKey) return; // not a Bookmarks response
              var tl = (root[tlKey] && root[tlKey].timeline) || root[tlKey];
              if (!tl || typeof tl !== 'object') return;

              var ins = tl.instructions || [];
              var sawAddEntries = false;
              var itemCount = 0;
              for (var i = 0; i < ins.length; i++) {
                var it = ins[i] || {};
                if (it.type !== 'TimelineAddEntries') continue;
                sawAddEntries = true;
                var ents = it.entries || [];
                for (var j = 0; j < ents.length; j++) {
                  var c = (ents[j] || {}).content || {};
                  if ((c.entryType || c.itemType) === 'TimelineTimelineItem') itemCount++;
                }
              }
              if (sawAddEntries && itemCount === 0) window.__xbsSawEndOfList = true;
            } catch (e) {}
          }
          window.__xbsDetectEndOfList = __xbsDetectEndOfList;

          // XHR interceptor
          var __xbsOrigOpen = XMLHttpRequest.prototype.open;
          XMLHttpRequest.prototype.open = function(method, url) {
            this.__xbsUrl = typeof url === 'string' ? url : '';
            return __xbsOrigOpen.apply(this, arguments);
          };

          var __xbsOrigSetHeader = XMLHttpRequest.prototype.setRequestHeader;
          XMLHttpRequest.prototype.setRequestHeader = function(name, value) {
            try {
              if (!this.__xbsHeaders) this.__xbsHeaders = {};
              this.__xbsHeaders[String(name).toLowerCase()] = value;
            } catch (e) {}
            return __xbsOrigSetHeader.apply(this, arguments);
          };

          var __xbsOrigSend = XMLHttpRequest.prototype.send;
          XMLHttpRequest.prototype.send = function() {
            if (this.__xbsUrl && this.__xbsUrl.indexOf('/api/graphql/') !== -1) {
              __xbsCaptureTemplate(this.__xbsUrl, this.__xbsHeaders);
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
                    __xbsDetectEndOfList(data);
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
            try {
              var fh = (init && init.headers) || (input && typeof input === 'object' && input.headers) || null;
              __xbsCaptureTemplate(url, fh);
            } catch (e) {}
            var p = __xbsOrigFetch.apply(this, arguments);
            if (url.indexOf('/api/graphql/') !== -1) {
              p = p.then(function(resp) {
                var clone = resp.clone();
                clone.text().then(function(text) {
                  try {
                    var data = JSON.parse(text);
                    __xbsDetectEndOfList(data);
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
      `;
  }

  // Webview-side cursor-pagination helper, installed once. window.__xbsFetchBookmarkPage(cursor)
  // replays the captured Bookmarks request shape with count=100 + the given cursor, runs the
  // shared parser into __xbsApiCollected, and returns a JSON string {status,cursor,newCount,total}.
  private getPaginationScript(): string {
    return `
      if (!window.__xbsFetchBookmarkPage) {
        function __xbsFindBottomCursor(obj, depth) {
          if (!obj || typeof obj !== 'object' || depth > 25) return null;
          if (obj.cursorType === 'Bottom' && typeof obj.value === 'string') return obj.value;
          if (Array.isArray(obj)) {
            for (var i = 0; i < obj.length; i++) {
              var r = __xbsFindBottomCursor(obj[i], depth + 1);
              if (r) return r;
            }
          } else {
            for (var k in obj) {
              if (Object.prototype.hasOwnProperty.call(obj, k)) {
                var r2 = __xbsFindBottomCursor(obj[k], depth + 1);
                if (r2) return r2;
              }
            }
          }
          return null;
        }

        window.__xbsFetchBookmarkPage = async function(cursor) {
          try {
            var tmpl = window.__xbsReqTemplate;
            if (!tmpl || !tmpl.url) return JSON.stringify({ error: 'no-template' });

            var u = new URL(tmpl.url);
            var variables = {};
            try { variables = JSON.parse(u.searchParams.get('variables') || '{}'); } catch (e) {}
            variables.count = 100;
            variables.includePromotedContent = false;
            if (cursor) variables.cursor = cursor; else delete variables.cursor;
            u.searchParams.set('variables', JSON.stringify(variables));

            // Replay the captured headers verbatim, minus the per-request transaction id (the one
            // header X derives per call). Refresh csrf from the live cookie; fall back to the static
            // public web bearer only if none was captured. auth_token is never read — same-origin
            // fetch attaches it automatically.
            var headers = {};
            var th = tmpl.headers || {};
            for (var hk in th) { if (Object.prototype.hasOwnProperty.call(th, hk)) headers[hk] = th[hk]; }
            delete headers['x-client-transaction-id'];
            var ct0 = (document.cookie.match(/(?:^|; )ct0=([^;]+)/) || [])[1];
            if (ct0) headers['x-csrf-token'] = decodeURIComponent(ct0);
            if (!headers['authorization']) headers['authorization'] = 'Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA';

            var beforeKeys = Object.keys(window.__xbsApiCollected || {});
            var beforeSet = {};
            for (var bi = 0; bi < beforeKeys.length; bi++) beforeSet[beforeKeys[bi]] = 1;
            var resp = await fetch(u.toString(), { method: 'GET', headers: headers, credentials: 'include' });
            var status = resp.status;
            if (status !== 200) return JSON.stringify({ status: status });
            var data = await resp.json();
            // Load-bearing for the API path: this is the site guaranteed to see the walk's own pages.
            if (window.__xbsDetectEndOfList) window.__xbsDetectEndOfList(data);
            if (window.__xbsFindTweets) window.__xbsFindTweets(data, 0);
            var afterKeys = Object.keys(window.__xbsApiCollected || {});
            // Ids new to this page (no cross-page overlap, so these are the page's tweet ids) —
            // used by the caller for the incremental "Sync from last" waterline stop.
            var addedIds = afterKeys.filter(function(k) { return !beforeSet[k]; });
            var bottom = __xbsFindBottomCursor(data, 0);
            return JSON.stringify({ status: status, cursor: bottom || null, newCount: addedIds.length, total: afterKeys.length, ids: addedIds });
          } catch (e) {
            return JSON.stringify({ error: String((e && e.message) || e) });
          }
        };
      }
      void 0;
    `;
  }

  // Deterministic capture (Milestone 1): replay the page's own Bookmarks request and walk the
  // cursor to the end of the list. Returns null when no request template was captured (caller
  // falls back to passive scroll). Reuses __xbsApiCollected + the shared parser, so the
  // downstream rendering/dedup path is unchanged.
  private async paginateViaApi(incremental: boolean): Promise<{ tweets: Tweet[]; pages: number; hit429: boolean; stoppedReason: string } | null> {
    if (!this.webview) return null;

    const tmplJson = await this.webview.executeJavaScript(
      '(function(){ try { return JSON.stringify(window.__xbsReqTemplate || null); } catch(e){ return "null"; } })()'
    ) as string;
    const tmpl = (tmplJson ? JSON.parse(tmplJson) : null) as { url?: string } | null;
    if (!tmpl || !tmpl.url) return null;

    await this.webview.executeJavaScript(this.getPaginationScript());
    // Start from a clean collection so the count reflects only what pagination retrieved.
    await this.webview.executeJavaScript('window.__xbsApiCollected = {};');

    let cursor: string | null = null;
    let pages = 0;
    let hit429 = false;
    let stoppedReason = 'end-of-list';
    const seenCursors = new Set<string>();
    const MAX_PAGES = 500;

    const fetchPage = async (c: string | null): Promise<ApiPageResult> => {
      const raw = await this.webview!.executeJavaScript(
        `window.__xbsFetchBookmarkPage(${JSON.stringify(c)})`
      ) as string;
      try { return JSON.parse(raw) as ApiPageResult; } catch { return { error: 'bad-json' }; }
    };

    while (pages < MAX_PAGES) {
      if (this.cancelRequested || !this.currentUrl.includes('/bookmarks')) {
        stoppedReason = 'cancelled';
        break;
      }

      let page = await fetchPage(cursor);

      // Rate-limited: bounded exponential backoff (2s,4s,8s,16s,32s), retrying the same cursor.
      // Check cancel between waits so a cancel during a long backoff is honored promptly.
      if (page.status === 429) {
        hit429 = true;
        for (let attempt = 0; attempt < 5 && page.status === 429; attempt++) {
          await new Promise(resolve => window.setTimeout(resolve, 2000 * Math.pow(2, attempt)));
          if (this.cancelRequested) { stoppedReason = 'cancelled'; break; }
          page = await fetchPage(cursor);
        }
        if (stoppedReason === 'cancelled') break;
        if (page.status === 429) { stoppedReason = 'rate-limited'; break; }
      }

      if (page.error) { stoppedReason = 'error:' + page.error; break; }
      if (page.status && page.status !== 200) { stoppedReason = 'http-' + page.status; break; }

      pages++;
      this.setScrollingToolbar(page.total ?? 0);

      // Incremental "Sync from last" waterline: bookmarks are newest-first, so the first full
      // page whose ids are all already imported means everything below is older/already-imported.
      // Deterministic pagination needs no multi-iteration buffer (unlike the virtualized scroll path).
      if (incremental && (page.ids?.length ?? 0) > 0 && page.ids!.every(id => this.plugin.importedIds.has(id))) {
        stoppedReason = 'incremental-waterline';
        break;
      }

      const next = page.cursor || null;
      if (!next) { stoppedReason = 'no-cursor'; break; }
      if (next === cursor || seenCursors.has(next)) { stoppedReason = 'cursor-repeat'; break; }
      if ((page.newCount ?? 0) === 0) { stoppedReason = 'no-new'; break; }

      seenCursors.add(next);
      cursor = next;
      // Modest pacing between pages.
      await new Promise(resolve => window.setTimeout(resolve, 400));
    }

    if (pages >= MAX_PAGES) stoppedReason = 'page-cap';

    const apiJson = await this.webview.executeJavaScript(
      '(function(){ try { return JSON.stringify(Object.values(window.__xbsApiCollected || {})); } catch(e){ return "[]"; } })()'
    ) as string;
    const tweets = (apiJson ? JSON.parse(apiJson) : []) as Tweet[];

    return { tweets, pages, hit429, stoppedReason };
  }

  // Capture path A (primary): wait for the interceptor to stash the page's own Bookmarks request
  // as a template, then walk the cursor to end-of-list. Populates collectedBookmarks and returns
  // 'captured'. Returns 'fallback' when no template is captured or the walk ends on an error/limit
  // (caller runs the scroll path instead), or 'cancelled' if the user cancelled mid-walk.
  private async tryApiCapture(incremental: boolean): Promise<'captured' | 'fallback' | 'cancelled'> {
    if (!this.webview) return 'fallback';

    // Poll for the interceptor to stash the page's own Bookmarks request as a template.
    const pollTemplate = async (ms: number): Promise<'found' | 'cancelled' | 'timeout'> => {
      const deadline = Date.now() + ms;
      while (Date.now() < deadline) {
        if (this.cancelRequested) return 'cancelled';
        try {
          const has = await this.webview!.executeJavaScript(
            '(function(){ try { return !!(window.__xbsReqTemplate && window.__xbsReqTemplate.url); } catch(e){ return false; } })()'
          ) as boolean;
          if (has) return 'found';
        } catch { /* webview mid-navigation — retry next tick */ }
        await new Promise(resolve => window.setTimeout(resolve, 400));
      }
      return 'timeout';
    };

    let phase = await pollTemplate(10000);
    if (phase === 'timeout') {
      // X sometimes serves the bookmarks page from client cache with no network request, so the
      // interceptor has nothing to template off of. Nudge it: a scroll triggers a fresh Bookmarks
      // request (the next page) that the interceptor captures. Scroll position is irrelevant to the
      // API walk; if we still fall back to scroll, we reset to the top below so that path starts clean.
      try {
        await this.webview.executeJavaScript(
          '(function(){ window.scrollTo(0, Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)); var b=null,h=0; document.querySelectorAll("div").forEach(function(el){ if(el.scrollHeight>el.clientHeight+200){var s=getComputedStyle(el); if((s.overflowY==="scroll"||s.overflowY==="auto")&&el.scrollHeight>h){b=el;h=el.scrollHeight;}} }); if(b)b.scrollTop=b.scrollHeight; })()'
        );
      } catch { /* webview gone — the next poll times out and we fall back */ }
      phase = await pollTemplate(6000);
      if (phase === 'timeout') {
        // Going to scroll-capture: undo the nudge scroll so the scroll path starts from the top.
        try {
          await this.webview.executeJavaScript(
            '(function(){ window.scrollTo(0,0); var b=null,h=0; document.querySelectorAll("div").forEach(function(el){ if(el.scrollHeight>el.clientHeight+200){var s=getComputedStyle(el); if((s.overflowY==="scroll"||s.overflowY==="auto")&&el.scrollHeight>h){b=el;h=el.scrollHeight;}} }); if(b)b.scrollTop=0; })()'
          );
        } catch { /* ignore */ }
      }
    }
    if (phase === 'cancelled') return 'cancelled';
    if (phase === 'timeout') {
      console.log('[x-bookmarks] no Bookmarks request template captured — using scroll capture.');
      return 'fallback';
    }

    const result = await this.paginateViaApi(incremental);
    if (!result) return 'fallback';
    if (result.stoppedReason === 'cancelled') return 'cancelled';

    // Only trust a clean end-of-list (or the incremental waterline / page-cap guardrail). An
    // error/429 stop means X tightened enforcement or drifted — discard the partial result and
    // let the scroll path do it (the design's graceful fallback).
    const CLEAN_STOPS = new Set(['end-of-list', 'no-cursor', 'no-new', 'cursor-repeat', 'incremental-waterline', 'page-cap']);
    if (!CLEAN_STOPS.has(result.stoppedReason)) {
      console.warn(`[x-bookmarks] API capture incomplete (${result.stoppedReason}) — falling back to scroll.`);
      return 'fallback';
    }

    if (result.stoppedReason === 'incremental-waterline') this.stoppedAtWaterline = true;
    for (const tweet of result.tweets) this.mergeBookmark(tweet);
    console.log(`[x-bookmarks] API capture: ${result.tweets.length} bookmarks · ${result.pages} pages · stop ${result.stoppedReason}${result.hit429 ? ' · hit 429' : ''}`);
    return 'captured';
  }

  // Read the interceptor's end-of-list latch: did any Bookmarks response this run come back with
  // zero tweet entries (X's only "that's everything" signal)? Reset at the start of each run.
  private async sawEndOfList(): Promise<boolean> {
    if (!this.webview) return false;
    try {
      return await this.webview.executeJavaScript(
        '(function(){ try { return !!window.__xbsSawEndOfList; } catch(e){ return false; } })()'
      ) as boolean;
    } catch {
      return false; // webview gone — can't prove coverage
    }
  }

  // Reveal the scan surface and hide the live page (kept functional at opacity:0). Called when a
  // capture starts.
  private showScanOverlay() {
    if (this.scanLabel) {
      this.scanLabel.setText(this.showFullScanLabel ? 'Full scan — checking for missed bookmarks…' : 'Scanning bookmarks…');
    }
    this.scanOverlay?.removeClass('is-hidden');
    this.webview?.addClass('is-dimmed');
  }

  // Restore the page. Driven from updateToolbar (called at every capture exit once isScrolling is
  // cleared), so the overlay can never outlive a run regardless of how it ended.
  private hideScanOverlay() {
    this.scanOverlay?.addClass('is-hidden');
    this.webview?.removeClass('is-dimmed');
  }

  updateToolbar() {
    if (!this.hintSpan) return;  // guard against calls before onOpen() completes
    if (this.isScrolling) return; // don't clobber scrolling state
    this.hideScanOverlay();      // not scrolling → no capture in flight → page visible

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
    if ((tweet.videoPosters?.length ?? 0) > (existing.videoPosters?.length ?? 0)) merged.videoPosters = tweet.videoPosters;
    if (tweet.truncated) merged.truncated = true;
    if (tweet.hasVideo) merged.hasVideo = true;
    if (!existing.quoted && tweet.quoted) merged.quoted = tweet.quoted;
    if (tweet.hasQuote) merged.hasQuote = true;
    if (!existing.articleTitle && tweet.articleTitle) merged.articleTitle = tweet.articleTitle;
    this.collectedBookmarks.set(tweet.id, merged);
    return false;
  }

  /**
   * Backstop for the long-tweet truncation race: when the GraphQL interceptor misses a
   * tweet's note_tweet body, only X's truncated timeline preview survives the merge. Such
   * tweets are flagged `truncated` (their article rendered a
   * [data-testid="tweet-text-show-more-link"] button — a stable, locale-independent marker).
   * For each, open its /status/ permalink, where the focal tweet is always fully expanded,
   * and re-read the complete text. Tweets the API already supplied a full note_tweet for
   * (fromNote) are skipped. Runs after the scroll loop, so it never perturbs the scrape.
   */
  private async recoverTruncatedBookmarks(): Promise<void> {
    if (!this.webview) return;

    // Ids the API interceptor already supplied the full note_tweet body for — these are safe.
    const safeIds = new Set<string>();
    try {
      const safeJson = await this.webview.executeJavaScript(
        '(function(){ try { return JSON.stringify(Object.values(window.__xbsApiCollected || {}).filter(function(e){return e && e.fromNote;}).map(function(e){return String(e.id);})); } catch(e) { return "[]"; } })()'
      ) as string;
      for (const id of JSON.parse(safeJson || '[]') as string[]) safeIds.add(id);
    } catch { /* webview gone — fall through; candidates may still be empty */ }

    const candidates = Array.from(this.collectedBookmarks.values()).filter(
      // Already-imported bookmarks are excluded before the MAX_RECOVER budget is applied: their
      // notes are never rewritten (saveBookmarksToVault skips them), and because pages are walked
      // newest-first the imported prefix sits at the front of this list — left in, it can consume
      // the entire budget and leave a genuinely new long tweet stuck with X's truncated preview.
      (t) => t.truncated && !safeIds.has(t.id) && /\/status\/\d+/.test(t.url || '')
        && !this.plugin.isTweetImported(t)
    );
    if (candidates.length === 0) return;

    const MAX_RECOVER = 25;
    const targets = candidates.slice(0, MAX_RECOVER);
    if (candidates.length > MAX_RECOVER) {
      console.warn(`x-bookmarks-sync: ${candidates.length} truncated bookmarks found; recovering the first ${MAX_RECOVER}.`);
    }

    // Recover in a hidden, off-screen webview (same pattern as the article fetcher) so the
    // visible bookmarks page never moves — no flicker through each tweet's detail page.
    const container = activeDocument.body.createDiv({ cls: 'x-bookmarks-hidden-webview' });
    const hidden = container.createEl('webview' as keyof HTMLElementTagNameMap, {
      cls: 'x-bookmarks-hidden-webview-frame',
      attr: { src: targets[0].url },
    }) as unknown as ElectronWebview;

    try {
      for (let i = 0; i < targets.length; i++) {
        if (this.cancelRequested) return;
        const t = targets[i];
        if (this.hintSpan) this.hintSpan.setText(`Recovering full text… ${i + 1}/${targets.length}`);
        try {
          const text = await this.fetchFocalTweetText(hidden, t.url, t.id);
          if (text && text.length > (t.text || '').length) {
            this.mergeBookmark({ ...t, text });
          } else if (!text) {
            console.warn(`x-bookmarks-sync: could not recover full text for ${t.url} (unavailable or still truncated).`);
          }
        } catch (e) {
          console.warn(`x-bookmarks-sync: recovery failed for ${t.url}:`, e);
        }
      }
    } finally {
      container.detach();
    }
  }

  /**
   * Navigate the given (hidden) webview to a tweet's permalink and read the focal tweet's full
   * text via the same anchor-repair logic used during extraction. Returns the complete text, or
   * null if the page never rendered a complete focal tweet (deleted / protected / age-gated, a
   * redirect, or a timeout).
   */
  private async fetchFocalTweetText(webview: ElectronWebview, url: string, id: string): Promise<string | null> {
    webview.setAttribute('src', url);

    const script = `
      (function(id){
        function __xbsClean(el){
          if (!el) return '';
          var text = el.innerText;
          var anchors = el.querySelectorAll('a');
          for (var i = 0; i < anchors.length; i++) {
            var a = anchors[i];
            var mangled = a.innerText;
            var clean = (a.textContent || '').replace(/\\s+/g, '').replace(/…+$/, '');
            if (clean && mangled && text.indexOf(mangled) !== -1) text = text.replace(mangled, clean);
          }
          return text;
        }
        var href = location.href;
        var arts = document.querySelectorAll('article[data-testid="tweet"]');
        var focal = null;
        for (var i = 0; i < arts.length; i++) {
          if (arts[i].querySelector('a[href*="/status/' + id + '"]')) { focal = arts[i]; break; }
        }
        if (!focal && arts.length) focal = arts[0];
        if (!focal) return { href: href };
        // The focal tweet on its own permalink is fully expanded; a lingering show-more
        // means the page hasn't settled yet — report not-ready so the caller keeps polling.
        if (focal.querySelector('[data-testid="tweet-text-show-more-link"]')) return { href: href, incomplete: true };
        var textEl = focal.querySelector('[data-testid="tweetText"]');
        return { href: href, text: __xbsClean(textEl) };
      })(${JSON.stringify(id)})
    `;

    const start = Date.now();
    while (Date.now() - start < 12000) {
      await new Promise(resolve => window.setTimeout(resolve, 300));
      let res: { href?: string; text?: string; incomplete?: boolean } | null = null;
      try {
        res = await webview.executeJavaScript(script) as { href?: string; text?: string; incomplete?: boolean } | null;
      } catch { continue; } // webview mid-navigation — try again next tick
      if (res && res.text && res.text.trim()) return res.text;
      // Bail early if X redirected the page off the permalink (login wall, deleted/protected).
      if (Date.now() - start > 3000 && res && res.href && !res.href.includes(`/status/${id}`)) break;
    }
    return null;
  }

  /**
   * Backstop for video/GIF poster frames the live GraphQL interceptor missed — X served the tweet
   * from a cached response, never via a network call. Such tweets are flagged `hasVideo` during the
   * DOM scrape but carry no `videoPosters`. For each, fetch the poster deterministically from X's
   * public syndication endpoint by id — no webview, no race. Runs after the scroll loop. (A video
   * that lives in a quoted tweet is handled by recoverQuotedTweets, which folds it into the quote.)
   */
  private async recoverVideoPosters(): Promise<void> {
    const candidates = Array.from(this.collectedBookmarks.values()).filter(
      // Skip already-imported bookmarks — their notes are never rewritten, so the fetch is discarded.
      (t) => t.hasVideo && (t.videoPosters?.length ?? 0) === 0 && /^\d+$/.test(t.id)
        && !this.plugin.isTweetImported(t)
    );
    if (candidates.length === 0) return;

    for (let i = 0; i < candidates.length; i++) {
      if (this.cancelRequested) return;
      const t = candidates[i];
      if (this.hintSpan) this.hintSpan.setText(`Recovering video thumbnails… ${i + 1}/${candidates.length}`);
      const posters = await this.fetchSyndicationPosters(t.id);
      if (posters.length > 0) {
        this.mergeBookmark({ ...t, videoPosters: posters });
      } else {
        console.warn(`x-bookmarks-sync: no video poster available for ${t.url} (protected, deleted, or no media).`);
      }
    }
  }

  /**
   * Read a tweet's own video/GIF poster frame(s) from X's public syndication endpoint by id — the
   * same service that powers embedded tweets on the web. Returns [] for protected/deleted tweets or
   * any non-OK response. (Quoted-tweet media is handled separately by fetchSyndicationQuote.)
   *
   * The `token` param must be non-empty; X currently accepts any value. The per-id derivation X's own
   * embeds use is undocumented — if X ever enforces it, this returns {} and posters go missing (the
   * upgrade path is react-tweet's `((id/1e15)*Math.PI).toString(36)` token formula).
   */
  private async fetchSyndicationPosters(id: string): Promise<string[]> {
    const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
    try {
      const res = await requestUrl({
        url: `https://cdn.syndication.twimg.com/tweet-result?id=${id}&token=xbs1`,
        headers: { 'User-Agent': UA },
      });
      const data = res.json as SyndicationTweet | null;
      if (!data) return [];
      const posters: string[] = [];
      const collect = (media?: SyndicationMedia[]) => {
        for (const m of media || []) {
          if ((m.type === 'video' || m.type === 'animated_gif') && m.media_url_https) {
            const url = m.media_url_https.split('?')[0] + '?format=jpg&name=large';
            if (!posters.includes(url)) posters.push(url);
          }
        }
      };
      collect(data.mediaDetails);
      return posters;
    } catch {
      return []; // non-2xx (deleted/protected), network error, or unparseable body
    }
  }

  /**
   * Fold embedded quoted tweets into their parent notes. Bookmarks flagged `hasQuote` (DOM saw a
   * second author block, or the interceptor saw quoted_status_result) but without `quoted` yet are
   * resolved deterministically: fetch the parent from X's syndication endpoint and read its
   * `quoted_tweet`. Runs after the scroll loop, alongside the other syndication backstops.
   */
  private async recoverQuotedTweets(): Promise<void> {
    const candidates = Array.from(this.collectedBookmarks.values()).filter(
      // Skip already-imported bookmarks — their notes are never rewritten, so the fetch is discarded.
      (t) => t.hasQuote && !t.quoted && /^\d+$/.test(t.id)
        && !this.plugin.isTweetImported(t)
    );
    if (candidates.length === 0) return;

    for (let i = 0; i < candidates.length; i++) {
      if (this.cancelRequested) return;
      const t = candidates[i];
      if (this.hintSpan) this.hintSpan.setText(`Recovering quoted tweets… ${i + 1}/${candidates.length}`);
      const quoted = await this.fetchSyndicationQuote(t.id);
      if (quoted) this.mergeBookmark({ ...t, quoted });
    }
  }

  // Read a bookmark's embedded quoted tweet from X's syndication endpoint by parent id. Returns
  // undefined when there is no quote, or it's protected/deleted, or any non-OK response.
  private async fetchSyndicationQuote(id: string): Promise<QuotedTweet | undefined> {
    const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
    try {
      const res = await requestUrl({
        url: `https://cdn.syndication.twimg.com/tweet-result?id=${id}&token=xbs1`,
        headers: { 'User-Agent': UA },
      });
      return parseQuotedTweet(res.json as SyndicationTweet | null);
    } catch {
      return undefined; // non-2xx (deleted/protected), network error, or unparseable body
    }
  }

  /**
   * Native X articles shared as a post have no tweet text — their text is just the article link
   * (e.g. https://x.com/i/article/<id>) — so getFileName would name the note after that URL. Resolve
   * the real article title from syndication (keyed by tweet id; the reliable part of X's tweet-result)
   * so such bookmarks get a meaningful note filename. Article *body* import is intentionally not done
   * (see the project memory on why that was rejected) — this only fixes the filename.
   */
  private async recoverArticleTitles(): Promise<void> {
    const candidates = Array.from(this.collectedBookmarks.values()).filter(
      (t) => !t.articleTitle && /^\d+$/.test(t.id) && !this.plugin.isTweetImported(t)
        && /^https?:\/\/x\.com\/i\/article\/\d+/.test((t.text || '').trim())
    );
    if (candidates.length === 0) return;

    for (let i = 0; i < candidates.length; i++) {
      if (this.cancelRequested) return;
      const t = candidates[i];
      if (this.hintSpan) this.hintSpan.setText(`Resolving article titles… ${i + 1}/${candidates.length}`);
      const title = await this.fetchSyndicationArticleTitle(t.id);
      if (title) this.mergeBookmark({ ...t, articleTitle: title });
    }
  }

  // Read a bookmarked article's title from X's syndication endpoint by tweet id. Returns null when the
  // tweet is not an article, or it's protected/deleted, or any non-OK response.
  private async fetchSyndicationArticleTitle(id: string): Promise<string | null> {
    const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
    try {
      const res = await requestUrl({
        url: `https://cdn.syndication.twimg.com/tweet-result?id=${id}&token=xbs1`,
        headers: { 'User-Agent': UA },
      });
      const data = res.json as SyndicationTweet | null;
      const title = data?.article?.title;
      return title && title.trim() ? title.trim() : null;
    } catch {
      return null; // non-2xx (deleted/protected), network error, or unparseable body
    }
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

          // True when the tweet embeds a quoted tweet. Two independent signals OR'd for recall:
          // a second author block, or a link to a different tweet's permalink (its own).
          function __xbsHasQuote(tweetEl, ownId) {
            try {
              if (tweetEl.querySelectorAll('[data-testid="User-Name"]').length > 1) return true;
              for (const a of tweetEl.querySelectorAll('a[href*="/status/"]')) {
                const h = typeof a.href === 'string' ? a.href : (a.getAttribute ? a.getAttribute('href') || '' : '');
                const m = h.match(/\\/status\\/(\\d+)/);
                if (m && m[1] !== ownId) return true;
              }
              return false;
            } catch (e) { return false; }
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
                          const result = { id: String(id), name: String(name), username: String(username), text: String(text), url: String(url), truncated: !!tweet.querySelector('[data-testid="tweet-text-show-more-link"]'), hasVideo: !!tweet.querySelector('[data-testid="videoPlayer"], [data-testid="videoComponent"], video'), hasQuote: __xbsHasQuote(tweet, String(id)) };
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
    // When we overrode the user's "Sync from last" choice, say so for the whole run. The Notice
    // explaining it expires in seconds while the scan takes minutes, so by the time the user
    // wonders why this is slow, this label is the only thing still on screen.
    if (this.scanLabel) {
      const prefix = this.showFullScanLabel ? 'Full scan — checking for missed bookmarks…' : 'Scanning bookmarks…';
      this.scanLabel.setText(count > 0 ? `${prefix} ${count} found` : prefix);
    }
  }

  private async pollFlag(): Promise<boolean> {
    const start = Date.now();
    while (Date.now() - start < 3000) {
      await new Promise(resolve => window.setTimeout(resolve, 100));
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
      this.stoppedAtWaterline = false;
      this.showFullScanLabel = false;
      let noNewCount = 0;
      let iterationCount = 0;
      // A re-imported bookmark may sit deep in the timeline past the incremental
      // waterline, so a one-shot flag forces a full scan to guarantee we reach it.
      const fullScanOverride = this.plugin.settings.forceFullScanOnNextSync;
      // The waterline is only sound if the previous run provably reached the end of the list —
      // otherwise it stops at a gap left by an incomplete scan and hides everything below it,
      // permanently. Unproven coverage downgrades this run to a full scan to rebuild the baseline.
      const coverageProven = this.plugin.settings.coverageProven;
      const incrementalMode = this.incrementalMode && !fullScanOverride && coverageProven;
      const overrideActiveThisRun = (fullScanOverride || !coverageProven) && this.incrementalMode;
      this.showFullScanLabel = overrideActiveThisRun;
      if (overrideActiveThisRun) {
        if (this.syncFromLastCheckbox) this.syncFromLastCheckbox.checked = false;
        new Notice(fullScanOverride
          ? 'Re-imported bookmark detected — running a full scan to find it.'
          : 'One-time full scan: checking that earlier syncs didn\'t miss anything. Later syncs will be quick again.');
      }

      this.setScrollingToolbar(0);
      this.showScanOverlay();

      // Navigate fresh to the bookmarks page so X starts a new API pagination
      // cursor from page 1. Reusing the existing page state causes X to serve
      // from its client-side cache which may have missed some bookmark pages.
      // loadURL() forces a real reload even when the webview is already on this URL;
      // a plain src= set is a no-op in that case, so a re-sync kept the stale feed.
      void this.webview.loadURL('https://x.com/i/bookmarks').catch(() => {});
      await new Promise(resolve => window.setTimeout(resolve, 1500));

      // Clear the end-of-list latch for this run. The navigation above already wipes webview
      // globals, but reset explicitly so the flag can never carry over from a previous capture.
      try {
        await this.webview.executeJavaScript('window.__xbsSawEndOfList = false;');
      } catch { /* webview mid-navigation — the latch starts false anyway */ }

      // Primary: deterministic cursor pagination. On 'captured' we skip straight to the shared
      // finalize tail; on 'fallback' we flow into today's scroll path below (worst case = current
      // behavior); on 'cancelled' we bail like the scroll path's cancel branch.
      const apiStatus = await this.tryApiCapture(incrementalMode);
      if (apiStatus === 'cancelled') {
        await this.cleanup();
        this.cancelRequested = false;
        this.isScrolling = false;
        if (overrideActiveThisRun && this.syncFromLastCheckbox) this.syncFromLastCheckbox.checked = this.incrementalMode;
        this.updateToolbar();
        // Distinguish navigate-away from a deliberate Cancel click (same parity as the scroll path).
        if (!this.currentUrl.includes('/bookmarks')) new Notice('Navigated away — bookmark capture cancelled.');
        return;
      }
      if (apiStatus === 'captured') {
        await this.finalizeCapture(overrideActiveThisRun, fullScanOverride);
        return;
      }
      // apiStatus === 'fallback' — run the passive scroll capture exactly as before.

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

          // True when the tweet embeds a quoted tweet. Two independent signals OR'd for recall:
          // a second author block, or a link to a different tweet's permalink (its own).
          function __xbsHasQuote(tweetEl, ownId) {
            try {
              if (tweetEl.querySelectorAll('[data-testid="User-Name"]').length > 1) return true;
              for (const a of tweetEl.querySelectorAll('a[href*="/status/"]')) {
                const h = typeof a.href === 'string' ? a.href : (a.getAttribute ? a.getAttribute('href') || '' : '');
                const m = h.match(/\\/status\\/(\\d+)/);
                if (m && m[1] !== ownId) return true;
              }
              return false;
            } catch (e) { return false; }
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
                  username: String(username), text: String(text), url: String(url),
                  truncated: !!tweetEl.querySelector('[data-testid="tweet-text-show-more-link"]'),
                  // High-recall flag for the quote-fold recovery pass: a quote shows a second author
                  // block AND links to its own (different) permalink. Either signal suffices; false
                  // positives are harmless (syndication is the authority on whether a quote exists).
                  hasQuote: __xbsHasQuote(tweetEl, String(id))
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
          await new Promise(resolve => window.setTimeout(resolve, 200));
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
        await new Promise(resolve => window.setTimeout(resolve, 500));

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
            this.stoppedAtWaterline = true;
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

        // X served a page with zero tweet entries — it has no more bookmarks. Stop now instead of
        // burning the remaining no-new iterations (~3.5s each) waiting for a timeout it already
        // answered. Coverage is also proven by this, which finalizeCapture records.
        if (await this.sawEndOfList()) break;

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

      await this.finalizeCapture(overrideActiveThisRun, fullScanOverride);

    } catch (err) {
      console.error('autoScrollAndExtract error:', err);
      await this.cleanup();
      this.cancelRequested = false;
      this.isScrolling = false;
      this.updateToolbar();
      new Notice('Error during bookmark capture.');
    }
  }

  // Shared tail for both capture paths: clean up the observer, run the syndication/hidden-webview
  // recovery passes, then present the selection modal. overrideActiveThisRun/fullScanOverride mirror
  // the locals in autoScrollAndExtract so the "Sync from last" checkbox and one-shot full-scan flag
  // resolve identically regardless of which path captured the bookmarks.
  private async finalizeCapture(overrideActiveThisRun: boolean, fullScanOverride: boolean): Promise<void> {
    // Read the end-of-list latch before cleanup, while the webview is certainly still alive.
    const reachedEnd = await this.sawEndOfList();
    await this.cleanup();
    // Recover any bookmarks whose full body the API interceptor missed (X served only the
    // truncated "Show more" preview). Detected structurally via tweet-text-show-more-link.
    await this.recoverTruncatedBookmarks();
    // Recover video/GIF poster frames the interceptor missed (flagged hasVideo, no videoPosters).
    await this.recoverVideoPosters();
    // Fold embedded quoted tweets into their parent notes (flagged hasQuote, no quoted yet).
    await this.recoverQuotedTweets();
    // Resolve real article titles so article-link bookmarks get meaningful note filenames.
    await this.recoverArticleTitles();

    // Cancelled during a recovery pass (each checks cancelRequested) → abort without presenting,
    // matching the scroll-loop cancel: a cancel discards the run. Leave forceFullScanOnNextSync set
    // so the next attempt retries it.
    if (this.cancelRequested) {
      this.cancelRequested = false;
      this.isScrolling = false;
      if (overrideActiveThisRun && this.syncFromLastCheckbox) this.syncFromLastCheckbox.checked = this.incrementalMode;
      this.updateToolbar();
      return;
    }

    this.isScrolling = false;
    if (overrideActiveThisRun && this.syncFromLastCheckbox) this.syncFromLastCheckbox.checked = this.incrementalMode;
    this.updateToolbar();

    // Record whether the waterline shortcut is safe for the next sync. Three cases:
    //   reachedEnd            → proven: X served a zero-entry page, so nothing lies below.
    //   stoppedAtWaterline    → unchanged: the run stopped early on purpose and proves nothing new,
    //                           but the previous run's proof still holds (X only appends at the top).
    //   otherwise             → unproven: the run ended without reaching the end (scroll stall, a
    //                           repeated cursor, an error) and may have left a gap. Force a full scan.
    // Cancelled runs return earlier and leave the flag untouched — a cancel proves nothing either way.
    const previouslyProven = this.plugin.settings.coverageProven;
    if (reachedEnd) {
      this.plugin.settings.coverageProven = true;
    } else if (!this.stoppedAtWaterline) {
      this.plugin.settings.coverageProven = false;
    }
    // Logged every run, not just on change: a capture that can never prove coverage (e.g. a full
    // walk that keeps ending on a repeated cursor) is stuck doing full scans forever, and that
    // stays silent if we only report transitions.
    console.log(`[x-bookmarks] coverageProven ${previouslyProven} → ${this.plugin.settings.coverageProven} (reachedEnd=${reachedEnd}, stoppedAtWaterline=${this.stoppedAtWaterline})`);

    // Consume the one-shot full-scan flag now that capture reached the end.
    // Cancel/navigate-away paths return early and leave the flag set so the next attempt retries.
    if (fullScanOverride) {
      this.plugin.settings.forceFullScanOnNextSync = false;
    }
    await this.plugin.saveSettings();

    if (this.collectedBookmarks.size === 0) {
      new Notice('No bookmarks found.');
      return;
    }

    // Only the bookmarks that can actually be imported reach the modal. Already-imported ones were
    // rendered as disabled rows (~8 DOM elements each), which on a large re-scan is most of the
    // list and most of the modal's build time — for rows that exist only to be greyed out.
    const newBookmarks = Array.from(this.collectedBookmarks.values())
      .filter(t => !this.plugin.isTweetImported(t));

    const count = newBookmarks.length;
    if (this.hintSpan) {
      this.hintSpan.setText(`Preparing ${count} bookmark${count !== 1 ? 's' : ''}…`);
    }
    // Yield so the "Preparing…" text actually paints before the modal's synchronous
    // DOM build (300+ items) takes the main thread again.
    await new Promise(resolve => window.setTimeout(resolve, 16));

    const modal = new BookmarkSelectionModal(
      this.app,
      this.plugin,
      newBookmarks
    );
    // Reset to incremental mode only after the user actually confirms import,
    // not on extraction completion — avoids flipping the checkbox if the modal is cancelled.
    modal.onImportComplete = () => {
      this.incrementalMode = true;
      if (this.syncFromLastCheckbox) this.syncFromLastCheckbox.checked = true;
    };
    modal.onDidClose = () => { this.updateToolbar(); };
    modal.open();
  }

}
