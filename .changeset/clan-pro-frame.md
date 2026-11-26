---
"mezon-js": patch
"mezon-js-protobuf": patch
---

Clan Pro decoration frame (MEZON-1415). `mezon-js-protobuf` is regenerated from mezon-protocol v2.16.6 with ts-proto 1.181.2 (regenerating the previous protocol first gave the committed files), which adds `ClanDesc.frame`, `UpdateClanDescRequest.frame` (Int32Value) and `ClanUpdatedEvent.frame`, plus the `join_mode` fields and join-pending messages of that protocol version. `ApiClanDesc`, `MezonUpdateClanDescBody` and `ClanUpdatedEvent` declare the optional `frame` field (and `ClanUpdatedEvent.pro_plan`, which the server already sends); `updateClanDesc` sends `frame: 0` to clear it and leaves the stored frame alone when `frame` is omitted.
