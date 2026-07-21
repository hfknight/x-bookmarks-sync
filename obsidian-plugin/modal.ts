import { Modal, App, Notice } from 'obsidian';
import type XBookmarksSync from './main';
import type { Tweet } from './types';

export class BookmarkSelectionModal extends Modal {
  bookmarks: Tweet[];
  plugin: XBookmarksSync;
  selectedIds: Set<string>;
  // Receives whether the whole offered list was taken. Anything left behind means known backlog
  // below the waterline, which the caller uses to decide if incremental mode is still safe.
  onImportComplete?: (importedAll: boolean) => void;
  onDidClose?: () => void;

  // Receives only importable bookmarks — already-imported ones are filtered out by the caller.
  constructor(app: App, plugin: XBookmarksSync, bookmarks: Tweet[]) {
    super(app);
    this.plugin = plugin;
    this.bookmarks = bookmarks;
    this.selectedIds = new Set();
  }

  onOpen() {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.createEl('h2', { text: 'Select bookmarks to import' });

    // Bulk selection. A first sync on a large account offers thousands of pre-checked rows, so
    // "uncheck what you don't want" is thousands of clicks — these exist to make importing a
    // backlog in batches practical.
    const controls = contentEl.createDiv({ cls: 'bookmark-select-controls' });
    controls.createSpan({ text: 'Select:', cls: 'text-muted' });
    const allBtn = controls.createEl('button', { text: 'All' });
    const noneBtn = controls.createEl('button', { text: 'None' });
    // "First" and its number field are one control, so they share a wrapper and sit flush.
    const firstGroup = controls.createDiv({ cls: 'bookmark-select-first' });
    const firstBtn = firstGroup.createEl('button', { text: 'First' });
    const batchInput = firstGroup.createEl('input', { type: 'number', cls: 'bookmark-select-batch' });
    batchInput.value = String(this.plugin.settings.selectBatchSize);
    batchInput.min = '1';
    for (const btn of [allBtn, noneBtn, firstBtn]) btn.disabled = true;
    batchInput.disabled = true;

    const listContainer = contentEl.createDiv({ cls: 'bookmark-list-container' });
    // Placeholder so the modal frame paints immediately; for 300+ items the
    // forEach below blocks the main thread for several seconds otherwise.
    const placeholder = listContainer.createDiv({
      text: `Building list of ${this.bookmarks.length} bookmark${this.bookmarks.length !== 1 ? 's' : ''}…`,
      cls: 'text-muted bookmark-list-placeholder'
    });

    const btnContainer = contentEl.createDiv({ cls: 'bookmark-modal-btn-container' });

    const cancelBtn = btnContainer.createEl('button', { text: 'Cancel' });
    cancelBtn.onclick = () => this.close();

    const importBtn = btnContainer.createEl('button', {
      text: 'Import selected (…)',
      cls: 'mod-cta'
    });
    importBtn.disabled = true;

    // Disabled at zero: an enabled CTA that can only tell you it has nothing to do is a dead end.
    // Covers both the empty result and the user unchecking everything.
    const syncImportBtn = () => {
      importBtn.innerText = `Import selected (${this.selectedIds.size})`;
      importBtn.disabled = this.selectedIds.size === 0;
    };

    // Defer item rendering until after the first paint so the placeholder is
    // actually visible. Double rAF: first callback runs before the next paint,
    // second runs before the paint AFTER that — guaranteeing one paint cycle
    // happened with the placeholder on screen before the synchronous forEach
    // blocks the main thread.
    window.requestAnimationFrame(() => window.requestAnimationFrame(() => {
      const checkboxes: HTMLInputElement[] = [];
      this.bookmarks.forEach((bookmark) => {
        const itemDiv = listContainer.createDiv({ cls: 'bookmark-item' });

        const checkbox = itemDiv.createEl('input', { type: 'checkbox', cls: 'bookmark-item-checkbox' });
        checkbox.checked = true;
        this.selectedIds.add(bookmark.id);
        checkboxes.push(checkbox);

        checkbox.onchange = (e) => {
          if ((e.target as HTMLInputElement).checked) {
            this.selectedIds.add(bookmark.id);
          } else {
            this.selectedIds.delete(bookmark.id);
          }
          syncImportBtn();
        };

        const textDiv = itemDiv.createDiv({ cls: 'bookmark-item-text' });
        const title = bookmark.text
          ? (bookmark.text.length > 80 ? bookmark.text.substring(0, 80) + '...' : bookmark.text)
          : 'No text';
        textDiv.createEl('strong', {
          text: `${bookmark.name} (${bookmark.username})`
        });
        textDiv.createEl('br');
        textDiv.createSpan({ text: title, cls: 'text-muted' });
      });

      // Nothing new to show: reuse the placeholder as the empty state rather than leaving a blank
      // list. No counts here — the number scanned is a pagination artifact (one page on an
      // incremental sync, the whole list on a full scan) and says nothing useful about the vault.
      // Drive the checkboxes and selectedIds together — the checkbox `onchange` handler only fires
      // on user interaction, not on programmatic assignment.
      const selectFirst = (n: number) => {
        this.selectedIds.clear();
        checkboxes.forEach((cb, i) => {
          const take = i < n;
          cb.checked = take;
          if (take) this.selectedIds.add(this.bookmarks[i].id);
        });
        syncImportBtn();
      };

      allBtn.onclick = () => selectFirst(this.bookmarks.length);
      noneBtn.onclick = () => selectFirst(0);
      firstBtn.onclick = () => selectFirst(Math.max(1, Number(batchInput.value) || 1));
      batchInput.onchange = () => {
        const n = Math.max(1, Math.floor(Number(batchInput.value) || 1));
        batchInput.value = String(n);
        this.plugin.settings.selectBatchSize = n;
        void this.plugin.saveSettings();
      };

      if (this.bookmarks.length === 0) {
        placeholder.setText('No new bookmarks — everything scanned is already imported.');
      } else {
        placeholder.remove();
        for (const btn of [allBtn, noneBtn, firstBtn]) btn.disabled = false;
        batchInput.disabled = false;
      }
      syncImportBtn();
    }));

    importBtn.onclick = async () => {
      const toImport = this.bookmarks.filter((b) => this.selectedIds.has(b.id));
      const importedAll = toImport.length === this.bookmarks.length;
      this.close();
      if (toImport.length > 0) {
        await this.plugin.saveBookmarksToVault(toImport);
        this.onImportComplete?.(importedAll);
      } else {
        new Notice('No bookmarks selected for import.');
      }
    };
  }

  onClose() {
    const { contentEl } = this;
    contentEl.empty();
    this.onDidClose?.();
  }
}
