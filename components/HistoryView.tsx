'use client'

import { useState, useEffect } from 'react'
import { Clock, X, Download, Trash2, Search, Filter, Grid, List } from 'lucide-react'
import { useLogoStore, LogoStyle } from '@/lib/store'
import LogoCard from './LogoCard'

interface HistoryViewProps {
  onClose: () => void
}

export default function HistoryView({ onClose }: HistoryViewProps) {
  const { generatedLogos, removeGeneratedLogo, clearHistory } = useLogoStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStyle, setSelectedStyle] = useState<LogoStyle | 'all'>('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])

  const filteredLogos = generatedLogos.filter((logo) => {
    const matchesSearch = logo.prompt.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStyle = selectedStyle === 'all' || logo.style === selectedStyle
    return matchesSearch && matchesStyle
  })

  const styles: (LogoStyle | 'all')[] = ['all', 'modern', 'minimal', 'vintage', 'playful', 'elegant', 'bold', 'tech', 'organic']

  const handleDownloadAll = () => {
    filteredLogos.forEach((logo, index) => {
      setTimeout(() => {
        const link = document.createElement('a')
        link.download = `logo-${index + 1}.png`
        link.href = logo.imageData
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      }, index * 300)
    })
  }

  return (
    <div
      className={`fixed inset-0 z-50 overflow-hidden transition-opacity duration-300 ${
        mounted ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-white/98 backdrop-blur-xl"
        onClick={onClose}
      />

      {/* Content */}
      <div className="relative h-full flex flex-col">
        {/* Header */}
        <header className="flex-shrink-0 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 blur-lg opacity-50" />
                  <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                    <Clock className="w-7 h-7 text-white" />
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Generation History</h2>
                  <p className="text-gray-500">
                    {generatedLogos.length} logo{generatedLogos.length !== 1 ? 's' : ''} • {filteredLogos.length} showing
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {generatedLogos.length > 0 && (
                  <>
                    <button
                      onClick={handleDownloadAll}
                      className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all"
                    >
                      <Download className="w-4 h-4" />
                      Download All
                    </button>
                    <button
                      onClick={() => {
                        if (confirm('Delete all logos from history?')) {
                          clearHistory()
                        }
                      }}
                      className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-xl text-red-500 hover:bg-red-50 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                      Clear All
                    </button>
                  </>
                )}
                <button
                  onClick={onClose}
                  className="p-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-600 transition-all"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Search and filters */}
            {generatedLogos.length > 0 && (
              <div className="mt-6 flex flex-col sm:flex-row gap-4">
                {/* Search */}
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by prompt..."
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-purple-500/50 transition-all"
                  />
                </div>

                {/* Style filter */}
                <div className="flex items-center gap-2">
                  <Filter className="w-5 h-5 text-gray-400" />
                  <div className="flex gap-2 overflow-x-auto scrollbar-hide py-1">
                    {styles.map((style) => (
                      <button
                        key={style}
                        onClick={() => setSelectedStyle(style)}
                        className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                          selectedStyle === style
                            ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-700 border border-purple-300'
                            : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                        }`}
                      >
                        {style === 'all' ? 'All Styles' : style.charAt(0).toUpperCase() + style.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* View toggle */}
                <div className="hidden sm:flex items-center gap-1 p-1 rounded-xl bg-gray-100">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition-all ${
                      viewMode === 'grid' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    <Grid className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg transition-all ${
                      viewMode === 'list' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
            {generatedLogos.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="relative mb-6">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 blur-xl" />
                  <div className="relative w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center">
                    <Clock className="w-12 h-12 text-gray-400" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">No Logos Yet</h3>
                <p className="text-gray-500 text-center max-w-md mb-8">
                  Your generated logos will appear here. Start creating to build your collection!
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-3 rounded-xl font-medium text-white"
                  style={{
                    background: 'linear-gradient(135deg, #8B5CF6, #A855F7)',
                    boxShadow: '0 4px 15px -3px rgba(139, 92, 246, 0.4)',
                  }}
                >
                  Start Creating
                </button>
              </div>
            ) : filteredLogos.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                  <Search className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No Results Found</h3>
                <p className="text-gray-500 text-center">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            ) : (
              <div
                className={`${
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                    : 'flex flex-col gap-4'
                }`}
              >
                {filteredLogos.map((logo, index) => (
                  <div
                    key={logo.id}
                    className="animate-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <LogoCard
                      logo={logo}
                      onDelete={removeGeneratedLogo}
                      index={index}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>

        {/* Mobile footer actions */}
        {generatedLogos.length > 0 && (
          <footer className="sm:hidden flex-shrink-0 border-t border-gray-200 p-4 bg-white">
            <div className="flex gap-3">
              <button
                onClick={handleDownloadAll}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-gray-700 bg-gray-100"
              >
                <Download className="w-4 h-4" />
                Download All
              </button>
              <button
                onClick={() => {
                  if (confirm('Delete all logos from history?')) {
                    clearHistory()
                  }
                }}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-red-500 bg-red-50"
              >
                <Trash2 className="w-4 h-4" />
                Clear All
              </button>
            </div>
          </footer>
        )}
      </div>
    </div>
  )
}
