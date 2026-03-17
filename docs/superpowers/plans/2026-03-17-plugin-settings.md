# Plugin Settings Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a PluginSettingTab to X Bookmarks Sync with configurable default folder, tag chips, and last-sync timestamp display.

**Architecture:** All changes live in `obsidian-plugin/main.ts`. A new `XBookmarksSyncSettingTab` class handles the settings UI. The plugin's persisted data object is extended with `defaultFolder`, `defaultTags`, and `lastSyncAt`; a `saveSettings()` helper centralises all persistence calls; and `getFileName`, `formatTweet`, and `saveBookmarksToVault` are updated to read from `this.settings` instead of hardcoded strings.

**Tech Stack:** TypeScript, Obsidian API (`PluginSettingTab`, `Setting`, `Notice`), esbuild bundler.

**Build & verify command:** `npm run build:plugin` — runs TypeScript type-check then esbuild. Must exit cleanly after every task.
**Deploy command:** `npm run deploy:local` — build + copy to local Obsidian vault.

---

## Chunk 1: Data Model, Migration, and saveSettings

### Task 1: Add interface and settings property to plugin class

**Files:**
- Modify: `obsidian-plugin/main.ts` — add `XBookmarksSyncData` interface and `settings` property

- [ ] **Step 1: Add the data interface above the plugin class**

Find the line `export default class XBookmarksSync extends Plugin {` and insert this interface immediately above it:

```typescript
interface XBookmarksSyncData {
  importedIds: string[];
  defaultFolder: string;
  defaultTags: string[];
  lastSyncAt: string | null;
}
```

- [ ] **Step 2: Add `settings` property to `XBookmarksSync`**

Inside `XBookmarksSync`, the existing properties are:
```typescript
importedIds: Set<string> = new Set();
pendingOpenUrl: string | null = null;
```

Add `settings` after `importedIds`:
```typescript
importedIds: Set<string> = new Set();
settings: XBookmarksSyncData = {
  importedIds: [],
  defaultFolder: 'x-bookmarks',
  defaultTags: ['twitter', 'bookmark'],
  lastSyncAt: null,
};
pendingOpenUrl: string | null = null;
```

- [ ] **Step 3: Build to verify no type errors**

```bash
npm run build:plugin
```
Expected: clean build, no errors.

- [ ] **Step 4: Commit**

```bash
git add obsidian-plugin/main.ts
git commit -m "feat: add XBookmarksSyncData interface and settings property"
```

---

### Task 2: Migrate onload to populate settings from persisted data

**Files:**
- Modify: `obsidian-plugin/main.ts` — update `onload` to merge persisted data into `this.settings`

- [ ] **Step 1: Replace the existing onload data-loading block**

Current code in `onload` (approximately lines 764–767):
```typescript
async onload() {
  const data = await this.loadData();
  if (data?.importedIds) {
    this.importedIds = new Set(data.importedIds);
  }
```

Replace with:
```typescript
async onload() {
  const data = await this.loadData();
  this.settings = {
    importedIds: data?.importedIds ?? [],
    defaultFolder: data?.defaultFolder ?? 'x-bookmarks',
    defaultTags: data?.defaultTags ?? ['twitter', 'bookmark'],
    lastSyncAt: data?.lastSyncAt ?? null,
  };
  this.importedIds = new Set(this.settings.importedIds);
```

- [ ] **Step 2: Build to verify**

```bash
npm run build:plugin
```
Expected: clean build.

- [ ] **Step 3: Commit**

```bash
git add obsidian-plugin/main.ts
git commit -m "feat: migrate onload to populate settings from persisted data with defaults"
```

---

### Task 3: Add saveSettings helper and replace saveData call sites

**Files:**
- Modify: `obsidian-plugin/main.ts` — add `saveSettings()`, update `saveBookmarksToVault`

- [ ] **Step 1: Add `saveSettings` method to `XBookmarksSync`**

Add this method after `onunload`:
```typescript
async saveSettings() {
  try {
    await this.saveData({
      ...this.settings,
      importedIds: Array.from(this.importedIds),
    });
  } catch (e) {
    new Notice('X Bookmarks Sync: failed to save settings.');
  }
}
```

- [ ] **Step 2: Replace the existing saveData call in `saveBookmarksToVault`**

Current code (near end of `saveBookmarksToVault`):
```typescript
await this.saveData({ importedIds: Array.from(this.importedIds) });
new Notice(`Successfully saved ${count} new bookmarks!`);
```

Replace with:
```typescript
await this.saveSettings();
new Notice(`Successfully saved ${count} new bookmarks!`);
```

- [ ] **Step 3: Build to verify**

```bash
npm run build:plugin
```
Expected: clean build.

- [ ] **Step 4: Commit**

```bash
git add obsidian-plugin/main.ts
git commit -m "feat: add saveSettings helper; replace saveData call sites"
```

---

## Chunk 2: Wire Settings into Plugin Logic

### Task 4: Use defaultFolder in getFileName and saveBookmarksToVault

**Files:**
- Modify: `obsidian-plugin/main.ts` — `getFileName`, `saveBookmarksToVault`

- [ ] **Step 1: Update `getFileName` to use `this.settings.defaultFolder`**

Current last line of `getFileName`:
```typescript
return `x-bookmarks/${date}-${author}-${title}.md`;
```

Replace with:
```typescript
return `${this.settings.defaultFolder}/${date}-${author}-${title}.md`;
```

- [ ] **Step 2: Update `saveBookmarksToVault` to use `this.settings.defaultFolder`**

Current code at top of `saveBookmarksToVault`:
```typescript
const targetFolder = 'x-bookmarks';
let folder = this.app.vault.getAbstractFileByPath(targetFolder);
if (!folder) {
  await this.app.vault.createFolder(targetFolder);
}
```

Replace with:
```typescript
const targetFolder = this.settings.defaultFolder;
let folder = this.app.vault.getAbstractFileByPath(targetFolder);
if (!folder) {
  await this.app.vault.createFolder(targetFolder);
}
```

- [ ] **Step 3: Build to verify**

```bash
npm run build:plugin
```
Expected: clean build.

- [ ] **Step 4: Commit**

```bash
git add obsidian-plugin/main.ts
git commit -m "feat: use settings.defaultFolder in getFileName and saveBookmarksToVault"
```

---

### Task 5: Use defaultTags in formatTweet; set lastSyncAt after successful import

**Files:**
- Modify: `obsidian-plugin/main.ts` — `formatTweet`, `saveBookmarksToVault`

- [ ] **Step 1: Update `formatTweet` to use `this.settings.defaultTags`**

`formatTweet` is a method on `XBookmarksSync`. Current frontmatter tags line:
```typescript
tags: [twitter, bookmark]
```
(Inside the template literal returned by `formatTweet`.)

Replace that line in the template literal with a dynamic value. Find the `return` statement in `formatTweet` and update the tags line:

```typescript
// Before:
tags: [twitter, bookmark]

// After — replace with this expression inside the template literal:
tags: [${this.settings.defaultTags.join(', ')}]
```

So the full frontmatter block becomes:
```typescript
return `---
id: ${safeId}
author: ${safeAuthor}
username: ${safeUsername}
scraped_date: ${date}
url: ${safeUrl}
tags: [${this.settings.defaultTags.join(', ')}]
---
...
```

Note: when `defaultTags` is empty, this produces `tags: []` — correct per spec.

- [ ] **Step 2: Set `lastSyncAt` after the bookmark loop completes successfully**

In `saveBookmarksToVault`, the `saveSettings()` call (added in Task 3) is just before the success Notice. Add the `lastSyncAt` update immediately before that call:

```typescript
// Before saveSettings():
this.settings.lastSyncAt = new Date().toISOString();
await this.saveSettings();
new Notice(`Successfully saved ${count} new bookmarks!`);
```

Important: this line must be **after** the `for` loop and **not** inside the `if (!fileExists)` block — it runs once, at the end, regardless of how many notes were created.

- [ ] **Step 3: Build to verify**

```bash
npm run build:plugin
```
Expected: clean build.

- [ ] **Step 4: Commit**

```bash
git add obsidian-plugin/main.ts
git commit -m "feat: use settings.defaultTags in formatTweet; record lastSyncAt on successful import"
```

---

## Chunk 3: XBookmarksSyncSettingTab

### Task 6: Add the SettingTab class skeleton and register it

**Files:**
- Modify: `obsidian-plugin/main.ts` — add `XBookmarksSyncSettingTab` class, register in `onload`

- [ ] **Step 1: Add the import for `PluginSettingTab` and `Setting`**

The first line of `main.ts` imports from `'obsidian'`. Add `PluginSettingTab` and `Setting` to that import:

```typescript
import { Plugin, ItemView, WorkspaceLeaf, Notice, Modal, App, addIcon, setIcon, PluginSettingTab, Setting } from 'obsidian';
```

- [ ] **Step 2: Add the `XBookmarksSyncSettingTab` class**

Add it immediately before `export default class XBookmarksSync`. The `display()` method will be filled in the next task — add a stub for now:

```typescript
class XBookmarksSyncSettingTab extends PluginSettingTab {
  plugin: XBookmarksSync;

  constructor(app: App, plugin: XBookmarksSync) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const { containerEl } = this;
    containerEl.empty();
    containerEl.createEl('h2', { text: 'X Bookmarks Sync' });
    // settings will be added here
  }
}
```

- [ ] **Step 3: Register the setting tab in `onload`**

At the end of `onload`, after `this.addCommand(...)` and before the closing brace, add:

```typescript
this.addSettingTab(new XBookmarksSyncSettingTab(this.app, this));
```

- [ ] **Step 4: Build to verify**

```bash
npm run build:plugin
```
Expected: clean build.

- [ ] **Step 5: Commit**

```bash
git add obsidian-plugin/main.ts
git commit -m "feat: add XBookmarksSyncSettingTab skeleton and register in onload"
```

---

### Task 7: Add Default Folder setting

**Files:**
- Modify: `obsidian-plugin/main.ts` — implement folder setting in `display()`

- [ ] **Step 1: Add the Default Folder setting inside `display()`**

Replace `// settings will be added here` with:

```typescript
new Setting(containerEl)
  .setName('Default folder')
  .setDesc('Vault folder where bookmark notes are saved.')
  .addText(text => text
    .setPlaceholder('x-bookmarks')
    .setValue(this.plugin.settings.defaultFolder)
    .onChange(async (value) => {
      const trimmed = value.trim().replace(/^\/+|\/+$/g, '');
      if (!trimmed) {
        this.plugin.settings.defaultFolder = 'x-bookmarks';
        text.setValue('x-bookmarks');
      } else {
        this.plugin.settings.defaultFolder = trimmed;
      }
      await this.plugin.saveSettings();
    }));
```

- [ ] **Step 2: Build to verify**

```bash
npm run build:plugin
```
Expected: clean build.

- [ ] **Step 3: Deploy and manually verify**

```bash
npm run deploy:local
```

Open Obsidian → Settings → X Bookmarks Sync. Verify:
- "Default folder" field shows `x-bookmarks` initially.
- Changing to `my-bookmarks` and closing settings persists the value (reopen settings to confirm).
- Clearing the field reverts to `x-bookmarks`.

- [ ] **Step 4: Commit**

```bash
git add obsidian-plugin/main.ts
git commit -m "feat: add Default Folder setting with validation"
```

---

### Task 8: Add Default Tags chip widget

**Files:**
- Modify: `obsidian-plugin/main.ts` — implement tag chip UI in `display()`

- [ ] **Step 1: Add the Default Tags setting after the folder setting**

```typescript
// Default Tags
const tagSetting = new Setting(containerEl)
  .setName('Default tags')
  .setDesc('Tags applied to every imported bookmark note.');

// Remove Obsidian's default control area content so we can own it fully
tagSetting.controlEl.empty();

const chipsContainer = tagSetting.controlEl.createDiv();
chipsContainer.style.display = 'flex';
chipsContainer.style.flexWrap = 'wrap';
chipsContainer.style.gap = '6px';
chipsContainer.style.alignItems = 'center';
chipsContainer.style.marginTop = '4px';

const renderChips = () => {
  chipsContainer.empty();

  for (const tag of this.plugin.settings.defaultTags) {
    const chip = chipsContainer.createEl('span');
    chip.style.display = 'inline-flex';
    chip.style.alignItems = 'center';
    chip.style.gap = '4px';
    chip.style.padding = '2px 8px';
    chip.style.borderRadius = '12px';
    chip.style.border = '1px solid var(--background-modifier-border)';
    chip.style.fontSize = '0.85em';
    chip.style.backgroundColor = 'var(--background-secondary)';
    chip.style.color = 'var(--text-normal)';
    chip.createSpan({ text: tag });

    const removeBtn = chip.createEl('button', { text: '×' });
    removeBtn.style.background = 'none';
    removeBtn.style.border = 'none';
    removeBtn.style.cursor = 'pointer';
    removeBtn.style.padding = '0';
    removeBtn.style.lineHeight = '1';
    removeBtn.style.color = 'var(--text-muted)';
    removeBtn.onclick = async () => {
      this.plugin.settings.defaultTags = this.plugin.settings.defaultTags.filter(t => t !== tag);
      await this.plugin.saveSettings();
      renderChips();
    };

    chipsContainer.appendChild(chip);
  }

  // Input row
  const inputRow = chipsContainer.createDiv();
  inputRow.style.display = 'flex';
  inputRow.style.alignItems = 'center';
  inputRow.style.gap = '6px';
  inputRow.style.marginTop = '6px';
  inputRow.style.width = '100%';

  const tagInput = inputRow.createEl('input', { type: 'text' });
  tagInput.placeholder = 'Add tag…';
  tagInput.style.border = '1px solid var(--background-modifier-border)';
  tagInput.style.borderRadius = '4px';
  tagInput.style.padding = '2px 6px';
  tagInput.style.fontSize = '0.85em';
  tagInput.style.background = 'var(--background-primary)';
  tagInput.style.color = 'var(--text-normal)';
  tagInput.style.width = '120px';

  const hint = inputRow.createEl('span', { text: 'Press Enter to add' });
  hint.style.color = 'var(--text-muted)';
  hint.style.fontSize = '0.8em';

  tagInput.addEventListener('keydown', async (e) => {
    if (e.key !== 'Enter') return;
    e.preventDefault();
    const val = tagInput.value.trim().toLowerCase();
    if (!val) return;
    if (this.plugin.settings.defaultTags.includes(val)) {
      tagInput.value = '';
      return;
    }
    this.plugin.settings.defaultTags.push(val);
    await this.plugin.saveSettings();
    tagInput.value = '';
    renderChips();
  });
};

renderChips();
```

- [ ] **Step 2: Build to verify**

```bash
npm run build:plugin
```
Expected: clean build.

- [ ] **Step 3: Deploy and manually verify**

```bash
npm run deploy:local
```

Open Obsidian → Settings → X Bookmarks Sync. Verify:
- Default tags show as chips: `twitter` and `bookmark`.
- Typing `reading-list` + Enter adds a new chip.
- Clicking `×` on a chip removes it.
- Typing a duplicate tag (e.g. `twitter`) and pressing Enter clears the input without adding a chip.
- Closing and reopening settings reflects saved state.

- [ ] **Step 4: Commit**

```bash
git add obsidian-plugin/main.ts
git commit -m "feat: add Default Tags chip widget to settings tab"
```

---

### Task 9: Add Last Sync setting

**Files:**
- Modify: `obsidian-plugin/main.ts` — add read-only last sync display in `display()`

- [ ] **Step 1: Add the Last Sync setting after the tags setting**

```typescript
const lastSync = this.plugin.settings.lastSyncAt
  ? new Date(this.plugin.settings.lastSyncAt).toLocaleString()
  : 'Never synced yet';

new Setting(containerEl)
  .setName('Last sync')
  .setDesc(lastSync);
```

- [ ] **Step 2: Build to verify**

```bash
npm run build:plugin
```
Expected: clean build.

- [ ] **Step 3: Deploy and manually verify**

```bash
npm run deploy:local
```

Open Obsidian → Settings → X Bookmarks Sync. Verify:
- Before any import: shows "Never synced yet".
- After running an import: close and reopen settings; shows a human-readable date/time.

- [ ] **Step 4: Commit**

```bash
git add obsidian-plugin/main.ts
git commit -m "feat: add Last Sync read-only display to settings tab"
```

---

### Task 10: Final end-to-end verification and push

- [ ] **Step 1: Full build and deploy**

```bash
npm run deploy:local
```

- [ ] **Step 2: End-to-end checklist in Obsidian**

- [ ] Open Settings → X Bookmarks Sync — all three settings visible.
- [ ] Change default folder to `tweets`, run an import, verify notes appear in `tweets/` folder.
- [ ] Change default tags to just `reading`, run an import, verify note frontmatter has `tags: [reading]`.
- [ ] Clear all tags, run an import, verify frontmatter has `tags: []`.
- [ ] Last sync shows current date/time after import.
- [ ] Reload Obsidian (Cmd+R), reopen settings — all values persisted.
- [ ] Existing imported note IDs still detected as already-imported (dedup still works after folder change).

- [ ] **Step 3: Push**

```bash
git push origin main
```
