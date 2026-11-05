---
"mezon-js": minor
"mezon-js-protobuf": patch
---

Add the client APIs the web app could not reach: `sfuBreakoutRoom`, `sfuBreakoutMerge` (plus the `onsfubreakoutroomevent` envelope handler and the `SfuBreakoutRoomEvent` export), `linkCDNFile`, `unlinkMezon` and `deleteSdTopic`. Also fix `multipartUploadAttachmentFileFinish`, which posted to `MultipartUploadAttachmentFileStart`.
