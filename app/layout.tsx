import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { ThemeProvider } from "@/components/theme-provider"
import { CommandPalette } from "@/components/CommandPalette"
import TerminalLoader from "@/components/TerminalLoader"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: 'Felipe - Red Team & Penetration Tester',
  description: 'Portfólio de Felipe (fe1ps). Especializado em testes de penetração, segurança ofensiva, CTFs e desenvolvimento de ferramentas de segurança.',
  keywords: 'penetration testing, security, hacking, CTF, red team, cybersecurity, tools',
  authors: [{ name: 'Felipe' }],
  openGraph: {
    title: 'Felipe - Red Team & Penetration Tester',
    description: 'Portfólio com artigos, ferramentas e documentação sobre segurança ofensiva.',
    type: 'website',
    locale: 'pt_BR',
  },
  icons: {
    icon: [
      {
        url: 'https://cdn-icons-png.flaticon.com/512/6463/6463391.png',
        sizes: '512x512',
        type: 'image/png',
      }
    ],
    shortcut: [
      {
        url: 'https://cdn-icons-png.flaticon.com/512/6463/6463391.png',
        type: 'image/png',
      }
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={inter.className}>
        <TerminalLoader>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
          >
            <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white font-mono flex flex-col">
              <CommandPalette />
              <Navbar />
              <main className="flex-grow">
                {children}
              </main>
              <Footer />
            </div>
          </ThemeProvider>
        </TerminalLoader>
      </body>
    </html>
  )
}

import './globals.css'