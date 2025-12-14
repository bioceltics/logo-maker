'use client'

import { useEffect, useState } from 'react'
import { Sparkles, Zap, Palette, Download, ArrowRight, Star } from 'lucide-react'

const FEATURES = [
  {
    icon: Sparkles,
    title: 'AI-Powered',
    description: 'Advanced AI understands your vision',
    color: 'from-purple-500 to-violet-500',
    delay: 0,
  },
  {
    icon: Zap,
    title: 'Instant Results',
    description: 'Generate logos in seconds',
    color: 'from-amber-500 to-orange-500',
    delay: 100,
  },
  {
    icon: Palette,
    title: 'Fully Customizable',
    description: 'Unlimited styles & colors',
    color: 'from-pink-500 to-rose-500',
    delay: 200,
  },
  {
    icon: Download,
    title: 'Export Ready',
    description: 'Download PNG & SVG files',
    color: 'from-emerald-500 to-teal-500',
    delay: 300,
  },
]

const FLOATING_LOGOS = [
  { emoji: '🎨', size: 40, top: '15%', left: '10%', duration: 6 },
  { emoji: '✨', size: 32, top: '25%', right: '15%', duration: 7 },
  { emoji: '🚀', size: 36, top: '60%', left: '8%', duration: 8 },
  { emoji: '💎', size: 28, top: '70%', right: '12%', duration: 5 },
  { emoji: '🎯', size: 30, top: '40%', right: '8%', duration: 9 },
]

export default function HeroSection() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="relative pt-32 pb-16 px-4 overflow-hidden">
      {/* Floating decorative elements */}
      {mounted && FLOATING_LOGOS.map((item, index) => (
        <div
          key={index}
          className="absolute opacity-30 animate-float pointer-events-none hidden lg:block"
          style={{
            top: item.top,
            left: item.left,
            right: item.right,
            fontSize: item.size,
            animationDuration: `${item.duration}s`,
            animationDelay: `${index * 0.5}s`,
          }}
        >
          {item.emoji}
        </div>
      ))}

      <div className="max-w-5xl mx-auto text-center space-y-8">
        {/* Announcement badge */}
        <div
          className={`inline-flex items-center gap-3 px-5 py-2.5 rounded-full transition-all duration-700 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{
            background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.08), rgba(219, 39, 119, 0.08))',
            border: '1px solid rgba(124, 58, 237, 0.15)',
          }}
        >
          <span className="flex items-center gap-1.5 text-purple-600">
            <Star className="w-4 h-4 fill-current" />
            <span className="text-sm font-medium">Trusted by 10,000+ creators</span>
          </span>
          <span className="w-px h-4 bg-gray-300" />
          <span className="text-sm text-gray-500">New: AI Style Transfer</span>
          <ArrowRight className="w-4 h-4 text-purple-500" />
        </div>

        {/* Main headline */}
        <div className="space-y-6">
          <h1
            className={`text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight transition-all duration-700 delay-100 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <span className="text-gray-900">Create </span>
            <span className="relative">
              <span className="gradient-text">Stunning Logos</span>
              <svg
                className="absolute -bottom-2 left-0 w-full h-3 text-purple-300"
                viewBox="0 0 200 12"
                preserveAspectRatio="none"
              >
                <path
                  d="M0,8 Q50,0 100,8 T200,8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <br />
            <span className="text-gray-900">with AI in </span>
            <span className="relative inline-block">
              <span className="text-gray-900">Seconds</span>
              <Sparkles className="absolute -top-2 -right-8 w-6 h-6 text-amber-500 animate-pulse" />
            </span>
          </h1>

          <p
            className={`text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed transition-all duration-700 delay-200 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            Transform your vision into professional brand identity. Just describe what you want,
            and our AI will generate beautiful, unique logos tailored to your brand.
          </p>
        </div>

        {/* Stats */}
        <div
          className={`flex items-center justify-center gap-8 sm:gap-12 py-6 transition-all duration-700 delay-300 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          {[
            { value: '50K+', label: 'Logos Created' },
            { value: '4.9', label: 'User Rating', suffix: '★' },
            { value: '<10s', label: 'Generation Time' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-gray-900">
                {stat.value}
                {stat.suffix && <span className="text-amber-500 ml-1">{stat.suffix}</span>}
              </div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Feature cards */}
        <div
          className={`grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto pt-8 transition-all duration-700 delay-400 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          {FEATURES.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="group relative p-5 rounded-2xl transition-all duration-500 hover:-translate-y-1 bg-white border border-gray-100 shadow-sm hover:shadow-md"
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at center, rgba(124, 58, 237, 0.05), transparent 70%)`,
                  }}
                />

                <div className="relative">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 transform group-hover:scale-110 transition-transform duration-300`}
                    style={{
                      boxShadow: '0 8px 32px -8px rgba(124, 58, 237, 0.25)',
                    }}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Scroll indicator */}
        <div
          className={`pt-12 transition-all duration-700 delay-500 ${
            mounted ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="flex flex-col items-center gap-2 text-gray-400">
            <span className="text-sm">Start creating below</span>
            <div className="w-6 h-10 rounded-full border-2 border-current flex items-start justify-center p-1">
              <div className="w-1.5 h-3 rounded-full bg-current animate-bounce" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
