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

## Build

```bash
npm run build:plugin   # type-check + esbuild + copy to root & dist-plugin
npm run build          # above + vite build for the web app
npm run deploy:local   # build:plugin + copy main.js & manifest.json to local Obsidian vault
```

Local vault plugin path: `/Users/fei.hu/Dropbox/Obsidian Notes/.obsidian/plugins/x-bookmarks-sync/`

Build outputs (`main.js`) are gitignored — distributed via GitHub Releases.

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

GitHub Actions (`.github/workflows/release.yml`) automatically creates the GitHub Release with `main.js`, `manifest.json`, `versions.json`, and a zip archive when the tag is pushed.
