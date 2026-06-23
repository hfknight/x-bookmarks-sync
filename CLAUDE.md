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
- **Quoted tweets are folded into the parent note, never imported as a separate bookmark.** The GraphQL interceptor must skip `quoted_status_result` during its recursive walk (otherwise the quote gets collected as its own bookmark — the original bug). Quote presence is detected high-recall in the DOM (a 2nd `[data-testid="User-Name"]` block or a link to a different `/status/<id>`) and via the interceptor; the quote's data is recovered from syndication. Tweet/quote text has its `t.co` links expanded to real URLs and media links stripped. See `quoted.ts` (`parseQuotedTweet`, `renderQuotedSection`, `expandLinks`) and `recoverQuotedTweets` (view.ts).

## Build

```bash
npm run build:plugin   # type-check + esbuild + copy to root & dist-plugin
npm run build          # above + vite build for the web app
npm run deploy:local   # build:plugin + copy main.js & manifest.json to local Obsidian vault
```

Local vault plugin path: `/Users/fei.hu/Dropbox/Obsidian Notes/.obsidian/plugins/x-bookmarks-sync/`

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
