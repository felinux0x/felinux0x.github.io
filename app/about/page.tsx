import Link from "next/link";
import { ArrowLeft, Github, Mail, Youtube, Flag, Box } from "lucide-react";
import { ScrollAnimation } from "@/components/ScrollAnimation";

export default function About() {
  return (
    <div>
      {/* About Header */}
      <ScrollAnimation>
        <section className="py-8 border-b border-white/30">
          <div className="container mx-auto px-4">
            <Link href="/" className="inline-flex items-center text-sm hover:text-gray-400 mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" /> Voltar para Home
            </Link>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Sobre Mim
            </h1>
            <p className="text-lg opacity-80">Conheça mais sobre Felipe e sua jornada em segurança ofensiva</p>
          </div>
        </section>
      </ScrollAnimation>

      {/* About Content */}
      <section className="py-12 border-b border-white/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto space-y-8">
            <ScrollAnimation delay={200}>
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">
                  Quem sou eu
                </h2>
                <p className="opacity-80 leading-relaxed mb-4">
                  Olá! Meu nome é <span className="text-green-400 font-semibold">Felipe</span> e sou um especialista em
                  segurança ofensiva com foco em <span className="text-green-400">penetration testing</span>, 
                  <span className="text-green-400"> red team</span> e <span className="text-green-400">CTF challenges</span>.
                </p>
                <p className="opacity-80 leading-relaxed mb-4">
                  Estou constantemente desenvolvendo minhas habilidades através de laboratórios práticos em plataformas como
                  Hack The Box, TryHackMe e cenários reais. Meu objetivo é crescer continuamente na área de segurança ofensiva
                  e contribuir ativamente para a comunidade infosec.
                </p>
                <p className="opacity-80 leading-relaxed">
                  Acredito na importância de compartilhar conhecimento e melhorar a segurança através de pesquisa responsável
                  e hacking ético. Todos os meus projetos e ferramentas são desenvolvidos com educação e defesa em mente.
                </p>
              </div>
            </ScrollAnimation>

            <ScrollAnimation delay={300}>
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">
                  Minha Jornada
                </h2>
                <div className="space-y-4">
                  <div className="border-l-2 border-green-400 pl-4">
                    <h3 className="font-bold text-white mb-1">Início na Segurança</h3>
                    <p className="text-sm opacity-70">Comecei minha jornada aprendendo conceitos fundamentais de cybersecurity e explorando vulnerabilidades web.</p>
                  </div>
                  <div className="border-l-2 border-green-400 pl-4">
                    <h3 className="font-bold text-white mb-1">CTF & HackTheBox</h3>
                    <p className="text-sm opacity-70">Aprofundei conhecimentos resolvendo centenas de máquinas CTF, desenvolvendo skills em enumeration, exploitation e privilege escalation.</p>
                  </div>
                  <div className="border-l-2 border-green-400 pl-4">
                    <h3 className="font-bold text-white mb-1">Desenvolvimento de Ferramentas</h3>
                    <p className="text-sm opacity-70">Criei ferramentas open-source para segurança, incluindo HIDS, IDS frameworks e scripts de pentest.</p>
                  </div>
                  <div className="border-l-2 border-green-400 pl-4">
                    <h3 className="font-bold text-white mb-1">Compartilhamento de Conhecimento</h3>
                    <p className="text-sm opacity-70">Documeno walkthroughs detalhados e metodologias de hacking ético neste portfólio.</p>
                  </div>
                </div>
              </div>
            </ScrollAnimation>

            <ScrollAnimation delay={400}>
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">
                  Áreas de Especialidade
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border border-white/30 p-4 rounded">
                    <h3 className="font-bold text-white mb-2">Ofensiva</h3>
                    <ul className="text-sm opacity-80 space-y-1">
                      <li>✓ Penetration Testing</li>
                      <li>✓ Privilege Escalation</li>
                      <li>✓ Exploit Development</li>
                      <li>✓ Red Team Operations</li>
                    </ul>
                  </div>
                  <div className="border border-white/30 p-4 rounded">
                    <h3 className="font-bold text-white mb-2">Técnicas</h3>
                    <ul className="text-sm opacity-80 space-y-1">
                      <li>✓ Active Directory Attacks</li>
                      <li>✓ Web Application Security</li>
                      <li>✓ Network Security</li>
                      <li>✓ Reverse Engineering</li>
                    </ul>
                  </div>
                </div>
              </div>
            </ScrollAnimation>

            <ScrollAnimation delay={500}>
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">
                  Conecte-se Comigo
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <a
                    href="https://github.com/felinux0x"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 border border-white/30 rounded hover:bg-white/5 transition-all hover:scale-105"
                  >
                    <Github className="h-5 w-5 text-green-400 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-white text-sm">GitHub</h3>
                      <p className="text-xs opacity-70">@felinux0x</p>
                    </div>
                  </a>

                  <a
                    href="https://twitter.com/felinux0x"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 border border-white/30 rounded hover:bg-white/5 transition-all hover:scale-105"
                  >
                    <Box className="h-5 w-5 text-green-400 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-white text-sm">Twitter</h3>
                      <p className="text-xs opacity-70">@felinux0x</p>
                    </div>
                  </a>

                  <a
                    href="https://app.hackthebox.com/profile/2483868"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 border border-white/30 rounded hover:bg-white/5 transition-all hover:scale-105"
                  >
                    <Flag className="h-5 w-5 text-green-400 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-white text-sm">HackTheBox</h3>
                      <p className="text-xs opacity-70">fe1ps</p>
                    </div>
                  </a>

                  <a
                    href="https://tryhackme.com/p/Fe1ps"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 border border-white/30 rounded hover:bg-white/5 transition-all hover:scale-105"
                  >
                    <Box className="h-5 w-5 text-green-400 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-white text-sm">TryHackMe</h3>
                      <p className="text-xs opacity-70">Fe1ps</p>
                    </div>
                  </a>

                  <a
                    href="mailto:seu-email@exemplo.com"
                    className="flex items-center gap-3 p-4 border border-white/30 rounded hover:bg-white/5 transition-all hover:scale-105"
                  >
                    <Mail className="h-5 w-5 text-green-400 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-white text-sm">Email</h3>
                      <p className="text-xs opacity-70">Enviar mensagem</p>
                    </div>
                  </a>

                  <a
                    href="https://youtube.com/@Fe1ps-pwnd"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 border border-white/30 rounded hover:bg-white/5 transition-all hover:scale-105"
                  >
                    <Youtube className="h-5 w-5 text-green-400 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-white text-sm">YouTube</h3>
                      <p className="text-xs opacity-70">Fe1ps</p>
                    </div>
                  </a>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <ScrollAnimation delay={600}>
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center border border-white/30 rounded p-8 bg-white/5">
              <h2 className="text-2xl font-bold text-white mb-4">Vamos Colaborar?</h2>
              <p className="opacity-80 mb-6">
                Estou sempre aberto a colaborações, pesquisa em segurança e discussões sobre ofensiva.
              </p>
              <Link
                href="/articles"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded hover:bg-white/90 transition-colors"
              >
                Veja meus Artigos
              </Link>
            </div>
          </div>
        </section>
      </ScrollAnimation>
    </div>
  )
}
