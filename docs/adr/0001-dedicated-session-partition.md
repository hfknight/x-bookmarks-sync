# Dedicated Electron session partition for the X session

All plugin webviews (visible bookmarks view, hidden article fetcher, hidden recovery) use `partition="persist:x-bookmarks-sync"` instead of Obsidian's default Electron session. This makes "Sign out of X" safe (clearing our partition can't log x.com out of other plugins' webviews), makes the privacy story true (the X session lives only in this plugin's storage), and lays the rail for multi-account support (issue #6, one partition per account).

The cost: every existing user was logged out once on the release that introduced this, and switching partition names again would log everyone out again — so the partition name is effectively frozen. The alternative (staying on the shared default session) was rejected because signing out would have required clearing x.com state app-wide.
