---
"mezon-js-protobuf": patch
"mezon-sdk": patch
---

The Node TCP adapters (`abridged_tcp_adapter.ts` in mezon-js-protobuf and mezon-sdk) write the envelope `cid` last, so a request frame never ends in a zero byte. mezon-proto-server strips every trailing zero of an abridged frame to remove its padding; a request that ended in a real zero, such as `createChannelDesc` for a clan channel with an empty `user_ids`, lost that byte, failed to decode on the server and timed out after 10 s (MEZON-1370). The desktop client already sends envelopes this way. Envelopes without a `cid` and pings are unchanged, and the browser build (WebSocket) is not affected.
