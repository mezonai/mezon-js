---
"mezon-js": patch
"mezon-js-protobuf": patch
---

Add `FriendStateUpdated` (Envelope field 107) and the `onfriendstateupdated` socket handler: the server sends it to the acting user's own sessions after they add, accept, block or unblock a friend, so their other devices show the same relationship. `AddFriend` gains `accepted`, set when the event means the receiver's pending request was accepted.
