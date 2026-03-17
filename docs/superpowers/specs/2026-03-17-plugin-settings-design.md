# Plugin Settings — Design Spec

**Date:** 2026-03-17
**Status:** Approved
**Scope:** Add a PluginSettingTab to X Bookmarks Sync with default folder, default tags (chip UI), and last sync timestamp.

---

## Goals

- Let users configure where bookmarks are saved and what tags are applied, without editing code.
- Show when the last sync occurred, directly in the settings tab.
- Replace all hardcoded defaults (`'x-bookmarks'`, `['twitter', 'bookmark']`) with user-controlled values.

## Non-Goals

- Settings UI inside the webview panel or toolbar.
- Per-bookmark tag overrides.
- Sync scheduling or automation.

---

## Data Model

Extend the existing persisted data object. The plugin currently saves only `{ importedIds: string[] }`.

```typescript
interface XBookmarksSyncData {
  importedIds: string[];
  defaultFolder: string;     // default: 'x-bookmarks'
  defaultTags: string[];     // default: ['twitter', 'bookmark']
  lastSyncAt: string | null; // ISO 8601 timestamp, null = never synced
}
```

A `settings` property on the plugin holds the live, validated values. On `onload`, the plugin reads persisted data and merges in defaults for any missing fields (migration path for existing installs).

---

## Architecture

### New: `XBookmarksSyncSettingTab` (class)

Extends Obsidian's `PluginSettingTab`. Registered via `this.addSettingTab(...)` in `onload`.

Three settings rendered in `display()`:

#### 1. Default Folder

- `Setting` with a standard text component.
- Placeholder: `x-bookmarks`
- On change: trim whitespace and leading/trailing slashes, save.
- Validation: if empty after trimming, revert to `'x-bookmarks'`.

#### 2. Default Tags

- `Setting` whose control element contains a custom chip widget (raw DOM, no external library).
- **Chip widget layout:**
  - A `div.xbs-tag-chips` container showing existing tags as chips.
  - Each chip: `<span>tag-name <button>×</button></span>`. Clicking × removes the tag and saves.
  - Below chips: a text input + inline hint ("Press Enter to add").
  - On Enter (non-empty, unique value): trim input, add chip, clear input, save.
  - Tags are stored lowercase, deduplicated.
- No minimum or maximum tag count enforced (zero tags is valid).

#### 3. Last Sync

- `Setting` with a read-only text element (no interactive control).
- Displays: formatted local date/time (`toLocaleString()`) if `lastSyncAt` is set, otherwise `"Never synced yet"`.
- Updated live when the tab re-opens (not auto-refreshed while open).

### Modified: `XBookmarksSync` (plugin class)

**New property:**
```typescript
settings: XBookmarksSyncData;
```

**`onload` changes:**
1. Load raw data with `this.loadData()`.
2. Merge with defaults:
   ```typescript
   this.settings = {
     importedIds: data?.importedIds ?? [],
     defaultFolder: data?.defaultFolder ?? 'x-bookmarks',
     defaultTags: data?.defaultTags ?? ['twitter', 'bookmark'],
     lastSyncAt: data?.lastSyncAt ?? null,
   };
   this.importedIds = new Set(this.settings.importedIds);
   ```
3. Register setting tab: `this.addSettingTab(new XBookmarksSyncSettingTab(this.app, this))`.

**`saveData` helper:**
```typescript
async saveSettings() {
  await this.saveData({
    ...this.settings,
    importedIds: Array.from(this.importedIds),
  });
}
```
All save sites call `this.saveSettings()` instead of `this.saveData(...)` directly.

### Modified: `saveBookmarksToVault`

- Replace hardcoded `'x-bookmarks'` folder with `this.settings.defaultFolder`.
- After saving bookmarks, set `this.settings.lastSyncAt = new Date().toISOString()` and call `this.saveSettings()`.

### Modified: `getFileName`

- Replace hardcoded `'x-bookmarks/'` path prefix with `this.settings.defaultFolder + '/'`.

### Modified: `formatTweet`

- Replace hardcoded `[twitter, bookmark]` tags with `this.settings.defaultTags`.
- If `defaultTags` is empty, omit the `tags:` frontmatter line (or write `tags: []`).

---

## Error Handling

- Invalid folder input (empty after trim): silently revert to `'x-bookmarks'`; update the text field to reflect the revert.
- Duplicate tag input: silently ignore (no error shown, input clears).
- `saveData` failure: surface as an Obsidian `Notice`.

---

## Testing Checklist

- [ ] Existing installs (no `defaultFolder`/`defaultTags`/`lastSyncAt` in data) load with correct defaults.
- [ ] Changing the folder saves correctly and new bookmarks go to the new folder.
- [ ] `getFileName` and `isTweetImported` both use the current `defaultFolder`.
- [ ] Tags appear in saved note frontmatter; empty tags list writes `tags: []`.
- [ ] Adding and removing tag chips persists across settings tab close/reopen.
- [ ] `lastSyncAt` updates after a successful import and displays correctly.
- [ ] Empty folder input reverts to `'x-bookmarks'`.
- [ ] Duplicate tag input is silently ignored.
