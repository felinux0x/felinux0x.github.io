import { GitHubRepo } from "@/lib/data";
import { Github, Star } from "lucide-react";

interface GitHubRepoCardProps {
  repo: GitHubRepo;
}

export function GitHubRepoCard({ repo }: GitHubRepoCardProps) {
  return (
    <a
      href={repo.url}
      target="_blank"
      rel="noopener noreferrer"
      className="border border-white/30 rounded p-6 bg-white/5 hover:bg-white/10 transition-all hover:scale-105 h-full flex flex-col"
    >
      <div className="flex items-start justify-between mb-3 gap-2">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <Github className="h-5 w-5 text-white flex-shrink-0" />
          <h3 className="font-bold text-white truncate">{repo.name}</h3>
        </div>
        <div className="flex items-center gap-1 text-xs bg-white/10 px-2 py-1 rounded flex-shrink-0">
          <Star className="h-3 w-3 text-yellow-400" />
          <span className="text-white">{repo.stars}</span>
        </div>
      </div>

      <p className="text-sm opacity-80 mb-4 flex-grow">{repo.description}</p>

      <div className="flex flex-wrap gap-2 mb-3">
        <span className="text-xs px-2 py-1 bg-white/10 border border-white/30 rounded text-white/80">
          {repo.language}
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {repo.topics.map(topic => (
          <span key={topic} className="text-xs text-white/60 bg-white/5 px-2 py-1 rounded">
            #{topic}
          </span>
        ))}
      </div>
    </a>
  );
}
