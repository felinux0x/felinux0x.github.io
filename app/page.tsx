import Link from "next/link"
import { Sparkles, Code2, BookOpen, Zap, ArrowRight, Lightbulb, Trophy, Mail } from "lucide-react"
import { ScrollAnimation } from "@/components/ScrollAnimation"
import { ArticleCard } from "@/components/ArticleCard"
import { ToolCard } from "@/components/ToolCard"
import { TipCard } from "@/components/TipCard"
import { StatsSection } from "@/components/StatsSection"
import { getFeaturedArticles, getFeaturedTools, skills, tips } from "@/lib/data"

export default function Home() {
  const featuredArticles = getFeaturedArticles()
  const featuredTools = getFeaturedTools()
  const featuredTips = tips.slice(0, 2)

  return (
    <div>
      {/* Hero Section */}
      <ScrollAnimation>
        <section className="py-16 md:py-24 border-b border-white/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="mb-6 flex items-center gap-2">
                <span className="text-green-400">~/root</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
                Felipe
              </h1>
              <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-white/80">
                Red Team & Penetration Tester
              </h2>
              <p className="text-lg mb-8 opacity-80 leading-relaxed">
                Especializado em segurança ofensiva, testes de penetração e desafios CTF.
                Desenvolvendo ferramentas de segurança e documentando metodologias de hacking ético.
              </p>
              <div className="flex gap-4 flex-wrap">
                <Link href="/articles" className="flex items-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded hover:bg-white/90 transition-colors">
                  Artigos
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/about" className="flex items-center gap-2 px-6 py-3 border border-white/30 text-white rounded hover:bg-white/10 transition-colors">
                  Saiba Mais
                </Link>
              </div>
            </div>
          </div>
        </section>
      </ScrollAnimation>

      {/* Stats Section */}
      <ScrollAnimation delay={100}>
        <section className="py-12 border-b border-white/30">
          <div className="container mx-auto px-4">
            <StatsSection />
          </div>
        </section>
      </ScrollAnimation>

      {/* Skills Section */}
      <ScrollAnimation delay={200}>
        <section className="py-16 border-b border-white/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 flex items-center gap-3">
              <Zap className="h-8 w-8" />
              <span>Habilidades & Tecnologias</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {skills.map((skill, idx) => (
                <div key={idx} className="border border-white/30 p-6 rounded hover:bg-white/5 transition-all">
                  <h3 className="font-bold mb-4 text-white">{skill.category}</h3>
                  <ul className="space-y-2">
                    {skill.items.map((item, i) => (
                      <li key={i} className="text-sm opacity-80 flex items-center gap-2">
                        <span className="text-green-400">▪</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollAnimation>

      {/* Featured Articles */}
      <ScrollAnimation delay={400}>
        <section className="py-16 border-b border-white/30">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-3xl font-bold flex items-center gap-3">
                <BookOpen className="h-8 w-8" />
                <span>Artigos Destacados</span>
              </h2>
              <Link href="/articles" className="text-sm opacity-70 hover:opacity-100 flex items-center gap-2">
                Ver todos <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredArticles.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          </div>
        </section>
      </ScrollAnimation>

      {/* Featured Tools */}
      <ScrollAnimation delay={600}>
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-3xl font-bold flex items-center gap-3">
                <Code2 className="h-8 w-8" />
                <span>Ferramentas & Projetos</span>
              </h2>
              <Link href="/tools" className="text-sm opacity-70 hover:opacity-100 flex items-center gap-2">
                Ver todos <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredTools.map((tool) => (
                <ToolCard key={tool.name} tool={tool} />
              ))}
            </div>
          </div>
        </section>
      </ScrollAnimation>

      {/* Tips & Tricks */}
      <ScrollAnimation delay={800}>
        <section className="py-16 border-t border-white/30">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-3xl font-bold flex items-center gap-3">
                <Lightbulb className="h-8 w-8" />
                <span>Tips & Tricks</span>
              </h2>
              <Link href="/tips" className="text-sm opacity-70 hover:opacity-100 flex items-center gap-2">
                Ver todos <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredTips.map((tip) => (
                <TipCard key={tip.id} tip={tip} />
              ))}
            </div>
          </div>
        </section>
      </ScrollAnimation>

      {/* Quick Links */}
      <ScrollAnimation delay={1000}>
        <section className="py-16 border-t border-white/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12">Explorar</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link href="/achievements" className="border border-white/30 p-8 rounded hover:bg-white/5 transition-all group">
                <div className="text-4xl mb-4">🏆</div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-gray-300">Certificações</h3>
                <p className="text-sm opacity-70">Achievements e certificações em segurança</p>
              </Link>

              <Link href="/contact" className="border border-white/30 p-8 rounded hover:bg-white/5 transition-all group">
                <div className="text-4xl mb-4">✉️</div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-gray-300">Contato</h3>
                <p className="text-sm opacity-70">Entre em contato para colaborações e parcerias</p>
              </Link>
            </div>
          </div>
        </section>
      </ScrollAnimation>
    </div>
  )
}
