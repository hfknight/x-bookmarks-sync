# Auto-Scroll Bookmark Capture Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the one-shot "Extract Bookmarks" button with an auto-scroll loop that scrolls the entire X bookmarks page, accumulates all tweets, then opens the selection modal.

**Architecture:** All changes are in `XBookmarksView` inside `obsidian-plugin/main.ts`. New class fields track scroll state. A MutationObserver injected into the webview signals when new tweets arrive; a polling helper waits for that signal after each scroll. `updateToolbar()` is the single source of truth for normal toolbar state and gains an `isScrolling` guard.

**Tech Stack:** TypeScript, Obsidian plugin API (`HTMLElement.setText`, `ItemView`, `Notice`), Electron webview `executeJavaScript`.

---

## Chunk 1: Class fields, `getExtractionScript()`, `updateToolbar()`, `onOpen()` refactor

### Task 1: Add new class fields

**Files:**
- Modify: `obsidian-plugin/main.ts:116-128` (class declaration block of `XBookmarksView`)

- [ ] **Step 1.1: Add three new field declarations**

  In `XBookmarksView`, alongside the existing `webview`, `extractBtn`, `copyBtn`, `closeBtn` declarations (lines 119–122), add:

  ```ts
  hintSpan: HTMLElement;
  isScrolling: boolean = false;
  collectedBookmarks: Map<string, any> = new Map();
  ```

- [ ] **Step 1.2: Typecheck**

  ```bash
  npm run typecheck
  ```

  Expected: no errors (new fields are just declarations).

---

### Task 2: Extract `getExtractionScript()` helper

**Files:**
- Modify: `obsidian-plugin/main.ts` — add method to `XBookmarksView`, extract script from `extractBookmarks()`

The script is the large IIFE currently on lines 269–305 of `extractBookmarks()`. Extract it into its own method so it can be called from both the pre-loop capture and each loop iteration without duplication.

- [ ] **Step 2.1: Add `getExtractionScript()` method**

  Add this private method to `XBookmarksView` (place it just before `extractBookmarks()`):

  ```ts
  private getExtractionScript(): string {
    return `
      (function() {
          try {
              const tweets = document.querySelectorAll('article[data-testid="tweet"]');
              const results = [];
              tweets.forEach(tweet => {
                  try {
                      const textEl = tweet.querySelector('[data-testid="tweetText"]');
                      const text = textEl ? textEl.innerText : '';

                      const userEl = tweet.querySelector('[data-testid="User-Name"]');
                      const userText = userEl ? userEl.innerText : '';
                      const userParts = userText.split('\\n');
                      const name = userParts[0] || 'Unknown';
                      const username = userParts[1] || 'unknown';

                      const linkEl = Array.from(tweet.querySelectorAll('a')).find(a => {
                          const href = typeof a.href === 'string' ? a.href : (a.getAttribute ? a.getAttribute('href') : '');
                          return href && href.includes('/status/');
                      });
                      const url = linkEl ? (typeof linkEl.href === 'string' ? linkEl.href : linkEl.getAttribute('href')) : '';
                      const idMatch = url ? url.match(/status\\/(\\d+)/) : null;
                      const id = idMatch ? idMatch[1] : Date.now().toString() + Math.random().toString().slice(2,5);

                      if (text || url) {
                          results.push({ id: String(id), name: String(name), username: String(username), text: String(text), url: String(url) });
                      }
                  } catch (e) {
                      // ignore individual tweet errors
                  }
              });
              return { success: true, data: results };
          } catch (e) {
              return { success: false, error: e.toString() };
          }
      })();
    `;
  }
  ```

- [ ] **Step 2.2: Update `extractBookmarks()` to use `getExtractionScript()`**

  In `extractBookmarks()`, replace the `const script = \`...\`` block (lines 269–305) with:

  ```ts
  const script = this.getExtractionScript();
  ```

- [ ] **Step 2.3: Typecheck**

  ```bash
  npm run typecheck
  ```

  Expected: no errors. `extractBookmarks()` still works identically.

- [ ] **Step 2.4: Build to verify no regressions**

  ```bash
  npm run build:plugin
  ```

  Expected: build succeeds.

---

### Task 3: Rewrite `updateToolbar()` and refactor `onOpen()`

**Files:**
- Modify: `obsidian-plugin/main.ts` — `updateToolbar()` body, `onOpen()` body

- [ ] **Step 3.1: Store `hintSpan` reference in `onOpen()`**

  In `onOpen()`, find:
  ```ts
  toolbar.createEl('span', {
    text: 'Scroll to load, then click ->',
    cls: 'text-muted'
  });
  ```
  Replace with:
  ```ts
  this.hintSpan = toolbar.createEl('span', { cls: 'text-muted' });
  ```
  The text will be set by `updateToolbar()` in a later step.

- [ ] **Step 3.2: Remove hardcoded `extractBtn.onclick` from `onOpen()`**

  In `onOpen()`, find and delete this block:
  ```ts
  this.extractBtn.onclick = async () => {
    if (this.currentUrl.includes('/bookmarks')) {
      await this.extractBookmarks();
    } else {
      this.loadUrl('https://twitter.com/i/bookmarks');
    }
  };
  ```

- [ ] **Step 3.3: Add `updateToolbar()` call at end of `onOpen()`**

  Add `this.updateToolbar();` as the very last line of `onOpen()`, after `webviewContainer.appendChild(this.webview)`.

- [ ] **Step 3.4: Replace `updateToolbar()` body**

  Replace the entire current `updateToolbar()` method body with:

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

  Note: `autoScrollAndExtract()` doesn't exist yet — TypeScript will error until Task 5. That's fine; we'll typecheck after adding it.

- [ ] **Step 3.5: Build (expect a TS error for missing `autoScrollAndExtract`)**

  ```bash
  npm run build:plugin 2>&1 | grep -E "error|warning"
  ```

  Expected: one error about `autoScrollAndExtract` not existing. All other lines clean.

---

## Chunk 2: Helper methods and main loop

### Task 4: Add `setScrollingToolbar()`, `pollFlag()`, `cleanup()`

**Files:**
- Modify: `obsidian-plugin/main.ts` — add three private methods to `XBookmarksView`

Place all three methods together, just before `extractBookmarks()`.

- [ ] **Step 4.1: Add `setScrollingToolbar()`**

  ```ts
  private setScrollingToolbar(count: number) {
    this.hintSpan.setText(`Loading bookmarks... ${count} found`);
    this.extractBtn.innerText = 'Cancel';
    this.extractBtn.onclick = () => { this.isScrolling = false; };
  }
  ```

- [ ] **Step 4.2: Add `pollFlag()`**

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

  Note: `pollFlag()`'s return value is intentionally discarded at call sites — it is called only to wait for DOM changes or the 3s timeout. The actual new-tweet count is determined independently by comparing Map insertions.

- [ ] **Step 4.3: Add `cleanup()`**

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

- [ ] **Step 4.4: Typecheck**

  ```bash
  npm run typecheck
  ```

  Expected: still one error for missing `autoScrollAndExtract`. No new errors.

---

### Task 5: Add `autoScrollAndExtract()` and delete `extractBookmarks()`

**Files:**
- Modify: `obsidian-plugin/main.ts` — add `autoScrollAndExtract()`, delete `extractBookmarks()`

Add `autoScrollAndExtract()` just before `extractBookmarks()`, then delete `extractBookmarks()`.

- [ ] **Step 5.1: Add `autoScrollAndExtract()`**

  ```ts
  async autoScrollAndExtract() {
    if (!this.webview) return;
    if (this.isScrolling) return;

    try {
      // Setup
      this.isScrolling = true;
      this.collectedBookmarks = new Map();
      let noNewCount = 0;
      let iterationCount = 0;

      this.setScrollingToolbar(0);

      // Reset observer flag — authoritative reset for this run
      await this.webview.executeJavaScript('window.__newTweetsAppeared = false');

      // Pre-loop capture: grab tweets already visible in viewport
      const preResult = await this.webview.executeJavaScript(this.getExtractionScript());
      if (preResult && preResult.success && preResult.data) {
        for (const tweet of preResult.data) {
          this.collectedBookmarks.set(tweet.id, tweet);
        }
      }

      // Inject MutationObserver (guarded against double-injection)
      await this.webview.executeJavaScript(`
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
      `);

      // Scroll loop
      while (true) {
        let newThisIteration = 0;
        iterationCount++;

        // Check cancel
        if (!this.isScrolling) {
          await this.cleanup();
          this.isScrolling = false;
          this.updateToolbar();
          return;
        }

        // Check navigation away
        if (!this.currentUrl.includes('/bookmarks')) {
          await this.cleanup();
          this.isScrolling = false;
          this.updateToolbar();
          new Notice('Navigated away — bookmark capture cancelled.');
          return;
        }

        // Reset flag before scroll so observer detects only new changes
        await this.webview.executeJavaScript('window.__newTweetsAppeared = false');

        // Scroll to bottom
        await this.webview.executeJavaScript('window.scrollTo(0, document.body.scrollHeight)');

        // Wait for new tweets or timeout (return value intentionally discarded)
        await this.pollFlag();

        // Capture current tweets, merge new ones
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

        // Update consecutive-zero counter
        if (newThisIteration === 0) {
          noNewCount++;
        } else {
          noNewCount = 0;
        }

        // Update live count in toolbar
        this.setScrollingToolbar(this.collectedBookmarks.size);

        // Exit conditions
        if (noNewCount >= 2 || iterationCount >= 500) {
          break;
        }
      }

      // After loop
      await this.cleanup();
      this.isScrolling = false;
      this.updateToolbar();

      if (this.collectedBookmarks.size === 0) {
        new Notice('No bookmarks found.');
        return;
      }

      new BookmarkSelectionModal(
        this.app,
        this.plugin,
        Array.from(this.collectedBookmarks.values())
      ).open();

    } catch (err) {
      console.error('autoScrollAndExtract error:', err);
      await this.cleanup();
      this.isScrolling = false;
      this.updateToolbar();
      new Notice('Error during bookmark capture.');
    }
  }
  ```

- [ ] **Step 5.2: Delete `extractBookmarks()`**

  Remove the entire `extractBookmarks()` method. It has been fully replaced by `autoScrollAndExtract()` + `getExtractionScript()`.

- [ ] **Step 5.3: Typecheck — expect clean**

  ```bash
  npm run typecheck
  ```

  Expected: zero errors. `updateToolbar()` now references `autoScrollAndExtract()` which exists.

- [ ] **Step 5.4: Build**

  ```bash
  npm run build:plugin
  ```

  Expected: build succeeds with no errors.

- [ ] **Step 5.5: Commit**

  ```bash
  git add obsidian-plugin/main.ts
  git commit -m "feat: auto-scroll and capture all bookmarks on extract"
  ```

---

## Chunk 3: Deploy and smoke test

### Task 6: Deploy to local vault and manually verify

- [ ] **Step 6.1: Deploy**

  ```bash
  npm run deploy:local
  ```

  Expected: `main.js` and `manifest.json` copied to `/Users/fei.hu/Dropbox/Obsidian Notes/.obsidian/plugins/x-bookmarks-sync/`.

- [ ] **Step 6.2: Reload plugin in Obsidian**

  In Obsidian: open Settings → Community plugins → disable then re-enable "X Bookmarks Sync". Or use the "Reload app without saving" command.

- [ ] **Step 6.3: Verify normal toolbar state**

  Open the X Bookmarks panel (ribbon icon or command palette "Open X Bookmarks View"). Verify:
  - Hint span reads: `"Click to auto-scroll and capture all bookmarks"`
  - Button reads: `"Extract Bookmarks"`

- [ ] **Step 6.4: Verify Back to Bookmarks state**

  Click a tweet link to navigate away from `/bookmarks`. Verify:
  - Button reads: `"Back to Bookmarks"`
  - Hint span is empty
  - Clicking the button navigates back to bookmarks page

- [ ] **Step 6.5: Verify auto-scroll works**

  Navigate to `/bookmarks`. Click "Extract Bookmarks". Verify:
  - Button changes to `"Cancel"`
  - Hint span shows `"Loading bookmarks... N found"` and count increases as it scrolls
  - Page scrolls automatically
  - When finished, selection modal opens with all collected bookmarks

- [ ] **Step 6.6: Verify cancel**

  Start extraction, then click "Cancel". Verify:
  - Toolbar resets (button back to "Extract Bookmarks", hint restored)
  - No modal opens
  - Can click "Extract Bookmarks" again without issues

- [ ] **Step 6.7: Commit smoke test confirmation**

  If all checks pass:

  ```bash
  git add obsidian-plugin/main.ts
  git commit -m "chore: verify auto-scroll capture smoke test"
  ```

  (Only if there were any last-minute tweaks. If step 5.5 commit was clean, no new commit needed.)
