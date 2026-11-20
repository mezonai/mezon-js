---
"mezon-js": patch
---

`listClanUsers` keeps each member's profile `banner`. The server has sent `User.banner` in `ListClanUsers` since protocol v2.0.99, but the client copied the user fields one by one and left it out, so web clients could not show other members' cover images.
