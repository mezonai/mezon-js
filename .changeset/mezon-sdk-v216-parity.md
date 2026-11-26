---
"mezon-sdk": patch
---

Accept partial `GenerateMeetTokenRequest` and explicitly encode `current_endpoint_id: 0` on the wire, expose `FriendStateUpdated` (Envelope 107) via `Events.FriendStateUpdated` and `MezonClient.onFriendStateUpdated`, declare `pro_plan` and `total_members` on `ApiClanDesc`, and mark `listQuickMenuAccess` as deprecated for bot sessions.
