import Link from "next/link"
import { FileText, User, Calendar, Terminal, Github, Download } from "lucide-react"
import { YouTubeVideo } from "./components/YouTubeVideo"
import { ScrollAnimation } from "@/components/ScrollAnimation";

interface Tool {
  name: string
  description: string
  language: string
  githubUrl: string
  downloadUrl: string
}

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <ScrollAnimation>
        <section className="py-12 border-b border-white/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                <span className="text-white">root@fe1ps ~$</span>
              </h1>
              <p className="text-lg mb-8 opacity-80">
                I share content about hacking.
              </p>
            </div>
          </div>
        </section>
      </ScrollAnimation>

      {/* Featured Articles */}
      <ScrollAnimation delay={200}>
        <section className="py-12 border-b border-white/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8 flex items-center">
              <span className="text-white mr-2">~$ ls</span>
              <span className="text-white">FEATURED_ARTICLES</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredArticles.map((article, index) => (
                <article key={index} className="border border-white/30 bg-black hover:bg-white/5 transition-transform duration-300 hover:scale-105 p-4">
                  <div className="flex items-center space-x-2 text-xs mb-2 text-white/70">
                    <Calendar className="h-3 w-3" />
                    <span>{article.date}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">{article.title}</h3>
                  <p className="text-sm opacity-70 mb-4">{article.excerpt}</p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2 text-xs">
                      <User className="h-3 w-3" />
                      <span>{article.author}</span>
                    </div>
                    <Link
                      href={`/articles/${article.slug}`}
                      className="flex items-center text-xs text-white hover:text-gray-400 transition-colors"
                    >
                      <FileText className="mr-1 h-3 w-3" />
                      Read More
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </ScrollAnimation>

      {/* Featured Tools */}
      <ScrollAnimation delay={400}>
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8 flex items-center">
              <span className="text-white mr-2">~$ ls</span>
              <span className="text-white">FEATURED_TOOLS</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredTools.map((tool, index) => (
                <div key={index} className="border border-white/30 p-6 hover:bg-white/5 transition-transform duration-300 hover:scale-105">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center">
                      <Terminal className="h-5 w-5 mr-3 text-white" />
                      <h3 className="text-xl font-bold text-white">{tool.name}</h3>
                    </div>
                    <span className="text-xs px-2 py-1 bg-white/10 border border-white/30">{tool.language}</span>
                  </div>
                  <p className="mt-4 opacity-80 text-sm">{tool.description}</p>
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
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollAnimation>
    </div>
  )
}

// Sample data
const featuredArticles = [
  {
    title: "Fluffy Machine HTB",
    slug: "fluffy-machine-htb",
    excerpt: "Passo a passo da máquina Fluffy Machine (HTB), desde a enumeração SMB e captura de hash NTLMv2 até a escalada de privilégios em Active Directory com Shadow Credentials (pywhisker) e abuso de templates de certificado (ESC16 com Certipy).",
    date: "2025-08-16",
    author: "fe1ps",
  },
  {
    title: "Try Hack Me - RootMe",
    slug: "tryhackme-rootme",
    excerpt: "Walkthrough da máquina RootMe do TryHackMe, abordando upload de shell reverso e escalação de privilégios via SUID em Python.",
    date: "2025-09-04",
    author: "fe1ps",
  },
  {
    title: "TryHackMe - Simple CTF",
    slug: "tryhackme-simple-ctf",
    excerpt: "Walkthrough da máquina Simple CTF do TryHackMe, explorando a CVE-2019-9053 (SQLi) no CMS Made Simple e escalando privilégios com sudo vim.",
    date: "2025-09-04",
    author: "fe1ps",
  },
  {
    title: "Try Hack Me - OverPass",
    slug: "tryhackme-overpass",
    excerpt: "Walkthrough da máquina OverPass do TryHackMe, explorando chave SSH fraca e escalação de privilégios via Crontab Hijacking.",
    date: "2025-09-06",
    author: "fe1ps",
  },
  {
    title: "TryHackMe - Brute It",
    slug: "tryhackme-bruteit",
    excerpt: "Walkthrough da máquina Brute It do TryHackMe, focando em brute force com Hydra, quebra de senha de chave SSH com John the Ripper e escalação de privilégios via sudo cat.",
    date: "2025-09-06",
    author: "fe1ps",
  }
]

const featuredTools: Tool[] = [
  {
    name: "PyVigil",
    description: "Um HIDS (Host-based Intrusion Detection System) que monitora logs em tempo real para detectar atividades suspeitas com base em regras.",
    language: "Python",
    githubUrl: "https://github.com/felinux0x/PyVigial",
    downloadUrl: "https://github.com/felinux0x/PyVigial",
  },
  {
    name: "Python IDS Framework",
    description: "Sistema de Detecção de Intrusão (IDS) baseado em regras, desenvolvido em Python com a biblioteca Scapy para análise de pacotes de rede.",
    language: "Python",
    githubUrl: "https://github.com/felinux0x/python-ids-framework",
    downloadUrl: "https://github.com/felinux0x/python-ids-framework",
  },
  {
    name: "Arch Pentest Installer",
    description: "Um script shell para provisionar um ambiente de Pentest e CTF em sistemas Arch Linux. Utiliza os repositórios oficiais e o AUR (com yay) para instalar um conjunto selecionado de ferramentas, incluindo a configuração inicial do banco de dados do Metasploit.",
    language: "Shell",
    githubUrl: "https://github.com/felinux0x/arch-pentest-installer",
    downloadUrl: "https://github.com/felinux0x/arch-pentest-installer",
  },
  {
    name: "Spectro",
    description: "Ferramenta educacional em Go para demonstrar técnicas de ofuscação de strings, gerando um programa autônomo com o payload codificado.",
    language: "Go",
    githubUrl: "https://github.com/felinux0x/spectro-go",
    downloadUrl: "https://github.com/felinux0x/spectro-go",
  },
]
