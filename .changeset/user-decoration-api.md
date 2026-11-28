---
"mezon-js": patch
"mezon-js-protobuf": patch
---

Separate user avatar decoration API (`ListUserDecorations` = 226, `UpdateUserDecoration` = 227, `UserDecorationUpdatedEvent` Envelope field 110): add `listUserDecorations` (user ids, or a clan id for the per-clan list), `updateUserDecoration`, `onuserdecorationupdated`, types `ApiUserDecoration`, `ApiUserDecorationList`, `UserDecorationUpdatedEvent`, and regenerated ts-proto 1.181.2 bindings (including `mezon-sdk` parity copies).
