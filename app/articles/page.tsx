"use client"

import { useState, useMemo } from "react";
import { ArrowLeft, Search } from "lucide-react";
import Link from "next/link";
import { ScrollAnimation } from "@/components/ScrollAnimation";
import { ArticleCard } from "@/components/ArticleCard";
import { articles } from "@/lib/data";

export default function ArticlesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [...new Set(articles.map(a => a.category))];
  const difficulties = ["Beginner", "Intermediate", "Advanced"];

  const filteredArticles = useMemo(() => {
    return articles.filter(article => {
      const matchesCategory = !selectedCategory || article.category === selectedCategory;
      const matchesDifficulty = !selectedDifficulty || article.difficulty === selectedDifficulty;
      const matchesSearch = !searchQuery || 
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesDifficulty && matchesSearch;
    });
  }, [selectedCategory, selectedDifficulty, searchQuery]);

  return (
    <div>
      {/* Header */}
      <ScrollAnimation>
        <section className="py-8 border-b border-white/30">
          <div className="container mx-auto px-4">
            <Link href="/" className="inline-flex items-center text-sm hover:text-gray-400 mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
            </Link>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Artigos & Walkthroughs
            </h1>
            <p className="text-lg opacity-80">
              Documentação de máquinas CTF, técnicas de penetração testing e pesquisa de segurança.
            </p>
          </div>
        </section>
      </ScrollAnimation>

      {/* Filters */}
      <ScrollAnimation delay={200}>
        <section className="py-8 border-b border-white/30">
          <div className="container mx-auto px-4">
            {/* Search */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-white/50" />
                <input
                  type="text"
                  placeholder="Buscar por título, tag ou palavra-chave..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/5 border border-white/30 rounded px-4 py-2 pl-10 text-white placeholder-white/50 focus:outline-none focus:border-white/60"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="mb-4">
              <h3 className="text-sm font-semibold mb-3 text-white/80">Categorias</h3>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`px-4 py-2 rounded text-sm transition-all ${
                    !selectedCategory
                      ? "bg-white text-black font-semibold"
                      : "border border-white/30 hover:bg-white/10"
                  }`}
                >
                  Todas
                </button>
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded text-sm transition-all ${
                      selectedCategory === category
                        ? "bg-white text-black font-semibold"
                        : "border border-white/30 hover:bg-white/10"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Difficulty Filter */}
            <div>
              <h3 className="text-sm font-semibold mb-3 text-white/80">Dificuldade</h3>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedDifficulty(null)}
                  className={`px-4 py-2 rounded text-sm transition-all ${
                    !selectedDifficulty
                      ? "bg-white text-black font-semibold"
                      : "border border-white/30 hover:bg-white/10"
                  }`}
                >
                  Todas
                </button>
                {difficulties.map(difficulty => (
                  <button
                    key={difficulty}
                    onClick={() => setSelectedDifficulty(difficulty)}
                    className={`px-4 py-2 rounded text-sm transition-all ${
                      selectedDifficulty === difficulty
                        ? "bg-white text-black font-semibold"
                        : "border border-white/30 hover:bg-white/10"
                    }`}
                  >
                    {difficulty}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
      </ScrollAnimation>

      {/* Articles Grid */}
      <ScrollAnimation delay={400}>
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="mb-6">
              <p className="text-sm text-white/70">
                {filteredArticles.length} artigo{filteredArticles.length !== 1 ? 's' : ''} encontrado{filteredArticles.length !== 1 ? 's' : ''}
              </p>
            </div>

            {filteredArticles.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-lg opacity-70">
                  Nenhum artigo encontrado com os filtros selecionados.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredArticles.map(article => (
                  <ArticleCard key={article.slug} article={article} />
                ))}
              </div>
            )}
          </div>
        </section>
      </ScrollAnimation>
    </div>
  );
}