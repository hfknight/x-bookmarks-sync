import { App, PluginSettingTab, Setting } from 'obsidian';
import type XBookmarksSync from './main';

export class XBookmarksSyncSettingTab extends PluginSettingTab {
  plugin: XBookmarksSync;

  constructor(app: App, plugin: XBookmarksSync) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const { containerEl } = this;
    containerEl.empty();
    new Setting(containerEl)
      .setName('Default folder')
      .setDesc('Vault folder where bookmark notes are saved.')
      .addText(text => text
        .setPlaceholder('X-bookmarks')
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

    // Default Tags — full-width column layout so chips aren't crammed into controlEl
    const tagSetting = new Setting(containerEl)
      .setName('Default tags')
      .setDesc('Tags applied to every imported bookmark note.');

    tagSetting.settingEl.addClass('x-bms-tag-setting');
    tagSetting.controlEl.addClass('is-hidden');

    const chipsContainer = tagSetting.settingEl.createDiv({ cls: 'x-bms-chips-container' });

    const renderChips = () => {
      chipsContainer.empty();

      for (const tag of this.plugin.settings.defaultTags) {
        const chip = chipsContainer.createEl('span', { cls: 'x-bms-tag-chip' });
        chip.createSpan({ text: tag });

        const removeBtn = chip.createEl('button', { cls: 'x-bms-tag-remove-btn' });
        removeBtn.setText('×');
        removeBtn.onclick = () => {
          this.plugin.settings.defaultTags = this.plugin.settings.defaultTags.filter(t => t !== tag);
          void this.plugin.saveSettings();
          renderChips();
        };
      }

      const inputRow = chipsContainer.createDiv({ cls: 'x-bms-input-row' });
      if (this.plugin.settings.defaultTags.length > 0) {
        inputRow.addClass('x-bms-input-row--with-tags');
      }

      const tagInput = inputRow.createEl('input', { type: 'text', cls: 'x-bms-tag-input' });
      tagInput.placeholder = 'Add tag\u2026';

      inputRow.createEl('span', { text: 'Press enter to add', cls: 'x-bms-tag-hint' });

      tagInput.addEventListener('keydown', (e) => {
        if (e.key !== 'Enter') return;
        e.preventDefault();
        const val = tagInput.value.trim().toLowerCase();
        if (!val) return;
        if (this.plugin.settings.defaultTags.includes(val)) {
          tagInput.value = '';
          return;
        }
        this.plugin.settings.defaultTags.push(val);
        tagInput.value = '';
        renderChips();
        void this.plugin.saveSettings();
      });
    };

    renderChips();

    const lastSync = this.plugin.settings.lastSyncAt
      ? new Date(this.plugin.settings.lastSyncAt).toLocaleString()
      : 'Never synced yet';

    new Setting(containerEl)
      .setName('Last sync')
      .setDesc(lastSync);

    const count = this.plugin.importedIds.size;
    new Setting(containerEl)
      .setName('Import history')
      .setDesc(`${count} bookmark${count !== 1 ? 's' : ''} tracked. Clear this to re-import previously synced bookmarks.`)
      .addButton(btn => {
        btn.setButtonText('Clear import history')
          .setWarning()
          .onClick(async () => {
            this.plugin.importedIds.clear();
            this.plugin.settings.lastSyncAt = null;
            await this.plugin.saveSettings();
            this.display();
          });
      });
  }
}
