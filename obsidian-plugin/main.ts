import { Plugin, ItemView, WorkspaceLeaf, Notice, Modal, App } from 'obsidian';
import Defuddle from 'defuddle/full';

const VIEW_TYPE = "x-bookmarks-webview";

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

        const listContainer = contentEl.createDiv({ cls: 'bookmark-list-container' });
        listContainer.style.maxHeight = '400px';
        listContainer.style.overflowY = 'auto';
        listContainer.style.marginBottom = '20px';
        listContainer.style.paddingRight = '10px';

        let newCount = 0;

        this.bookmarks.forEach(bookmark => {
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
            const title = bookmark.text ? bookmark.text.substring(0, 80) + '...' : 'No text';
            textDiv.createEl('strong', { text: `${bookmark.name} (${bookmark.username})` });
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

        const importBtn = btnContainer.createEl('button', { text: `Import Selected (${newCount})` });
        importBtn.style.backgroundColor = 'var(--interactive-accent)';
        importBtn.style.color = 'var(--text-on-accent)';
        importBtn.onclick = async () => {
            const toImport = this.bookmarks.filter(b => this.selectedIds.has(b.id));
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
    currentUrl: string = 'https://twitter.com/i/bookmarks';

    constructor(leaf: WorkspaceLeaf, plugin: XBookmarksSync) {
        super(leaf);
        this.plugin = plugin;
        this.webview = null;
    }

    getViewType() { return VIEW_TYPE; }
    getDisplayText() { return "X Bookmarks"; }
    getIcon() { return "twitter"; }

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

        toolbar.createEl('span', { text: 'Scroll to load, then click ->', cls: 'text-muted' });
        
        const btnGroup = toolbar.createDiv();
        btnGroup.style.display = 'flex';
        btnGroup.style.gap = '10px';

        this.copyBtn = btnGroup.createEl('button', { text: 'Copy as MD' });
        this.copyBtn.style.backgroundColor = 'var(--interactive-accent)';
        this.copyBtn.style.color = 'var(--text-on-accent)';
        this.copyBtn.style.display = 'none';
        this.copyBtn.onclick = async () => {
            await this.copyAsMarkdown();
        };

        this.extractBtn = btnGroup.createEl('button', { text: 'Extract Bookmarks' });
        this.extractBtn.style.backgroundColor = 'var(--interactive-accent)';
        this.extractBtn.style.color = 'var(--text-on-accent)';
        this.extractBtn.onclick = async () => {
            if (this.currentUrl.includes('/bookmarks')) {
                await this.extractBookmarks();
            } else {
                this.loadUrl('https://twitter.com/i/bookmarks');
            }
        };

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
    }

    updateToolbar() {
        if (this.currentUrl.includes('/bookmarks')) {
            this.extractBtn.innerText = 'Extract Bookmarks';
            this.copyBtn.style.display = 'none';
        } else {
            this.extractBtn.innerText = 'Back to Bookmarks';
            this.copyBtn.style.display = 'block';
        }
    }

    async copyAsMarkdown() {
        if (!this.webview) return;
        new Notice('Extracting content with Defuddle...');
        
        try {
            const html = await this.webview.executeJavaScript('document.documentElement.outerHTML');
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

    async extractBookmarks() {
        if (!this.webview) return;
        new Notice('Extracting bookmarks from current view...');
        
        const script = `
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

        try {
            const result = await this.webview.executeJavaScript(script);
            if (result && result.success) {
                const bookmarks = result.data;
                if (bookmarks && bookmarks.length > 0) {
                    new BookmarkSelectionModal(this.app, this.plugin, bookmarks).open();
                } else {
                    new Notice('No bookmarks found. Make sure you are on the bookmarks page and tweets are loaded.');
                }
            } else {
                console.error('Scraping error from webview:', result.error);
                new Notice('Failed to extract bookmarks: ' + result.error);
            }
        } catch (err) {
            console.error('Script execution error:', err);
            new Notice('Failed to execute scraping script.');
        }
    }
}

export default class XBookmarksSync extends Plugin {
    async onload() {
        this.registerView(VIEW_TYPE, (leaf) => new XBookmarksView(leaf, this));

        this.addRibbonIcon('twitter', 'Open X Bookmarks', () => {
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
        const date = new Date().toISOString().split('T')[0];
        const author = (tweet.name || 'Unknown').replace(/[\\/:"*?<>|]/g, '').trim();
        let title = (tweet.text || 'Bookmark').split('\n')[0].substring(0, 40);
        title = title.replace(/[\\/:"*?<>|]/g, '').trim();
        if (!title) title = 'Bookmark';
        
        return `x-bookmarks/X-${date}-${author}-${title}.md`;
    }

    isTweetImported(tweet: any): boolean {
        const oldFileName = `x-bookmarks/Tweet-${tweet.id}.md`;
        const newFileName = this.getFileName(tweet);
        return !!this.app.vault.getAbstractFileByPath(oldFileName) || 
               !!this.app.vault.getAbstractFileByPath(newFileName);
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
