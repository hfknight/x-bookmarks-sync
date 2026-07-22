export const VIEW_TYPE = 'x-bookmarks-webview';

export interface ArticleCard {
  url: string;
  title: string;
  excerpt: string;
}

export interface QuotedTweet {
  name: string;
  username: string;
  text: string;
  url: string;
  images?: string[];
  videoPosters?: string[];
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
  // DOM showed a video/GIF player for this tweet. When set but videoPosters is empty,
  // the API interceptor missed the poster frame — drives the poster recovery backstop.
  hasVideo?: boolean;
  // An embedded quoted tweet, folded into the parent note. Populated by the syndication
  // recovery pass; the quote is never imported as its own bookmark.
  quoted?: QuotedTweet;
  // DOM/interceptor saw an embedded quoted tweet — drives the quote recovery pass
  // (parallel to hasVideo). High-recall flag; syndication is the authority on whether
  // a quote actually exists.
  hasQuote?: boolean;
  // Real title of a native X article shared as a post (its tweet text is just the article link).
  // Resolved from syndication so the note filename is meaningful instead of the raw article URL.
  articleTitle?: string;
}

export type FileNameFormat = 'date-author-title' | 'author-title' | 'date-title' | 'title-author';

export interface XBookmarksSyncData {
  importedIds: string[];
  defaultFolder: string;
  defaultTags: string[];
  fileNameFormat: FileNameFormat;
  lastSyncAt: string | null;
  lastShownVersion: string | null;
  forceFullScanOnNextSync: boolean;
  // Did the last capture prove it reached the end of the bookmarks list (X returned a page with
  // zero tweet entries)? The "Sync from last" waterline stops at the first fully-imported page,
  // which is only sound if everything below it was actually scanned — so the shortcut is gated on
  // this. False after any run that stopped without seeing the end, forcing one full scan to
  // re-establish the baseline. Internal bookkeeping; not exposed in the settings panel.
  coverageProven: boolean;
  // Last value used by the selection modal's "First N" button. Remembered because working through
  // a large backlog means repeating the same batch size many times. Internal; the modal input is
  // the only place it's set, so there's no settings-panel entry to disagree with.
  selectBatchSize: number;
  // The "Sync from last" checkbox, remembered. Set by the user ticking it, and by an import: taking
  // everything offered turns it on, leaving bookmarks behind turns it off, because the shortcut
  // would stop at exactly that leftover backlog and hide it. Persisted because the toolbar is
  // rebuilt on every view open, so otherwise a reload mid-backlog silently re-enables the shortcut.
  syncFromLast: boolean;
}
