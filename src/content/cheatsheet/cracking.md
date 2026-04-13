---
title: "Password Cracking"
id: "cracking"
icon: "material-symbols:lock-open-rounded"
commands:
  - cmd: "ssh2john id_rsa > hash.txt; john --wordlist=rockyou.txt hash.txt"
    desc: "SSH Key Cracking"
    difficulty: "Easy"
    tags: ["john", "ssh", "passwords"]

  - cmd: "hashcat -m 22900 hash.txt rockyou.txt"
    desc: "Hashcat SSH Hash"
    difficulty: "Medium"
    tags: ["hashcat", "gpu", "passwords"]
---

