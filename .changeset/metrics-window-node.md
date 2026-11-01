---
"mezon-js": patch
---

`MetricsLatencyApi` dispatches the `CHECK_HEALTHY` event only when `window` exists. In Node, once 20 requests had been measured and more than 5% of them took over 1 s, it threw `ReferenceError: window is not defined` from the socket message handler and from the send timeout.
