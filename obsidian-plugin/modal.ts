import { Modal, App, Notice } from 'obsidian';
import type XBookmarksSync from './main';
import type { Tweet } from './types';

export class BookmarkSelectionModal extends Modal {
  bookmarks: Tweet[];
  plugin: XBookmarksSync;
  selectedIds: Set<string>;
  onImportComplete?: () => void;
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
      this.bookmarks.forEach((bookmark) => {
        const itemDiv = listContainer.createDiv({ cls: 'bookmark-item' });

        const checkbox = itemDiv.createEl('input', { type: 'checkbox', cls: 'bookmark-item-checkbox' });
        checkbox.checked = true;
        this.selectedIds.add(bookmark.id);

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
      if (this.bookmarks.length === 0) {
        placeholder.setText('No new bookmarks — everything scanned is already imported.');
      } else {
        placeholder.remove();
      }
      syncImportBtn();
    }));

    importBtn.onclick = async () => {
      const toImport = this.bookmarks.filter((b) => this.selectedIds.has(b.id));
      this.close();
      if (toImport.length > 0) {
        await this.plugin.saveBookmarksToVault(toImport);
        this.onImportComplete?.();
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
