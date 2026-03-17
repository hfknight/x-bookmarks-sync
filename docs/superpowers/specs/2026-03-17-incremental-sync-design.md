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

Add a checkbox labeled **"Sync from last"** to the toolbar, placed inside the button group, left of the Extract button (i.e., between `copyBtn` and `extractBtn` in the DOM order).

The `hintSpan` already shows contextual text and is updated by `updateToolbar()`. Extend `updateToolbar()` to reflect the checkbox state:

- **Checked:** `"Will stop when reaching already-imported bookmarks"`
- **Unchecked:** `"Will scroll through all bookmarks"`

The checkbox is only visible when on the bookmarks URL (same condition as the Extract button). It is hidden when `isScrolling` is true (replaced by the Cancel button state).

**Default state:** checked (incremental mode).

**Auto-reset:** after any non-cancelled extraction completes (both incremental and full mode), the checkbox resets to checked. Cancel does not reset it.

No persistence — this is session-only UI state. A class field `incrementalMode: boolean = true` on `XBookmarksView` holds the current value.

---

### Scroll Loop: Incremental Stop Condition

Add one counter to `autoScrollAndExtract`:

```
allImportedCount: number  // consecutive scrolls where all DOM-visible tweets are already in importedIds
```

**Source of truth for the incremental check: DOM extraction only.**

The observer (`window.__xbsCollected`) and API intercept (`window.__xbsApiCollected`) are cumulative session sets — they grow monotonically and cannot tell us what appeared in a specific scroll step. The DOM extraction (`getExtractionScript()`) is a point-in-time snapshot of whatever is currently visible in X's virtual list — exactly the right signal for "what did this scroll reveal?"

**Each iteration**, after the DOM extraction result is available (the existing `result` variable in the fallback path):

1. If `result.success` and `result.data.length > 0`:
   - Check if **every** tweet in `result.data` is already in `this.plugin.importedIds`
   - If yes: `allImportedCount++`
   - If no: `allImportedCount = 0`
2. If `result.data.length === 0` (empty DOM): do not increment or reset `allImportedCount` (neutral — treat as inconclusive)
3. If `allImportedCount >= 3` and `this.incrementalMode`: break the loop early

**Pre-loop capture is excluded from this check.** The pre-loop DOM extraction runs before scrolling begins and reflects the initial page load; it is not a scroll-result and should not seed `allImportedCount`. Initialize `allImportedCount = 0` after the pre-loop capture.

This logic runs **only when `this.incrementalMode` is true**. In full sync mode, `allImportedCount` is ignored and the existing `noNewCount >= 5` stop condition is used unchanged.

### Why 3 Consecutive Scrolls

A threshold of 3 provides a comfortable buffer:
- X's virtual list can unmount/remount tweets as you scroll, causing a scroll to temporarily yield no new content
- 3 consecutive all-imported DOM snapshots is robust against such transient gaps
- Still stops far earlier than scrolling hundreds of bookmarks

### Note on `__newTweetsAppeared` Flag

The fetch interceptor sets `window.__newTweetsAppeared = true` whenever any GraphQL response is received, even if no tweets were extracted. This means `pollFlag()` may return `true` on API responses that contain no bookmarks. The incremental stop condition operates on tweet IDs from `importedIds` — not on the `__newTweetsAppeared` flag — so this has no effect on correctness.

### What Stays the Same

- `importedIds` persistence — no change
- `BookmarkSelectionModal` — no change (already grays out already-imported tweets)
- All three capture paths (observer, API intercept, DOM fallback) — no change
- `noNewCount >= 5` hard stop — still in place as final safety net for both modes

---

## Data Flow

```
autoScrollAndExtract()
  ├── incrementalMode = this.incrementalMode  (default: true)
  ├── [pre-loop capture — excluded from allImportedCount]
  ├── allImportedCount = 0
  └── scroll loop:
        ├── collect tweets (observer + API + DOM — unchanged)
        ├── merge into collectedBookmarks (unchanged)
        ├── run DOM extraction → result
        ├── if incrementalMode and result.success and result.data.length > 0:
        │     allInImported = result.data.every(t => importedIds.has(t.id))
        │     if allInImported: allImportedCount++
        │     else: allImportedCount = 0
        │     if allImportedCount >= 3: break (early stop)
        └── existing noNewCount logic unchanged (catches genuine end-of-feed)

  after loop (non-cancel exit):
        └── this.incrementalMode = true  (reset checkbox to checked)
```

---

## Edge Cases

| Scenario | Behaviour |
|---|---|
| First-ever sync (no importedIds) | `allImportedCount` never reaches 3 — scrolls to completion normally |
| User bookmarks an old tweet | Appears near top of feed (bookmarked recently) — captured before waterline |
| User deleted a bookmark on X | Gap in known IDs in the DOM window — `allImportedCount` resets, continues scrolling |
| User imported only some bookmarks from a prior session | Sparse `importedIds` — DOM window will show a mix; `allImportedCount` resets on any unimported tweet |
| Full sync selected | `allImportedCount` ignored entirely — existing behaviour unchanged |
| Empty DOM snapshot mid-scroll | `allImportedCount` neither increments nor resets — treated as inconclusive |
| Cancel mid-scroll | Loop exits via cancel path — `incrementalMode` not reset |
