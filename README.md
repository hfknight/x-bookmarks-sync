# X Bookmarks Sync — Obsidian Plugin

Sync your X (Twitter) bookmarks directly into your Obsidian vault as clean, structured Markdown notes. No API key. No OAuth. Just your existing browser session.

![Sync demo](docs/assets/Sync-Demo.webp)

---

## Features

- **No API key required** — runs in an embedded webview using your existing X session; no OAuth, no tokens to manage
- **Complete, reliable capture** — reads your bookmark list directly instead of scrolling the page, so large libraries sync quickly and nothing is missed
- **Import X article body** — for native X long-form articles, pull the full article text into the note and rename it to the article's title (right-click, command palette, or toolbar button)
- **Incremental sync** — "Sync from last" stops as soon as it reaches already-imported bookmarks, for quick top-ups
- **Selective import** — choose exactly which bookmarks to save from a checklist; already-imported ones are grayed out and skipped
- **Rich content** — full long-form text, images, and video/GIF thumbnails; quoted tweets are folded inline under a **Quoted tweet** heading
- **Structured Markdown notes** — YAML frontmatter, configurable folder / tags / filename format, and an `obsidian://` deep-link back to the tweet
- **Re-import on next sync** — refresh a single note with one click to pick up newer fields
- **Copy main content** — clipboard-copy the focal tweet/article with replies stripped, powered by [Defuddle](https://github.com/kepano/defuddle)

> **Desktop only.** This plugin uses Electron's `<webview>` tag, which is not available in Obsidian mobile.

---

## Usage

### Syncing bookmarks

1. Click the **X Bookmarks Sync icon** in the Obsidian ribbon (or run the command **Open X Bookmarks View**).
2. A side panel opens with X.com loaded. Log in to your account if prompted.
3. Navigate to your **Bookmarks page**.
4. Click **Extract bookmarks** in the panel toolbar. A scan overlay appears while the plugin reads your bookmarks directly — no scrolling, and you can **Cancel** anytime.
5. A selection modal appears listing all visible bookmarks. New ones are pre-checked; already-imported ones are grayed out.
6. Check or uncheck as needed, then click **Import Selected**.
7. Notes appear in your configured bookmarks folder (default: `x-bookmarks/`).

### Sync from last (incremental mode)

Check **Sync from last** in the toolbar before clicking **Extract bookmarks**. The plugin stops as soon as it reaches bookmarks you've already imported — ideal for regular top-up syncs without re-reading your entire history.

> **First sync:** The checkbox is unchecked by default until you have completed at least one full sync. This ensures your entire bookmark history is captured on the first run.

### Import X article body

![Import article demo](docs/assets/Import-Article-Demo.webp)

For bookmarks that point at native X long-form articles (URLs like `x.com/<user>/status/<id>` rendered as an Article), the plugin can pull the full article body into the note. Three entry points:

- **In the note** — right-click in the editor of a bookmark note → **Import X article body**.
- **From the command palette** — **Import X article body to current note**.
- **From the webview** — open the tweet via its `obsidian://` link; while on a `/status/` or `/article/` page, click **Import article** in the toolbar. The plugin finds the matching bookmark note by id, fetches the article in a hidden background webview, appends the body under a **`## Full article`** heading, and renames the file to the article's title (keeping the `{date}-{author}-` prefix).

If the bookmarked tweet isn't actually an article, the plugin shows a Notice and skips the import — no replies or unrelated content get pulled in.

### Re-import a bookmark

Need to refresh a single note (for example, you imported it before long-tweet support landed)? Right-click in the note's editor → **Re-import this bookmark on next sync** (also in the command palette). The plugin removes the tweet id from import history and moves the file to the system trash; on the next sync the bookmark appears as new in the selection modal.


### Copy main content

While viewing any X page in the webview, click **Copy main content** in the toolbar to copy the focal tweet or article as Markdown to your clipboard. Replies and surrounding thread context are stripped automatically — you get just the post you opened.

---

## Commands & menu items reference

| Action | Right-click in bookmark note | Command palette | Toolbar button (X bookmarks view) |
|---|---|---|---|
| Open the X bookmarks view | — | **Open X bookmarks view** | — |
| Sync bookmarks from the bookmarks page | — | — | **Extract bookmarks** (visible on `/i/bookmarks`) |
| Copy the focal tweet/article to clipboard | — | — | **Copy main content** (visible on any non-bookmarks X page) |
| Import the article body into the bookmark note | **Import X article body** | **Import X article body to current note** | **Import article** (visible on `/status/` or `/article/` pages) |
| Re-import a single bookmark on the next sync | **Re-import this bookmark on next sync** | **Re-import this bookmark on next sync** | — |

The right-click menu items only appear on bookmark notes — that is, notes whose YAML frontmatter contains an X URL (`url:` or `article_url:`).

---

## Settings

Open **Settings → X Bookmarks Sync** to configure:

![Settings Tab](docs/assets/Settings-Tab.webp)

| Setting | Description | Default |
|---|---|---|
| **Default folder** | Vault folder where bookmark notes are saved | `x-bookmarks` |
| **Default tags** | Tags applied to every imported note (chip UI — press Enter to add) | `twitter`, `bookmark` |
| **Note name format** | How note filenames are built — Date – author – title, Author – title, Date – title, or Title – author | Date – author – title |
| **Last sync** | Timestamp of the most recent successful import (read-only) | — |
| **Clear import history** | Removes all tracked import IDs, allowing previously imported bookmarks to be re-imported | — |

> **Note on Clear import history:** This resets all record of previously imported bookmarks. On the next sync, everything will be treated as new. Use this if you want to start fresh or re-import after cleaning up your vault.

---

## Installation

### From Obsidian's Community Plugins (recommended)

1. Open **Settings → Community plugins**.
2. Make sure **Restricted mode** is **off**.
3. Click **Browse** and search for **X Bookmarks Sync**.
4. Click **Install**, then **Enable**.

### Via BRAT (for pre-release versions)

Use this if you want early access to fixes or features that haven't been published to the community store yet.

1. Install the [BRAT plugin](https://github.com/TfTHacker/obsidian42-brat) from the Obsidian community plugins list.
2. In BRAT settings, click **Add Beta Plugin** and enter:
   ```
   hfknight/x-bookmarks-sync
   ```
3. Enable **X Bookmarks Sync** in **Settings → Community plugins**.

### Manual

1. Download the latest `x-bookmarks-sync.zip` from the [Releases page](../../releases).
2. Extract the zip — you'll get `main.js` and `manifest.json`.
3. In your vault, navigate to `.obsidian/plugins/` (create the folder if it doesn't exist).
4. Create a new subfolder named `x-bookmarks-sync`.
5. Place `main.js` and `manifest.json` inside it.
6. Restart Obsidian, then go to **Settings → Community plugins** and enable **X Bookmarks Sync**.

### From source

```bash
git clone https://github.com/hfknight/x-bookmarks-sync
cd x-bookmarks-sync
npm install
npm run build:plugin
```

Copy `obsidian-plugin/main.js` and `obsidian-plugin/manifest.json` into `.obsidian/plugins/x-bookmarks-sync/` in your vault.

---

## Note Format

Each saved bookmark becomes a Markdown file. Optional sections are added when the bookmark contains photos, a video/GIF, a quoted tweet, an article card, or has had its article body imported.

```markdown
---
id: "1234567890"
author: "Display Name"
username: "@handle"
published: 2024-01-12       # the tweet's original post date
scraped_date: 2024-01-15    # when it was imported
url: "https://x.com/handle/status/1234567890"
article_url: "https://x.com/handle/article/1234567890"   # only if the tweet links to an X article
tags: [twitter, bookmark]
---

# Tweet by Display Name (@handle)

The full text of the tweet goes here...

![](https://pbs.twimg.com/media/EXAMPLE.jpg?format=jpg&name=large)

[▶ Video](https://x.com/handle/status/1234567890/video/1)        # only if the tweet has a video/GIF

[![](https://pbs.twimg.com/amplify_video_thumb/…/poster.jpg)](https://x.com/handle/status/1234567890/video/1)

## Quoted tweet              # only if the tweet quotes another tweet

> **Quoted Author** (@quoted_handle)
>
> The quoted tweet's text…
>
> [View on X](https://x.com/quoted_handle/status/...)

## Linked article            # only if the tweet contains an X article card

**Article title here**

Short excerpt rendered in the card…

[Read full article](https://x.com/...)

[View on X](https://x.com/...) | [Open in Obsidian Webview](obsidian://x-bookmarks?url=...)

## Full article              # added by Import X article body
…full Defuddle-extracted article body…
```

**File naming:** configurable via the **Note name format** setting (default `{date}-{author}-{title}`). The title comes from the tweet's text — or the article's title for bookmarked X articles. **Import X article body** renames the note to the article's title. All names are sanitized and length-capped to stay within filesystem limits.

---

## Limitations

- **Desktop only** — requires Electron's `<webview>` tag, not available in Obsidian mobile.
- **Subject to X.com changes** — the plugin uses X's internal data API (with a page-scraping fallback); major changes on X's side may require a plugin update.
- **Video/GIF streams not downloaded** — the poster thumbnail is embedded with a **▶ Video** link to the tweet's video viewer on X, but the video file itself isn't saved locally.
- **CDN-hosted images** — embedded images reference X's CDN (`pbs.twimg.com`). If X removes the image, the link in your note breaks. Local-download support is planned.
- **Existing notes don't backfill new fields** — when you upgrade and gain new features (like long-tweet text or image embedding), already-imported notes stay as they were. Use **Re-import this bookmark on next sync** to refresh individual notes, or **Clear import history** to wipe everything and re-sync.

---

## License

MIT
