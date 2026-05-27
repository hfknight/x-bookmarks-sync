import { App, Modal, MarkdownRenderer, Component } from 'obsidian';
import type XBookmarksSync from './main';

export class WhatsNewModal extends Modal {
  private plugin: XBookmarksSync;
  private markdown: string;
  private renderComponent: Component;

  constructor(app: App, plugin: XBookmarksSync, markdown: string) {
    super(app);
    this.plugin = plugin;
    this.markdown = markdown;
    this.renderComponent = new Component();
  }

  onOpen() {
    this.titleEl.setText(`X Bookmarks Sync — What's new in ${this.plugin.manifest.version}`);
    const content = this.contentEl;
    content.empty();
    void MarkdownRenderer.render(this.app, this.markdown, content, '', this.renderComponent);
  }

  onClose() {
    this.renderComponent.unload();
    this.contentEl.empty();
  }
}

// Parse a CHANGELOG.md body. Sections are H2 headings with a semver tag
// (e.g. "## 1.1.0"). Returns a map keyed by version string.
export function parseChangelog(text: string): Map<string, string> {
  const sections = new Map<string, string>();
  const headingRe = /^##\s+(\d+\.\d+\.\d+(?:[.-][A-Za-z0-9.-]+)?)\s*$/;
  let currentVersion: string | null = null;
  let buffer: string[] = [];

  const flush = () => {
    if (currentVersion !== null) {
      sections.set(currentVersion, buffer.join('\n').trim());
    }
  };

  for (const line of text.split('\n')) {
    const match = line.match(headingRe);
    if (match) {
      flush();
      currentVersion = match[1];
      buffer = [];
    } else if (currentVersion !== null) {
      buffer.push(line);
    }
  }
  flush();
  return sections;
}

// Strict greater-than for x.y.z semver. Pre-release suffixes are ignored;
// the plugin only ships clean x.y.z tags.
export function semverGt(a: string, b: string): boolean {
  const parts = (v: string) => v.split('.').map(s => parseInt(s, 10) || 0);
  const pa = parts(a);
  const pb = parts(b);
  for (let i = 0; i < 3; i++) {
    if ((pa[i] ?? 0) > (pb[i] ?? 0)) return true;
    if ((pa[i] ?? 0) < (pb[i] ?? 0)) return false;
  }
  return false;
}

// Collect changelog content for every version in (last, current], ordered newest first.
export function notesSince(
  changelog: Map<string, string>,
  last: string,
  current: string,
): string {
  const versions = Array.from(changelog.keys())
    .filter(v => semverGt(v, last) && !semverGt(v, current))
    .sort((a, b) => (semverGt(a, b) ? -1 : semverGt(b, a) ? 1 : 0));
  return versions
    .map(v => `## ${v}\n\n${changelog.get(v) ?? ''}`)
    .join('\n\n');
}
