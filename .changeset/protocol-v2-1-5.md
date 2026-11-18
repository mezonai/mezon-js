---
"mezon-js-protobuf": patch
"mezon-sdk": patch
---

Regenerate the API bindings from `mezon-protocol` tag `v2.16`. `ListFriendsRequest` gains `sort_by_last_sent`. mezon-sdk's copies (`src/api/api.ts`, `src/rtapi/realtime.ts`) also pick up `FriendStateUpdated` (Envelope field 107) and `AddFriend.accepted`, and are again byte-identical to mezon-js-protobuf.
