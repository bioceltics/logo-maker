'use client'

import { useState, useRef, useEffect } from 'react'
import { Wand2, Sparkles, ChevronDown, Lightbulb, Type, Layers, Palette, Check } from 'lucide-react'
import { useLogoStore, LogoStyle, LogoShape } from '@/lib/store'

const STYLES: { id: LogoStyle; name: string; description: string; icon: string }[] = [
  { id: 'modern', name: 'Modern', description: 'Clean & contemporary', icon: '◈' },
  { id: 'minimal', name: 'Minimal', description: 'Simple & elegant', icon: '○' },
  { id: 'vintage', name: 'Vintage', description: 'Classic & timeless', icon: '❖' },
  { id: 'playful', name: 'Playful', description: 'Fun & colorful', icon: '★' },
  { id: 'elegant', name: 'Elegant', description: 'Sophisticated', icon: '◇' },
  { id: 'bold', name: 'Bold', description: 'Strong & impactful', icon: '■' },
  { id: 'tech', name: 'Tech', description: 'Digital & futuristic', icon: '⬡' },
  { id: 'organic', name: 'Organic', description: 'Natural & flowing', icon: '❂' },
]

const SHAPES: { id: LogoShape; name: string; preview: string }[] = [
  { id: 'circle', name: 'Circle', preview: '●' },
  { id: 'square', name: 'Square', preview: '■' },
  { id: 'rounded', name: 'Rounded', preview: '▢' },
  { id: 'hexagon', name: 'Hexagon', preview: '⬡' },
  { id: 'shield', name: 'Shield', preview: '🛡' },
  { id: 'diamond', name: 'Diamond', preview: '◆' },
]

const PRESET_COLORS = [
  { primary: '#8B5CF6', secondary: '#EC4899', name: 'Violet Dream' },
  { primary: '#3B82F6', secondary: '#06B6D4', name: 'Ocean Breeze' },
  { primary: '#10B981', secondary: '#84CC16', name: 'Fresh Mint' },
  { primary: '#F59E0B', secondary: '#EF4444', name: 'Sunset Glow' },
  { primary: '#6366F1', secondary: '#8B5CF6', name: 'Electric Indigo' },
  { primary: '#EC4899', secondary: '#F43F5E', name: 'Rose Petal' },
  { primary: '#14B8A6', secondary: '#0EA5E9', name: 'Aqua Flow' },
  { primary: '#1F2937', secondary: '#6B7280', name: 'Midnight' },
]

const EXAMPLE_PROMPTS = [
  { text: 'Tech startup focused on AI innovation', category: 'Tech' },
  { text: 'Artisan coffee shop with cozy vibes', category: 'Food' },
  { text: 'Premium fitness and wellness brand', category: 'Health' },
  { text: 'Luxury fashion boutique', category: 'Fashion' },
  { text: 'Creative design agency', category: 'Creative' },
  { text: 'Eco-friendly sustainable products', category: 'Green' },
]

interface PromptInputProps {
  onGenerate: () => void
  disabled: boolean
}

export default function PromptInput({ onGenerate, disabled }: PromptInputProps) {
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const {
    settings,
    setPrompt,
    setStyle,
    setPrimaryColor,
    setSecondaryColor,
    setShape,
    setIncludeText,
    setBrandName,
  } = useLogoStore()

  const handleExampleClick = (text: string) => {
    setPrompt(text)
    textareaRef.current?.focus()
  }

  const handleColorPreset = (preset: typeof PRESET_COLORS[0]) => {
    setPrimaryColor(preset.primary)
    setSecondaryColor(preset.secondary)
  }

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = Math.max(120, textareaRef.current.scrollHeight) + 'px'
    }
  }, [settings.prompt])

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* Main prompt section */}
      <div className="relative">
        {/* Decorative glow */}
        <div
          className={`absolute -inset-1 rounded-[28px] transition-opacity duration-500 ${
            isFocused ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.15), rgba(219, 39, 119, 0.15))',
            filter: 'blur(20px)',
          }}
        />

        <div className="glass-card p-8 relative">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Describe Your Vision</h2>
              <p className="text-sm text-gray-500">Be specific about your brand and style preferences</p>
            </div>
          </div>

          {/* Textarea */}
          <div className="relative mb-6">
            <textarea
              ref={textareaRef}
              value={settings.prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="A modern, minimalist logo for a tech company specializing in cloud computing. The logo should convey innovation, trust, and scalability..."
              className="input-field min-h-[120px] resize-none text-lg leading-relaxed pr-20"
              disabled={disabled}
            />
            {/* Character count */}
            <div className="absolute bottom-4 right-4 text-sm text-gray-400">
              {settings.prompt.length}/500
            </div>
          </div>

          {/* Example prompts */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-gray-500">
              <Lightbulb className="w-4 h-4" />
              <span className="text-sm">Need inspiration?</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {EXAMPLE_PROMPTS.map((example, index) => (
                <button
                  key={index}
                  onClick={() => handleExampleClick(example.text)}
                  className="group flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 hover:-translate-y-0.5 bg-gray-50 border border-gray-100 hover:border-purple-200 hover:bg-purple-50"
                  disabled={disabled}
                >
                  <span className="text-xs px-2 py-0.5 rounded-md bg-purple-100 text-purple-600 font-medium">
                    {example.category}
                  </span>
                  <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                    {example.text}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Brand name section */}
      <div className="glass-card p-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center flex-shrink-0">
            <Type className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">Brand Name</h3>
                <p className="text-sm text-gray-500">Add your company name to the logo</p>
              </div>
              <button
                onClick={() => setIncludeText(!settings.includeText)}
                className={`relative w-14 h-8 rounded-full transition-all duration-300 ${
                  settings.includeText
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                    : 'bg-gray-200'
                }`}
                disabled={disabled}
              >
                <div
                  className={`absolute top-1 w-6 h-6 rounded-full bg-white shadow-lg transition-all duration-300 ${
                    settings.includeText ? 'left-7' : 'left-1'
                  }`}
                />
              </button>
            </div>

            {settings.includeText && (
              <input
                type="text"
                value={settings.brandName}
                onChange={(e) => setBrandName(e.target.value)}
                placeholder="Enter your brand name"
                className="input-field animate-in"
                disabled={disabled}
              />
            )}
          </div>
        </div>
      </div>

      {/* Style selection */}
      <div className="glass-card p-6 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center">
            <Layers className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-medium text-gray-900">Logo Style</h3>
            <p className="text-sm text-gray-500">Choose the aesthetic that fits your brand</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {STYLES.map((style) => (
            <button
              key={style.id}
              onClick={() => setStyle(style.id)}
              className={`group relative p-4 rounded-2xl text-left transition-all duration-300 ${
                settings.style === style.id
                  ? 'selection-card-active'
                  : 'selection-card'
              }`}
              disabled={disabled}
            >
              {/* Selection indicator */}
              {settings.style === style.id && (
                <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" />
                </div>
              )}

              <div className="text-2xl mb-2 opacity-60 group-hover:opacity-100 transition-opacity">
                {style.icon}
              </div>
              <p className="font-medium text-gray-900 text-sm">{style.name}</p>
              <p className="text-xs text-gray-500">{style.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Advanced options toggle */}
      <button
        onClick={() => setShowAdvanced(!showAdvanced)}
        className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-all duration-300"
      >
        <span className="text-sm font-medium">
          {showAdvanced ? 'Hide' : 'Show'} Advanced Options
        </span>
        <div className={`transition-transform duration-300 ${showAdvanced ? 'rotate-180' : ''}`}>
          <ChevronDown className="w-5 h-5" />
        </div>
      </button>

      {/* Advanced options */}
      {showAdvanced && (
        <div className="space-y-6 animate-in">
          {/* Shape selection */}
          <div className="glass-card p-6 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                <span className="text-xl text-white">⬡</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Logo Shape</h3>
                <p className="text-sm text-gray-500">Select the base shape for your logo</p>
              </div>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
              {SHAPES.map((shape) => (
                <button
                  key={shape.id}
                  onClick={() => setShape(shape.id)}
                  className={`group relative p-4 rounded-2xl text-center transition-all duration-300 ${
                    settings.shape === shape.id
                      ? 'selection-card-active'
                      : 'selection-card'
                  }`}
                  disabled={disabled}
                >
                  <div className="text-2xl mb-1 opacity-60 group-hover:opacity-100 transition-opacity">
                    {shape.preview}
                  </div>
                  <p className="text-xs text-gray-600">{shape.name}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Color selection */}
          <div className="glass-card p-6 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                <Palette className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Color Palette</h3>
                <p className="text-sm text-gray-500">Choose colors that represent your brand</p>
              </div>
            </div>

            {/* Preset colors */}
            <div className="space-y-3">
              <p className="text-sm text-gray-500">Curated Palettes</p>
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
                {PRESET_COLORS.map((preset, index) => (
                  <button
                    key={index}
                    onClick={() => handleColorPreset(preset)}
                    className={`group relative aspect-square rounded-2xl overflow-hidden transition-all duration-300 ${
                      settings.primaryColor === preset.primary && settings.secondaryColor === preset.secondary
                        ? 'ring-2 ring-purple-500 ring-offset-2 ring-offset-white scale-105'
                        : 'hover:scale-110'
                    }`}
                    style={{
                      background: `linear-gradient(135deg, ${preset.primary}, ${preset.secondary})`,
                    }}
                    title={preset.name}
                    disabled={disabled}
                  >
                    {/* Checkmark */}
                    {settings.primaryColor === preset.primary && settings.secondaryColor === preset.secondary && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <Check className="w-5 h-5 text-white" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom colors */}
            <div className="space-y-3 pt-4 border-t border-gray-100">
              <p className="text-sm text-gray-500">Custom Colors</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs text-gray-500 uppercase tracking-wider">Primary</label>
                  <div className="flex items-center gap-3 p-2 rounded-xl bg-gray-50">
                    <input
                      type="color"
                      value={settings.primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-0"
                      disabled={disabled}
                    />
                    <input
                      type="text"
                      value={settings.primaryColor.toUpperCase()}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      className="flex-1 bg-transparent text-gray-900 font-mono text-sm uppercase focus:outline-none"
                      disabled={disabled}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-gray-500 uppercase tracking-wider">Secondary</label>
                  <div className="flex items-center gap-3 p-2 rounded-xl bg-gray-50">
                    <input
                      type="color"
                      value={settings.secondaryColor}
                      onChange={(e) => setSecondaryColor(e.target.value)}
                      className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-0"
                      disabled={disabled}
                    />
                    <input
                      type="text"
                      value={settings.secondaryColor.toUpperCase()}
                      onChange={(e) => setSecondaryColor(e.target.value)}
                      className="flex-1 bg-transparent text-gray-900 font-mono text-sm uppercase focus:outline-none"
                      disabled={disabled}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Preview */}
            <div className="flex items-center justify-center p-6 rounded-2xl bg-gray-50">
              <div
                className="w-24 h-24 rounded-2xl"
                style={{
                  background: `linear-gradient(135deg, ${settings.primaryColor}, ${settings.secondaryColor})`,
                  boxShadow: `0 20px 40px -10px ${settings.primaryColor}40`,
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Generate button */}
      <div className="relative">
        {/* Button glow */}
        <div
          className="absolute inset-0 rounded-2xl opacity-60"
          style={{
            background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.25), rgba(219, 39, 119, 0.25))',
            filter: 'blur(20px)',
            transform: 'translateY(10px)',
          }}
        />

        <button
          onClick={onGenerate}
          disabled={disabled || !settings.prompt.trim()}
          className="btn-primary w-full flex items-center justify-center gap-3 py-5 text-lg disabled:opacity-50 disabled:cursor-not-allowed relative"
        >
          <Wand2 className="w-6 h-6" />
          <span>Generate Logo</span>
          {!disabled && settings.prompt.trim() && (
            <span className="absolute right-6 text-sm opacity-60">⌘ + Enter</span>
          )}
        </button>
      </div>
    </div>
  )
}
