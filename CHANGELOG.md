# Changelog

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
