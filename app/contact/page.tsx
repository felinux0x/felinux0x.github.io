import { ArrowLeft, Mail } from "lucide-react";
import Link from "next/link";
import { ScrollAnimation } from "@/components/ScrollAnimation";
import { ContactForm } from "@/components/ContactForm";

export default function ContactPage() {
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
              <Mail className="h-10 w-10" />
              Entre em Contato
            </h1>
            <p className="text-lg opacity-80">
              Tenho interesse em colaborações, pesquisa em segurança e discussões sobre ofensiva.
            </p>
          </div>
        </section>
      </ScrollAnimation>

      {/* Contact Form */}
      <ScrollAnimation delay={200}>
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <ContactForm />
            </div>
          </div>
        </section>
      </ScrollAnimation>

      {/* Direct Contacts */}
      <ScrollAnimation delay={400}>
        <section className="py-12 border-t border-white/30 bg-white/5">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">Ou conecte diretamente</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <a
                href="https://github.com/felinux0x"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white/30 rounded p-6 text-center hover:bg-white/10 transition-all hover:scale-105"
              >
                <div className="text-4xl mb-3">🔗</div>
                <h3 className="font-bold text-white mb-2">GitHub</h3>
                <p className="text-sm opacity-70">@felinux0x</p>
              </a>

              <a
                href="https://twitter.com/felinux0x"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white/30 rounded p-6 text-center hover:bg-white/10 transition-all hover:scale-105"
              >
                <div className="text-4xl mb-3">𝕏</div>
                <h3 className="font-bold text-white mb-2">Twitter/X</h3>
                <p className="text-sm opacity-70">@felinux0x</p>
              </a>

              <a
                href="https://app.hackthebox.com/profile/2483868"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white/30 rounded p-6 text-center hover:bg-white/10 transition-all hover:scale-105"
              >
                <div className="text-4xl mb-3">🎯</div>
                <h3 className="font-bold text-white mb-2">HackTheBox</h3>
                <p className="text-sm opacity-70">fe1ps</p>
              </a>
            </div>
          </div>
        </section>
      </ScrollAnimation>
    </div>
  );
}
