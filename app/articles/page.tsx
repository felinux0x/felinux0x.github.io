import Link from "next/link"
import { Calendar, User } from "lucide-react"

// --- DADOS ---
// Em um projeto real, estes dados viriam de um CMS ou de arquivos .mdx

// Função para formatar a data para o padrão brasileiro (ex: "18 de agosto de 2025")
const formatDate = (dateString: string) => {
  // Adiciona T00:00:00 para garantir que a data seja interpretada como local e não UTC
  const date = new Date(dateString + "T00:00:00"); 
  return new Intl.DateTimeFormat('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

// Lista de artigos unificada e traduzida
const allArticles = [
  {
    title: "Fluffy Machine - Writeup HTB",
    slug: "fluffy-machine-htb",
    excerpt: "Writeup da máquina Fluffy Machine do Hack The Box, explorando vulnerabilidades em Active Directory e escalada de privilégios via AD CS.",
    date: "2025-08-16",
    author: "fe1ps",
    category: "Writeup",
  },
  {
    title: "Try Hack Me - RootMe",
    slug: "tryhackme-rootme",
    excerpt: "Walkthrough da máquina RootMe do TryHackMe, abordando upload de shell reverso e escalação de privilégios via SUID em Python.",
    date: "2025-09-04",
    author: "fe1ps",
    category: "Writeup",
  },
  {
    title: "TryHackMe - Simple CTF",
    slug: "tryhackme-simple-ctf",
    excerpt: "Walkthrough da máquina Simple CTF do TryHackMe, explorando a CVE-2019-9053 (SQLi) no CMS Made Simple e escalando privilégios com sudo vim.",
    date: "2025-09-04",
    author: "fe1ps",
    category: "Writeup",
  },
  {
    title: "Try Hack Me - OverPass",
    slug: "tryhackme-overpass",
    excerpt: "Walkthrough da máquina OverPass do TryHackMe, explorando chave SSH fraca e escalação de privilégios via Crontab Hijacking.",
    date: "2025-09-06",
    author: "fe1ps",
    category: "Writeup",
  },
  {
    title: "TryHackMe - Brute It",
    slug: "tryhackme-bruteit",
    excerpt: "Walkthrough da máquina Brute It do TryHackMe, focando em brute force com Hydra, quebra de senha de chave SSH com John the Ripper e escalação de privilégios via sudo cat.",
    date: "2025-09-06",
    author: "fe1ps",
    category: "Writeup",
  },
]

// Lista de categorias traduzida
const categories = [
  { name: "Análise de Malware", slug: "malware-analysis" },
  { name: "Desenvolvimento de Exploits", slug: "exploit-development" },
  { name: "Segurança de Redes", slug: "network-security" },
  { name: "Segurança Web", slug: "web-security" },
  { name: "Engenharia Reversa", slug: "reverse-engineering" },
  { name: "Criptografia", slug: "cryptography" },
  { name: "OSINT", slug: "osint" },
  { name: "Engenharia Social", slug: "social-engineering" },
  { name: "Writeup", slug: "writeup" },
  { name: "Conceitos", slug: "conceitos" },
]

// --- COMPONENTE ---

export default function ArticlesPage() {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold pt-4 mt-4 border-t border-white/30">Artigos</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {allArticles.map((article) => (
            <Link 
              key={article.slug} 
              href={`/articles/${article.slug}`}
              className="group block border border-white/20 bg-black hover:border-white/50 transition-all p-5 rounded-lg"
            >
              <article>
                <div className="flex items-center space-x-2 text-xs mb-3 text-white/60">
                  <Calendar className="h-4 w-4" />
                  {/* Data formatada para pt-BR */}
                  <span>{formatDate(article.date)}</span>
                </div>
                <h2 className="text-xl font-bold mb-3 text-white group-hover:text-sky-400 transition-colors">{article.title}</h2>
                <p className="text-sm text-white/70 mb-5 line-clamp-3">{article.excerpt}</p>
                <div className="flex items-center justify-between text-xs text-white/60 border-t border-white/20 pt-4">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span>{article.author}</span>
                  </div>
                  <span className="group-hover:translate-x-1 transition-transform">
                    Leia Mais →
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
