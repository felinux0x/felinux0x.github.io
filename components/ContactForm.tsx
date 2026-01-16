"use client";

import { useState } from "react";
import { Mail, CheckCircle } from "lucide-react";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    subscribe: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setFormData(prev => ({ ...prev, [name]: val }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simular envio (em produção, você integraria com um serviço como Nodemailer, SendGrid, etc)
    await new Promise(resolve => setTimeout(resolve, 1000));

    setSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "", subscribe: false });
    setLoading(false);

    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="border border-white/30 rounded p-8 bg-white/5">
      {submitted && (
        <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded flex items-center gap-3">
          <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
          <div>
            <p className="font-bold text-white">Mensagem enviada com sucesso!</p>
            <p className="text-sm opacity-80">Você receberá uma resposta em breve.</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-semibold mb-2 text-white">Nome</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full bg-white/5 border border-white/30 rounded px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:border-white/60 transition-colors"
              placeholder="Seu nome"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2 text-white">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full bg-white/5 border border-white/30 rounded px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:border-white/60 transition-colors"
              placeholder="seu@email.com"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-white">Assunto</label>
          <select
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="w-full bg-white/5 border border-white/30 rounded px-4 py-2 text-white focus:outline-none focus:border-white/60 transition-colors"
          >
            <option value="">Selecione um assunto</option>
            <option value="collaboration">Colaboração</option>
            <option value="bug">Reportar Bug</option>
            <option value="suggestion">Sugestão</option>
            <option value="other">Outro</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-white">Mensagem</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={5}
            className="w-full bg-white/5 border border-white/30 rounded px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:border-white/60 transition-colors resize-none"
            placeholder="Sua mensagem..."
          />
        </div>

        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            name="subscribe"
            checked={formData.subscribe}
            onChange={handleChange}
            className="w-4 h-4 bg-white/5 border border-white/30 rounded"
          />
          <span className="text-sm text-white/80">Desejo receber updates sobre novos artigos</span>
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-white text-black font-semibold py-3 rounded hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Enviando..." : "Enviar Mensagem"}
        </button>
      </form>
    </div>
  );
}
