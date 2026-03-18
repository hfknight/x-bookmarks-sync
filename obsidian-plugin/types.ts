export const VIEW_TYPE = 'x-bookmarks-webview';

export interface Tweet {
  id: string;
  name: string;
  username: string;
  text: string;
  url: string;
}

export interface XBookmarksSyncData {
  importedIds: string[];
  defaultFolder: string;
  defaultTags: string[];
  lastSyncAt: string | null;
}
