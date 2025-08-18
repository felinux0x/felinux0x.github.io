import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Como se tornar um Hacker | void",
  description: "Um guia completo com tudo o que você realmente precisa saber para se tornar um 'hacker'.",
}

export default function HowToBecomeHackerArticle() {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold pt-4 mt-4 border-t border-white/30">Como se tornar um "Hacker"</h1>
        
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold pt-4 mt-4 border-t border-white/30">Introdução</h2>
            <div className="flex justify-center">
              <img 
                src="https://i.imgur.com/kksEKYv.jpeg" 
                alt="Meme sobre hackers" 
                className="mb-4 rounded-lg"
                style={{ width: '100%', maxWidth: '500px' }}
              />
            </div>
            <p className="mb-4">
              Olá, meu nome é Felipe (também conhecido como <strong>v01d : void</strong>). Sou iniciante na área de cibersegurança, mas desde que entrei em contato com esse universo, percebi que encontrei algo que realmente me fascina. Tenho direcionado meus estudos para a <strong>segurança ofensiva</strong>, área que me motiva e desperta minha curiosidade todos os dias.
            </p>
            <p className="mb-4">
              Muitas vezes me perguntam: <em>"Como posso começar a aprender hacking?"</em> ou <em>"Por onde devo iniciar para seguir esse caminho?"</em>. Durante muito tempo também tive essas dúvidas, e sei como é difícil filtrar tanta informação disponível. Foi justamente essa vontade de ajudar quem está começando, assim como eu, que me levou a escrever este conteúdo.
            </p>
            <p className="mb-4">
              O objetivo deste artigo é compartilhar a minha visão como iniciante: os primeiros passos que estou dando, os recursos que encontrei e como estou organizando meus estudos. Não é um guia definitivo — longe disso — mas uma forma de mostrar que todos começam do zero, e que com dedicação e consistência é possível evoluir na área e construir uma base sólida.
            </p>
            <p>
              Ser um hacker vai muito além do estereótipo de alguém digitando em uma tela preta cheia de códigos. Trata-se de <strong>curiosidade</strong>, <strong>criatividade</strong> e da busca constante por entender como as coisas funcionam. A segurança ofensiva não é apenas explorar vulnerabilidades, mas também desenvolver um olhar crítico, antecipar ataques e aprender a pensar como um adversário. E é exatamente essa mentalidade que busco desenvolver dia após dia.
            </p>

          </section>

          <section>
            <h2 className="text-2xl font-bold pt-4 mt-4 border-t border-white/30">Por onde começar?</h2>
            <div className="flex justify-center">
              <img 
                src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjPoEsiLGph0H5BAV6xRvf5sp-X_hGjvk6nopg0C3AG3_j9YPwO0wJth-0A_OtWilbY3u3a2HvhIPFqbkAnV7k7BrmZk0apEbmLf4OamL4h1Fw_-eAdukoffvLUzgRq42-IMBtXCgTNvwF-vUnQtAMai7goyl2OR85JfswUuGxl6N2YnWIWFg/s1024/escada%20hacker.jpeg" 
                alt="Caminho do Hacker" 
                className="mb-4 rounded-lg"
                style={{ width: '100%', maxWidth: '400px' }}
              />
            </div>
            <p className="mb-4">
              Esta é, sem dúvida, a parte mais difícil. A área de cibersegurança é extremamente vasta e, diferente de alguns anos atrás, hoje temos uma quantidade imensa de conteúdos e cursos gratuitos disponíveis na internet. Por um lado, isso é ótimo, mas, por outro, pode te deixar perdido em um mar de informações. Então, por onde começar? A resposta é simples: <strong>pelos fundamentos!</strong>
            </p>
            <p className="mb-4">
              Não caia na ilusão de que assistir a um vídeo de uma hora no YouTube será o suficiente para sair hackeando por aí e se candidatando a vagas. Não é assim que funciona. Também não vou dizer que esta é uma área fácil e que você estará empregado em um mês de estudo — a realidade é que cibersegurança não é uma área de <em>entrada</em>, ela exige uma base sólida e muitos conhecimentos prévios.
            </p>
            <p className="mb-4">
              Um erro comum de quem está começando é achar que fazer um curso de 40 horas será o bastante para adquirir todo o conhecimento necessário para entrar no mercado. Não caia nessas promessas de "gurus". Se você realmente quer se destacar e se tornar um profissional de excelência, precisa <strong>dominar os fundamentos</strong> primeiro.
            </p>
            <p>
              Mas o que exatamente significa "os fundamentos"? Significa ter uma boa compreensão das bases da computação, incluindo redes, programação (sim, você precisa saber programar se quiser ser um bom profissional — falarei mais sobre isso adiante), sistemas operacionais e muito mais. Sem essa base, qualquer conhecimento mais avançado será inconsistente e de difícil aplicação.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold pt-4 mt-4 border-t border-white/30">Aprendendo os Fundamentos</h2>
            <p className="mb-4">
              Muitas pessoas que desejam entrar em cibersegurança têm pressa em aprender a invadir sistemas, explorar falhas ou realizar testes de invasão. No entanto, sem uma base sólida, todo esse conhecimento acaba sendo superficial e de difícil aplicação prática. A verdade é que a segurança ofensiva não se resume a decorar comandos ou seguir tutoriais — é preciso entender como as tecnologias funcionam antes de aprender a explorá-las.
            </p>
            <div className="flex justify-center">
              <img 
                src="https://i.imgur.com/jZQRsRT.png" 
                alt="Meme sobre hackers" 
                className="mb-4 rounded-lg"
                style={{ width: '100%', maxWidth: '500px' }}
              />
            </div>
            <p className="mb-4">
              Pense em cibersegurança como a construção de um prédio. Antes de levantar andares e instalar sistemas complexos, é essencial ter uma fundação bem estruturada. Da mesma forma, antes de aprender a encontrar e explorar vulnerabilidades, você precisa entender sobre <strong>redes, sistemas operacionais, programação e os princípios básicos de segurança da informação</strong>. Ignorar essa base só vai te atrasar a longo prazo, pois você pode acabar dependendo de ferramentas prontas sem realmente entender o que está fazendo.
            </p>
            <p className="mb-8">
              Outro erro comum de iniciantes é buscar atalhos — assistir a um tutorial de hacking no YouTube e achar que já está pronto para atuar na área. A realidade é que os melhores profissionais são aqueles que dominam os fundamentos e conseguem pensar fora da caixa para encontrar soluções criativas. <strong>Aprender bem o básico te dá autonomia, permite entender e criar suas próprias ferramentas e, acima de tudo, te diferencia da maioria.</strong>
            </p>

            <h3 className="text-xl font-bold pt-2 mt-4 border-t border-white/30">1. Redes de Computadores</h3>
            <p className="mb-4">
              A internet e praticamente todos os sistemas que usamos hoje dependem de redes para funcionar. Se você quer atuar em segurança ofensiva, entender como ocorre a comunicação entre dispositivos é fundamental. Muitos ataques exploram falhas em protocolos de rede, configurações incorretas de firewalls ou exposição de serviços inseguros.
            </p>
            <div className="bg-gray-800 p-6 rounded-lg mb-6">
              <h4 className="text-lg font-bold mb-3">O que estudar?</h4>
              <ul className="list-disc list-inside space-y-2">
                <li><strong>Modelo OSI e TCP/IP</strong> → Entender como a comunicação na internet é estruturada.</li>
                <li><strong>Principais protocolos</strong> → HTTP, HTTPS, DNS, ARP, ICMP, SSH, SMB, RDP, entre outros.</li>
                <li><strong>Endereçamento IP e Sub-redes</strong> → IPv4, IPv6, NAT e como funciona o roteamento de pacotes.</li>
                <li><strong>Análise de tráfego de rede</strong> → Usar ferramentas como Wireshark e tcpdump para inspecionar pacotes.</li>
                <li><strong>Ataques comuns de rede</strong> → ARP Spoofing, Man-in-the-Middle (MITM), Sniffing, etc.</li>
              </ul>
            </div>
            <p className="mb-8 italic">
              <strong>Dica:</strong> A melhor forma de aprender redes é colocando a mão na massa! Instale o Wireshark e analise os pacotes da sua própria rede, monte um pequeno ambiente de testes com máquinas virtuais e simule cenários.
            </p>

            <h3 className="text-xl font-bold pt-2 mt-4 border-t border-white/30">2. Sistemas Operacionais</h3>
            <p className="mb-4">
              Um hacker precisa ter familiaridade com os sistemas operacionais que pretende atacar e proteger. Isso significa entender como eles funcionam internamente, quais são suas vulnerabilidades e como interagir com eles principalmente via linha de comando.
            </p>
            <div className="bg-gray-800 p-6 rounded-lg mb-6">
              <h4 className="text-lg font-bold mb-3">O que estudar?</h4>
              <ul className="list-disc list-inside space-y-2">
                <li><strong>Linux e Windows</strong> → São os sistemas mais comuns em ambientes corporativos e servidores.</li>
                <li><strong>Comandos essenciais de terminal</strong> → Shell script em Linux, PowerShell em Windows.</li>
                <li><strong>Gerenciamento de processos e permissões</strong> → Como funcionam usuários, grupos, privilégios e controles de acesso.</li>
                <li><strong>Arquitetura de sistemas</strong> → Filesystem, registros, serviços e logs.</li>
                <li><strong>Ferramentas de administração</strong> → Netcat, Nmap, Sysinternals, Task Manager, etc.</li>
              </ul>
            </div>
            <p className="mb-8 italic">
              <strong>Dica:</strong> Use Linux no seu dia a dia, seja em máquina virtual, instalando o WSL no Windows ou em dualboot. Experimente rodar comandos, explorar diretórios e entender como o sistema responde.
            </p>

            <h3 className="text-xl font-bold pt-2 mt-4 border-t border-white/30">3. Programação e Scripting</h3>
            <p className="mb-4">
              Se você quer se tornar um hacker de verdade, e não apenas alguém que roda ferramentas prontas sem entender o que está acontecendo, aprender a programar é essencial. A programação permite automatizar tarefas, desenvolver seus próprios exploits e entender melhor o funcionamento das vulnerabilidades que está explorando.
            </p>
            <div className="bg-gray-800 p-6 rounded-lg mb-6">
              <h4 className="text-lg font-bold mb-3">O que estudar?</h4>
              <ul className="list-disc list-inside space-y-2">
                <li><strong>Python</strong> → Linguagem essencial para scripts de automação, desenvolvimento de exploits e análise de segurança.</li>
                <li><strong>Bash e PowerShell</strong> → Scripts para automação de tarefas e administração de sistemas.</li>
                <li><strong>SQL</strong> → Entender sobre bancos de dados e SQL injection.</li>
                <li><strong>Javascript e Web</strong> → Para quem deseja atuar em segurança de aplicações web.</li>
              </ul>
            </div>
            <p className="mb-8 italic">
              <strong>Dica:</strong> Comece escrevendo pequenos scripts para automatizar tarefas simples. Tente criar um port scanner em Python ou um script em Bash para monitorar processos no Linux.
            </p>

            <h3 className="text-xl font-bold pt-2 mt-4 border-t border-white/30">4. Conceitos de Segurança da Informação</h3>
            <p className="mb-4">
              Por fim, é fundamental entender os princípios básicos de segurança da informação e os principais tipos de ataques que são utilizados no mundo real. Isso ajudará você a pensar de forma ofensiva e defensiva ao mesmo tempo.
            </p>
            <div className="bg-gray-800 p-6 rounded-lg mb-6">
              <h4 className="text-lg font-bold mb-3">O que estudar?</h4>
              <ul className="list-disc list-inside space-y-2">
                <li><strong>Tríade CIA</strong> → Confidencialidade, Integridade e Disponibilidade - Base da segurança da informação.</li>
                <li><strong>Tipos de ameaças</strong> → Malware, phishing, ataques de engenharia social, etc.</li>
                <li><strong>Exploração de vulnerabilidades</strong> → Buffer overflow, XSS, SQL Injection, etc.</li>
                <li><strong>Criptografia</strong> → Como funcionam os principais algoritmos e sua aplicação em segurança.</li>
                <li><strong>Metodologias de Pentest</strong> → OWASP, PTES, NIST, etc.</li>
              </ul>
            </div>
            <p className="mb-4 italic">
              <strong>Dica:</strong> Acompanhe sites como o OWASP e o CVE Details para se manter atualizado sobre novas vulnerabilidades e entender como elas funcionam.
            </p>
            <p>
              Estes são os pilares fundamentais para quem quer ingressar em segurança ofensiva. Você não precisa dominar tudo de uma vez, mas deve começar a estudar cada um desses tópicos com dedicação.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold pt-4 mt-4 border-t border-white/30">Onde estudar</h2>
            <p className="mb-4">
              Ok, agora você provavelmente está se perguntando: onde encontrar todo esse conteúdo? Felizmente, existem diversas plataformas excelentes que abordam esses temas, tanto na teoria quanto na prática. Duas que eu gosto e mais recomendo são a <strong>TryHackMe</strong> e a <strong>Hack The Box</strong>. Ambas oferecem conteúdos gratuitos, mas a maior parte do material, principalmente o mais avançado, é pago.
            </p>
            <p className="mb-4">
              Se o seu orçamento permitir, posso dizer por experiência própria que vale a pena investir nessas plataformas. Elas são estruturadas de forma a proporcionar um aprendizado prático e bem orientado, além de oferecerem ambientes de simulação realistas, onde você pode testar suas habilidades em desafios que, de fato, simulam cenários do mundo real.
            </p>
            <p className="mb-4">
              No entanto, recomendo que você escolha <strong>apenas uma dessas plataformas</strong>, a depender do seu orçamento. Assinar as duas não é necessário e pode, na verdade, ser contraproducente, pois você acaba se perdendo em tanto conteúdo. O segredo aqui é o <strong>foco</strong>: escolha uma plataforma, assine e se dedique a ela.
            </p>
            <p className="mb-4">
              Ok, mas e se eu não tiver dinheiro? Sem problemas! Todo o conteúdo oferecido por essas plataformas pode ser encontrado de graça na internet. A grande diferença é que nas plataformas pagas, o conteúdo já está <strong>selecionado</strong> e <strong>organizado</strong> para você. Sem uma plataforma, você terá que fazer esse trabalho de pesquisa e curadoria por conta própria.
            </p>
            <p className="mb-4">
              Se você quer aprender sobre um determinado tema, como <strong>segurança de redes</strong> ou <strong>programação em Python</strong>, entre no ChatGPT e peça para ele criar uma estratégia de aprendizado sobre o assunto em tópicos. Em seguida, peça para que ele detalhe cada tópico e, se possível, peça links de referência para materiais de apoio. Isso lhe dará uma visão estruturada do que precisa estudar e por onde começar.
            </p>
            <p className="mb-4">
              Além disso, outra estratégia eficaz é acessar plataformas como a <strong>TryHackMe</strong> e a <strong>Hack The Box</strong>, ver os tipos de desafios e temas que elas cobrem e, em seguida, usar o ChatGPT para detalhar esses tópicos. Com a ajuda da IA, você não apenas terá um conteúdo organizado, mas também terá acesso a links e recursos gratuitos que abordam cada um desses pontos.
            </p>
            <p className="mb-4">
              Essa dica não vale apenas para quem quer estudar de graça, mas também para quem já assinou as plataformas. Mesmo que você tenha acesso a um conteúdo pago, não se sinta limitado a estudar apenas o material publicado ali. Se estiver em um tópico e não entender algo, peça para a inteligência artificial te explicar de uma forma diferente.
            </p>
            <p className="mb-4">
              A inteligência artificial pode ser uma poderosa <strong>ferramenta complementar</strong>, oferecendo explicações detalhadas, além de organizar seu estudo, ajudando a montar um plano de aprendizado bem estruturado e acessível.
            </p>
            <p className="italic">
              Uma dica importante: se você possui um e-mail acadêmico, use-o ao se cadastrar nessas plataformas. Muitas delas oferecem <strong>descontos para estudantes</strong>, o que pode representar uma economia significativa.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold pt-4 mt-4 border-t border-white/30">Roadmap (Plano de Estudos)</h2>
            <p className="mb-4">
              Uma situação comum é as pessoas se cadastrarem em uma dessas plataformas e acabarem se sentindo perdidas, especialmente por oferecerem uma vasta quantidade de conteúdos e cursos diferentes. Com tantas opções, é natural ficar confuso sobre qual curso começar e como organizar os estudos de forma eficiente.
            </p>
            <p className="mb-4">
              Para te ajudar nesse processo, vou usar a plataforma <strong>TryHackMe</strong> como exemplo, pois é a que tenho mais experiência e a que eu mesmo utilizei quando estava começando. É também a plataforma que recomendo aos meus amigos quando me perguntam onde estudar.
            </p>
            <p className="mb-4">
              Atualmente, na data de publicação deste artigo, a própria <strong>TryHackMe</strong> oferece um <strong>roadmap</strong> que orienta o usuário sobre por onde começar e como progredir nos cursos. Isso foi criado justamente para evitar que iniciantes se sintam perdidos e saibam exatamente qual caminho seguir para se aprofundar na área.
            </p>
            <p className="mb-4">
              Após se cadastrar, basta acessar <a href="https://tryhackme.com/hacktivities?tab=roadmap" className="text-blue-500 hover:text-blue-600">https://tryhackme.com/hacktivities?tab=roadmap</a>, onde você encontrará o <strong>roadmap completo</strong>. Ele apresenta uma sequência de cursos e atividades, desde o início, para garantir que você construa sua base de conhecimento de forma sólida. O roadmap também indica os próximos passos à medida que você conclui cada curso.
            </p>
            <p>
              Eu mesmo já fiz vários desses cursos e, na minha opinião, a estrutura do roadmap é bem organizada, oferecendo uma direção clara a ser seguida. É uma ótima forma de garantir que você está aprendendo o que realmente precisa, sem se perder em meio a tantas opções. Se você está começando, esse roadmap será uma excelente ferramenta para tornar sua jornada de aprendizado mais suave e eficiente.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold pt-4 mt-4 border-t border-white/30">Conclusão</h2>
            <p className="mb-4">
              Bem, espero que com este artigo você tenha uma ideia mais clara de por onde começar nesta incrível área de cibersegurança. Mais importante, espero que tenha entendido a <strong>importância de não pular etapas</strong> e de <strong>aprender bem os fundamentos</strong>. Cibersegurança é um campo vasto e desafiador, e cada passo que você der na construção de uma base sólida o ajudará a se tornar um profissional mais competente e preparado.
            </p>
            <p className="mb-4">
              Lembre-se, <strong>vá com calma</strong>. A jornada de aprendizado é longa, mas extremamente recompensadora. Aproveite cada momento e cada desafio, pois é no processo que você realmente cresce. O conhecimento que você acumular ao longo do caminho será a base para suas futuras conquistas.
            </p>
            <p>
              Seja bem-vindo a este mundo fascinante, onde a curiosidade e a persistência são seus melhores aliados. O caminho pode ser difícil, mas as recompensas, tanto em aprendizado quanto em conquistas, serão imensas. Boa sorte em sua jornada e lembre-se: nunca pare de aprender!
            </p>
            <div className="flex justify-center">
              <img 
                src="https://i.imgur.com/xSXVPqx.png" 
                alt="Meme sobre hackers" 
                className="mb-4 rounded-lg"
                style={{ width: '100%', maxWidth: '400px' }}
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
