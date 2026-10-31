---
"mezon-sdk": minor
---

Regenerate the realtime bindings (`src/rtapi/realtime.ts`) from `mezon-protocol` v2.0.97, which adds `is_publisher` on `StreamingJoinedEvent` (mezon-protocol#62). `onStreamingJoinedEvent` listeners now get the flag, so a bot can tell a stream channel's publisher from its viewers. A proto-server that predates the flag sends no value, which reads as `false`.
