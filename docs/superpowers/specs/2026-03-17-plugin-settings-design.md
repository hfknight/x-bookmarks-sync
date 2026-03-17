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
- Clearing or resetting `lastSyncAt` — it persists until overwritten by a new successful sync.

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
- Validation: if empty after trimming, revert to `'x-bookmarks'` and update the text field to reflect the revert.

#### 2. Default Tags

- `Setting` whose control element contains a custom chip widget (raw DOM, no external library).
- Styled with inline styles using Obsidian CSS variables (`--background-modifier-border`, `--text-normal`, etc.) — no separate stylesheet.
- **Chip widget layout:**
  - A `div` container showing existing tags as chips.
  - Each chip: a `span` with the tag name and a `×` button. Clicking `×` removes the tag and saves.
  - Below chips: a text input with placeholder "Add tag…" + hint text "Press Enter to add".
  - On Enter with non-empty input: trim leading/trailing whitespace, lowercase, deduplicate (silent no-op if already exists), add chip, clear input, save.
  - Internal whitespace is preserved as-is (e.g. `"my tag"` is a valid tag stored as `"my tag"`).
- Zero tags is valid — no minimum enforced.

#### 3. Last Sync

- `Setting` with a read-only text element (no interactive control).
- Displays: formatted local date/time (`toLocaleString()`) if `lastSyncAt` is set, otherwise `"Never synced yet"`.
- Reflects the value at the time `display()` is called — not auto-refreshed while the tab is open.

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

**`saveSettings` helper:**
```typescript
async saveSettings() {
  await this.saveData({
    ...this.settings,
    importedIds: Array.from(this.importedIds),
  });
}
```
All save sites call `this.saveSettings()` instead of `this.saveData(...)` directly. On `saveSettings` failure, surface a `Notice`; in-memory state is left as-is (the next save attempt will retry with the current values — no rollback).

### Modified: `saveBookmarksToVault`

- Replace hardcoded `'x-bookmarks'` folder with `this.settings.defaultFolder`.
- Set `this.settings.lastSyncAt = new Date().toISOString()` and call `this.saveSettings()` **only after the full bookmark loop completes without error**. Partial saves (individual notes written before an error) are kept but do not update `lastSyncAt`.

### Modified: `getFileName`

- Replace hardcoded `'x-bookmarks/'` path prefix with `this.settings.defaultFolder + '/'`.

### Modified: `isTweetImported`

- The old hardcoded path `'x-bookmarks/Tweet-${tweet.id}.md'` remains as a permanent backwards-compatibility check — it is never removed, because users may have notes created before the settings feature existed.
- The `getFileName` path (which now uses `defaultFolder`) is also checked, as before.
- The current `defaultFolder` is **not** checked as a third path — if the user changes the folder, previously imported notes under the old folder are not re-imported because `importedIds` (the Set) remains authoritative. The file path check is only a fallback for installs that pre-date the ID set.

### Modified: `formatTweet`

- Replace hardcoded `[twitter, bookmark]` tags with `this.settings.defaultTags`.
- If `defaultTags` is empty, write `tags: []` in the frontmatter (line is always present for consistent YAML structure).

---

## Error Handling

| Situation | Behaviour |
|---|---|
| Folder input empty after trim | Revert to `'x-bookmarks'`; update text field to match |
| Duplicate tag entered | Silent no-op; input clears |
| `saveSettings` failure | Surface an Obsidian `Notice`; no in-memory rollback |
| `saveBookmarksToVault` error mid-loop | Already-written notes kept; `lastSyncAt` not updated |

---

## Testing Checklist

- [ ] Existing installs (no `defaultFolder`/`defaultTags`/`lastSyncAt` in data) load with correct defaults.
- [ ] Changing the folder saves correctly; new bookmarks go to the new folder.
- [ ] `getFileName` uses `defaultFolder`; old `'x-bookmarks/Tweet-<id>.md'` path still checked in `isTweetImported`.
- [ ] Tags appear in saved note frontmatter; empty tag list writes `tags: []`.
- [ ] Adding and removing tag chips persists across settings tab close/reopen.
- [ ] `lastSyncAt` updates after a fully successful import and displays correctly.
- [ ] `lastSyncAt` does not update when an error occurs mid-import.
- [ ] Empty folder input reverts to `'x-bookmarks'` and text field reflects it.
- [ ] Duplicate tag input is silently ignored; input clears.
- [ ] Tag with internal whitespace (e.g. `"my tag"`) is stored and displayed as-is.
