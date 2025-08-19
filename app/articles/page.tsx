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
    author: "v01d",
    category: "Writeup",
  },
  {
    title: "Explorando Buffer Overflows em Aplicações Modernas",
    slug: "buffer-overflows-modern-applications",
    excerpt:
      "Uma análise aprofundada das vulnerabilidades de buffer overflow que ainda afetam softwares modernos, apesar de décadas de conhecimento sobre o tema.",
    date: "2023-11-15",
    author: "axroot",
    category: "Desenvolvimento de Exploits",
  },
  {
    title: "Técnicas Avançadas de Persistência em Sistemas Linux",
    slug: "advanced-persistence-linux",
    excerpt:
      "Examinando métodos sofisticados que atacantes usam para manter acesso a ambientes Linux comprometidos. Aprenda sobre rootkits, backdoors e outros mecanismos.",
    date: "2023-10-28",
    author: "axroot",
    category: "Análise de Malware",
  },
  {
    title: "Engenharia Reversa de Protocolos Proprietários",
    slug: "reverse-engineering-protocols",
    excerpt:
      "Metodologias e ferramentas para analisar e compreender protocolos de rede não documentados. Um guia sobre o processo de descoberta, análise e documentação.",
    date: "2023-10-12",
    author: "axroot",
    category: "Engenharia Reversa",
  },
  {
    title: "Metodologia para Descoberta de Vulnerabilidades Zero-Day",
    slug: "zero-day-discovery",
    excerpt:
      "Uma abordagem estruturada para encontrar vulnerabilidades desconhecidas em software e hardware, cobrindo desde a seleção do alvo até o disclosure responsável.",
    date: "2023-09-30",
    author: "axroot",
    category: "Desenvolvimento de Exploits",
  },
  {
    title: "Fundamentos de Exploração de Kernel",
    slug: "kernel-exploitation",
    excerpt:
      "Entendendo o básico de vulnerabilidades a nível de kernel e como desenvolver exploits confiáveis. Um mergulho técnico em estruturas, gerenciamento de memória e escalada de privilégios.",
    date: "2023-09-15",
    author: "axroot",
    category: "Desenvolvimento de Exploits",
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