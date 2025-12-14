'use client'

import { useState, useEffect } from 'react'
import { Sparkles, History, Trash2, Menu, X } from 'lucide-react'
import { useLogoStore } from '@/lib/store'

interface HeaderProps {
  showHistory: boolean
  onToggleHistory: () => void
}

export default function Header({ showHistory, onToggleHistory }: HeaderProps) {
  const { generatedLogos, clearHistory } = useLogoStore()
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'py-3 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-sm'
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-4 group cursor-pointer">
          <div className="relative">
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 blur-lg opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
            {/* Logo icon */}
            <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 flex items-center justify-center transform group-hover:scale-105 transition-transform duration-300">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="hidden sm:block">
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">
              Logo<span className="gradient-text">AI</span>
            </h1>
            <p className="text-xs text-gray-500">AI-Powered Logo Maker</p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-2">
          {generatedLogos.length > 0 && (
            <>
              <button
                onClick={onToggleHistory}
                className={`flex items-center gap-2.5 px-5 py-2.5 rounded-xl font-medium transition-all duration-300 ${
                  showHistory
                    ? 'bg-gradient-to-r from-purple-500/10 to-pink-500/10 text-purple-700 border border-purple-200'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <History className="w-4 h-4" />
                <span>History</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  showHistory
                    ? 'bg-purple-500/20 text-purple-700'
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {generatedLogos.length}
                </span>
              </button>

              <button
                onClick={() => {
                  if (confirm('Clear all generated logos?')) {
                    clearHistory()
                  }
                }}
                className="p-2.5 rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all duration-300"
                title="Clear history"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </>
          )}
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-gray-200 p-4 animate-in shadow-lg">
          {generatedLogos.length > 0 && (
            <div className="flex flex-col gap-2">
              <button
                onClick={() => {
                  onToggleHistory()
                  setMobileMenuOpen(false)
                }}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                  showHistory
                    ? 'bg-gradient-to-r from-purple-500/10 to-pink-500/10 text-purple-700 border border-purple-200'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <History className="w-5 h-5" />
                <span>View History</span>
                <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-gray-200">
                  {generatedLogos.length}
                </span>
              </button>

              <button
                onClick={() => {
                  if (confirm('Clear all generated logos?')) {
                    clearHistory()
                    setMobileMenuOpen(false)
                  }
                }}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-all duration-300"
              >
                <Trash2 className="w-5 h-5" />
                <span>Clear History</span>
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  )
}
