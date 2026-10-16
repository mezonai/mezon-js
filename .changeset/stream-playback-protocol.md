---
"mezon-js": patch
"mezon-js-protobuf": minor
---

Regenerate the protobuf bindings from `mezon-protocol` v2.0.87. The client can ask where to publish or watch a stream channel served by mezon-streaming-server via `GetStreamPlayback` (API index 213), and receives `StreamingViewerCountEvent` (Envelope field 101) through `onstreamingviewercount`.
