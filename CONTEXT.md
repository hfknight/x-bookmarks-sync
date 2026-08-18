# X Bookmarks Sync

An Obsidian desktop plugin that syncs X (Twitter) bookmarks into a vault as Markdown notes, using an embedded logged-in X webview — it never stores credentials itself.

## Language

**X session**:
The logged-in X state (cookies + local storage) held by the plugin's webviews, owned by the browser layer, never by the plugin.
_Avoid_: account, login, credentials

**Session partition**:
The dedicated Electron storage partition (`persist:x-bookmarks-sync`) that isolates the X session from the rest of Obsidian. All plugin webviews (visible and hidden) share it.

**Sign out**:
Clearing the session partition's storage locally. Does not invalidate the token on X's servers, and does not touch sync state (imported ids, waterline).
_Avoid_: disconnect, log out, reset

**Signed-in indicator**:
The settings-tab line "Signed in as @handle · as of <last sync>", showing the handle cached during the most recent sync. It is deliberately stale, never probed live; absent before the first sync and after sign out.
