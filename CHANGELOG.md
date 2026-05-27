# Changelog

## 1.1.1

- **Security patches** — upgraded bundled `defuddle` to 0.18.x (transitively patches `@xmldom/xmldom`) and `esbuild` to 0.28.x, plus npm overrides for `fast-uri` and `picomatch`. Clears all open Dependabot advisories.

## 1.1.0

- **Import X article body** — pull the full body of a bookmarked X long-form article into its note and rename the file to the article title. Right-click in the note, command palette, or toolbar button while viewing the article.
- **Long tweets imported in full** — premium long-form posts (`note_tweet`) are no longer truncated at the visible "Show more" cutoff.
- **Images embedded** — photo attachments on bookmarked tweets now appear in the note as Markdown image links to the X CDN.
- **Re-import a single bookmark** — refresh one note's content on the next sync without clearing your entire import history.
- **Toolbar restructured** — new **Import article** button on `/status/` and `/article/` pages; **Copy main content** (replaces "Copy as Markdown") now strips replies and thread context.
