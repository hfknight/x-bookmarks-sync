# X Bookmarks Sync — Claude Instructions

This is an Obsidian plugin that syncs X (Twitter) bookmarks to an Obsidian vault as Markdown notes.

## Project Structure

- `obsidian-plugin/main.ts` — plugin source code
- `manifest.json` — canonical plugin manifest (repo root)
- `versions.json` — version → minAppVersion mapping (repo root)
- `src/` — companion React/Vite web app for downloading/installing the plugin
- `build.cjs` — post-build script: copies built files to root and `dist-plugin/`

## Obsidian Plugin Conventions

- Use the Obsidian API (`Plugin`, `ItemView`, `Modal`, `Notice`, `WorkspaceLeaf`, etc.) — not generic web APIs where Obsidian equivalents exist
- Use `this.app.vault` for all file operations, never raw `fs`
- Register views, commands, and ribbon icons via Plugin lifecycle methods (`onload`/`onunload`)
- Always clean up in `onunload`: call `this.app.workspace.detachLeavesOfType(VIEW_TYPE)` for any registered views
- `isDesktopOnly: true` in manifest — plugin uses Electron's `<webview>` tag
- To read an X page in the background (article body, truncated-tweet recovery), reuse the hidden off-screen webview pattern (`x-bookmarks-hidden-webview` + `createEl('webview' …)`) — see `fetchArticleByHiddenWebview` (main.ts) and `recoverTruncatedBookmarks` (view.ts). Don't navigate the visible view and rely on redirecting back.
- To show UI **over** the visible `<webview>` (e.g. the capture scan overlay), dim the webview via `opacity` (`.is-dimmed`) and reveal an absolutely-positioned sibling overlay — don't z-index an HTML layer over it (Electron `<webview>` stacking under HTML siblings is unreliable). `opacity` keeps the webview fully functional (same as the hidden article webview), so capture is unaffected. See `showScanOverlay`/`hideScanOverlay` (view.ts) + `.x-bookmarks-scan-overlay` (styles.css). Use theme vars (`--interactive-accent`, `--accent-h/s/l`) for colors, never hardcoded.
- For tweet **data/media by id** (e.g. video/GIF poster frames), prefer X's public syndication endpoint (`cdn.syndication.twimg.com/tweet-result?id=…&token=<any-nonempty>`, via `requestUrl`, no auth) over the live GraphQL interceptor, which is racy (misses tweets during fast scroll) and structurally blind to quoted-tweet media. See `fetchSyndicationPosters` (view.ts). Token must be non-empty (per-id derivation is undocumented); protected/deleted tweets return `{}`. The same endpoint also returns the full **quoted tweet** (text/author/photos/`mediaDetails`) and the parent's link **entities** — so it's the source for quoted-tweet folding and `t.co` expansion too. For a native X article shared as a post it also returns `article.title`, used to name article-link notes by their real title (`recoverArticleTitles`) — note posts have no tweet text, just the article link. (Article *body* import is deliberately manual-only; see `memory/project_auto_article_import_rejected.md`.)
- **The only end-of-list signal in X's Bookmarks timeline is a page with zero tweet entries.** Empirically verified against live responses (2026-07-21), on both capture paths: `bookmark_timeline_v2.timeline` carries just `instructions` + an always-empty `responseObjects` — **no total count**, and the only instruction type ever emitted is `TimelineAddEntries` (**no `TimelineTerminateTimeline`**). Critically, X returns a **Bottom cursor on every response, including past the end**, so cursor absence proves nothing and the `no-cursor` stop effectively never fires — a full walk actually terminates on the `cursor-repeat` heuristic. The real signal is a `TimelineAddEntries` whose entries contain cursors but **zero `TimelineTimelineItem`**. See `__xbsDetectEndOfList` (view.ts). Don't reintroduce a "no next cursor means done" assumption; it looks correct and silently isn't.
- **The "Sync from last" waterline is gated on `coverageProven`** — it may only fire if a previous run observed that zero-entry page. The shortcut stops at the first fully-imported page, which assumes everything below was already scanned; a capture that stopped short (scroll stall, repeated cursor) and was then fully imported makes `importedIds` *look* like a complete newest-first prefix, so every later sync stops at the gap and silently reports "no new bookmarks" forever. A run that stops at the waterline leaves the flag untouched (proves nothing new, but X only appends at the top so the earlier proof holds); anything else clears it, forcing one full scan. Same defect class as deleting a note punching a hole below the waterline — that case is handled separately by `forceFullScanOnNextSync`.
- **A capture's trust checks must test a necessary condition, not a success-shaped one.** `coverageProven` is forced false whenever no bookmark timeline response was seen at all (`sawTimelineData`), and nothing may override that. Three earlier guards each certified a capture that had read almost nothing, because each asked "does this look like success?" and each had a degenerate case that looked identical: a page reporting no new ids (another writer had already filled the shared map), a zero-entry timeline page (byte-identical to what X returns when the page never loaded — hence the `__xbsSawItems` precondition), and the incremental waterline (three screens of already-imported posts, trivially satisfied by a few stale rendered ones). A backgrounded Obsidian window reproduces all of it: Chromium throttles the hidden webview, X fetches nothing, capture falls back to scroll and scrapes whatever is on screen. Before adding a trust check here, ask what it would report if the capture read *nothing*.
- **Quoted tweets are folded into the parent note, never imported as a separate bookmark.** The GraphQL interceptor must skip `quoted_status_result` during its recursive walk (otherwise the quote gets collected as its own bookmark — the original bug). Quote presence is detected high-recall in the DOM (a 2nd `[data-testid="User-Name"]` block or a link to a different `/status/<id>`) and via the interceptor; the quote's data is recovered from syndication. Tweet/quote text has its `t.co` links expanded to real URLs and media links stripped. See `quoted.ts` (`parseQuotedTweet`, `renderQuotedSection`, `expandLinks`) and `recoverQuotedTweets` (view.ts).

## Build

```bash
npm run build:plugin   # type-check + esbuild + copy to root & dist-plugin
npm run build          # above + vite build for the web app
npm run deploy:local   # build:plugin + copy main.js & manifest.json to local Obsidian vault
npm run deploy:icloud  # same, but to the iCloud vault
```

Local vault plugin paths (deploy targets are separate — neither script writes to both):
- `deploy:local` → `/Users/fei.hu/Dropbox/Obsidian Notes/.obsidian/plugins/x-bookmarks-sync/`
- `deploy:icloud` → `/Users/fei.hu/Library/Mobile Documents/iCloud~md~obsidian/Documents/ob-vault-icloud/.obsidian/plugins/x-bookmarks-sync/`

Build outputs (`main.js`) are gitignored — distributed via GitHub Releases.

**Plugin dependencies live in the root `package.json`.** `build:plugin` runs from the repo root and esbuild bundles `obsidian-plugin/main.ts`, resolving imports (e.g. `defuddle`) from the **root** `node_modules`. There is no separate install under `obsidian-plugin/` — don't add an `obsidian-plugin/package.json` or lockfile (a stale one drifted and produced false-positive Dependabot alerts; removed in `74b8081`).

## Release Process

When the user asks to release or publish a new version, do the following steps in order — confirm the version number first if not specified:

1. Add a new `## <version>` section to `CHANGELOG.md` (above the previous version) with user-facing bullets. The release workflow extracts this section as the GitHub release body, and the in-app "What's new" modal reads the bundled CHANGELOG. Skip this and the release ships with a placeholder body and a silent modal.
2. Update `"version"` in `manifest.json` (repo root)
3. Update `"version"` in `obsidian-plugin/manifest.json` to match
4. Update `"version"` in `package.json` (root) to match
5. Add the new version entry to `versions.json`: `"<version>": "<minAppVersion>"`
6. Run `npm run build:plugin` to verify the build is clean
7. (Recommended) Push any feature commits, then run a [branch scan](https://community.obsidian.md/) against the latest commit to preview the community review bot. Address any issues before continuing.
8. Commit: `git add CHANGELOG.md manifest.json obsidian-plugin/manifest.json versions.json package.json && git commit -m "Release <version>"`
9. Tag: `git tag <version>`
10. Push: `git push origin main --tags`

GitHub Actions (`.github/workflows/release.yml`) automatically creates the GitHub Release with `main.js`, `manifest.json`, and `styles.css` when the tag is pushed. (`versions.json` is not a release asset — Obsidian reads it from the repo root to resolve minAppVersion compatibility.)
