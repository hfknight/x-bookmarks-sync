# Case Study: Reliable Bookmark Capture via GraphQL API Interception

## Problem

The X Bookmarks Sync Obsidian plugin was inconsistently capturing bookmarks during the auto-scroll extraction. Across multiple runs the total count varied between 122–132 out of 148 actual bookmarks, and specific tweets (notably one from @BruceBlue) were never captured regardless of how many times extraction was run.

---

## Investigation

### Phase 1 — Scroll and DOM issues

Initial hypothesis: the scroll-to-bottom wasn't working, so some pages weren't loading. Adding scroll geometry diagnostics confirmed scroll was working correctly (`scrollY = bodyH − windowH`). The issue was not scroll.

Second hypothesis: X's virtual DOM list unmounts off-screen tweet articles to save memory, so by the time we extracted from the DOM, early bookmarks had already been removed. This was confirmed: DOM extraction only ever sees the currently-rendered window of tweets.

**Fix attempted:** Added a MutationObserver that captures each tweet article the instant it's added to the DOM (before it can be virtualized away). This improved consistency but count still varied (125–132).

### Phase 2 — Initial page state

The count varied depending on scroll position when the user clicked Extract. If the user had already scrolled down, X's virtual list had already discarded the top bookmarks.

**Fix:** Navigate fresh to `https://x.com/i/bookmarks` at the start of every extraction run, forcing X to restart pagination from bookmark #1. This stabilized the starting point but counts still varied run-to-run due to network timing.

### Phase 3 — API interception (first attempt)

Since the DOM is unreliable, intercepting X's API responses directly would give us the raw data before any virtualization. X's Bookmarks endpoint is a GraphQL API.

First attempt intercepted `window.fetch` — captured 0 tweets. Logging revealed **X uses `XMLHttpRequest`, not `fetch`**, for its internal API calls.

Switched to patching `XMLHttpRequest.prototype.open/send`. Still captured 0. The root cause: the interceptor was installed **1500ms after navigation**, but X's initial bookmark API calls fire immediately on page load. Our patches arrived too late.

### Phase 4 — Moving interception to `dom-ready`

Electron's webview emits a `dom-ready` event equivalent to `DOMContentLoaded` — it fires before X's external JavaScript bundle executes. Moving `XMLHttpRequest.prototype` patching to the `dom-ready` handler ensures our patches are in place before X can store any original method references or make any API calls.

After this change, URL logging confirmed the interceptor was active (XHR URLs were appearing), but `__xbsApiCollected` still showed 0 tweets. Adding load-event counters confirmed the `load` callbacks were firing 10 times per run — so data was arriving, but nothing was being extracted.

### Phase 5 — Response structure mismatch

Captured the first raw Bookmarks GraphQL response and inspected it. Found the breaking change:

**Old structure (what the code expected):**
```json
"user_results": {
  "result": {
    "legacy": { "screen_name": "foo", "name": "Foo Bar" }
  }
}
```

**New structure (what X actually returns):**
```json
"user_results": {
  "result": {
    "core":   { "screen_name": "foo", "name": "Foo Bar" },
    "legacy": { "default_profile": true, "followers_count": 3350, ... }
  }
}
```

X moved `screen_name` and `name` from `result.legacy` to `result.core`. Our traversal function `__xbsFindTweets` checked `user_results.result.legacy.screen_name`, which was now always empty — so no tweet was ever stored.

---

## Root Causes

Two independent bugs, both required for the fix:

| # | Root Cause | Symptom |
|---|-----------|---------|
| 1 | XHR interceptor installed 1500ms after navigation, after X's initial API calls | Interceptor active but missed all initial bookmark pages; only scroll-triggered calls could be caught, and those were also unreliable |
| 2 | `__xbsFindTweets` read `screen_name` from `user_results.result.legacy` but X moved it to `user_results.result.core` | Every Bookmarks response was parsed and traversed, but no tweet was ever written to `__xbsApiCollected` |

---

## Solution

### 1. Install interceptors at `dom-ready`

```typescript
this.webview.addEventListener('dom-ready', () => {
  this.webview.executeJavaScript(`
    if (!window.__xbsIntercepted) {
      window.__xbsIntercepted = true;
      window.__xbsApiCollected = {};
      // patch XMLHttpRequest.prototype.open/send here
      // patch window.fetch here
    }
    void 0;
  `).catch(() => {});
});
```

`dom-ready` fires before X's JavaScript bundle runs. Our prototype patches are in place before X can cache the original `open`/`send` references, ensuring every API call — including the very first bookmark page load — is intercepted.

### 2. Handle both old and new user result shapes

```javascript
var userResult = obj.core.user_results.result;
if (userResult) {
  // Try core first (new API), fall back to legacy (old API)
  var screenName = (userResult.core   && userResult.core.screen_name)
                || (userResult.legacy && userResult.legacy.screen_name);
  var name       = (userResult.core   && userResult.core.name)
                || (userResult.legacy && userResult.legacy.name);
  ...
}
```

### 3. Intercept all `/api/graphql/` responses

Rather than filtering by a URL keyword that could change (e.g. `"bookmark"`), match any GraphQL API response. `__xbsFindTweets` only stores objects that match the tweet shape (`core.user_results` + `rest_id`/`legacy.id_str`), so non-tweet responses are silently ignored.

### 4. Handle `responseType = 'json'`

If X sets `xhr.responseType = 'json'`, accessing `responseText` throws a `DOMException`. Read `xhr.response` (already-parsed object) in that case:

```javascript
var data;
if (xhrSelf.responseType === 'json' || typeof xhrSelf.response === 'object') {
  data = xhrSelf.response;
} else {
  data = JSON.parse(xhrSelf.responseText);
}
```

---

## Result

| Metric | Before | After |
|--------|--------|-------|
| Captured per run | 122–132 (varies) | 148 (stable) |
| Run-to-run consistency | ✗ | ✓ |
| Specific missing tweets (e.g. @BruceBlue) | Never captured | Captured every run |
| Capture method | DOM observer only | API interception (primary) + DOM observer (fallback) |

---

## Key Learnings

1. **Intercept at the earliest possible moment.** `dom-ready` is the right hook for patching `XMLHttpRequest` in an Electron webview — not inside app logic that runs seconds later.

2. **Virtual DOM lists make DOM extraction fundamentally unreliable.** Any list that virtualizes (removes off-screen nodes) will silently drop items. API interception is the correct solution for completeness.

3. **API response shapes change without notice.** X moved user fields between `legacy` and `core` without changing the endpoint URL or operation name. Defensive fallback logic (`a || b`) is more resilient than assuming a fixed shape.

4. **Silent `catch` blocks mask bugs.** The broken `__xbsFindTweets` function was executing successfully — it just found nothing. Adding load-event counters and response sampling was necessary to distinguish "function not running" from "function running but finding nothing."

5. **Diagnostic layering speeds root cause isolation.** Each round added one diagnostic: URL logging → load-event counting → error logging → response sampling. Each layer ruled out one hypothesis and pointed to the next.
