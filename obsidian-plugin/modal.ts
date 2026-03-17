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
    contentEl.createEl('h2', { text: 'Select Bookmarks to Import' });

    const listContainer = contentEl.createDiv({
      cls: 'bookmark-list-container'
    });
    listContainer.style.maxHeight = '400px';
    listContainer.style.overflowY = 'auto';
    listContainer.style.marginBottom = '20px';
    listContainer.style.paddingRight = '10px';

    let newCount = 0;

    this.bookmarks.forEach((bookmark) => {
      const isImported = this.plugin.isTweetImported(bookmark);

      const itemDiv = listContainer.createDiv({ cls: 'bookmark-item' });
      itemDiv.style.display = 'flex';
      itemDiv.style.alignItems = 'flex-start';
      itemDiv.style.marginBottom = '10px';
      itemDiv.style.padding = '10px';
      itemDiv.style.border = '1px solid var(--background-modifier-border)';
      itemDiv.style.borderRadius = '5px';

      const checkbox = itemDiv.createEl('input', { type: 'checkbox' });
      checkbox.style.marginTop = '4px';
      checkbox.style.marginRight = '10px';

      if (isImported) {
        checkbox.disabled = true;
        checkbox.checked = false;
        itemDiv.style.opacity = '0.5';
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

      const textDiv = itemDiv.createDiv();
      const title = bookmark.text
        ? (bookmark.text.length > 80 ? bookmark.text.substring(0, 80) + '...' : bookmark.text)
        : 'No text';
      textDiv.createEl('strong', {
        text: `${bookmark.name} (${bookmark.username})`
      });
      textDiv.createEl('br');
      textDiv.createEl('span', { text: title, cls: 'text-muted' });
      textDiv.style.fontSize = '0.9em';

      if (isImported) {
        textDiv.createEl('br');
        const badge = textDiv.createEl('span', { text: 'Already imported' });
        badge.style.color = 'var(--text-error)';
        badge.style.fontSize = '0.85em';
        badge.style.fontWeight = 'bold';
      }
    });

    const btnContainer = contentEl.createDiv();
    btnContainer.style.display = 'flex';
    btnContainer.style.justifyContent = 'flex-end';
    btnContainer.style.gap = '10px';

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
