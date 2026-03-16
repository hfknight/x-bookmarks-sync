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
  collectedBookmarks: Map<string, any> = new Map();

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
              tweets.forEach(tweet => {
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
                      }
                  } catch (e) {
                      // ignore individual tweet errors
                  }
              });
              return { success: true, data: results };
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
    this.extractBtn.onclick = () => { this.isScrolling = false; };
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
      this.collectedBookmarks = new Map();
      let noNewCount = 0;
      let iterationCount = 0;

      this.setScrollingToolbar(0);

      // Reset observer flag — authoritative reset for this run
      await this.webview.executeJavaScript('window.__newTweetsAppeared = false');

      // Pre-loop capture: grab tweets already visible in viewport
      const preResult = await this.webview.executeJavaScript(this.getExtractionScript());
      if (preResult && preResult.success && preResult.data) {
        for (const tweet of preResult.data) {
          this.collectedBookmarks.set(tweet.id, tweet);
        }
      }

      // Inject MutationObserver (guarded against double-injection)
      await this.webview.executeJavaScript(`
        if (!window.__xbsObserverInstalled) {
          window.__xbsObserverInstalled = true;
          const observer = new MutationObserver((mutations) => {
            for (const m of mutations) {
              for (const node of m.addedNodes) {
                if (node.nodeType === 1 &&
                    (node.matches('article[data-testid="tweet"]') ||
                     node.querySelector('article[data-testid="tweet"]'))) {
                  window.__newTweetsAppeared = true;
                }
              }
            }
          });
          observer.observe(document.body, { childList: true, subtree: true });
          window.__xbsObserver = observer;
        }
      `);

      // Scroll loop
      while (true) {
        let newThisIteration = 0;
        iterationCount++;

        // Check cancel
        if (!this.isScrolling) {
          await this.cleanup();
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

        // Scroll to bottom
        await this.webview.executeJavaScript('window.scrollTo(0, document.body.scrollHeight)');

        // Wait for new tweets or timeout (return value intentionally discarded)
        await this.pollFlag();

        // Capture current tweets, merge new ones
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

        // Exit conditions
        if (noNewCount >= 2 || iterationCount >= 500) {
          break;
        }
      }

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
      this.isScrolling = false;
      this.updateToolbar();
      new Notice('Error during bookmark capture.');
    }
  }

}

export default class XBookmarksSync extends Plugin {
  async onload() {
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
    const date = `${month}-${day}-${year}`;

    const author = (tweet.name || 'Unknown')
      .replace(/[\\/:"*?<>|]/g, '')
      .trim();
    let title = (tweet.text || 'Bookmark').split('\n')[0].substring(0, 40);
    title = title.replace(/[\\/:"*?<>|]/g, '').trim();
    if (!title) title = 'Bookmark';

    return `x-bookmarks/${date}-${author}-${title}.md`;
  }

  isTweetImported(tweet: any): boolean {
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
    }
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
