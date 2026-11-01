---
"mezon-js-protobuf": patch
---

Fix the Node TCP adapter (`abridged_tcp_adapter.ts`), which took every TCP read for exactly one frame. It now buffers reads and delivers one message per complete frame, in order, when a frame is split across reads or several frames share one read. Before, an API response whose header and payload arrived in separate reads resolved with code 0 and an empty payload, and the rest of the stream was misread. It also reads the WebSocket-framed (`0x82`) events that mezon-proto-server forwards on the TCP socket, such as `StreamingJoinedEvent`, which it used to drop with "Received unexpected first byte: 130". Like the other clients, it closes the connection on an unknown lead byte or on a frame longer than 16 MiB (API) or 1 MiB (realtime), and fails an API response that grows past 16 MiB with code `0xFFFF`.
