import { Plugin, addIcon, Notice, TFolder } from 'obsidian';
import { VIEW_TYPE, XBookmarksSyncData, Tweet } from './types';
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

    addIcon('x-bookmarks-sync', `<path d="M 50 16.67 A 33.33 33.33 0 0 1 73.75 73.75 M 73.75 52.92 V 73.75 H 94.58" stroke="currentColor" stroke-width="8.33" stroke-linecap="round" stroke-linejoin="round" fill="none"/><path d="M 50 83.33 A 33.33 33.33 0 0 1 26.25 26.25 M 26.25 47.08 V 26.25 H 5.42" stroke="currentColor" stroke-width="8.33" stroke-linecap="round" stroke-linejoin="round" fill="none"/><path d="M 60.42 33.75 H 65.83 L 53.75 47.5 L 67.92 66.25 H 57.08 L 48.75 55 L 38.33 66.25 H 32.92 L 45.42 51.67 L 32.08 33.75 H 42.92 L 50.42 44.17 Z" fill="currentColor" stroke="none"/>`);

    this.registerView(VIEW_TYPE, (leaf) => new XBookmarksView(leaf, this));

    this.addRibbonIcon('x-bookmarks-sync', 'Open X bookmarks', () => {
      void this.activateView();
    });

    this.addCommand({
      id: 'open-x-bookmarks',
      name: 'Open X bookmarks view',
      callback: () => {
        void this.activateView();
      }
    });

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
    const existingLeaves = this.app.workspace.getLeavesOfType(VIEW_TYPE);
    if (existingLeaves.length > 0) {
      // View already open — navigate directly, no race possible
      await this.activateView();
      (existingLeaves[0].view as XBookmarksView).loadUrl(url);
    } else {
      // View not open — set pendingOpenUrl so onOpen() initializes to the right URL
      this.pendingOpenUrl = url;
      await this.activateView();
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
      await workspace.revealLeaf(leaf);
    }
  }

  getFileName(tweet: Tweet): string {
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

  isTweetImported(tweet: Tweet): boolean {
    if (this.importedIds.has(tweet.id)) return true;
    // Fallback: check file paths for bookmarks imported before the ID set existed
    const oldFileName = `x-bookmarks/Tweet-${tweet.id}.md`;
    const newFileName = this.getFileName(tweet);
    return (
      !!this.app.vault.getAbstractFileByPath(oldFileName) ||
      !!this.app.vault.getAbstractFileByPath(newFileName)
    );
  }

  async saveBookmarksToVault(bookmarks: Tweet[]) {
    const targetFolder = this.settings.defaultFolder;
    const folder = this.app.vault.getAbstractFileByPath(targetFolder);
    if (!(folder instanceof TFolder)) {
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

  formatTweet(tweet: Tweet) {
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
