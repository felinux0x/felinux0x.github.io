import { ArrowLeft, Trophy } from "lucide-react";
import Link from "next/link";
import { ScrollAnimation } from "@/components/ScrollAnimation";
import { CertificateCard } from "@/components/CertificateCard";
import { GitHubRepoCard } from "@/components/GitHubRepoCard";
import { certificates, gitHubRepos } from "@/lib/data";

export default function AchievementsPage() {
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
              <Trophy className="h-10 w-10" />
              Achievements & Certificações
            </h1>
            <p className="text-lg opacity-80">
              Certificações, conquistas e projetos que demonstram meu conhecimento em segurança.
            </p>
          </div>
        </section>
      </ScrollAnimation>

      {/* Certificates */}
      <ScrollAnimation delay={200}>
        <section className="py-12 border-b border-white/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-white mb-8">Certificações & Badges</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {certificates.map((cert, index) => (
                <ScrollAnimation key={index} delay={index * 50}>
                  <div className="h-full">
                    <CertificateCard cert={cert} />
                  </div>
                </ScrollAnimation>
              ))}
            </div>
          </div>
        </section>
      </ScrollAnimation>

      {/* GitHub Repositories */}
      <ScrollAnimation delay={400}>
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-white mb-8">Repositórios Principais</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {gitHubRepos.map((repo, index) => (
                <ScrollAnimation key={repo.name} delay={index * 50}>
                  <div className="h-full">
                    <GitHubRepoCard repo={repo} />
                  </div>
                </ScrollAnimation>
              ))}
            </div>
          </div>
        </section>
      </ScrollAnimation>

      {/* Stats */}
      <ScrollAnimation delay={600}>
        <section className="py-12 border-t border-white/30 bg-white/5">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <p className="text-3xl font-bold text-white mb-2">4</p>
                <p className="text-sm opacity-70">Ferramentas Open Source</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-white mb-2">40+</p>
                <p className="text-sm opacity-70">Máquinas Completadas</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-white mb-2">1000+</p>
                <p className="text-sm opacity-70">Pontos HTB</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-white mb-2">5</p>
                <p className="text-sm opacity-70">Artigos Publicados</p>
              </div>
            </div>
          </div>
        </section>
      </ScrollAnimation>
    </div>
  );
}
