'use client'

import * as React from "react"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import { Command } from "cmdk"
import { File, Home, Newspaper, Wrench, Sun, Moon, Laptop } from "lucide-react"

// Dados dos artigos e ferramentas (simplificado)
const allArticles = [
  { title: "Fluffy Machine - Writeup HTB", slug: "fluffy-machine-htb" },
  { title: "Try Hack Me - RootMe", slug: "tryhackme-rootme" },
  { title: "TryHackMe - Simple CTF", slug: "tryhackme-simple-ctf" },
  { title: "Try Hack Me - OverPass", slug: "tryhackme-overpass" },
  { title: "TryHackMe - Brute It", slug: "tryhackme-bruteit" },
];

const allTools = [
  { name: "Python IDS Framework", path: "/tools" },
  { name: "Arch Pentest Installer", path: "/tools" },
  { name: "Spectro", path: "/tools" },
  { name: "PyVigil", path: "/tools" },
];

export function CommandPalette() {
  const [open, setOpen] = React.useState(false)
  const router = useRouter()
  const { setTheme } = useTheme()

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const runCommand = (command: () => void) => {
    setOpen(false)
    command()
  }

  return (
    <Command.Dialog open={open} onOpenChange={setOpen} label="Global Command Menu">
      <Command.Input placeholder="Type a command or search..." />
      <Command.List>
        <Command.Empty>No results found.</Command.Empty>

        <Command.Group heading="Navigation">
          <Command.Item onSelect={() => runCommand(() => router.push("/"))}>
            <Home className="mr-2 h-4 w-4" />
            <span>Home</span>
          </Command.Item>
          <Command.Item onSelect={() => runCommand(() => router.push("/articles"))}>
            <Newspaper className="mr-2 h-4 w-4" />
            <span>Articles</span>
          </Command.Item>
          <Command.Item onSelect={() => runCommand(() => router.push("/tools"))}>
            <Wrench className="mr-2 h-4 w-4" />
            <span>Tools</span>
          </Command.Item>
          <Command.Item onSelect={() => runCommand(() => router.push("/about"))}>
            <File className="mr-2 h-4 w-4" />
            <span>About</span>
          </Command.Item>
        </Command.Group>

        <Command.Group heading="Theme">
          <Command.Item onSelect={() => runCommand(() => setTheme("dark"))}>
            <Moon className="mr-2 h-4 w-4" />
            <span>Dark</span>
          </Command.Item>
        </Command.Group>

        <Command.Group heading="Articles">
          {allArticles.map((article) => (
            <Command.Item
              key={article.slug}
              onSelect={() => runCommand(() => router.push(`/articles/${article.slug}`))}
            >
              <Newspaper className="mr-2 h-4 w-4" />
              <span>{article.title}</span>
            </Command.Item>
          ))}
        </Command.Group>

        <Command.Group heading="Tools">
          {allTools.map((tool) => (
            <Command.Item
              key={tool.name}
              onSelect={() => runCommand(() => router.push(tool.path))}
            >
              <Wrench className="mr-2 h-4 w-4" />
              <span>{tool.name}</span>
            </Command.Item>
          ))}
        </Command.Group>

      </Command.List>
    </Command.Dialog>
  )
}
