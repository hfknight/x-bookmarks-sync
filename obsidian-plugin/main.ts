import { Plugin, addIcon, Notice, TFile, TFolder, MarkdownView } from 'obsidian';
import Defuddle from 'defuddle/full';
import changelogText from '../CHANGELOG.md';
import { VIEW_TYPE, XBookmarksSyncData, FileNameFormat, Tweet } from './types';
import { renderQuotedSection } from './quoted';
import { XBookmarksView } from './view';
import { XBookmarksSyncSettingTab } from './settings-tab';
import { WhatsNewModal, parseChangelog, notesSince } from './whats-new-modal';

interface ElectronWebview extends HTMLElement {
  executeJavaScript(code: string): Promise<unknown>;
}

type FetchArticleResult =
  | { ok: true; markdown: string; title: string }
  | { ok: false; reason: 'not-article' | 'fetch-failed' };

const X_URL_PATTERN = /^https?:\/\/(?:www\.)?(?:x|twitter)\.com\/[^/]+\/(?:status|article)\/\d+/;
const FULL_ARTICLE_HEADING = /^##\s+Full article\s*$/m;

function toArticleUrl(url: string): string {
  return url.replace(/(\/[^/]+)\/status\/(\d+)/, '$1/article/$2');
}

// Escape a string for a YAML double-quoted scalar: backslashes first, then quotes (order matters —
// escaping quotes first would then double-escape the backslashes we add).
function yamlQuote(value: string): string {
  return `"${value.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;
}

// UTF-8 byte length of a single Unicode code point.
function codepointBytes(cp: number): number {
  if (cp <= 0x7f) return 1;
  if (cp <= 0x7ff) return 2;
  if (cp <= 0xffff) return 3;
  return 4;
}

// Trim a string so its UTF-8 byte length is ≤ maxBytes, never splitting a code point. Filenames are
// capped at 255 bytes on common filesystems (Dropbox dislikes long names too), and CJK chars are
// 3 bytes each — so the limit that matters is bytes, not characters.
function truncateBytes(value: string, maxBytes: number): string {
  let bytes = 0;
  let out = '';
  for (const ch of value) {
    bytes += codepointBytes(ch.codePointAt(0) ?? 0);
    if (bytes > maxBytes) break;
    out += ch;
  }
  return out;
}

// A tweet's snowflake ID encodes its creation time. Derive the post's date as YYYY-MM-DD (local),
// the same value used for the note's filename prefix. Non-numeric/empty ids fall back to now.
function tweetDateString(id: string): string {
  const d = /^\d+$/.test(id)
    ? new Date(Number((BigInt(id) >> BigInt(22)) + BigInt(1288834974657)))
    : new Date();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${month}-${day}`;
}

export default class XBookmarksSync extends Plugin {
  importedIds: Set<string> = new Set();
  settings: XBookmarksSyncData = {
    importedIds: [],
    defaultFolder: 'x-bookmarks',
    defaultTags: ['twitter', 'bookmark'],
    fileNameFormat: 'date-author-title',
    lastSyncAt: null,
    lastShownVersion: null,
    forceFullScanOnNextSync: false,
  };
  pendingOpenUrl: string | null = null;

  async onload() {
    const data = (await this.loadData()) as Partial<XBookmarksSyncData> | null;
    this.settings = {
      importedIds: data?.importedIds ?? [],
      defaultFolder: data?.defaultFolder ?? 'x-bookmarks',
      defaultTags: data?.defaultTags ?? ['twitter', 'bookmark'],
      fileNameFormat: data?.fileNameFormat ?? 'date-author-title',
      lastSyncAt: data?.lastSyncAt ?? null,
      lastShownVersion: data?.lastShownVersion ?? null,
      forceFullScanOnNextSync: data?.forceFullScanOnNextSync ?? false,
    };
    this.importedIds = new Set(this.settings.importedIds);
    await this.maybeShowWhatsNew();

    addIcon('x-bookmarks-sync', `<path d="M 50 16.67 A 33.33 33.33 0 0 1 73.75 73.75 M 73.75 52.92 V 73.75 H 94.58" stroke="currentColor" stroke-width="8.33" stroke-linecap="round" stroke-linejoin="round" fill="none"/><path d="M 50 83.33 A 33.33 33.33 0 0 1 26.25 26.25 M 26.25 47.08 V 26.25 H 5.42" stroke="currentColor" stroke-width="8.33" stroke-linecap="round" stroke-linejoin="round" fill="none"/><path d="M 60.42 33.75 H 65.83 L 53.75 47.5 L 67.92 66.25 H 57.08 L 48.75 55 L 38.33 66.25 H 32.92 L 45.42 51.67 L 32.08 33.75 H 42.92 L 50.42 44.17 Z" fill="currentColor" stroke="none"/>`);

    this.registerView(VIEW_TYPE, (leaf) => new XBookmarksView(leaf, this));

    this.addRibbonIcon('x-bookmarks-sync', 'Open X bookmarks', () => {
      void this.openBookmarksView();
    });

    this.addCommand({
      id: 'open-x-bookmarks',
      name: 'Open X bookmarks view',
      callback: () => {
        void this.openBookmarksView();
      }
    });

    this.addCommand({
      id: 'fetch-article-body',
      name: 'Import X article body to current note',
      callback: () => {
        void this.fetchArticleForActiveFile();
      }
    });

    this.addCommand({
      id: 'reimport-bookmark',
      name: 'Re-import this bookmark on next sync',
      callback: () => {
        void this.reimportBookmarkForActiveFile();
      }
    });

    this.registerEvent(
      this.app.workspace.on('editor-menu', (menu, _editor, view) => {
        if (!(view instanceof MarkdownView) || !view.file) return;
        const fm = this.app.metadataCache.getFileCache(view.file)?.frontmatter;
        const sourceUrl =
          (fm && typeof fm.article_url === 'string' && fm.article_url) ||
          (fm && typeof fm.url === 'string' && fm.url) || '';
        if (!X_URL_PATTERN.test(sourceUrl)) return;

        menu.addItem((item) => {
          item.setTitle('Import X article body')
            .setIcon('download')
            .onClick(() => { void this.fetchArticleForActiveFile(); });
        });

        menu.addItem((item) => {
          item.setTitle('Re-import this bookmark on next sync')
            .setIcon('refresh-cw')
            .onClick(() => { void this.reimportBookmarkForActiveFile(); });
        });
      })
    );

    this.registerObsidianProtocolHandler('x-bookmarks', (params) => {
      if (params.url) {
        void this.openUrlInWebview(params.url);
      }
    });

    this.addSettingTab(new XBookmarksSyncSettingTab(this.app, this));
  }

  onunload() {
  }

  async saveSettings() {
    try {
      await this.saveData({
        ...this.settings,
        importedIds: Array.from(this.importedIds),
      });
    } catch {
      new Notice('X bookmarks sync: failed to save settings.');
    }
  }

  async openUrlInWebview(url: string) {
    const view = this.app.workspace.getLeavesOfType(VIEW_TYPE)[0]?.view;
    if (view instanceof XBookmarksView) {
      // View already instantiated — navigate its live webview directly.
      await this.activateView();
      view.loadUrl(url);
    } else {
      // No leaf, or a deferred/hidden leaf not yet instantiated (its .view is Obsidian's
      // DeferredView, not XBookmarksView) — seed pendingOpenUrl so onOpen() sets the
      // webview's initial src to this URL whenever it fires (even if deferred past this
      // await), avoiding a second navigation that races the default bookmarks load.
      this.pendingOpenUrl = url;
      await this.activateView();
    }
  }

  async openBookmarksView() {
    // Reveal the view; if it's open on a tweet/article page (e.g. via protocol handler),
    // navigate to the bookmarks list so the user gets the extract toolbar.
    const existingView = this.app.workspace.getLeavesOfType(VIEW_TYPE)[0]?.view as XBookmarksView | undefined;
    if (existingView && !existingView.currentUrl.includes('/bookmarks')) {
      await this.openUrlInWebview('https://x.com/i/bookmarks');
      return;
    }
    await this.activateView();
  }

  async fetchArticleForActiveFile() {
    const file = this.app.workspace.getActiveFile();
    if (!file) {
      new Notice('No active note.');
      return;
    }

    const fm = this.app.metadataCache.getFileCache(file)?.frontmatter;
    let sourceUrl: string | undefined;
    if (fm) {
      if (typeof fm.article_url === 'string') sourceUrl = fm.article_url;
      else if (typeof fm.url === 'string') sourceUrl = fm.url;
    }
    if (!sourceUrl || !X_URL_PATTERN.test(sourceUrl)) {
      new Notice('No X URL found in this note.');
      return;
    }
    await this.appendArticleToNote(file, sourceUrl);
  }

  async reimportBookmarkForActiveFile() {
    const file = this.app.workspace.getActiveFile();
    if (!file) {
      new Notice('No active note.');
      return;
    }

    const fm = this.app.metadataCache.getFileCache(file)?.frontmatter;
    const id = fm && fm.id != null ? String(fm.id) : '';
    if (!id) {
      new Notice('No bookmark ID found in this note.');
      return;
    }

    this.importedIds.delete(id);
    this.settings.forceFullScanOnNextSync = true;
    await this.saveSettings();
    await this.app.fileManager.trashFile(file);
    new Notice('Bookmark removed. Next sync will do a full scan to find it.');
  }

  async fetchArticleFromWebview(currentUrl: string) {
    const idMatch = currentUrl.match(/(?:status|article)\/(\d+)/);
    if (!idMatch) {
      new Notice('No tweet ID in current URL.');
      return;
    }
    const file = this.findBookmarkNoteById(idMatch[1]);
    if (!file) {
      new Notice('No bookmark note found for this tweet.');
      return;
    }
    await this.appendArticleToNote(file, currentUrl);
  }

  private findBookmarkNoteById(id: string): TFile | null {
    // Scoped search first: most bookmarks live under the configured folder,
    // so we narrow enumeration to that subtree instead of the whole vault.
    const folder = this.app.vault.getAbstractFileByPath(this.settings.defaultFolder);
    if (folder instanceof TFolder) {
      const inFolder = this.searchFolderForId(folder, id);
      if (inFolder) return inFolder;
    }
    // Fallback: scan the full vault only if the user has moved a bookmark
    // out of the configured folder.
    for (const file of this.app.vault.getMarkdownFiles()) {
      const fm = this.app.metadataCache.getFileCache(file)?.frontmatter;
      if (fm && String(fm.id ?? '') === id) return file;
    }
    return null;
  }

  private searchFolderForId(folder: TFolder, id: string): TFile | null {
    for (const child of folder.children) {
      if (child instanceof TFile && child.extension === 'md') {
        const fm = this.app.metadataCache.getFileCache(child)?.frontmatter;
        if (fm && String(fm.id ?? '') === id) return child;
      } else if (child instanceof TFolder) {
        const nested = this.searchFolderForId(child, id);
        if (nested) return nested;
      }
    }
    return null;
  }

  private async appendArticleToNote(file: TFile, sourceUrl: string) {
    const existing = await this.app.vault.read(file);
    if (FULL_ARTICLE_HEADING.test(existing)) {
      new Notice('Article body already added to this note.');
      return;
    }

    const articleUrl = toArticleUrl(sourceUrl);
    new Notice('Fetching article body…');
    const result = await this.fetchArticleByHiddenWebview(articleUrl);
    if (!result.ok) {
      if (result.reason === 'not-article') {
        new Notice('This tweet has no article body.');
      } else {
        new Notice('Failed to fetch article body.');
      }
      return;
    }

    const title = result.title.trim();
    // Promote the article title to the note's H1 — the note is effectively the article now and is
    // renamed to the title below, so "# Tweet by …" undersells it. Author stays in frontmatter. Leaves
    // a user-customized H1 (anything other than the generated "# Tweet by …") untouched. With the title
    // in the H1, the old "### {title}" line under "## Full article" would just duplicate it, so it's gone.
    let body = title ? existing.replace(/^# Tweet by .*$/m, () => `# ${title}`) : existing;
    // The article's cover/lead image is captured as tweet media too, so it would show twice once the
    // body is appended. Drop tweet-note images whose pbs.twimg media id also appears in the article
    // body. (If the body has no real images — e.g. they didn't load — nothing matches and the tweet
    // image is left intact.)
    body = body.replace(
      /\n*!\[\]\(https?:\/\/pbs\.twimg\.com\/media\/([A-Za-z0-9_-]+)[^)]*\)/g,
      (match: string, mediaId: string) => (result.markdown.includes(mediaId) ? '' : match),
    );
    await this.app.vault.modify(file, `${body}\n\n## Full article\n\n${result.markdown}\n`);

    let renamedTo: string | null = null;
    if (title) {
      try {
        const dir = file.parent?.path ?? '';
        const fm = this.app.metadataCache.getFileCache(file)?.frontmatter;
        const idStr = String(fm?.id ?? '');
        const authorStr = String(fm?.author ?? '');
        const desired = this.buildFileNameInDir(dir, idStr, authorStr, title);
        if (desired !== file.path) {
          let target = desired;
          let counter = 1;
          while (this.app.vault.getAbstractFileByPath(target)) {
            target = desired.replace(/\.md$/, `-${counter}.md`);
            counter++;
          }
          await this.app.vault.rename(file, target);
          renamedTo = target;
        }
      } catch (err) {
        console.error('rename failed:', err);
      }
    }

    new Notice(renamedTo ? 'Article body added and note renamed.' : 'Article body added.');
  }

  async fetchArticleByHiddenWebview(url: string): Promise<FetchArticleResult> {
    const container = activeDocument.body.createDiv({ cls: 'x-bookmarks-hidden-webview' });
    const webview = container.createEl('webview' as keyof HTMLElementTagNameMap, {
      cls: 'x-bookmarks-hidden-webview-frame',
      attr: { src: url },
    }) as unknown as ElectronWebview;

    try {
      await new Promise<void>((resolve) => {
        const timeout = window.setTimeout(() => {
          webview.removeEventListener('did-finish-load', handler);
          resolve();
        }, 30000);
        const handler = () => {
          window.clearTimeout(timeout);
          webview.removeEventListener('did-finish-load', handler);
          resolve();
        };
        webview.addEventListener('did-finish-load', handler);
      });

      // Extra settle delay so React finishes rendering article body
      await new Promise(resolve => window.setTimeout(resolve, 2000));

      // If X redirected us off /article/, this tweet has no article body
      const finalUrl = await webview.executeJavaScript('window.location.href') as string;
      if (typeof finalUrl !== 'string' || !/\/article\/\d+/.test(finalUrl)) {
        return { ok: false, reason: 'not-article' };
      }

      const html = await webview.executeJavaScript(
        'document.documentElement.outerHTML'
      ) as string;
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const defuddle = new Defuddle(doc, { url, markdown: true });
      const result = await defuddle.parseAsync();
      if (result && result.content) {
        const title = (result as { title?: unknown }).title;
        return { ok: true, markdown: result.content, title: typeof title === 'string' ? title : '' };
      }
      return { ok: false, reason: 'fetch-failed' };
    } catch (err) {
      console.error('fetchArticleByHiddenWebview error:', err);
      return { ok: false, reason: 'fetch-failed' };
    } finally {
      container.detach();
    }
  }

  private async maybeShowWhatsNew() {
    const current = this.manifest.version;
    const last = this.settings.lastShownVersion;
    const isExistingUser = this.importedIds.size > 0;

    this.settings.lastShownVersion = current;
    await this.saveSettings();

    // No-op reload: same version we already showed for.
    if (last === current) return;

    // Fresh install (no prior version, no imported bookmarks) — stay quiet.
    if (!last && !isExistingUser) return;

    // Existing user with no recorded version (upgrading from a release that
    // predates this feature): show the full window from the earliest entry.
    const from = last ?? '0.0.0';

    const changelog = parseChangelog(changelogText);
    const body = notesSince(changelog, from, current);
    if (!body) return;

    new WhatsNewModal(this.app, this, body).open();
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
      await workspace.revealLeaf(leaf);
    }
  }

  getFileName(tweet: Tweet): string {
    // Prefer a real article title (syndication `articleTitle`, else the linked-article card title)
    // over the tweet text — an article post's text is just the article link (and is stripped from
    // the body), so without this the note would be named "Bookmark".
    const title = tweet.articleTitle || tweet.article?.title || tweet.text;
    return this.buildFileNameInDir(this.settings.defaultFolder, tweet.id, tweet.name, title);
  }

  private buildFileNameInDir(dir: string, id: string, authorRaw: string, titleRaw: string): string {
    // Sanitize: first line only, strip filename-illegal chars, trim.
    const clean = (s: string) => s.split('\n')[0].replace(/[\\/:"*?<>|]/g, '').trim();
    const date = tweetDateString(id);
    // Byte-budget each variable part so the whole filename stays well under the 255-byte limit
    // (author ~60 + title ~110 + date 10 + separators/.md ≈ 185, leaving room for a -N suffix).
    const author = truncateBytes(clean(authorRaw) || 'Unknown', 60).trimEnd() || 'Unknown';
    const title = truncateBytes(clean(titleRaw) || 'Bookmark', 110).trimEnd() || 'Bookmark';

    const parts: Record<FileNameFormat, string[]> = {
      'date-author-title': [date, author, title],
      'author-title': [author, title],
      'date-title': [date, title],
      'title-author': [title, author],
    };
    const base = `${(parts[this.settings.fileNameFormat] ?? parts['date-author-title']).join('-')}.md`;
    return dir ? `${dir}/${base}` : base;
  }

  isTweetImported(tweet: Tweet): boolean {
    if (this.importedIds.has(tweet.id)) return true;
    // Legacy fallback for bookmarks imported before the ID set existed (original id-based filename).
    // The format-based name is intentionally not checked: with configurable formats it can both miss
    // (the format changed) and false-positive (a different tweet's note shares the name).
    return !!this.app.vault.getAbstractFileByPath(`x-bookmarks/Tweet-${tweet.id}.md`);
  }

  async saveBookmarksToVault(bookmarks: Tweet[]) {
    const targetFolder = this.settings.defaultFolder;
    const folder = this.app.vault.getAbstractFileByPath(targetFolder);
    if (!(folder instanceof TFolder)) {
      await this.app.vault.createFolder(targetFolder);
    }

    let count = 0;
    for (const tweet of bookmarks) {
      // Skip already-imported tweets by ID (not by filename): with configurable, non-unique formats a
      // filename match can be a *different* tweet, so deciding on the name would silently drop notes.
      if (this.isTweetImported(tweet)) {
        this.importedIds.add(tweet.id);
        continue;
      }
      // A filename clash here is a *different* note — disambiguate with -N (same as the article-rename
      // path) rather than skipping. Only mark imported once the note is actually written.
      const desired = this.getFileName(tweet);
      let fileName = desired;
      let n = 1;
      while (this.app.vault.getAbstractFileByPath(fileName)) {
        fileName = desired.replace(/\.md$/, `-${n}.md`);
        n++;
      }
      await this.app.vault.create(fileName, this.formatTweet(tweet));
      count++;
      this.importedIds.add(tweet.id);
    }
    this.settings.lastSyncAt = new Date().toISOString();
    await this.saveSettings();
    new Notice(`Successfully saved ${count} new bookmarks!`);
  }

  formatTweet(tweet: Tweet) {
    const date = new Date().toISOString().split('T')[0];
    const safeId = yamlQuote(tweet.id || '');
    const safeAuthor = yamlQuote(tweet.name || '');
    const safeUsername = yamlQuote(tweet.username || '');
    const safeUrl = yamlQuote(tweet.url || '');
    const articleUrlLine = tweet.article
      ? `\narticle_url: ${yamlQuote(tweet.article.url)}`
      : '';

    const quotedSection = tweet.quoted ? renderQuotedSection(tweet.quoted) : '';

    let articleSection = '';
    if (tweet.article) {
      const parts: string[] = ['\n\n## Linked article\n'];
      if (tweet.article.title) parts.push(`\n**${tweet.article.title}**\n`);
      if (tweet.article.excerpt) parts.push(`\n${tweet.article.excerpt}\n`);
      parts.push(`\n[Read full article](${tweet.article.url})`);
      articleSection = parts.join('');
    }

    const imagesSection = tweet.images && tweet.images.length > 0
      ? '\n\n' + tweet.images.map(u => `![](${u})`).join('\n')
      : '';

    // Videos/GIFs: the "▶ Video" label and the poster thumbnail both link to X's video viewer for
    // the tweet (…/status/<id>/video/N — N is 1-based per video). X media URLs aren't reliably
    // embeddable, so we link out rather than hotlink the stream. The ▶ marks it as a video.
    const videosSection = tweet.videoPosters && tweet.videoPosters.length > 0
      ? '\n\n' + tweet.videoPosters
        .map((u, i) => {
          const videoUrl = `${tweet.url}/video/${i + 1}`;
          return `[▶ Video](${videoUrl})\n\n[![](${u})](${videoUrl})`;
        })
        .join('\n\n')
      : '';

    // Strip leading newlines so an article post (empty body text — the link lives in the card)
    // doesn't leave blank lines between the H1 and the first section.
    const body = `${tweet.text}${imagesSection}${videosSection}${quotedSection}${articleSection}`.replace(/^\n+/, '');

    return `---
id: ${safeId}
author: ${safeAuthor}
username: ${safeUsername}
published: ${tweetDateString(tweet.id || '')}
scraped_date: ${date}
url: ${safeUrl}${articleUrlLine}
tags: [${this.settings.defaultTags.join(', ')}]
---

# Tweet by ${tweet.name} (${tweet.username})

${body}

[View on X](${tweet.url}) | [Open in Obsidian Webview](obsidian://x-bookmarks?url=${encodeURIComponent(tweet.url)})
`;
  }
}
