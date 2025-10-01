import Link from "next/link"
import { ArrowLeft, Download, ExternalLink, Github, Terminal } from "lucide-react"
import { ScrollAnimation } from "@/components/ScrollAnimation";

export default function Tools() {
  return (
    <div>
      {/* Tools Header */}
      <ScrollAnimation>
        <section className="py-8 border-b border-white/30">
          <div className="container mx-auto px-4">
            <Link href="/" className="inline-flex items-center text-sm hover:text-gray-400 mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Link>

            <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
              <span className="text-white">~$ ls</span> SECURITY_TOOLS
            </h1>

            <p className="max-w-3xl opacity-80">
              A collection of custom-developed security tools and utilities for penetration testing, bug bounty,vulnerability
              assessment, and security research.
            </p>
          </div>
        </section>
      </ScrollAnimation>

      {/* Tools List */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {tools.map((tool, index) => (
              <ScrollAnimation key={index} delay={index * 100}>
                <div className="border border-white/30 p-6 hover:bg-white/5 transition-transform duration-300 hover:scale-105 h-full">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center">
                      <Terminal className="h-5 w-5 mr-3 text-white" />
                      <h2 className="text-xl font-bold text-white">{tool.name}</h2>
                    </div>
                    <span className="text-xs px-2 py-1 bg-white/10 border border-white/30">{tool.language}</span>
                  </div>

                  <p className="mt-4 opacity-80 text-sm">{tool.description}</p>

                  <div className="mt-6 space-y-2">
                    <div className="flex items-center text-xs">
                      <span className="w-24 opacity-70">Version:</span>
                      <span>{tool.version}</span>
                    </div>
                    <div className="flex items-center text-xs">
                      <span className="w-24 opacity-70">Updated:</span>
                      <span>{tool.updated}</span>
                    </div>
                    <div className="flex items-center text-xs">
                      <span className="w-24 opacity-70">Category:</span>
                      <span>{tool.category}</span>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <a
                      href={tool.githubUrl}
                      className="flex items-center space-x-1 text-xs border border-white/30 px-3 py-1.5 hover:bg-white/10 transition-colors"
                    >
                      <Github className="h-3.5 w-3.5 mr-1" />
                      <span>Source Code</span>
                    </a>
                    <a
                      href={tool.downloadUrl}
                      className="flex items-center space-x-1 text-xs border border-white/30 px-3 py-1.5 hover:bg-white/10 transition-colors"
                    >
                      <Download className="h-3.5 w-3.5 mr-1" />
                      <span>Download</span>
                    </a>
                    <a
                      href={tool.docsUrl}
                      className="flex items-center space-x-1 text-xs border border-white/30 px-3 py-1.5 hover:bg-white/10 transition-colors"
                    >
                      <ExternalLink className="h-3.5 w-3.5 mr-1" />
                      <span>Documentation</span>
                    </a>
                  </div>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <ScrollAnimation delay={200}>
        <section className="py-8 bg-white/5 border-y border-white/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-xl font-bold mb-4 text-white">
                <span className="text-white">~$ cat</span> DISCLAIMER
              </h2>
              <div className="text-sm opacity-80 space-y-3">
                <p>
                  The tools provided on this website are intended for educational and research purposes only. They should
                  only be used in environments where you have explicit permission to test.
                </p>
                <p>
                  Unauthorized use of these tools against systems you do not own or have permission to test is illegal and
                  unethical. The author takes no responsibility for any misuse of these tools.
                </p>
                <p>
                  By downloading and using these tools, you acknowledge that you understand these terms and will use them
                  responsibly and legally.
                </p>
              </div>
            </div>
          </div>
        </section>
      </ScrollAnimation>
    </div>
  )
}

// Sample data
const tools = [
  {
    name: "PyVigil",
    description:
      "Um HIDS (Host-based Intrusion Detection System) simples e robusto que monitora arquivos de log em tempo real, aplicando um conjunto de regras flexíveis para detectar atividades suspeitas.",
    language: "Python",
    version: "1.0.0",
    updated: "2025-10-01",
    category: "Defensive Security",
    githubUrl: "https://github.com/felinux0x/PyVigial",
    downloadUrl: "https://github.com/felinux0x/PyVigial",
    docsUrl: "https://github.com/felinux0x/PyVigial/blob/main/README.md",
  },
  {
    name: "Python IDS Framework",
    description:
      "Sistema de Detecção de Intrusão (IDS) baseado em regras, desenvolvido em Python com a biblioteca Scapy para análise de pacotes de rede.",
    language: "Python",
    version: "1.0.0",
    updated: "2023-09-22",
    category: "Defensive Security",
    githubUrl: "https://github.com/felinux0x/python-ids-framework",
    downloadUrl: "https://github.com/felinux0x/python-ids-framework",
    docsUrl: "https://github.com/felinux0x/python-ids-framework/blob/main/README.md",
  },
  {
    name: "Arch Pentest Installer",
    description:
      "Um script shell para provisionar um ambiente de Pentest e CTF em sistemas Arch Linux, utilizando repositórios oficiais e o AUR para instalar ferramentas.",
    language: "Shell",
    version: "1.0.0",
    updated: "2024-02-02",
    category: "Tooling",
    githubUrl: "https://github.com/felinux0x/arch-pentest-installer",
    downloadUrl: "https://github.com/felinux0x/arch-pentest-installer",
    docsUrl: "https://github.com/felinux0x/arch-pentest-installer/blob/main/README.md",
  },
  {
    name: "Spectro",
    description:
      "Ferramenta educacional em Go para demonstrar técnicas de ofuscação de strings, gerando um programa autônomo com o payload codificado.",
    language: "Go",
    version: "1.0.0",
    updated: "2025-08-28", // Data baseada no commit inicial
    category: "Tooling",
    githubUrl: "https://github.com/felinux0x/spectro-go",
    downloadUrl: "https://github.com/felinux0x/spectro-go",
    docsUrl: "https://github.com/felinux0x/spectro-go/blob/main/README.md",
  },
];

