'use client'

import { useEffect, useState } from 'react'
import { Sparkles, Palette, Shapes, Type, Check, Wand2 } from 'lucide-react'

interface GenerationProgressProps {
  progress: number
  currentStep: string
}

const STEPS = [
  { icon: Sparkles, label: 'Analyzing', fullLabel: 'Analyzing your vision' },
  { icon: Shapes, label: 'Designing', fullLabel: 'Designing layout' },
  { icon: Palette, label: 'Styling', fullLabel: 'Applying colors' },
  { icon: Type, label: 'Refining', fullLabel: 'Adding elements' },
  { icon: Check, label: 'Finishing', fullLabel: 'Final touches' },
]

const TIPS = [
  "Great logos are memorable and timeless",
  "Simplicity is the ultimate sophistication",
  "Your logo should work at any size",
  "Colors evoke emotions and brand identity",
  "A good logo tells your brand story",
]

export default function GenerationProgress({ progress, currentStep }: GenerationProgressProps) {
  const currentStepIndex = Math.floor((progress / 100) * STEPS.length)
  const [tipIndex, setTipIndex] = useState(0)
  const [dots, setDots] = useState('')

  // Rotate tips
  useEffect(() => {
    const interval = setInterval(() => {
      setTipIndex((prev) => (prev + 1) % TIPS.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  // Animate dots
  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? '' : prev + '.'))
    }, 500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="glass-card p-10 space-y-10">
        {/* Main progress indicator */}
        <div className="flex flex-col items-center space-y-6">
          {/* Animated logo creation visual */}
          <div className="relative w-40 h-40">
            {/* Outer rotating ring */}
            <div
              className="absolute inset-0 rounded-full animate-spin-slow"
              style={{
                background: 'conic-gradient(from 0deg, transparent, rgba(139, 92, 246, 0.3), transparent)',
              }}
            />

            {/* Middle pulsing ring */}
            <div
              className="absolute inset-4 rounded-full animate-pulse"
              style={{
                background: 'radial-gradient(circle, transparent 50%, rgba(236, 72, 153, 0.2) 100%)',
              }}
            />

            {/* Inner gradient circle */}
            <div
              className="absolute inset-8 rounded-full"
              style={{
                background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.3), rgba(236, 72, 153, 0.3))',
                boxShadow: '0 0 60px rgba(139, 92, 246, 0.4), inset 0 0 40px rgba(236, 72, 153, 0.2)',
              }}
            />

            {/* Center icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/50">
                <Wand2 className="w-8 h-8 text-white animate-pulse" />
              </div>
            </div>

            {/* Orbiting particles */}
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="absolute w-3 h-3 rounded-full"
                style={{
                  background: i === 0 ? '#8B5CF6' : i === 1 ? '#EC4899' : '#F59E0B',
                  top: '50%',
                  left: '50%',
                  transform: `rotate(${i * 120 + progress * 3.6}deg) translateX(70px) translateY(-50%)`,
                  boxShadow: `0 0 20px ${i === 0 ? '#8B5CF6' : i === 1 ? '#EC4899' : '#F59E0B'}`,
                  transition: 'transform 0.3s ease-out',
                }}
              />
            ))}
          </div>

          {/* Title */}
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-bold text-gray-900">
              Creating Your Logo{dots}
            </h3>
            <p className="text-gray-500">{currentStep || 'Initializing AI...'}</p>
          </div>
        </div>

        {/* Progress section */}
        <div className="space-y-4">
          {/* Progress bar with glow */}
          <div className="relative">
            {/* Glow effect */}
            <div
              className="absolute inset-0 rounded-full blur-md opacity-50"
              style={{
                background: `linear-gradient(90deg, #8B5CF6, #EC4899, #F59E0B)`,
                width: `${progress}%`,
              }}
            />

            {/* Track */}
            <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
              {/* Fill */}
              <div
                className="absolute inset-y-0 left-0 rounded-full transition-all duration-500 ease-out"
                style={{
                  width: `${progress}%`,
                  background: 'linear-gradient(90deg, #8B5CF6, #EC4899, #F59E0B)',
                }}
              >
                {/* Shimmer effect */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                    animation: 'shimmer 1.5s ease-in-out infinite',
                  }}
                />
              </div>
            </div>
          </div>

          {/* Percentage */}
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-400">Progress</span>
            <span className="text-gray-900 font-bold text-lg">{Math.round(progress)}%</span>
          </div>
        </div>

        {/* Step indicators */}
        <div className="relative">
          {/* Connection line */}
          <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200" />
          <div
            className="absolute top-5 left-0 h-0.5 transition-all duration-500"
            style={{
              width: `${(currentStepIndex / (STEPS.length - 1)) * 100}%`,
              background: 'linear-gradient(90deg, #8B5CF6, #EC4899)',
            }}
          />

          {/* Steps */}
          <div className="relative flex justify-between">
            {STEPS.map((step, index) => {
              const Icon = step.icon
              const isComplete = index < currentStepIndex
              const isCurrent = index === currentStepIndex

              return (
                <div
                  key={index}
                  className="flex flex-col items-center gap-3 relative z-10"
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 ${
                      isComplete
                        ? 'bg-gradient-to-br from-green-500 to-emerald-500 shadow-lg shadow-green-500/30'
                        : isCurrent
                        ? 'bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg shadow-purple-500/30 scale-110'
                        : 'bg-gray-100'
                    }`}
                  >
                    <Icon
                      className={`w-5 h-5 transition-colors ${
                        isComplete || isCurrent ? 'text-white' : 'text-gray-400'
                      } ${isCurrent ? 'animate-pulse' : ''}`}
                    />
                  </div>
                  <span
                    className={`text-xs font-medium transition-colors hidden sm:block ${
                      isComplete
                        ? 'text-green-500'
                        : isCurrent
                        ? 'text-gray-900'
                        : 'text-gray-400'
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Tip carousel */}
        <div className="text-center p-4 rounded-2xl bg-gray-50">
          <div className="flex items-center justify-center gap-2 text-gray-400 mb-2">
            <Sparkles className="w-4 h-4" />
            <span className="text-xs uppercase tracking-wider">Design Tip</span>
          </div>
          <p className="text-gray-600 text-sm transition-opacity duration-300">
            {TIPS[tipIndex]}
          </p>
        </div>
      </div>
    </div>
  )
}
