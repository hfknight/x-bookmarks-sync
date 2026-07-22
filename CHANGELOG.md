# Changelog

## 1.3.3

- **Bookmarks are listed in the order you saved them** — the import list could show older bookmarks first. That also meant **First N** picked an arbitrary N rather than the newest N, so working through a backlog in batches could revisit some bookmarks and skip others. The list now follows X's own bookmark order.

## 1.3.2

- **Bookmarks missed by an earlier sync are now found** — if a sync ever stopped short of the end of your list, "Sync from last" would keep stopping at that same point and report "no new bookmarks", quietly hiding everything below it. Syncs now confirm they actually reached the end of your bookmark list, and fall back to a full scan whenever they can't. **Your first sync after this update will be a full scan** — that's deliberate, and it's what recovers anything an earlier sync left behind.
- **Import a large backlog in batches** — the selection list now has **All**, **None**, and **First N** buttons. Set a number, import that batch, then click **Extract bookmarks** again for the next one; "Sync from last" stays off until you've worked through everything, then re-enables itself.
- **A shorter selection list, and quicker syncs** — bookmarks already in your vault are no longer listed in the import dialog, and no longer re-processed during a sync.
- **Import button is disabled when nothing is selected** — instead of being clickable and then telling you there was nothing to import.

## 1.3.1

- **"Open in Obsidian Webview" links now land on the right tweet** — clicking a note's Obsidian Webview link (or any `obsidian://x-bookmarks` link) while the X bookmarks panel was open but hidden in the sidebar could open your bookmarks list instead of the tweet. It now navigates straight to the tweet.

## 1.3.0

- **Scan animation while syncing** — capturing your bookmarks now shows a live scanning overlay with a running count and a **Cancel** button, instead of visibly scrolling the page, so it's clear the sync is working. It uses your theme's accent color.
- **Steadier syncs** — improved how a sync starts so it more reliably uses the fast, complete capture path before falling back.

## 1.2.0

- **More reliable, complete sync** — bookmark capture now reads your list directly and in order instead of scrolling the page and collecting whatever happens to load. This removes the occasional missed bookmarks on re-sync and ensures long tweets always import their full text. If the direct method is ever unavailable, it automatically falls back to the previous scroll-based capture.
- **Faster syncing** — capturing your bookmarks is now considerably quicker, especially for large collections.

## 1.1.12

- **Choose your note filename format** — a new "Note name format" setting lets you pick how imported notes are named: Date – author – title (default), Author – title, Date – title, or Title – author. Long or non-Latin titles now stay within filesystem limits, and same-named imports no longer collide.
- **Publish date in frontmatter** — each note records the tweet's original post date as a `published` date property (sortable, and usable in Dataview).
- **Fresh reload on re-sync** — re-running a sync now reloads the bookmarks page instead of reusing the already-open one.

## 1.1.11

- **Bookmarked X articles get a readable note title** — a native X article shared as a post is now named after the article's title, instead of a filename built from the raw article URL.
- **"Import X article body" titles the note** — the note's heading becomes the article title (matching the renamed file), instead of "Tweet by …".
- **No duplicate cover image** — importing an article's body no longer shows the article's cover image twice (once in the tweet section and again inside the imported article).
- **Sturdier note frontmatter** — tweet metadata containing a backslash or quote no longer risks producing a malformed note header.

## 1.1.10

- **Quoted tweets are folded into the note** — when you bookmark a tweet that quotes another, the quoted tweet (author, text, photos, and video) now appears inline under a "Quoted tweet" heading, instead of being saved as a separate, orphaned note.
- **"▶ Video" is now a clickable link** — it opens the tweet's video viewer on X directly, instead of sitting as plain text beside the thumbnail.
- **Shortened links show their real destination** — `t.co` links in a tweet's body are expanded to the actual URL (for example, the author's site), and the redundant media link is removed.

## 1.1.9

- **Video thumbnails now import reliably** — bookmarks with a video or GIF (including a video inside a quoted tweet) now consistently import their thumbnail, fixing cases in 1.1.8 where some imported with no thumbnail at all.
- **Removing a bookmark respects your deletion preference** — the remove / "Re-import on next sync" action now follows your Obsidian "Deleted files" setting (system trash, Obsidian trash, or permanent) instead of always moving the note to system trash.

## 1.1.8

- **Videos now appear in imported notes** — bookmarks containing a video or GIF now import with the video's thumbnail (marked ▶ Video) that you can click to open and watch on X, instead of importing with no media at all.

## 1.1.7

- **Long tweets no longer import with their text cut off** — when X serves only a shortened "Show more" preview of a long tweet during sync, the plugin now pulls the full text from the tweet's own page so the complete body is saved.

## 1.1.6

- **Links in imported tweets no longer break across lines** — a shortened link in a tweet is now saved as a single clickable URL instead of being split into several lines.

## 1.1.5

- **Imported articles keep their full title** — importing an X article body now adds the complete article title as a heading at the top of the "Full article" section, so the full title is preserved in the note even when the filename is shortened to 40 characters.

## 1.1.4

- **Re-import now reliably finds the bookmark** — re-importing a single bookmark queues a one-shot full scan on the next sync so it's found even when buried deep in your timeline.
- **Ribbon icon jumps to bookmarks** — clicking the ribbon icon while the webview shows a tweet now navigates to your bookmarks list so you can extract.
- **Clearer extraction progress** — shows a "Finalizing" phase while verifying completion, and the selection modal opens noticeably faster for large bookmark sets.
- **Donate** — support development via Buy Me a Coffee.

## 1.1.3

- Existing users now see the What's new modal on their first upgrade after the modal landed (1.1.2 reached them silently).

## 1.1.2

- **What's new modal** — see a summary of changes after the plugin updates.

## 1.1.1

- Security patches.

## 1.1.0

- **Import X article body** — pull the full body of a bookmarked X long-form article into its note and rename the file to the article title. Right-click in the note, command palette, or toolbar button while viewing the article.
- **Long tweets imported in full** — premium long-form posts (`note_tweet`) are no longer truncated at the visible "Show more" cutoff.
- **Images embedded** — photo attachments on bookmarked tweets now appear in the note as Markdown image links to the X CDN.
- **Re-import a single bookmark** — refresh one note's content on the next sync without clearing your entire import history.
- **Toolbar restructured** — new **Import article** button on `/status/` and `/article/` pages; **Copy main content** (replaces "Copy as Markdown") now strips replies and thread context.
