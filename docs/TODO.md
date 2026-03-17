# X Bookmarks Sync — Feature Backlog

## Planned

- [ ] **Re-sync deleted notes**
  If a bookmark note is deleted from the vault, allow it to be re-imported on the next sync.
  Currently `importedIds` is the authoritative deduplication store and persists independently of vault files, so deleting a note has no effect — the bookmark is still considered imported.
  Fix: in `isTweetImported`, if the ID is in `importedIds` but the corresponding vault file no longer exists, treat it as not imported so it gets re-synced.
