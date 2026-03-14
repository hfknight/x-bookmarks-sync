# X Bookmarks Sync — Obsidian Plugin

Sync your X (Twitter) bookmarks directly into your Obsidian vault as beautifully formatted Markdown files. No API key required.

---

## How It Works

The plugin opens an embedded browser panel (Electron webview) pointed at `twitter.com/i/bookmarks`. You log in normally, scroll to load bookmarks, then click **Extract Bookmarks**. The plugin scrapes what's visible in the DOM, presents a selection dialog, and saves each chosen bookmark as a Markdown note.

Because it piggybacks on your existing browser session, no developer credentials or OAuth tokens are needed.

---

## Features

- **No API key required** — works by scraping the loaded page via an embedded webview
- **Selective import** — pick exactly which bookmarks to import from a checklist modal
- **Duplicate detection** — already-imported bookmarks are grayed out and skipped automatically
- **Structured Markdown notes** — each bookmark is saved with YAML frontmatter and a clean layout
- **Deep-link back** — each note includes an `obsidian://` link to re-open the tweet in the webview
- **Copy as Markdown** — while viewing any tweet page, extract and copy its content as Markdown via [Defuddle](https://github.com/kepano/defuddle)
- **Organized folder** — all bookmarks land in an `x-bookmarks/` folder in your vault root

---

## Installation

> **Note:** This is a desktop-only plugin. It requires Obsidian's Electron webview, which is not available on mobile.

### Manual (recommended)

1. Download the latest `x-bookmarks-sync.zip` from the [releases page](../../releases).
2. Extract the zip — you'll get `main.js` and `manifest.json`.
3. Open your vault's root folder on disk.
4. Navigate to `.obsidian/plugins/` (create the folder if it doesn't exist).
5. Create a new subfolder named `x-bookmarks-sync`.
6. Place `main.js` and `manifest.json` inside it.
7. Restart Obsidian, then go to **Settings → Community Plugins** and enable **X Bookmarks Sync**.

### From source

```bash
git clone https://github.com/hfknight/x-bookmarks-sync
cd x-bookmarks-sync
npm install
npm run build:plugin
```

Then copy `obsidian-plugin/main.js` and `obsidian-plugin/manifest.json` into `.obsidian/plugins/x-bookmarks-sync/` in your vault.

---

## Usage

1. Click the **Twitter icon** in the Obsidian ribbon (or run the command **Open X Bookmarks View**).
2. A side panel opens with X.com loaded. Log in to your account if prompted.
3. Navigate to your Bookmarks page and **scroll down** to load the tweets you want.
4. Click **Extract Bookmarks** in the panel toolbar.
5. A modal appears listing all visible bookmarks. New ones are pre-checked; already-imported ones are grayed out.
6. Check or uncheck as needed, then click **Import Selected**.
7. Notes appear in the `x-bookmarks/` folder in your vault.

### Bonus: Copy as Markdown

While browsing any tweet or article page in the webview, click **Copy as MD** to extract and copy the page content as Markdown to your clipboard (powered by Defuddle).

---

## Note Format

Each saved bookmark becomes a Markdown file with the following structure:

```markdown
---
id: "1234567890"
author: "Display Name"
username: "@handle"
scraped_date: 2024-01-15
url: "https://twitter.com/handle/status/1234567890"
tags: [twitter, bookmark]
---

# Tweet by Display Name (@handle)

The full text of the tweet goes here...

[View on X](https://twitter.com/...) | [Open in Obsidian Webview](obsidian://x-bookmarks?url=...)
```

**File naming:** `x-bookmarks/X-{date}-{author}-{first 40 chars of tweet}.md`

---

## Project Structure

```
x-bookmarks-sync/
├── obsidian-plugin/
│   ├── main.ts          # Plugin source (TypeScript)
│   └── manifest.json    # Obsidian plugin manifest
├── src/
│   ├── App.tsx          # Companion web app (download/install page)
│   └── pluginFiles.ts   # Bundled plugin files for web distribution
└── package.json
```

The `src/` directory contains a companion React + Vite web app that serves as a download and installation guide for the plugin.

---

## Limitations

- **Only imports visible tweets** — scroll down on the bookmarks page to load more before extracting.
- **Desktop only** — requires Electron's `<webview>` tag, not available in Obsidian mobile.
- **Subject to X.com DOM changes** — if X changes their markup, the scraper selectors may need updating.

---

## License

MIT
