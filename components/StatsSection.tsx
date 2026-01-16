import { Github, BookOpen, Code2, Award } from "lucide-react";

interface Stat {
  label: string;
  value: string | number;
  icon: React.ReactNode;
}

const stats: Stat[] = [
  {
    label: "Artigos Publicados",
    value: 5,
    icon: <BookOpen className="h-6 w-6" />,
  },
  {
    label: "Ferramentas Desenvolvidas",
    value: 4,
    icon: <Code2 className="h-6 w-6" />,
  },
  {
    label: "Máquinas Completadas",
    value: "15+",
    icon: <Award className="h-6 w-6" />,
  },
  {
    label: "GitHub Público",
    value: "Ativo",
    icon: <Github className="h-6 w-6" />,
  },
];

export function StatsSection() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="border border-white/30 rounded p-6 bg-white/5 hover:bg-white/10 transition-all text-center"
        >
          <div className="flex justify-center mb-3 text-green-400">
            {stat.icon}
          </div>
          <p className="text-2xl font-bold text-white mb-2">{stat.value}</p>
          <p className="text-xs text-white/70">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
