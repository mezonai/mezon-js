---
"mezon-js": patch
"mezon-js-protobuf": minor
---

Regenerate the protobuf bindings from `mezon-protocol` v2.0.97, which adds `StreamingWatch` (Envelope field 104, mezon-protocol#63), `SdTopic.unread_count` (mezon-protocol#60), the everyone-override and breakout-room messages, `SfuBreakoutRoomEvent` (Envelope field 105) and `BreakoutSession`. It also moves `StreamingViewerCountEvent` from Envelope field 101 to 106 and puts `MetricMessageEvent` back on 101 (mezon-protocol#69), so `onstreamingviewercount` gets the counts that mezon-proto-server sends on 106. The WebSocket adapter now logs and drops a frame it cannot decode, as the abridged TCP adapter does, so a count that a mezon-api older than mezon-api#5944 still sends on 101 no longer throws. `writeStreamingWatch(session, channel_id, watching)` tells mezon-proto-server that this socket started or stopped watching a stream channel as audience; a server without it answers 400. `ApiNameEnum` gains the missing `LinkCDNFile` (214), so the indexes after it match the servers.
