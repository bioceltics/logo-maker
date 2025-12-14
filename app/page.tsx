'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Header from '@/components/Header'
import HeroSection from '@/components/HeroSection'
import PromptInput from '@/components/PromptInput'
import GenerationProgress from '@/components/GenerationProgress'
import LogoResults from '@/components/LogoResults'
import HistoryView from '@/components/HistoryView'
import { useLogoStore } from '@/lib/store'
import { generateLogoVariations } from '@/lib/generateLogo'
import { Sparkles, ArrowDown, Zap } from 'lucide-react'

export default function Home() {
  const [showHistory, setShowHistory] = useState(false)
  const [showScrollIndicator, setShowScrollIndicator] = useState(true)
  const resultsRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLDivElement>(null)

  const {
    settings,
    isGenerating,
    generationProgress,
    currentStep,
    generatedLogos,
    setIsGenerating,
    setGenerationProgress,
    setCurrentStep,
    addGeneratedLogo,
  } = useLogoStore()

  // Hide scroll indicator on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowScrollIndicator(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Keyboard shortcut for generating
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter' && settings.prompt.trim() && !isGenerating) {
        handleGenerate()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [settings.prompt, isGenerating])

  const handleGenerate = useCallback(async () => {
    if (!settings.prompt.trim() || isGenerating) return

    setIsGenerating(true)
    setGenerationProgress(0)
    setCurrentStep('Initializing...')

    try {
      const logos = await generateLogoVariations(
        {
          prompt: settings.prompt,
          style: settings.style,
          primaryColor: settings.primaryColor,
          secondaryColor: settings.secondaryColor,
          shape: settings.shape,
          includeText: settings.includeText,
          brandName: settings.brandName,
          onProgress: (progress, step) => {
            setGenerationProgress(progress)
            setCurrentStep(step)
          },
        },
        4 // Generate 4 variations
      )

      // Add logos to store (in reverse so first is displayed first)
      logos.reverse().forEach((logo) => addGeneratedLogo(logo))

      // Scroll to results
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 300)
    } catch (error) {
      console.error('Generation error:', error)
    } finally {
      setIsGenerating(false)
      setGenerationProgress(0)
      setCurrentStep('')
    }
  }, [settings, isGenerating, setIsGenerating, setGenerationProgress, setCurrentStep, addGeneratedLogo])

  const scrollToInput = () => {
    inputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <main className="min-h-screen">
      <Header
        showHistory={showHistory}
        onToggleHistory={() => setShowHistory(!showHistory)}
      />

      {/* Hero Section */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <HeroSection />
        </div>

        {/* Floating scroll indicator */}
        {showScrollIndicator && !generatedLogos.length && (
          <button
            onClick={scrollToInput}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400 hover:text-gray-600 transition-all duration-300 animate-bounce"
          >
            <ArrowDown className="w-5 h-5" />
          </button>
        )}
      </section>

      {/* Divider with gradient */}
      <div className="relative py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-8 pb-32">
        {/* Prompt Input Section */}
        <section ref={inputRef} className="max-w-7xl mx-auto py-8 scroll-mt-24">
          <PromptInput onGenerate={handleGenerate} disabled={isGenerating} />
        </section>

        {/* Generation Progress */}
        {isGenerating && (
          <section className="max-w-7xl mx-auto py-12">
            <GenerationProgress progress={generationProgress} currentStep={currentStep} />
          </section>
        )}

        {/* Results Section */}
        {!isGenerating && generatedLogos.length > 0 && (
          <section ref={resultsRef} className="max-w-7xl mx-auto py-16 scroll-mt-24">
            <LogoResults onGenerateMore={handleGenerate} onRegenerate={handleGenerate} />
          </section>
        )}

        {/* Empty state / Getting started */}
        {!isGenerating && generatedLogos.length === 0 && (
          <section className="max-w-3xl mx-auto py-16">
            <div className="glass-card p-10 text-center space-y-6">
              {/* Icon */}
              <div className="relative inline-block">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-500/30 to-pink-500/30 blur-xl" />
                <div className="relative w-20 h-20 rounded-3xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center mx-auto">
                  <Sparkles className="w-10 h-10 text-purple-500" />
                </div>
              </div>

              {/* Text */}
              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-gray-900">Ready to Create Your Logo?</h3>
                <p className="text-gray-500 max-w-lg mx-auto leading-relaxed">
                  Describe your ideal logo above and click "Generate Logo" to see the magic happen.
                  Our AI will create 4 unique variations based on your description.
                </p>
              </div>

              {/* Feature pills */}
              <div className="flex flex-wrap justify-center gap-3 pt-4">
                {[
                  { label: 'Tech Startup', color: 'purple' },
                  { label: 'Coffee Shop', color: 'amber' },
                  { label: 'Fitness App', color: 'emerald' },
                  { label: 'Fashion Brand', color: 'pink' },
                  { label: 'Restaurant', color: 'orange' },
                  { label: 'Agency', color: 'blue' },
                ].map((item, index) => (
                  <span
                    key={index}
                    className={`px-4 py-2 rounded-xl text-sm font-medium bg-${item.color}-100 text-${item.color}-600 border border-${item.color}-200`}
                  >
                    {item.label}
                  </span>
                ))}
              </div>

              {/* Quick stats */}
              <div className="flex items-center justify-center gap-6 pt-6 text-sm">
                <div className="flex items-center gap-2 text-gray-400">
                  <Zap className="w-4 h-4" />
                  <span>~10 seconds</span>
                </div>
                <div className="w-px h-4 bg-gray-200" />
                <div className="flex items-center gap-2 text-gray-400">
                  <span>4 variations per generation</span>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 py-4 bg-gradient-to-t from-white to-transparent pointer-events-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-center">
          <p className="text-xs text-gray-400">
            Powered by AI • Built with Next.js
          </p>
        </div>
      </footer>

      {/* History overlay */}
      {showHistory && <HistoryView onClose={() => setShowHistory(false)} />}
    </main>
  )
}
