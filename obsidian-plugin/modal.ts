import { Modal, App, Notice } from 'obsidian';
import type XBookmarksSync from './main';

export class BookmarkSelectionModal extends Modal {
  bookmarks: any[];
  plugin: XBookmarksSync;
  selectedIds: Set<string>;
  onImportComplete?: () => void;
  onDidClose?: () => void;

  constructor(app: App, plugin: XBookmarksSync, bookmarks: any[]) {
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

    let newCount = 0;

    this.bookmarks.forEach((bookmark) => {
      const isImported = this.plugin.isTweetImported(bookmark);

      const itemDiv = listContainer.createDiv({ cls: 'bookmark-item' });

      const checkbox = itemDiv.createEl('input', { type: 'checkbox', cls: 'bookmark-item-checkbox' });

      if (isImported) {
        checkbox.disabled = true;
        checkbox.checked = false;
        itemDiv.addClass('bookmark-item--imported');
      } else {
        checkbox.checked = true;
        this.selectedIds.add(bookmark.id);
        newCount++;
      }

      checkbox.onchange = (e) => {
        if ((e.target as HTMLInputElement).checked) {
          this.selectedIds.add(bookmark.id);
        } else {
          this.selectedIds.delete(bookmark.id);
        }
        importBtn.innerText = `Import Selected (${this.selectedIds.size})`;
      };

      const textDiv = itemDiv.createDiv({ cls: 'bookmark-item-text' });
      const title = bookmark.text
        ? (bookmark.text.length > 80 ? bookmark.text.substring(0, 80) + '...' : bookmark.text)
        : 'No text';
      textDiv.createEl('strong', {
        text: `${bookmark.name} (${bookmark.username})`
      });
      textDiv.createEl('br');
      textDiv.createEl('span', { text: title, cls: 'text-muted' });

      if (isImported) {
        textDiv.createEl('br');
        textDiv.createEl('span', { text: 'Already imported', cls: 'bookmark-item-badge' });
      }
    });

    const btnContainer = contentEl.createDiv({ cls: 'bookmark-modal-btn-container' });

    const cancelBtn = btnContainer.createEl('button', { text: 'Cancel' });
    cancelBtn.onclick = () => this.close();

    const importBtn = btnContainer.createEl('button', {
      text: `Import Selected (${newCount})`,
      cls: 'mod-cta'
    });
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
