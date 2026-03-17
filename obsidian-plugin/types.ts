export const VIEW_TYPE = 'x-bookmarks-webview';

export interface XBookmarksSyncData {
  importedIds: string[];
  defaultFolder: string;
  defaultTags: string[];
  lastSyncAt: string | null;
}
