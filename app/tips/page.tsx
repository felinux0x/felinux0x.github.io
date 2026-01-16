"use client";

import { useState } from "react";
import { ArrowLeft, Lightbulb } from "lucide-react";
import Link from "next/link";
import { ScrollAnimation } from "@/components/ScrollAnimation";
import { TipCard } from "@/components/TipCard";
import { tips } from "@/lib/data";

export default function TipsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);

  const categories = [...new Set(tips.map(t => t.category))];
  const difficulties = ["Beginner", "Intermediate", "Advanced"];

  const filteredTips = tips.filter(tip => {
    const matchesCategory = !selectedCategory || tip.category === selectedCategory;
    const matchesDifficulty = !selectedDifficulty || tip.difficulty === selectedDifficulty;
    return matchesCategory && matchesDifficulty;
  });

  return (
    <div>
      {/* Header */}
      <ScrollAnimation>
        <section className="py-8 border-b border-white/30">
          <div className="container mx-auto px-4">
            <Link href="/" className="inline-flex items-center text-sm hover:text-gray-400 mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
            </Link>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 flex items-center gap-3">
              <Lightbulb className="h-10 w-10" />
              Tips & Tricks
            </h1>
            <p className="text-lg opacity-80">
              Dicas práticas, one-liners e técnicas úteis para penetration testing e segurança.
            </p>
          </div>
        </section>
      </ScrollAnimation>

      {/* Filters */}
      <ScrollAnimation delay={200}>
        <section className="py-8 border-b border-white/30">
          <div className="container mx-auto px-4">
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

      {/* Tips Grid */}
      <ScrollAnimation delay={400}>
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="mb-6">
              <p className="text-sm text-white/70">
                {filteredTips.length} dica{filteredTips.length !== 1 ? 's' : ''} encontrada{filteredTips.length !== 1 ? 's' : ''}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredTips.map(tip => (
                <TipCard key={tip.id} tip={tip} />
              ))}
            </div>
          </div>
        </section>
      </ScrollAnimation>
    </div>
  );
}
