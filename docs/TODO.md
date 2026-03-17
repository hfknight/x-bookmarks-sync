# X Bookmarks Sync — Feature Backlog

## Planned

- [ ] **Fix toolbar wrapping on narrow panels**
  The side panel toolbar can wrap text and buttons when the panel is resized narrow. Improve the layout so toolbar elements stay on one line or gracefully adapt without wrapping — likely needs flexible sizing or overflow handling on the toolbar container. The webview height is also hardcoded to `calc(100% - 50px)` which will misalign if the toolbar grows taller.

- [ ] **Add funding URL**
  Add a `fundingUrl` field to `manifest.json` (and `obsidian-plugin/manifest.json`) pointing to a support page (e.g. Buy Me a Coffee, GitHub Sponsors). Also add a funding/support section to `README.md`.

- [ ] **Re-sync deleted notes**
  If a bookmark note is deleted from the vault, allow it to be re-imported on the next sync.
  Currently `importedIds` is the authoritative deduplication store and persists independently of vault files, so deleting a note has no effect — the bookmark is still considered imported.
  Fix: in `isTweetImported`, if the ID is in `importedIds` but the corresponding vault file no longer exists, treat it as not imported so it gets re-synced.
