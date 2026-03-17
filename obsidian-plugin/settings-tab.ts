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
    containerEl.createEl('h2', { text: 'X Bookmarks Sync' });
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

    // Default Tags — full-width column layout so chips aren't crammed into controlEl
    const tagSetting = new Setting(containerEl)
      .setName('Default tags')
      .setDesc('Tags applied to every imported bookmark note.');

    tagSetting.settingEl.style.flexDirection = 'column';
    tagSetting.settingEl.style.alignItems = 'flex-start';
    tagSetting.controlEl.style.display = 'none';

    const chipsContainer = tagSetting.settingEl.createDiv();
    chipsContainer.style.display = 'flex';
    chipsContainer.style.flexWrap = 'wrap';
    chipsContainer.style.gap = '6px';
    chipsContainer.style.alignItems = 'center';
    chipsContainer.style.width = '100%';
    chipsContainer.style.marginTop = '8px';

    const renderChips = () => {
      chipsContainer.empty();

      for (const tag of this.plugin.settings.defaultTags) {
        const chip = chipsContainer.createEl('span');
        chip.style.display = 'inline-flex';
        chip.style.alignItems = 'center';
        chip.style.gap = '2px';
        chip.style.padding = 'var(--tag-padding-y, 2px) var(--tag-padding-x, 8px)';
        chip.style.borderRadius = 'var(--tag-radius, 12px)';
        chip.style.border = 'var(--tag-border-width, 1px) solid var(--tag-border-color, var(--background-modifier-border))';
        chip.style.fontSize = '0.85em';
        chip.style.backgroundColor = 'var(--tag-background, var(--background-secondary))';
        chip.style.color = 'var(--tag-color, var(--text-normal))';
        chip.createSpan({ text: tag });

        const removeBtn = chip.createEl('button');
        removeBtn.setText('×');
        // Reset all browser/Obsidian button defaults
        removeBtn.style.all = 'unset';
        removeBtn.style.cursor = 'pointer';
        removeBtn.style.fontSize = '1em';
        removeBtn.style.lineHeight = '1';
        removeBtn.style.color = 'var(--tag-color, var(--text-muted))';
        removeBtn.style.opacity = '0.6';
        removeBtn.style.paddingLeft = '3px';
        removeBtn.style.display = 'flex';
        removeBtn.style.alignItems = 'center';
        removeBtn.onmouseenter = () => { removeBtn.style.opacity = '1'; };
        removeBtn.onmouseleave = () => { removeBtn.style.opacity = '0.6'; };
        removeBtn.onclick = async () => {
          this.plugin.settings.defaultTags = this.plugin.settings.defaultTags.filter(t => t !== tag);
          await this.plugin.saveSettings();
          renderChips();
        };
      }

      const inputRow = chipsContainer.createDiv();
      inputRow.style.display = 'flex';
      inputRow.style.alignItems = 'center';
      inputRow.style.gap = '6px';
      if (this.plugin.settings.defaultTags.length > 0) {
        inputRow.style.marginTop = '4px';
        inputRow.style.width = '100%';
      }

      const tagInput = inputRow.createEl('input', { type: 'text' });
      tagInput.placeholder = 'Add tag\u2026';
      tagInput.style.border = '1px solid var(--background-modifier-border)';
      tagInput.style.borderRadius = '4px';
      tagInput.style.padding = '3px 8px';
      tagInput.style.fontSize = '0.85em';
      tagInput.style.background = 'var(--background-primary)';
      tagInput.style.color = 'var(--text-normal)';
      tagInput.style.width = '140px';
      tagInput.style.outline = 'none';

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
