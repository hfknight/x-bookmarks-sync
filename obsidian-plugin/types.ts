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
  // Poster-frame image URLs for video / animated_gif media (captured from the API,
  // rendered as a clickable thumbnail that links out to the tweet).
  videoPosters?: string[];
  // DOM showed a "Show more" affordance for this tweet — its extracted text is X's
  // truncated timeline preview, not the full body. Used to drive the recovery backstop.
  truncated?: boolean;
}

export interface XBookmarksSyncData {
  importedIds: string[];
  defaultFolder: string;
  defaultTags: string[];
  lastSyncAt: string | null;
  lastShownVersion: string | null;
  forceFullScanOnNextSync: boolean;
}
