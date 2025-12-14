import { create } from 'zustand'

export type LogoStyle = 'modern' | 'minimal' | 'vintage' | 'playful' | 'elegant' | 'bold' | 'tech' | 'organic'
export type LogoShape = 'circle' | 'square' | 'rounded' | 'hexagon' | 'shield' | 'diamond'

export interface GeneratedLogo {
  id: string
  prompt: string
  style: LogoStyle
  primaryColor: string
  secondaryColor: string
  shape: LogoShape
  imageData: string
  createdAt: Date
}

export interface LogoSettings {
  prompt: string
  style: LogoStyle
  primaryColor: string
  secondaryColor: string
  shape: LogoShape
  includeText: boolean
  brandName: string
}

interface LogoStore {
  settings: LogoSettings
  generatedLogos: GeneratedLogo[]
  isGenerating: boolean
  generationProgress: number
  currentStep: string

  setPrompt: (prompt: string) => void
  setStyle: (style: LogoStyle) => void
  setPrimaryColor: (color: string) => void
  setSecondaryColor: (color: string) => void
  setShape: (shape: LogoShape) => void
  setIncludeText: (include: boolean) => void
  setBrandName: (name: string) => void
  setIsGenerating: (generating: boolean) => void
  setGenerationProgress: (progress: number) => void
  setCurrentStep: (step: string) => void
  addGeneratedLogo: (logo: GeneratedLogo) => void
  removeGeneratedLogo: (id: string) => void
  clearRecentLogos: () => void
  clearHistory: () => void
  resetSettings: () => void
}

const defaultSettings: LogoSettings = {
  prompt: '',
  style: 'modern',
  primaryColor: '#8B5CF6',
  secondaryColor: '#EC4899',
  shape: 'circle',
  includeText: true,
  brandName: '',
}

export const useLogoStore = create<LogoStore>((set) => ({
  settings: defaultSettings,
  generatedLogos: [],
  isGenerating: false,
  generationProgress: 0,
  currentStep: '',

  setPrompt: (prompt) => set((state) => ({ settings: { ...state.settings, prompt } })),
  setStyle: (style) => set((state) => ({ settings: { ...state.settings, style } })),
  setPrimaryColor: (primaryColor) => set((state) => ({ settings: { ...state.settings, primaryColor } })),
  setSecondaryColor: (secondaryColor) => set((state) => ({ settings: { ...state.settings, secondaryColor } })),
  setShape: (shape) => set((state) => ({ settings: { ...state.settings, shape } })),
  setIncludeText: (includeText) => set((state) => ({ settings: { ...state.settings, includeText } })),
  setBrandName: (brandName) => set((state) => ({ settings: { ...state.settings, brandName } })),
  setIsGenerating: (isGenerating) => set({ isGenerating }),
  setGenerationProgress: (generationProgress) => set({ generationProgress }),
  setCurrentStep: (currentStep) => set({ currentStep }),
  addGeneratedLogo: (logo) => set((state) => ({
    generatedLogos: [logo, ...state.generatedLogos]
  })),
  removeGeneratedLogo: (id) => set((state) => ({
    generatedLogos: state.generatedLogos.filter((logo) => logo.id !== id)
  })),
  clearRecentLogos: () => set((state) => ({
    generatedLogos: state.generatedLogos.slice(4)
  })),
  clearHistory: () => set({ generatedLogos: [] }),
  resetSettings: () => set({ settings: defaultSettings }),
}))
