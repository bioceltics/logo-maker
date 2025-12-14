'use client'

import { useState } from 'react'
import { Download, Trash2, Copy, Check, ZoomIn, X, Heart, Share2 } from 'lucide-react'
import { GeneratedLogo } from '@/lib/store'

interface LogoCardProps {
  logo: GeneratedLogo
  onDelete: (id: string) => void
  index?: number
}

export default function LogoCard({ logo, onDelete, index = 0 }: LogoCardProps) {
  const [copied, setCopied] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const handleDownload = (format: 'png' | 'svg') => {
    const link = document.createElement('a')
    link.download = `logo-${logo.id}.${format}`

    if (format === 'png') {
      link.href = logo.imageData
    } else {
      const svgData = `
        <svg xmlns="http://www.w3.org/2000/svg" width="512" height="512">
          <image href="${logo.imageData}" width="512" height="512"/>
        </svg>
      `
      link.href = 'data:image/svg+xml;base64,' + btoa(svgData)
    }

    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleCopyToClipboard = async () => {
    try {
      const response = await fetch(logo.imageData)
      const blob = await response.blob()
      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob })
      ])
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        const response = await fetch(logo.imageData)
        const blob = await response.blob()
        const file = new File([blob], 'logo.png', { type: 'image/png' })
        await navigator.share({
          title: 'My AI Generated Logo',
          text: logo.prompt,
          files: [file],
        })
      } catch (err) {
        console.error('Failed to share:', err)
      }
    }
  }

  return (
    <>
      {/* Logo card */}
      <div
        className="group relative glass-card-hover overflow-hidden"
        style={{
          animationDelay: `${index * 100}ms`,
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image container */}
        <div
          className="relative aspect-square cursor-pointer overflow-hidden"
          onClick={() => setShowPreview(true)}
        >
          {/* Background gradient */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              background: `linear-gradient(135deg, ${logo.primaryColor}, ${logo.secondaryColor})`,
            }}
          />

          {/* Logo image */}
          <img
            src={logo.imageData}
            alt={`Generated logo: ${logo.prompt}`}
            className="relative w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
          />

          {/* Hover overlay */}
          <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
            style={{
              background: 'radial-gradient(circle at center, rgba(0,0,0,0.6), rgba(0,0,0,0.8))',
            }}
          >
            <div className="flex items-center gap-3">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setShowPreview(true)
                }}
                className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-all hover:scale-110"
              >
                <ZoomIn className="w-5 h-5" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handleDownload('png')
                }}
                className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white hover:scale-110 transition-all shadow-lg shadow-purple-500/30"
              >
                <Download className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Style badge */}
          <div className="absolute top-3 left-3 px-3 py-1.5 rounded-xl backdrop-blur-xl text-xs font-medium text-white capitalize"
            style={{
              background: 'rgba(0, 0, 0, 0.4)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            {logo.style}
          </div>

          {/* Like button */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              setIsLiked(!isLiked)
            }}
            className={`absolute top-3 right-3 w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 ${
              isLiked
                ? 'bg-red-500 text-white scale-110'
                : 'bg-black/40 backdrop-blur-xl text-white/70 hover:text-white hover:bg-black/60'
            }`}
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Info section */}
        <div className="p-5 space-y-4">
          {/* Prompt preview */}
          <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed min-h-[2.5rem]">
            {logo.prompt}
          </p>

          {/* Meta info */}
          <div className="flex items-center justify-between">
            {/* Color swatches */}
            <div className="flex items-center gap-2">
              <div className="flex -space-x-1">
                <div
                  className="w-6 h-6 rounded-full ring-2 ring-white"
                  style={{ backgroundColor: logo.primaryColor }}
                />
                <div
                  className="w-6 h-6 rounded-full ring-2 ring-white"
                  style={{ backgroundColor: logo.secondaryColor }}
                />
              </div>
              <span className="text-xs text-gray-400 ml-2">
                {new Date(logo.createdAt).toLocaleDateString(undefined, {
                  month: 'short',
                  day: 'numeric',
                })}
              </span>
            </div>

            {/* Quick actions */}
            <div className="flex items-center gap-1">
              <button
                onClick={handleCopyToClipboard}
                className="p-2 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-all"
                title="Copy to clipboard"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
              {typeof navigator !== 'undefined' && typeof navigator.share === 'function' && (
                <button
                  onClick={handleShare}
                  className="p-2 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-all"
                  title="Share"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={() => onDelete(logo.id)}
                className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all"
                title="Delete"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Download buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => handleDownload('png')}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-medium text-sm text-white transition-all duration-300 hover:-translate-y-0.5"
              style={{
                background: 'linear-gradient(135deg, #8B5CF6, #A855F7)',
                boxShadow: '0 4px 15px -3px rgba(139, 92, 246, 0.4)',
              }}
            >
              <Download className="w-4 h-4" />
              PNG
            </button>
            <button
              onClick={() => handleDownload('svg')}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-medium text-sm text-gray-600 hover:text-gray-900 transition-all duration-300 hover:-translate-y-0.5"
              style={{
                background: 'rgba(0, 0, 0, 0.03)',
                border: '1px solid rgba(0, 0, 0, 0.1)',
              }}
            >
              <Download className="w-4 h-4" />
              SVG
            </button>
          </div>
        </div>
      </div>

      {/* Full preview modal */}
      {showPreview && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setShowPreview(false)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" />

          {/* Content */}
          <div
            className="relative max-w-4xl w-full animate-in scale-in duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setShowPreview(false)}
              className="absolute -top-12 right-0 p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Image */}
            <div className="glass-card p-6 overflow-hidden">
              <img
                src={logo.imageData}
                alt={`Generated logo: ${logo.prompt}`}
                className="w-full rounded-2xl"
              />
            </div>

            {/* Actions bar */}
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  <div
                    className="w-8 h-8 rounded-full ring-2 ring-white"
                    style={{ backgroundColor: logo.primaryColor }}
                  />
                  <div
                    className="w-8 h-8 rounded-full ring-2 ring-white"
                    style={{ backgroundColor: logo.secondaryColor }}
                  />
                </div>
                <div className="text-sm">
                  <span className="text-gray-400">Style: </span>
                  <span className="text-white capitalize">{logo.style}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyToClipboard}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition-all flex items-center gap-2"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
                <button
                  onClick={() => handleDownload('png')}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium transition-all hover:scale-105 flex items-center gap-2 shadow-lg shadow-purple-500/30"
                >
                  <Download className="w-4 h-4" />
                  Download PNG
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
