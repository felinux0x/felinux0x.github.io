import { LearningPath } from "@/lib/data";
import { CheckCircle, Circle } from "lucide-react";
import Link from "next/link";

interface LearningPathCardProps {
  path: LearningPath;
}

export function LearningPathCard({ path }: LearningPathCardProps) {
  return (
    <div className="border border-white/30 rounded p-6 bg-white/5 hover:bg-white/10 transition-all">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-2xl mb-2">{path.icon}</h3>
          <h2 className="text-xl font-bold text-white mb-2">{path.title}</h2>
          <p className="text-sm opacity-70 mb-3">{path.description}</p>
          <span className="text-xs px-3 py-1 bg-white/10 border border-white/30 rounded text-white/80">
            ⏱️ {path.duration}
          </span>
        </div>
      </div>

      <div className="space-y-4 my-6">
        {path.steps.map((step) => (
          <div key={step.step} className="flex gap-4 p-4 border border-white/20 rounded bg-black/30">
            <div className="flex-shrink-0">
              <Circle className="h-8 w-8 text-green-400" />
            </div>
            <div className="flex-grow">
              <h4 className="font-bold text-white mb-1">
                Step {step.step}: {step.title}
              </h4>
              <p className="text-sm opacity-80 mb-2">{step.description}</p>
              <span className={`text-xs px-2 py-1 rounded inline-block ${
                step.difficulty === "Beginner" ? "bg-green-500/20 border border-green-500/50" :
                step.difficulty === "Intermediate" ? "bg-yellow-500/20 border border-yellow-500/50" :
                "bg-red-500/20 border border-red-500/50"
              }`}>
                {step.difficulty}
              </span>
            </div>
          </div>
        ))}
      </div>

      <Link
        href="/articles"
        className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-white/10 border border-white/30 rounded hover:bg-white/20 transition-colors text-sm font-semibold"
      >
        Começar Aprendizado →
      </Link>
    </div>
  );
}
