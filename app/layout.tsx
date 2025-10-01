import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { ThemeProvider } from "@/components/theme-provider"
import { CommandPalette } from "@/components/CommandPalette"
import TerminalLoader from "@/components/TerminalLoader"; // Added import

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: 'CyberCoffe | Blog',
  description: 'Cybersecurity research, articles, and tools',
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
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <TerminalLoader> {/* Wrapped content with TerminalLoader */}
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
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
        </TerminalLoader> {/* Closing tag */}
      </body>
    </html>
  )
}



import './globals.css'