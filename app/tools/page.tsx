"use client"

import { useState, useMemo } from "react";
import { ArrowLeft, Search } from "lucide-react";
import Link from "next/link";
import { ScrollAnimation } from "@/components/ScrollAnimation";
import { ToolCard } from "@/components/ToolCard";
import { tools } from "@/lib/data";

export default function ToolsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [...new Set(tools.map(t => t.category))];
  const languages = [...new Set(tools.map(t => t.language))];

  const filteredTools = useMemo(() => {
    return tools.filter(tool => {
      const matchesCategory = !selectedCategory || tool.category === selectedCategory;
      const matchesLanguage = !selectedLanguage || tool.language === selectedLanguage;
      const matchesSearch = !searchQuery || 
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesLanguage && matchesSearch;
    });
  }, [selectedCategory, selectedLanguage, searchQuery]);

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
              Ferramentas & Projetos
            </h1>
            <p className="text-lg opacity-80">
              Ferramentas de segurança desenvolvidas para pentests, pesquisa e CTFs.
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
                  placeholder="Buscar ferramentas por nome ou descrição..."
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

            {/* Language Filter */}
            <div>
              <h3 className="text-sm font-semibold mb-3 text-white/80">Linguagens</h3>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedLanguage(null)}
                  className={`px-4 py-2 rounded text-sm transition-all ${
                    !selectedLanguage
                      ? "bg-white text-black font-semibold"
                      : "border border-white/30 hover:bg-white/10"
                  }`}
                >
                  Todas
                </button>
                {languages.map(language => (
                  <button
                    key={language}
                    onClick={() => setSelectedLanguage(language)}
                    className={`px-4 py-2 rounded text-sm transition-all ${
                      selectedLanguage === language
                        ? "bg-white text-black font-semibold"
                        : "border border-white/30 hover:bg-white/10"
                    }`}
                  >
                    {language}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
      </ScrollAnimation>

      {/* Tools Grid */}
      <ScrollAnimation delay={400}>
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="mb-6">
              <p className="text-sm text-white/70">
                {filteredTools.length} ferramenta{filteredTools.length !== 1 ? 's' : ''} encontrada{filteredTools.length !== 1 ? 's' : ''}
              </p>
            </div>

            {filteredTools.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-lg opacity-70">
                  Nenhuma ferramenta encontrada com os filtros selecionados.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredTools.map(tool => (
                  <ToolCard key={tool.name} tool={tool} />
                ))}
              </div>
            )}
          </div>
        </section>
      </ScrollAnimation>
    </div>
  );
}

