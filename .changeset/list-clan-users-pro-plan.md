---
"mezon-js": patch
---

`listClanUsers` keeps each member's `pro_plan`. The server sends `User.pro_plan` in `ListClanUsers`, but the client copied the user fields one by one and left it out, so web clients could not show the Mezon Pro badge of other members. `ApiUser` and `ApiAccount` now declare the optional `pro_plan` field that the decoded protobuf already carries.
