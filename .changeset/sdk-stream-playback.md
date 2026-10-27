---
"mezon-sdk": minor
---

Regenerate the API bindings (`src/api/api.ts`) from `mezon-protocol` v2.0.97 and add `getStreamPlayback({ channel_id, publish })` to the bot client. It asks mezon-proto-server for a stream channel grant through socket API 213 (`GetStreamPlayback`). With `publish: true` the bot gets `whip_url`, the bearer `token` and `expires_at` (Unix seconds), and can then go live on mezon-streaming-server over WHIP. A refusal rejects with the server's error code, for example 403 when the bot is not a member of the channel. The realtime bindings (`src/rtapi/realtime.ts`) stay at v2.0.86.
