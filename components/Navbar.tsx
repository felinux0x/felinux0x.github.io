"use client";

import Link from "next/link"
import { useState, useEffect } from "react"

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }

    document.addEventListener("scroll", handleScroll)
    return () => {
      document.removeEventListener("scroll", handleScroll)
    }
  }, [scrolled])

  return (
    <header className={`p-4 transition-all duration-300 ${scrolled ? "border-b-2 border-white/50 shadow-lg" : "border-b border-white/30"}`}>
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center space-x-2 mb-4 md:mb-0">
          <div className="text-xs opacity-70">fe1ps</div>
        </div>
        <nav>
          <ul className="flex space-x-6 text-sm">
            <li>
              <Link href="/" className="hover:text-gray-400 transition-colors">
                HOME
              </Link>
            </li>
            <li>
              <Link href="/articles" className="hover:text-gray-400 transition-colors">
                ARTICLES
              </Link>
            </li>
            <li>
              <Link href="/tools" className="hover:text-gray-400 transition-colors">
                TOOLS
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-gray-400 transition-colors">
                ABOUT
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}