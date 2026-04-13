---
title: "TTY Upgrade"
id: "tty"
icon: "material-symbols:keyboard-command-key-rounded"
commands:
  - cmd: "python3 -c 'import pty; pty.spawn(\"/bin/bash\")'"
    desc: "Python PTY Spawn"
    difficulty: "Easy"
    tags: ["post-exploit", "python", "shell"]

  - cmd: "export TERM=xterm"
    desc: "Set xterm"
    difficulty: "Easy"
    tags: ["env"]

  - cmd: "stty raw -echo; fg"
    desc: "STTY Raw Mode (After Ctrl+Z)"
    difficulty: "Medium"
    tags: ["interactive", "terminal"]
---

