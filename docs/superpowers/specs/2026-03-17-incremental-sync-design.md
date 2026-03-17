# Incremental Sync Design

**Date:** 2026-03-17
**Status:** Approved

## Problem

Every extraction run scrolls through all bookmarks from the top of the feed to the bottom, which is slow and redundant for users who sync regularly. The plugin already tracks `importedIds` (persisted Set of all previously imported tweet IDs), but the scroll loop has no awareness of this — it always runs to completion.

## Goal

Stop the scroll loop early once we've reached already-synced content, without missing bookmarks the user recently added (including old tweets bookmarked recently).

## Key Insight

X displays bookmarks in reverse-chronological order of **when you bookmarked them** (not tweet creation date). This means:
- New bookmarks (including recently-bookmarked old tweets) always appear near the top
- Once the scroll reaches a consistent run of already-imported tweet IDs, we've passed the "new content" waterline

## Design

### UI: "Sync from last" Checkbox

Add a checkbox labeled **"Sync from last"** to the toolbar, left of the Extract button.

- **Default state:** checked (incremental mode)
- **Hint text (checked):** `"Will stop when reaching already-imported bookmarks"`
- **Hint text (unchecked):** `"Will scroll through all bookmarks"`
- **Auto-reset:** after a full sync completes, the checkbox resets to checked. Cancel does not reset it.
- No persistence — this is session-only UI state.

### Scroll Loop: Incremental Stop Condition

Add one counter to `autoScrollAndExtract`:

```
allImportedCount: number  // consecutive scrolls where every tweet found was already in importedIds
```

**Each iteration**, after merging tweets from all three capture paths (observer, API intercept, DOM fallback):

1. Count how many tweets found this iteration are already in `importedIds`
2. If **all** found tweets are already imported (and at least one was found): `allImportedCount++`
3. Otherwise: `allImportedCount = 0`
4. If `allImportedCount >= 3`: break the scroll loop early

This logic runs **only when "Sync from last" is checked**. In full sync mode, `allImportedCount` is ignored and the existing `noNewCount >= 5` stop condition is used unchanged.

### Why 3 Consecutive Scrolls

A threshold of 3 provides a comfortable buffer:
- X's virtual list can unmount/remount tweets as you scroll, causing a scroll to temporarily yield no new content
- 3 consecutive all-imported scrolls is robust against such transient gaps
- Still stops far earlier than scrolling hundreds of bookmarks

### What Stays the Same

- `importedIds` persistence — no change
- `BookmarkSelectionModal` — no change (already grays out already-imported tweets)
- All three capture paths (observer, API intercept, DOM fallback) — no change
- `noNewCount >= 5` hard stop — still in place as final safety net for both modes

## Data Flow

```
autoScrollAndExtract()
  ├── if "Sync from last" checked → incrementalMode = true
  ├── allImportedCount = 0
  └── scroll loop:
        ├── collect tweets (observer + API + DOM)
        ├── merge into collectedBookmarks
        ├── if incrementalMode:
        │     count = tweets found this iteration that are in importedIds
        │     if count == total found this iteration (and total > 0):
        │       allImportedCount++
        │     else:
        │       allImportedCount = 0
        │     if allImportedCount >= 3: break
        └── existing noNewCount logic unchanged
```

## Edge Cases

| Scenario | Behaviour |
|---|---|
| First-ever sync (no importedIds) | `allImportedCount` never increments — scrolls to completion normally |
| User bookmarks an old tweet | Appears near top of feed (bookmarked recently) — captured before waterline |
| User deleted a bookmark on X | Gap in known IDs — `allImportedCount` resets, continues scrolling |
| User imported only some bookmarks from a prior session | Sparse `importedIds` — threshold of 3 prevents premature stop |
| Full sync selected | `allImportedCount` ignored entirely — existing behaviour unchanged |
