import Link from "next/link";
import { FileText, Calendar, User, Zap } from "lucide-react";
import { Article } from "@/lib/data";

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link href={`/articles/${article.slug}`}>
      <article className="border border-white/30 bg-black hover:bg-white/5 transition-all duration-300 hover:scale-105 hover:border-white/60 p-6 cursor-pointer h-full flex flex-col">
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="text-xs px-2 py-1 bg-white/10 border border-white/30 rounded">
            {article.category}
          </span>
          <span className={`text-xs px-2 py-1 border rounded ${
            article.difficulty === "Beginner" ? "bg-green-500/20 border-green-500/50" :
            article.difficulty === "Intermediate" ? "bg-yellow-500/20 border-yellow-500/50" :
            "bg-red-500/20 border-red-500/50"
          }`}>
            {article.difficulty}
          </span>
        </div>

        <h3 className="text-xl font-bold mb-2 text-white flex-grow">{article.title}</h3>
        <p className="text-sm opacity-70 mb-4 line-clamp-2">{article.excerpt}</p>

        <div className="flex flex-wrap gap-1 mb-4">
          {article.tags.slice(0, 3).map(tag => (
            <span key={tag} className="text-xs text-white/60 bg-white/5 px-2 py-1 rounded">
              #{tag}
            </span>
          ))}
        </div>

        <div className="flex flex-col gap-2 text-xs text-white/70 border-t border-white/20 pt-4 mt-auto">
          <div className="flex items-center gap-2">
            <Calendar className="h-3 w-3" />
            <span>{new Date(article.date).toLocaleDateString("pt-BR")}</span>
            <span className="ml-auto">~{article.readTime} min</span>
          </div>
          <div className="flex items-center gap-2">
            <User className="h-3 w-3" />
            <span>{article.author}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
