import { App, PluginSettingTab, Setting } from 'obsidian';
import type { SettingControl, SettingDefinition } from 'obsidian';
import type XBookmarksSync from './main';
import { SignOutConfirmModal } from './modal';

export class XBookmarksSyncSettingTab extends PluginSettingTab {
  plugin: XBookmarksSync;

  constructor(app: App, plugin: XBookmarksSync) {
    super(app, plugin);
    this.plugin = plugin;
  }

  // Single source of truth for the tab. On Obsidian >= 1.13 the app renders
  // these declaratively; on older hosts display() below interprets the same
  // definitions imperatively.
  getSettingDefinitions(): SettingDefinition[] {
    const lastSync = this.plugin.settings.lastSyncAt
      ? new Date(this.plugin.settings.lastSyncAt).toLocaleString()
      : 'Never synced yet';
    const count = this.plugin.importedIds.size;

    return [
      {
        name: 'Default folder',
        desc: 'Vault folder where bookmark notes are saved.',
        control: { type: 'text', key: 'defaultFolder', placeholder: 'X-bookmarks' },
      },
      {
        name: 'Note name format',
        desc: 'How imported note filenames are built; the title is byte-capped to stay within filesystem limits.',
        control: {
          type: 'dropdown',
          key: 'fileNameFormat',
          options: {
            'date-author-title': 'Date – author – title',
            'author-title': 'Author – title',
            'date-title': 'Date – title',
            'title-author': 'Title – author',
          },
        },
      },
      {
        name: 'Default tags',
        desc: 'Tags applied to every imported bookmark note.',
        render: (setting) => this.renderTagChips(setting),
      },
      {
        name: 'Account',
        desc: this.plugin.settings.signedInHandle
          ? (this.plugin.settings.lastSyncAt
            ? `Signed in as @${this.plugin.settings.signedInHandle} · as of ${lastSync}`
            : `Signed in as @${this.plugin.settings.signedInHandle}`)
          : 'Sign in happens in the bookmarks panel. Sync once to show your account here.',
        render: (setting) => this.renderAccountButton(setting),
      },
      {
        name: 'Last sync',
        desc: lastSync,
      },
      {
        name: 'Import history',
        desc: `${count} bookmark${count !== 1 ? 's' : ''} tracked. Clear this to re-import previously synced bookmarks.`,
        render: (setting) => this.renderClearHistoryButton(setting),
      },
    ];
  }

  getControlValue(key: string): unknown {
    return (this.plugin.settings as unknown as Record<string, unknown>)[key];
  }

  async setControlValue(key: string, value: unknown): Promise<void> {
    if (key === 'defaultFolder' && typeof value === 'string') {
      const trimmed = value.trim().replace(/^\/+|\/+$/g, '');
      value = trimmed || 'x-bookmarks';
    }
    (this.plugin.settings as unknown as Record<string, unknown>)[key] = value;
    await this.plugin.saveSettings();
  }

  // Legacy fallback for Obsidian < 1.13 (minAppVersion 1.7.2). Newer hosts
  // render from getSettingDefinitions() and never call this.
  display(): void {
    const { containerEl } = this;
    containerEl.empty();
    for (const def of this.getSettingDefinitions()) {
      const setting = new Setting(containerEl).setName(def.name);
      if (def.desc) setting.setDesc(def.desc);
      if (def.control) {
        this.renderControl(setting, def.control);
      } else if (def.render) {
        // Our render callbacks don't use the SettingGroup argument (there is
        // none in the legacy path).
        (def.render as (s: Setting) => void)(setting);
      }
    }
  }

  private renderControl(setting: Setting, control: SettingControl): void {
    if (control.type === 'text') {
      setting.addText(text => text
        .setPlaceholder(control.placeholder ?? '')
        .setValue(String(this.getControlValue(control.key) ?? ''))
        .onChange(async (value) => {
          await this.setControlValue(control.key, value);
        }));
    } else if (control.type === 'dropdown') {
      setting.addDropdown(dd => dd
        .addOptions(control.options)
        .setValue(String(this.getControlValue(control.key) ?? ''))
        .onChange(async (value) => {
          await this.setControlValue(control.key, value);
        }));
    }
  }

  // Re-render after imperative state changes (e.g. clearing import history).
  private refresh(): void {
    if (typeof this.update === 'function') {
      this.update();
    } else {
      this.display();
    }
  }

  // Default Tags — full-width column layout so chips aren't crammed into controlEl
  private renderTagChips(setting: Setting): () => void {
    setting.settingEl.addClass('x-bms-tag-setting');
    setting.controlEl.addClass('is-hidden');

    // Obsidian may reuse the row element across declarative rebuilds — drop
    // any stale chips container before creating ours (idempotent render).
    setting.settingEl.querySelectorAll('.x-bms-chips-container').forEach(el => el.remove());
    const chipsContainer = setting.settingEl.createDiv({ cls: 'x-bms-chips-container' });

    const renderChips = () => {
      chipsContainer.empty();

      for (const tag of this.plugin.settings.defaultTags) {
        const chip = chipsContainer.createSpan({ cls: 'x-bms-tag-chip' });
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
      tagInput.placeholder = 'Add tag…';

      inputRow.createSpan({ text: 'Press enter to add', cls: 'x-bms-tag-hint' });

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

    return () => {
      chipsContainer.remove();
      setting.settingEl.removeClass('x-bms-tag-setting');
      setting.controlEl.removeClass('is-hidden');
    };
  }

  private renderAccountButton(setting: Setting): () => void {
    let buttonEl: HTMLElement | null = null;
    setting.addButton(btn => {
      buttonEl = btn.buttonEl;
      btn.setButtonText('Sign out of X')
        .setWarning()
        .onClick(() => {
          new SignOutConfirmModal(this.app, this.plugin.settings.signedInHandle, () => {
            void (async () => {
              await this.plugin.signOutOfX();
              this.refresh();
            })();
          }).open();
        });
    });
    return () => {
      buttonEl?.remove();
    };
  }

  private renderClearHistoryButton(setting: Setting): () => void {
    let buttonEl: HTMLElement | null = null;
    setting.addButton(btn => {
      buttonEl = btn.buttonEl;
      btn.setButtonText('Clear import history')
        .setWarning()
        .onClick(async () => {
          this.plugin.importedIds.clear();
          this.plugin.settings.lastSyncAt = null;
          await this.plugin.saveSettings();
          this.refresh();
        });
    });
    return () => {
      buttonEl?.remove();
    };
  }
}
