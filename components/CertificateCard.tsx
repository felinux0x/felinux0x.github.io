import { Certificate } from "@/lib/data";

interface CertificateCardProps {
  cert: Certificate;
}

export function CertificateCard({ cert }: CertificateCardProps) {
  return (
    <a
      href={cert.url || "#"}
      target="_blank"
      rel="noopener noreferrer"
      className={`border border-white/30 rounded p-6 bg-white/5 hover:bg-white/10 transition-all hover:scale-105 h-full flex flex-col items-center justify-center text-center min-h-[180px] ${!cert.url && "cursor-default"}`}
    >
      <div className="text-5xl mb-4">{cert.icon}</div>
      <h3 className="font-bold text-white mb-2 text-sm">{cert.name}</h3>
      <p className="text-xs opacity-70 mb-2">{cert.issuer}</p>
      <p className="text-xs opacity-60">{cert.date}</p>
    </a>
  );
}
