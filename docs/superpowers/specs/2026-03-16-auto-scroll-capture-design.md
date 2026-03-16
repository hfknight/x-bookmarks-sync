# Auto-Scroll Bookmark Capture — Design Spec

**Date:** 2026-03-16
**Status:** Draft

## Problem

The current "Extract Bookmarks" button only captures tweets visible in the DOM at click time. X uses virtual scrolling, so tweets scroll out of the DOM as the user scrolls down — earlier bookmarks are lost. Users must manually scroll and click repeatedly to capture bookmarks in batches.

## Goal

When the user clicks "Extract Bookmarks", the plugin automatically scrolls through the entire bookmarks page, accumulates all tweets, then opens the selection modal with the full list.

## Architecture

### New class fields on `XBookmarksView`

Add these declarations alongside the existing `webview`, `extractBtn`, `copyBtn`, `closeBtn` fields:

- `hintSpan: HTMLElement` — stored reference to the toolbar hint `<span>`
- `isScrolling: boolean` — initialized to `false`; `true` during auto-scroll
- `collectedBookmarks: Map<string, any>` — accumulates tweet objects keyed by `tweet.id`; reset to an empty Map at the start of each `autoScrollAndExtract()` call

Note: `this.currentUrl` is an **existing** class property, already maintained by `did-navigate` / `did-navigate-in-page` events.

### `onOpen()` changes

Two changes to `onOpen()`:

1. **Store the hint span**: change the discarded `createEl` call to assign the reference:
   ```ts
   // Before:
   toolbar.createEl('span', { text: 'Scroll to load, then click ->', cls: 'text-muted' });
   // After:
   this.hintSpan = toolbar.createEl('span', { cls: 'text-muted' });
   ```
   The initial text is set by calling `updateToolbar()` (see below), not hardcoded here.

2. **Remove the hardcoded `extractBtn.onclick` block** currently in `onOpen()` and add a call to `updateToolbar()` as the very last line of `onOpen()`, after `webviewContainer.appendChild(this.webview)`. This ordering guarantees `this.hintSpan` is already assigned before `updateToolbar()` first executes. `updateToolbar()` now wires all toolbar state including `onclick`.

### Extraction script helper

The tweet extraction script (currently inlined in `extractBookmarks()`) is extracted into a private method `getExtractionScript(): string` that returns the script string. This avoids duplicating it across the pre-loop capture and each loop iteration.

### `updateToolbar()` — full new body

Replaces the current implementation entirely. It is the canonical source of truth for normal toolbar state:

```ts
updateToolbar() {
  if (!this.hintSpan) return;  // guard against calls before onOpen() completes
  if (this.isScrolling) return; // don't clobber scrolling state

  if (this.currentUrl.includes('/bookmarks')) {
    this.hintSpan.setText('Click to auto-scroll and capture all bookmarks');
    this.extractBtn.innerText = 'Extract Bookmarks';
    this.extractBtn.onclick = async () => { await this.autoScrollAndExtract(); };
    this.copyBtn.style.display = 'none';
  } else {
    this.hintSpan.setText('');
    this.extractBtn.innerText = 'Back to Bookmarks';
    this.extractBtn.onclick = () => { this.loadUrl('https://twitter.com/i/bookmarks'); };
    this.copyBtn.style.display = 'block';
  }
}
```

Called: at the end of `onOpen()` setup, on `did-navigate` / `did-navigate-in-page` events, and after every auto-scroll exit path.

Note: domain inconsistency (`x.com` vs `twitter.com`) in `loadUrl()` is pre-existing, out of scope.

### `setScrollingToolbar(count: number)` — new private method

```ts
private setScrollingToolbar(count: number) {
  this.hintSpan.setText(`Loading bookmarks... ${count} found`);
  this.extractBtn.innerText = 'Cancel';
  this.extractBtn.onclick = () => { this.isScrolling = false; };
}
```

Cancel is asynchronous — see Cancel Behaviour.

### Method changes

- `extractBookmarks()` is **deleted** and replaced by `autoScrollAndExtract()`

## Auto-Scroll Loop

`autoScrollAndExtract()` is an `async` method. The entire body is wrapped in a `try/catch`. On any uncaught error: `await this.cleanup()`, set `this.isScrolling = false`, call `this.updateToolbar()`, show `new Notice('Error during bookmark capture.')`, return.

### Guards at entry

```ts
if (!this.webview) return;
if (this.isScrolling) return;
```

### Polling helper

```ts
private async pollFlag(): Promise<boolean> {
  const start = Date.now();
  while (Date.now() - start < 3000) {
    await new Promise(resolve => setTimeout(resolve, 100));
    try {
      const val = await this.webview.executeJavaScript('window.__newTweetsAppeared');
      if (val) return true;
    } catch {
      return false; // webview destroyed or navigated — treat as no new tweets
    }
  }
  return false;
}
```

`pollFlag()`'s return value is **intentionally discarded** at call sites — it is called only to wait for DOM changes or for the 3s timeout. The actual new-tweet count is determined independently in step (f) by comparing Map insertions.

### Setup (before loop)

1. Set `this.isScrolling = true`, reset `this.collectedBookmarks = new Map()`, initialize `noNewCount = 0`, `iterationCount = 0`
2. Call `setScrollingToolbar(0)`
3. Reset flag: `await this.webview.executeJavaScript('window.__newTweetsAppeared = false')`. `cleanup()` intentionally does not reset this flag — this setup step is the authoritative reset, ensuring a clean slate regardless of how the previous run ended.
4. **Pre-loop capture**: call `getExtractionScript()`, run via `executeJavaScript`. For each result tweet: `this.collectedBookmarks.set(tweet.id, tweet)`. If result is `{ success: false }`, treat as zero tweets and continue — do not abort. The first loop iteration re-runs the script; Map deduplication silently drops already-seen IDs.
5. Inject the MutationObserver, guarded by `window.__xbsObserverInstalled`:
   ```js
   if (!window.__xbsObserverInstalled) {
     window.__xbsObserverInstalled = true;
     const observer = new MutationObserver((mutations) => {
       for (const m of mutations) {
         for (const node of m.addedNodes) {
           if (node.nodeType === 1 &&
               (node.matches('article[data-testid="tweet"]') ||
                node.querySelector('article[data-testid="tweet"]'))) {
             window.__newTweetsAppeared = true;
           }
         }
       }
     });
     observer.observe(document.body, { childList: true, subtree: true });
     window.__xbsObserver = observer;
   }
   ```
   **Known risk**: `subtree: true` on `document.body` covers all descendant insertions. Shadow DOM would break this — but `querySelectorAll('article[data-testid="tweet"]')` in the extraction script would also break, so this is an accepted shared risk.

### Loop (each iteration)

Initialize `newThisIteration = 0` at the top of each iteration. Increment `iterationCount`.

a. If `this.isScrolling === false` (user cancelled): `await this.cleanup()`, set `this.isScrolling = false` (already false — stated for clarity), call `this.updateToolbar()`, return without opening modal.
b. If `!this.currentUrl.includes('/bookmarks')`: `await this.cleanup()`, set `this.isScrolling = false`, call `this.updateToolbar()`, show `new Notice('Navigated away — bookmark capture cancelled.')`, return. Detection latency: up to ~3s (same reason as cancel — `pollFlag` may be mid-execution). Accepted tradeoff.
c. Reset flag before scroll: `await this.webview.executeJavaScript('window.__newTweetsAppeared = false')`
d. Scroll to bottom: `await this.webview.executeJavaScript('window.scrollTo(0, document.body.scrollHeight)')`
e. `await this.pollFlag()` — return value discarded (see Polling helper). Called to wait for DOM changes or timeout.
f. Run `getExtractionScript()` via `executeJavaScript`. If result is `{ success: false }`, treat as zero new tweets (increment `noNewCount` via step g). Otherwise, for each result tweet not already in `collectedBookmarks`: `collectedBookmarks.set(tweet.id, tweet)` and increment `newThisIteration`.
g. If `newThisIteration === 0`: increment `noNewCount`; else reset `noNewCount = 0`. Two **consecutive** zero-result iterations trigger exit.
h. Call `setScrollingToolbar(this.collectedBookmarks.size)`.
i. Exit loop if: `noNewCount >= 2` (end of list) **or** `iterationCount >= 500` (safety cap against a feed that never stops producing new tweets).

### After loop

1. `await this.cleanup()`
2. Set `this.isScrolling = false`
3. Call `this.updateToolbar()`
4. If `this.collectedBookmarks.size === 0`: show `new Notice('No bookmarks found.')`, return
5. `new BookmarkSelectionModal(this.app, this.plugin, Array.from(this.collectedBookmarks.values())).open()`

### Cleanup

```ts
private async cleanup() {
  try {
    await this.webview.executeJavaScript(`
      if (window.__xbsObserver) {
        window.__xbsObserver.disconnect();
        window.__xbsObserver = null;
        window.__xbsObserverInstalled = false;
      }
    `);
  } catch {
    // webview may already be gone — silently ignore
  }
}
```

Always `await`-ed. Called on every exit path. Does **not** reset `window.__newTweetsAppeared` — that is handled by setup step 3 at the start of each run.

### Cancel Behaviour

Setting `isScrolling = false` (via Cancel button) is asynchronous: the loop detects it at step (a) of the next iteration, up to ~3s later if `pollFlag` is running. During that window the observer remains installed — intentional, no synchronous cleanup needed.

On cancel: `cleanup()` runs, toolbar resets via `updateToolbar()`, **collected bookmarks are discarded**. Rationale: a partial list silently under-represents the user's bookmarks. A complete capture or nothing is the safer default.

## Tweet Extraction Script

Factored into `getExtractionScript(): string`. Returns the same script currently inlined in `extractBookmarks()` — queries `article[data-testid="tweet"]` nodes and returns `{ success: true, data: [{id, name, username, text, url}] }` or `{ success: false, error: string }`. Data shape is unchanged and matches `BookmarkSelectionModal`'s existing API.

**Known limitation**: The script generates a random fallback ID for tweets without a `/status/` URL. Such tweets will not deduplicate across iterations. Pre-existing behavior, not changed here.

## UI Changes

### Hint span (`this.hintSpan`)

| State | Text |
|---|---|
| Normal (on /bookmarks) | `"Click to auto-scroll and capture all bookmarks"` |
| Not on /bookmarks | `""` (empty) |
| Scrolling | `` `Loading bookmarks... ${count} found` `` |

### Extract button

| State | Label | onclick |
|---|---|---|
| On /bookmarks | `"Extract Bookmarks"` | `autoScrollAndExtract()` |
| Not on /bookmarks | `"Back to Bookmarks"` | `loadUrl('https://twitter.com/i/bookmarks')` |
| Scrolling | `"Cancel"` | sets `isScrolling = false` |

### No new UI elements needed

All changes reuse existing DOM elements. `BookmarkSelectionModal` is unchanged.

## Edge Cases

| Scenario | Behaviour |
|---|---|
| Zero bookmarks found | Notice, toolbar resets |
| Navigated away mid-scroll | Loop step (b) exits, Notice shown. Up to ~3s detection latency (accepted). |
| Already at bottom at start | Pre-loop capture handles visible tweets; 2 no-new iterations exit |
| Called while already running | `isScrolling` guard returns immediately |
| `executeJavaScript` throws | Outer try/catch: `cleanup()`, toolbar resets, Notice shown |
| Stale observer from prior run | `window.__xbsObserverInstalled` guard prevents double-injection |
| User cancels | Async cancel at next step (a); bookmarks discarded (intentional) |
| Very slow X (>3s per page) | `pollFlag` times out; 2 such iterations exit early. Accepted tradeoff. |
| Feed never ends | 500-iteration cap exits the loop |
| `did-navigate` fires during scrolling | `updateToolbar()` returns immediately — no clobber |
| Tweet without status URL | Random fallback ID — no cross-iteration dedup. Pre-existing limitation. |
| Extraction script returns `{ success: false }` | Treated as zero new tweets; `noNewCount` increments normally |

## Out of Scope

- Configurable scroll speed or timeout
- Persisting accumulated bookmarks across plugin reloads
- Opening the modal with partial results on cancel
- Changes to `BookmarkSelectionModal`
- Fixing domain inconsistency (`x.com` vs `twitter.com`) in `loadUrl()`
- Deduplication of tweets with random fallback IDs
