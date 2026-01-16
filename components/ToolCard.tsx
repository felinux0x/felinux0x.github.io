import { Terminal, Github, Download, Code2 } from "lucide-react";
import { Tool } from "@/lib/data";

interface ToolCardProps {
  tool: Tool;
}

export function ToolCard({ tool }: ToolCardProps) {
  return (
    <div className="border border-white/30 bg-black hover:bg-white/5 transition-all duration-300 hover:scale-105 hover:border-white/60 p-6">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-center gap-2 flex-grow">
          <Code2 className="h-5 w-5 text-white flex-shrink-0" />
          <h3 className="text-lg font-bold text-white">{tool.name}</h3>
        </div>
        <span className="text-xs px-2 py-1 bg-white/10 border border-white/30 rounded whitespace-nowrap">
          {tool.language}
        </span>
      </div>

      <span className="text-xs px-2 py-1 bg-white/5 border border-white/20 rounded inline-block mb-4">
        {tool.category}
      </span>

      <p className="text-sm opacity-80 mb-6 leading-relaxed">{tool.description}</p>

      <div className="flex flex-wrap gap-3">
        <a
          href={tool.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-xs border border-white/30 px-3 py-2 hover:bg-white/10 transition-colors rounded hover:border-white/60"
        >
          <Github className="h-3.5 w-3.5" />
          <span>GitHub</span>
        </a>
        <a
          href={tool.downloadUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-xs border border-white/30 px-3 py-2 hover:bg-white/10 transition-colors rounded hover:border-white/60"
        >
          <Download className="h-3.5 w-3.5" />
          <span>Baixar</span>
        </a>
      </div>
    </div>
  );
}
