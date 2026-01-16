"use client";

import { Tip } from "@/lib/data";
import { Copy, Check } from "lucide-react";
import { useState } from "react";

interface TipCardProps {
  tip: Tip;
}

export function TipCard({ tip }: TipCardProps) {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    if (tip.code) {
      navigator.clipboard.writeText(tip.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="border border-white/30 rounded p-6 bg-white/5 hover:bg-white/10 transition-all">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-white mb-2">{tip.title}</h3>
          <div className="flex gap-2 flex-wrap">
            <span className={`text-xs px-2 py-1 rounded ${
              tip.difficulty === "Beginner" ? "bg-green-500/20 border border-green-500/50" :
              tip.difficulty === "Intermediate" ? "bg-yellow-500/20 border border-yellow-500/50" :
              "bg-red-500/20 border border-red-500/50"
            }`}>
              {tip.difficulty}
            </span>
            <span className="text-xs px-2 py-1 bg-white/10 border border-white/30 rounded">
              {tip.category}
            </span>
          </div>
        </div>
      </div>

      <p className="text-sm opacity-80 mb-4">{tip.content}</p>

      {tip.code && (
        <div className="relative bg-black/50 border border-white/20 rounded p-4 mb-4">
          <button
            onClick={copyCode}
            className="absolute top-2 right-2 p-2 hover:bg-white/10 rounded transition-colors"
            title="Copiar código"
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-400" />
            ) : (
              <Copy className="h-4 w-4 text-white/60" />
            )}
          </button>
          <pre className="text-xs text-green-400 overflow-x-auto pr-10">
            <code>{tip.code}</code>
          </pre>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {tip.tags.map(tag => (
          <span key={tag} className="text-xs text-white/60 bg-white/5 px-2 py-1 rounded">
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
}
