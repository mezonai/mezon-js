---
"mezon-js": patch
---

Guard the remaining `verbose` event handlers (`onstreamingviewercount`, `onsfubreakoutroomevent`) against missing `window` in Node, preserve `banner` and `pro_plan` and forward `sort_by_last_sent` in `listFriends`, and declare `v2.16.4` protocol fields (`pro_plan`, `total_members`, `co_host`) in `types.ts`.
