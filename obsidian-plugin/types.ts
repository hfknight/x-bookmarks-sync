export const VIEW_TYPE = 'x-bookmarks-webview';

export interface ArticleCard {
  url: string;
  title: string;
  excerpt: string;
}

export interface Tweet {
  id: string;
  name: string;
  username: string;
  text: string;
  url: string;
  article?: ArticleCard;
  images?: string[];
}

export interface XBookmarksSyncData {
  importedIds: string[];
  defaultFolder: string;
  defaultTags: string[];
  lastSyncAt: string | null;
  lastShownVersion: string | null;
}
