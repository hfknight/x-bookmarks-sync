import { Plugin, addIcon, Notice } from 'obsidian';
import { VIEW_TYPE, XBookmarksSyncData } from './types';
import { XBookmarksView } from './view';
import { XBookmarksSyncSettingTab } from './settings-tab';

export default class XBookmarksSync extends Plugin {
  importedIds: Set<string> = new Set();
  settings: XBookmarksSyncData = {
    importedIds: [],
    defaultFolder: 'x-bookmarks',
    defaultTags: ['twitter', 'bookmark'],
    lastSyncAt: null,
  };
  pendingOpenUrl: string | null = null;

  async onload() {
    const data = await this.loadData();
    this.settings = {
      importedIds: data?.importedIds ?? [],
      defaultFolder: data?.defaultFolder ?? 'x-bookmarks',
      defaultTags: data?.defaultTags ?? ['twitter', 'bookmark'],
      lastSyncAt: data?.lastSyncAt ?? null,
    };
    this.importedIds = new Set(this.settings.importedIds);

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

    this.addSettingTab(new XBookmarksSyncSettingTab(this.app, this));
  }

  onunload() {
    this.app.workspace.detachLeavesOfType(VIEW_TYPE);
  }

  async saveSettings() {
    try {
      await this.saveData({
        ...this.settings,
        importedIds: Array.from(this.importedIds),
      });
    } catch (e) {
      new Notice('X Bookmarks Sync: failed to save settings.');
    }
  }

  async openUrlInWebview(url: string) {
    const existingLeaves = this.app.workspace.getLeavesOfType(VIEW_TYPE);
    if (existingLeaves.length > 0) {
      // View already open — navigate directly, no race possible
      await this.activateView();
      (existingLeaves[0].view as XBookmarksView).loadUrl(url);
    } else {
      // View not open — set pendingOpenUrl so onOpen() initializes to the right URL
      this.pendingOpenUrl = url;
      await this.activateView();
      this.pendingOpenUrl = null;
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

    return `${this.settings.defaultFolder}/${date}-${author}-${title}.md`;
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
    const targetFolder = this.settings.defaultFolder;
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
    this.settings.lastSyncAt = new Date().toISOString();
    await this.saveSettings();
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
tags: [${this.settings.defaultTags.join(', ')}]
---

# Tweet by ${tweet.name} (${tweet.username})

${tweet.text}

[View on X](${tweet.url}) | [Open in Obsidian Webview](obsidian://x-bookmarks?url=${encodeURIComponent(tweet.url)})
`;
  }
}
