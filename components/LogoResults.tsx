'use client'

import { useEffect, useState } from 'react'
import { Sparkles, RefreshCw, Download, Wand2, RotateCcw } from 'lucide-react'
import { useLogoStore } from '@/lib/store'
import LogoCard from './LogoCard'

interface LogoResultsProps {
  onGenerateMore: () => void
  onRegenerate: () => void
}

export default function LogoResults({ onGenerateMore, onRegenerate }: LogoResultsProps) {
  const { generatedLogos, removeGeneratedLogo, isGenerating, clearRecentLogos } = useLogoStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Only show the most recent batch (last 4 logos)
  const recentLogos = generatedLogos.slice(0, 4)

  if (recentLogos.length === 0) {
    return null
  }

  const handleDownloadAll = () => {
    recentLogos.forEach((logo, index) => {
      setTimeout(() => {
        const link = document.createElement('a')
        link.download = `logo-${index + 1}.png`
        link.href = logo.imageData
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      }, index * 500)
    })
  }

  return (
    <div className="w-full max-w-7xl mx-auto space-y-10">
      {/* Success banner */}
      <div
        className={`glass-card p-6 flex items-center justify-between transition-all duration-700 ${
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
        style={{
          background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(16, 185, 129, 0.1))',
          border: '1px solid rgba(34, 197, 94, 0.2)',
        }}
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-lg shadow-green-500/30">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Your Logos Are Ready!</h2>
            <p className="text-green-600 text-sm">
              {recentLogos.length} unique variations generated. Click any logo to preview or download.
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={handleDownloadAll}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-gray-700 font-medium transition-all duration-300 hover:-translate-y-0.5"
            style={{
              background: 'rgba(0, 0, 0, 0.05)',
              border: '1px solid rgba(0, 0, 0, 0.1)',
            }}
          >
            <Download className="w-4 h-4" />
            Download All
          </button>
          <button
            onClick={() => {
              clearRecentLogos()
              onRegenerate()
            }}
            disabled={isGenerating}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-gray-700 font-medium transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-50"
            style={{
              background: 'rgba(0, 0, 0, 0.05)',
              border: '1px solid rgba(0, 0, 0, 0.1)',
            }}
          >
            <RotateCcw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
            Regenerate
          </button>
          <button
            onClick={onGenerateMore}
            disabled={isGenerating}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-white transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-50"
            style={{
              background: 'linear-gradient(135deg, #8B5CF6, #A855F7)',
              boxShadow: '0 4px 15px -3px rgba(139, 92, 246, 0.4)',
            }}
          >
            <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
            Generate More
          </button>
        </div>
      </div>

      {/* Logo grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {recentLogos.map((logo, index) => (
          <div
            key={logo.id}
            className={`transition-all duration-500 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: `${index * 100 + 200}ms` }}
          >
            <LogoCard
              logo={logo}
              onDelete={removeGeneratedLogo}
              index={index}
            />
          </div>
        ))}
      </div>

      {/* Mobile actions */}
      <div className="sm:hidden space-y-3">
        <div className="flex gap-3">
          <button
            onClick={handleDownloadAll}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-gray-700 font-medium"
            style={{
              background: 'rgba(0, 0, 0, 0.05)',
              border: '1px solid rgba(0, 0, 0, 0.1)',
            }}
          >
            <Download className="w-4 h-4" />
            Download All
          </button>
          <button
            onClick={() => {
              clearRecentLogos()
              onRegenerate()
            }}
            disabled={isGenerating}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-gray-700 font-medium disabled:opacity-50"
            style={{
              background: 'rgba(0, 0, 0, 0.05)',
              border: '1px solid rgba(0, 0, 0, 0.1)',
            }}
          >
            <RotateCcw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
            Regenerate
          </button>
        </div>
        <button
          onClick={onGenerateMore}
          disabled={isGenerating}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-medium text-white disabled:opacity-50"
          style={{
            background: 'linear-gradient(135deg, #8B5CF6, #A855F7)',
          }}
        >
          <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
          Generate More
        </button>
      </div>

      {/* Helpful tips */}
      <div className="glass-card p-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center flex-shrink-0">
            <Wand2 className="w-5 h-5 text-amber-500" />
          </div>
          <div className="space-y-2">
            <h3 className="font-medium text-gray-900">Pro Tips</h3>
            <ul className="space-y-1 text-sm text-gray-500">
              <li>• Click any logo to view it in full size</li>
              <li>• Use the heart icon to mark your favorites</li>
              <li>• Adjust your prompt and style for different variations</li>
              <li>• Download in SVG format for scalable graphics</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
