# Incremental Sync Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Stop the bookmark scroll loop early when all visible tweets are already imported, controlled by a "Sync from last" checkbox in the toolbar.

**Architecture:** Add `incrementalMode` + `syncFromLastLabel` class fields to `XBookmarksView`. Wire the checkbox to `updateToolbar()` for hint text and visibility. In `autoScrollAndExtract()`, track `allImportedCount` (consecutive DOM snapshots where every tweet is already in `importedIds`) and break after 3. Reset `incrementalMode` to `true` on any non-cancelled completion.

**Tech Stack:** TypeScript, Obsidian API (`ItemView`, `Plugin`), Electron webview. No test framework — verification is via `npm run build:plugin` + `npm run deploy:local` + manual Obsidian reload.

**Spec:** `docs/superpowers/specs/2026-03-17-incremental-sync-design.md`

---

## Chunk 1: UI — Checkbox field, element, toolbar wiring

### Task 1: Add class fields to `XBookmarksView`

**Files:**
- Modify: `obsidian-plugin/main.ts:116-132` (class field declarations)

- [ ] **Step 1: Add `incrementalMode` and `syncFromLastLabel` fields**

In `XBookmarksView`, after the existing `cancelRequested` and `collectedBookmarks` field declarations (around line 125–126), add:

```typescript
incrementalMode: boolean = true;
syncFromLastLabel: HTMLElement | null = null;
syncFromLastCheckbox: HTMLInputElement | null = null;
```

The full field block should now read:

```typescript
isScrolling: boolean = false;
cancelRequested: boolean = false;
collectedBookmarks: Map<string, any> = new Map();
incrementalMode: boolean = true;
syncFromLastLabel: HTMLElement | null = null;
syncFromLastCheckbox: HTMLInputElement | null = null;
```

- [ ] **Step 2: Verify build is clean**

```bash
cd /Users/fei.hu/Fei.Codes/obsidian-plugins/x-bookmarks-sync && npm run build:plugin
```

Expected: no TypeScript errors, `main.js` emitted.

- [ ] **Step 3: Commit**

```bash
git add obsidian-plugin/main.ts
git commit -m "feat: add incrementalMode and checkbox ref fields to XBookmarksView"
```

---

### Task 2: Create the "Sync from last" checkbox element in `onOpen()`

**Files:**
- Modify: `obsidian-plugin/main.ts` — `onOpen()` method, inside the toolbar button group

- [ ] **Step 1: Insert checkbox label into `btnGroup`, before `extractBtn`**

In `onOpen()`, find the block that creates `this.copyBtn` and `this.extractBtn` inside `btnGroup`. Insert the checkbox label between them. The section currently reads:

```typescript
this.copyBtn = btnGroup.createEl('button', { text: 'Copy as MD', cls: 'mod-cta' });
this.copyBtn.style.display = 'none';
this.copyBtn.onclick = async () => {
  await this.copyAsMarkdown();
};

this.extractBtn = btnGroup.createEl('button', {
```

Replace with:

```typescript
this.copyBtn = btnGroup.createEl('button', { text: 'Copy as MD', cls: 'mod-cta' });
this.copyBtn.style.display = 'none';
this.copyBtn.onclick = async () => {
  await this.copyAsMarkdown();
};

this.syncFromLastLabel = btnGroup.createEl('label');
this.syncFromLastLabel.style.display = 'flex';
this.syncFromLastLabel.style.alignItems = 'center';
this.syncFromLastLabel.style.gap = '4px';
this.syncFromLastLabel.style.fontSize = '0.9em';
this.syncFromLastLabel.style.cursor = 'pointer';
this.syncFromLastCheckbox = this.syncFromLastLabel.createEl('input', { type: 'checkbox' });
this.syncFromLastCheckbox.checked = true;
this.syncFromLastCheckbox.onchange = () => {
  this.incrementalMode = this.syncFromLastCheckbox!.checked;
  this.updateToolbar();
};
this.syncFromLastLabel.createSpan({ text: 'Sync from last' });

this.extractBtn = btnGroup.createEl('button', {
```

- [ ] **Step 2: Verify build is clean**

```bash
npm run build:plugin
```

Expected: no TypeScript errors.

- [ ] **Step 3: Commit**

```bash
git add obsidian-plugin/main.ts
git commit -m "feat: add Sync from last checkbox to toolbar"
```

---

### Task 3: Wire checkbox visibility and hint text into `updateToolbar()` and `setScrollingToolbar()`

**Files:**
- Modify: `obsidian-plugin/main.ts` — `updateToolbar()` and `setScrollingToolbar()` methods

- [ ] **Step 1: Update `updateToolbar()` to show/hide checkbox and set hint text**

The current `updateToolbar()` body reads:

```typescript
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

Replace with:

```typescript
updateToolbar() {
  if (!this.hintSpan) return;  // guard against calls before onOpen() completes
  if (this.isScrolling) return; // don't clobber scrolling state

  if (this.currentUrl.includes('/bookmarks')) {
    const hint = this.incrementalMode
      ? 'Will stop when reaching already-imported bookmarks'
      : 'Will scroll through all bookmarks';
    this.hintSpan.setText(hint);
    this.extractBtn.innerText = 'Extract Bookmarks';
    this.extractBtn.onclick = async () => { await this.autoScrollAndExtract(); };
    this.copyBtn.style.display = 'none';
    if (this.syncFromLastLabel) this.syncFromLastLabel.style.display = 'flex';
  } else {
    this.hintSpan.setText('');
    this.extractBtn.innerText = 'Back to Bookmarks';
    this.extractBtn.onclick = () => { this.loadUrl('https://twitter.com/i/bookmarks'); };
    this.copyBtn.style.display = 'block';
    if (this.syncFromLastLabel) this.syncFromLastLabel.style.display = 'none';
  }
}
```

- [ ] **Step 2: Hide checkbox during scrolling in `setScrollingToolbar()`**

Current `setScrollingToolbar()`:

```typescript
private setScrollingToolbar(count: number) {
  if (!this.hintSpan) return;
  this.hintSpan.setText(`Loading bookmarks... ${count} found`);
  this.extractBtn.innerText = 'Cancel';
  this.extractBtn.onclick = () => { this.cancelRequested = true; };
}
```

Replace with:

```typescript
private setScrollingToolbar(count: number) {
  if (!this.hintSpan) return;
  this.hintSpan.setText(`Loading bookmarks... ${count} found`);
  this.extractBtn.innerText = 'Cancel';
  this.extractBtn.onclick = () => { this.cancelRequested = true; };
  if (this.syncFromLastLabel) this.syncFromLastLabel.style.display = 'none';
}
```

- [ ] **Step 3: Verify build is clean**

```bash
npm run build:plugin
```

Expected: no TypeScript errors.

- [ ] **Step 4: Deploy and manually verify UI**

```bash
npm run deploy:local
```

Then in Obsidian: reload the plugin (disable/enable or restart). Open the X Bookmarks view. Verify:
- Checkbox "Sync from last" appears checked, left of "Extract Bookmarks"
- Hint text reads "Will stop when reaching already-imported bookmarks"
- Unchecking changes hint to "Will scroll through all bookmarks"
- Clicking "Extract Bookmarks" starts scrolling and checkbox disappears (replaced by Cancel state)

Note: cancel-restore behaviour is verified in Task 5 once the reset logic is in place.

- [ ] **Step 5: Commit**

```bash
git add obsidian-plugin/main.ts
git commit -m "feat: wire Sync from last checkbox to toolbar visibility and hint text"
```

---

## Chunk 2: Logic — `allImportedCount` stop condition

### Task 4: Add incremental stop logic to `autoScrollAndExtract()`

**Files:**
- Modify: `obsidian-plugin/main.ts` — `autoScrollAndExtract()` method

**Context on the scroll loop:** The loop has three capture phases per iteration: (1) observer result (cumulative session set — not point-in-time), (2) API intercept result (cumulative session set — not point-in-time), (3) DOM extraction (`result` variable — point-in-time snapshot of what's visible). The incremental check uses **only phase 3** because it's the only per-iteration signal.

- [ ] **Step 1: Capture `incrementalMode` at the start of `autoScrollAndExtract()` and initialize `allImportedCount` after the pre-loop capture**

Find the `// Setup` block at the start of `autoScrollAndExtract()`:

```typescript
// Setup
this.isScrolling = true;
this.cancelRequested = false;
this.collectedBookmarks = new Map();
let noNewCount = 0;
let iterationCount = 0;
```

Replace with:

```typescript
// Setup
this.isScrolling = true;
this.cancelRequested = false;
this.collectedBookmarks = new Map();
let noNewCount = 0;
let iterationCount = 0;
const incrementalMode = this.incrementalMode;
```

Then find the comment and code block after the pre-loop capture (around the line `// Scroll loop`):

```typescript
// Scroll loop
while (true) {
```

Insert `allImportedCount` initialization immediately before the while loop:

```typescript
// allImportedCount: consecutive scroll iterations where all DOM-visible tweets are already imported.
// Only used in incremental mode. Pre-loop capture excluded (it's not a scroll result).
let allImportedCount = 0;

// Scroll loop
while (true) {
```

- [ ] **Step 2: Verify build is clean**

```bash
npm run build:plugin
```

Expected: no TypeScript errors.

- [ ] **Step 3: Add the incremental stop check after the DOM extraction fallback block**

In the scroll loop, find the DOM extraction fallback block and the comment that follows it:

```typescript
// Fallback: DOM extraction catches tweets without a /status/ URL (no stable id)
// and any that the observer may have missed
const result = await this.webview.executeJavaScript(this.getExtractionScript());
if (result && result.success && result.data) {
  for (const tweet of result.data) {
    if (!this.collectedBookmarks.has(tweet.id)) {
      this.collectedBookmarks.set(tweet.id, tweet);
      newThisIteration++;
    }
  }
}
// { success: false } treated as zero new tweets — noNewCount increments normally
```

Replace with:

```typescript
// Fallback: DOM extraction catches tweets without a /status/ URL (no stable id)
// and any that the observer may have missed
const result = await this.webview.executeJavaScript(this.getExtractionScript());
if (result && result.success && result.data) {
  for (const tweet of result.data) {
    if (!this.collectedBookmarks.has(tweet.id)) {
      this.collectedBookmarks.set(tweet.id, tweet);
      newThisIteration++;
    }
  }
}
// { success: false } treated as zero new tweets — noNewCount increments normally

// Incremental stop: check if all DOM-visible tweets are already imported.
// Uses DOM extraction (point-in-time) — not the cumulative observer/API sets.
// Empty or failed DOM result is inconclusive — allImportedCount is left unchanged (not reset).
if (incrementalMode && result && result.success && result.data && result.data.length > 0) {
  const allAlreadyImported = (result.data as any[]).every(
    (t) => this.plugin.importedIds.has(t.id)
  );
  if (allAlreadyImported) {
    allImportedCount++;
  } else {
    allImportedCount = 0;
  }
  if (allImportedCount >= 3) {
    break; // waterline reached — stop scrolling
  }
}
```

- [ ] **Step 4: Verify build is clean**

```bash
npm run build:plugin
```

Expected: no TypeScript errors.

- [ ] **Step 5: Commit**

```bash
git add obsidian-plugin/main.ts
git commit -m "feat: add allImportedCount incremental stop condition to scroll loop"
```

---

### Task 5: Reset `incrementalMode` after non-cancelled completion

**Files:**
- Modify: `obsidian-plugin/main.ts` — `autoScrollAndExtract()`, after-loop section

- [ ] **Step 1: Reset `incrementalMode` and checkbox on non-cancel exit**

Find the after-loop block (outside the `while` loop, before the modal open):

```typescript
// After loop
await this.cleanup();
this.isScrolling = false;
this.updateToolbar();

if (this.collectedBookmarks.size === 0) {
```

Replace with:

```typescript
// After loop
await this.cleanup();
this.isScrolling = false;
// Reset to incremental mode after any completed extraction (cancel paths exit early via return)
this.incrementalMode = true;
if (this.syncFromLastCheckbox) this.syncFromLastCheckbox.checked = true;
this.updateToolbar();

if (this.collectedBookmarks.size === 0) {
```

- [ ] **Step 2: Verify build is clean**

```bash
npm run build:plugin
```

Expected: no TypeScript errors.

- [ ] **Step 3: Deploy and manually verify full end-to-end behaviour**

```bash
npm run deploy:local
```

Reload Obsidian plugin. Test scenarios:

**Scenario A — Incremental stop (most important):**
1. Run a full sync first to populate `importedIds` with many bookmarks
2. Uncheck "Sync from last" (full sync) — verify scroll runs to completion
3. After full sync completes — verify checkbox auto-resets to checked
4. Click "Extract Bookmarks" again with checkbox checked — verify it stops much earlier (hint: watch the "Loading bookmarks... N found" counter stop growing sooner than a full sync)

**Scenario B — First ever sync (no importedIds):**
1. Clear plugin data (Settings → Community Plugins → X Bookmarks Sync → gear icon if available, or manually delete `data.json` from the plugin folder)
2. Run with "Sync from last" checked — should scroll to completion (no `importedIds` to match against)

**Scenario C — Cancel does not reset checkbox:**
1. Uncheck "Sync from last"
2. Start extraction, immediately cancel
3. Verify checkbox is still unchecked after cancel

- [ ] **Step 4: Commit**

```bash
git add obsidian-plugin/main.ts
git commit -m "feat: reset incrementalMode to true after non-cancelled extraction completes"
```
