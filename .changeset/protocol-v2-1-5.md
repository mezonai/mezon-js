---
"mezon-js-protobuf": patch
"mezon-sdk": patch
---

Regenerate the API bindings from `mezon-protocol` v2.1.5. `ListFriendsRequest` gains `sort_by_last_sent` (v2.1.4), and `UpdateAccountRequest.pro_plan` and `UpdateClanDescRequest.pro_plan` are removed, as in the protocol. mezon-sdk's copies (`src/api/api.ts`, `src/rtapi/realtime.ts`) also pick up `FriendStateUpdated` (Envelope field 107) and `AddFriend.accepted`, and are again byte-identical to mezon-js-protobuf.
