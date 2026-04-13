---
title: "Network & SMB"
id: "network"
icon: "material-symbols:router-rounded"
commands:
  - cmd: "nmap -sC -sV -p- -T4 10.10.x.x"
    desc: "Nmap Full Scan"
    difficulty: "Easy"
    tags: ["recon", "nmap"]

  - cmd: "smbclient -L //10.10.x.x/"
    desc: "List SMB Shares"
    difficulty: "Easy"
    tags: ["smb", "recon"]

  - cmd: "enum4linux -a 10.10.x.x"
    desc: "Enum4Linux All"
    difficulty: "Medium"
    tags: ["smb", "enumeration"]
---

