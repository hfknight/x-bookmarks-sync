# Changelog

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
