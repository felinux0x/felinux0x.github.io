# 🔓 Felipe Security Portfolio

Um portfólio moderno dedicado a segurança ofensiva, testes de penetração e pesquisa de segurança. Construído com **Next.js**, **TypeScript**, **Tailwind CSS** e **Radix UI**.

## 🎯 Características

- **📝 Blog de Artigos**: Documentação de máquinas CTF, walkthroughs de penetração testing e pesquisa de segurança
- **🛠️ Showcase de Ferramentas**: Ferramentas de segurança desenvolvidas para pentests e CTFs
- **🔎 Filtros Inteligentes**: Busca e filtros por categoria, dificuldade, linguagem e tags
- **🎨 Design Modern**: Interface terminal minimalista com tema escuro
- **📱 Responsivo**: Otimizado para desktop, tablet e mobile
- **⚡ Performance**: Construído com Next.js 14+ para máxima performance

## 📂 Estrutura do Projeto

```
├── app/
│   ├── layout.tsx           # Layout raiz
│   ├── page.tsx            # Página inicial
│   ├── about/page.tsx      # Página sobre
│   ├── articles/           # Seção de artigos
│   │   ├── page.tsx       # Lista de artigos com filtros
│   │   └── [slug]/page.tsx # Detalhe do artigo
│   └── tools/page.tsx      # Seção de ferramentas
├── components/
│   ├── ArticleCard.tsx    # Componente card de artigo
│   ├── ToolCard.tsx       # Componente card de ferramenta
│   ├── Navbar.tsx         # Navegação
│   ├── Footer.tsx         # Rodapé
│   └── ui/                # Componentes Radix UI
├── lib/
│   ├── data.ts            # Dados centralizados (artigos, ferramentas, skills)
│   └── utils.ts           # Utilitários
└── styles/                # Estilos globais

```

## 🚀 Como Usar

### Pré-requisitos
- Node.js 18+
- pnpm (ou npm/yarn)

### Instalação

```bash
# Clone o repositório
git clone https://github.com/felinux0x/felinux0x.github.io.git
cd felinux0x.github.io

# Instale dependências
pnpm install
```

### Desenvolvimento

```bash
# Inicie o servidor de desenvolvimento
pnpm dev

# Acesse em http://localhost:3000
```

### Build para Produção

```bash
# Crie o build
pnpm build

# Inicie o servidor de produção
pnpm start
```

## 📋 Adicionando Conteúdo

### Adicionar um Novo Artigo

Edite o arquivo [lib/data.ts](lib/data.ts) e adicione à array `articles`:

```typescript
{
  title: "Seu Título Aqui",
  slug: "seu-slug",
  excerpt: "Descrição breve do artigo",
  date: "YYYY-MM-DD",
  author: "fe1ps",
  category: "HackTheBox", // ou TryHackMe, etc
  tags: ["tag1", "tag2"],
  difficulty: "Intermediate",
  readTime: 10,
}
```

### Adicionar uma Nova Ferramenta

Edite [lib/data.ts](lib/data.ts) e adicione à array `tools`:

```typescript
{
  name: "Nome da Ferramenta",
  description: "Descrição detalhada",
  language: "Python",
  category: "Security",
  githubUrl: "https://github.com/...",
  downloadUrl: "https://github.com/...",
  featured: true,
}
```

## 🎨 Personalização

### Cores e Tema

Edite [tailwind.config.ts](tailwind.config.ts) para personalizar cores.

### Metadados

Atualize os metadados em [app/layout.tsx](app/layout.tsx):

```typescript
export const metadata: Metadata = {
  title: 'CyberCoffe | Blog',
  description: 'Cybersecurity research, articles, and tools',
}
```

## 📦 Dependências Principais

- **Next.js**: Framework React com SSR
- **TypeScript**: Type-safety
- **Tailwind CSS**: Styling utility-first
- **Radix UI**: Componentes acessíveis
- **Lucide React**: Ícones
- **next-themes**: Theme switching

## 📝 Licença

Este projeto está sob a licença MIT. Veja [LICENSE](LICENSE) para mais detalhes.

## 🤝 Contribuições

Contribuições são bem-vindas! Por favor:
1. Faça um fork
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📬 Contato

- **GitHub**: [@felinux0x](https://github.com/felinux0x)
- **Twitter**: [@felinux0x](https://twitter.com/felinux0x)

---

**Desenvolvido com ❤️ por Felipe (fe1ps)**
