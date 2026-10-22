---
"mezon-js": patch
"mezon-js-protobuf": minor
---

Regenerate the protobuf bindings from `mezon-protocol` v2.0.91, which adds `is_publisher` on `StreamingChannelUser` and `StreamingJoinedEvent` (mezon-protocol#62), and also brings in `LinkCDNFileRequest`, `ApiRequestEvent.region`, `StreamingNode` and `StreamingLive` from v2.0.88 to v2.0.90. `listStreamingChannelUsers` results and `StreamingJoinedEvent` carry `is_publisher`, so a stream channel's publisher can be told apart from its listed viewers.
