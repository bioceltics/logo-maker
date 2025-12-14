import { LogoStyle, LogoShape, GeneratedLogo } from './store'

interface GenerateOptions {
  prompt: string
  style: LogoStyle
  primaryColor: string
  secondaryColor: string
  shape: LogoShape
  includeText: boolean
  brandName: string
  onProgress: (progress: number, step: string) => void
}

// ============================================
// PROFESSIONAL SVG ICON LIBRARY
// Based on Looka's approach with 550k+ icons
// ============================================

const SVG_ICONS: Record<string, string[]> = {
  // Tech & Digital
  tech: [
    // Circuit/chip
    `<path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm-2 14H6V8h12v10z"/><circle cx="12" cy="13" r="2"/>`,
    // Code brackets
    `<path d="M8 4L2 12l6 8M16 4l6 8-6 8" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`,
    // Lightning bolt
    `<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>`,
    // Globe/network
    `<circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"/><ellipse cx="12" cy="12" rx="4" ry="10" fill="none" stroke="currentColor" stroke-width="2"/><path d="M2 12h20" fill="none" stroke="currentColor" stroke-width="2"/>`,
    // Layers
    `<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17" fill="none" stroke="currentColor" stroke-width="2"/><polyline points="2 12 12 17 22 12" fill="none" stroke="currentColor" stroke-width="2"/>`,
  ],
  // Business & Finance
  business: [
    // Chart/growth
    `<path d="M3 3v18h18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M7 14l4-4 4 4 5-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`,
    // Briefcase
    `<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/>`,
    // Target
    `<circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="6" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="2"/>`,
    // Award/badge
    `<circle cx="12" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="2"/><path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12"/>`,
    // Handshake
    `<path d="M20 6L9 17l-5-5M4 12l5 5 11-11" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`,
  ],
  // Creative & Design
  creative: [
    // Paintbrush
    `<path d="M18.37 2.63L14 7l-1.59-1.59a2 2 0 00-2.82 0L8 7l9 9 1.59-1.59a2 2 0 000-2.82L17 10l4.37-4.37a2.12 2.12 0 10-3-3z"/><path d="M9 8c-2 3-4 3.5-7 4l8 10c2-1 6-5 6-7"/>`,
    // Star
    `<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>`,
    // Sparkle/magic
    `<path d="M12 3L14 9L20 9L15 13L17 20L12 16L7 20L9 13L4 9L10 9Z"/>`,
    // Palette
    `<circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="7" r="1.5"/><circle cx="17" cy="12" r="1.5"/><circle cx="8" cy="10" r="1.5"/><circle cx="8" cy="15" r="1.5"/>`,
    // Pen tool
    `<path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/>`,
  ],
  // Nature & Organic
  nature: [
    // Leaf
    `<path d="M11 20A7 7 0 019.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>`,
    // Tree
    `<path d="M12 22v-6"/><path d="M12 8L5 16h14L12 8z"/><path d="M12 3L7 10h10L12 3z"/>`,
    // Sun
    `<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="12" y1="21" x2="12" y2="23" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="1" y1="12" x2="3" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="21" y1="12" x2="23" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`,
    // Mountain
    `<path d="M8 21l4-10 4 10"/><path d="M2 21l6-10 6 10"/><path d="M14 21l4-8 4 8"/>`,
    // Water drop
    `<path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z"/>`,
  ],
  // Abstract & Geometric
  abstract: [
    // Hexagon
    `<polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" fill="none" stroke="currentColor" stroke-width="2"/>`,
    // Triangle
    `<polygon points="12 2 22 20 2 20" fill="none" stroke="currentColor" stroke-width="2"/>`,
    // Circle rings
    `<circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="6" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="2"/>`,
    // Square grid
    `<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>`,
    // Infinity
    `<path d="M12 12c-2-2-4-4-6-4s-4 2-4 4 2 4 4 4 4-2 6-4c2 2 4 4 6 4s4-2 4-4-2-4-4-4-4 2-6 4z" fill="none" stroke="currentColor" stroke-width="2"/>`,
  ],
  // Arrows & Motion
  motion: [
    // Arrow up-right
    `<line x1="7" y1="17" x2="17" y2="7" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><polyline points="7 7 17 7 17 17" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`,
    // Rocket
    `<path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z"/><path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>`,
    // Refresh/cycle
    `<path d="M21 2v6h-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M3 12a9 9 0 0115-6.7L21 8" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M3 22v-6h6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M21 12a9 9 0 01-15 6.7L3 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`,
    // Play
    `<polygon points="5 3 19 12 5 21 5 3"/>`,
    // Forward arrows
    `<polyline points="13 17 18 12 13 7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><polyline points="6 17 11 12 6 7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`,
  ],
  // Shield & Security
  security: [
    // Shield
    `<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>`,
    // Lock
    `<rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>`,
    // Key
    `<path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/>`,
    // Check shield
    `<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="none" stroke="currentColor" stroke-width="2"/><path d="M9 12l2 2 4-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`,
    // Eye
    `<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="3"/>`,
  ],
  // Communication
  communication: [
    // Message bubble
    `<path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/>`,
    // Bell
    `<path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/>`,
    // Mail
    `<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" fill="none" stroke="currentColor" stroke-width="2"/><polyline points="22,6 12,13 2,6" fill="none" stroke="currentColor" stroke-width="2"/>`,
    // Phone
    `<path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>`,
    // Wifi/signal
    `<path d="M5 12.55a11 11 0 0114.08 0" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M1.42 9a16 16 0 0121.16 0" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M8.53 16.11a6 6 0 016.95 0" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><circle cx="12" cy="20" r="1"/>`,
  ],
}

// Map styles to icon categories
const STYLE_TO_ICONS: Record<LogoStyle, string[]> = {
  modern: ['tech', 'abstract', 'motion'],
  minimal: ['abstract', 'motion', 'business'],
  vintage: ['business', 'creative', 'security'],
  playful: ['creative', 'nature', 'communication'],
  elegant: ['abstract', 'nature', 'creative'],
  bold: ['motion', 'security', 'business'],
  tech: ['tech', 'abstract', 'security'],
  organic: ['nature', 'creative', 'abstract'],
}

// Professional font stacks
const FONTS = {
  modern: { name: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif', weight: '600' },
  minimal: { name: '"Helvetica Neue", Helvetica, Arial, sans-serif', weight: '400' },
  vintage: { name: 'Georgia, "Times New Roman", serif', weight: '500' },
  playful: { name: '"SF Pro Rounded", -apple-system, sans-serif', weight: '700' },
  elegant: { name: '"Playfair Display", Georgia, serif', weight: '400' },
  bold: { name: '-apple-system, "Arial Black", Impact, sans-serif', weight: '800' },
  tech: { name: '"SF Mono", "Roboto Mono", monospace', weight: '500' },
  organic: { name: '"Avenir Next", Avenir, sans-serif', weight: '500' },
}

// Layout types like Looka
type LayoutType = 'icon-top' | 'icon-left' | 'icon-right' | 'icon-only' | 'text-only' | 'stacked'

const LAYOUTS: LayoutType[] = ['icon-top', 'icon-left', 'icon-right', 'icon-only', 'text-only', 'stacked']

// Utility functions
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : { r: 139, g: 92, b: 246 }
}

function getContrastColor(hex: string): string {
  const rgb = hexToRgb(hex)
  const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255
  return luminance > 0.5 ? '#000000' : '#FFFFFF'
}

function lightenColor(hex: string, percent: number): string {
  const rgb = hexToRgb(hex)
  const r = Math.min(255, Math.round(rgb.r + (255 - rgb.r) * (percent / 100)))
  const g = Math.min(255, Math.round(rgb.g + (255 - rgb.g) * (percent / 100)))
  const b = Math.min(255, Math.round(rgb.b + (255 - rgb.b) * (percent / 100)))
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
}

function darkenColor(hex: string, percent: number): string {
  const rgb = hexToRgb(hex)
  const r = Math.round(rgb.r * (1 - percent / 100))
  const g = Math.round(rgb.g * (1 - percent / 100))
  const b = Math.round(rgb.b * (1 - percent / 100))
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
}

// Get random icon for style
function getRandomIcon(style: LogoStyle): string {
  const categories = STYLE_TO_ICONS[style]
  const category = categories[Math.floor(Math.random() * categories.length)]
  const icons = SVG_ICONS[category]
  return icons[Math.floor(Math.random() * icons.length)]
}

// Generate SVG logo
function generateSVGLogo(
  brandName: string,
  style: LogoStyle,
  primaryColor: string,
  secondaryColor: string,
  layout: LayoutType,
  iconPath: string
): string {
  const font = FONTS[style]
  const bgColor = primaryColor
  const fgColor = getContrastColor(primaryColor)

  const size = 512
  const padding = 60
  const innerSize = size - padding * 2

  let iconSvg = ''
  let textSvg = ''
  let iconSize = 0
  let textY = 0
  let iconY = 0
  let iconX = size / 2
  let textX = size / 2

  const displayName = brandName.substring(0, 12)

  // Calculate scale factor for icon (from 24x24 viewBox to desired size)
  const getIconGroup = (x: number, y: number, iconSz: number) => {
    const scale = iconSz / 24
    return `<g transform="translate(${x}, ${y}) scale(${scale})" fill="${fgColor}" stroke="${fgColor}">${iconPath}</g>`
  }

  switch (layout) {
    case 'icon-top':
      iconSize = innerSize * 0.45
      iconY = padding + 20
      textY = size - padding - 50
      iconSvg = getIconGroup(size / 2 - iconSize / 2, iconY, iconSize)
      textSvg = `<text x="${size / 2}" y="${textY}" text-anchor="middle" font-family="Arial, sans-serif" font-weight="${font.weight}" font-size="48" fill="${fgColor}">${displayName}</text>`
      break

    case 'icon-left':
      iconSize = innerSize * 0.35
      iconX = padding + 20
      textX = iconX + iconSize + 30
      iconY = size / 2 - iconSize / 2
      iconSvg = getIconGroup(iconX, iconY, iconSize)
      textSvg = `<text x="${textX}" y="${size / 2 + 15}" text-anchor="start" font-family="Arial, sans-serif" font-weight="${font.weight}" font-size="52" fill="${fgColor}">${displayName}</text>`
      break

    case 'icon-right':
      iconSize = innerSize * 0.35
      iconX = size - padding - iconSize - 20
      textX = padding + 40
      iconY = size / 2 - iconSize / 2
      iconSvg = getIconGroup(iconX, iconY, iconSize)
      textSvg = `<text x="${textX}" y="${size / 2 + 15}" text-anchor="start" font-family="Arial, sans-serif" font-weight="${font.weight}" font-size="52" fill="${fgColor}">${displayName}</text>`
      break

    case 'icon-only':
      iconSize = innerSize * 0.6
      iconY = size / 2 - iconSize / 2
      iconSvg = getIconGroup(size / 2 - iconSize / 2, iconY, iconSize)
      break

    case 'text-only':
      textY = size / 2 + 20
      textSvg = `<text x="${size / 2}" y="${textY}" text-anchor="middle" font-family="Arial, sans-serif" font-weight="${font.weight}" font-size="72" fill="${fgColor}">${displayName}</text>`
      break

    case 'stacked':
      iconSize = innerSize * 0.35
      iconY = size / 2 - iconSize / 2 - 40
      textY = size / 2 + iconSize / 2 + 20
      iconSvg = getIconGroup(size / 2 - iconSize / 2, iconY, iconSize)
      textSvg = `<text x="${size / 2}" y="${textY}" text-anchor="middle" font-family="Arial, sans-serif" font-weight="${font.weight}" font-size="42" fill="${fgColor}">${displayName}</text>`
      break
  }

  // Build complete SVG - simplified for better canvas compatibility
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
    <rect width="${size}" height="${size}" rx="80" fill="${bgColor}"/>
    ${iconSvg}
    ${textSvg}
  </svg>`

  return svg
}

// Convert SVG to data URL
function svgToDataUrl(svg: string): string {
  const encoded = encodeURIComponent(svg)
    .replace(/'/g, '%27')
    .replace(/"/g, '%22')
  return `data:image/svg+xml,${encoded}`
}

// Convert SVG to PNG using canvas
async function svgToPng(svg: string, size: number = 512): Promise<string> {
  // Check if we're in a browser environment
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return svgToDataUrl(svg)
  }

  return new Promise((resolve) => {
    const img = new Image()
    const canvas = document.createElement('canvas')
    canvas.width = size
    canvas.height = size
    const ctx = canvas.getContext('2d')

    // Timeout fallback - if image doesn't load in 3 seconds, use SVG
    const timeout = setTimeout(() => {
      console.warn('SVG to PNG conversion timed out, using SVG fallback')
      resolve(svgToDataUrl(svg))
    }, 3000)

    if (!ctx) {
      clearTimeout(timeout)
      resolve(svgToDataUrl(svg))
      return
    }

    img.onload = () => {
      clearTimeout(timeout)
      try {
        ctx.drawImage(img, 0, 0, size, size)
        resolve(canvas.toDataURL('image/png'))
      } catch (e) {
        console.error('Canvas draw error:', e)
        resolve(svgToDataUrl(svg))
      }
    }

    img.onerror = () => {
      clearTimeout(timeout)
      console.warn('Image load error, using SVG fallback')
      resolve(svgToDataUrl(svg))
    }

    // Try data URL approach first (more compatible)
    try {
      img.src = svgToDataUrl(svg)
    } catch (e) {
      clearTimeout(timeout)
      resolve(svgToDataUrl(svg))
    }
  })
}

// ============================================
// MAIN GENERATION FUNCTIONS
// ============================================

export async function generateLogo(options: GenerateOptions): Promise<GeneratedLogo> {
  const { prompt, style, primaryColor, secondaryColor, shape, brandName, onProgress } = options

  onProgress(10, 'Analyzing your brand...')
  await sleep(150)

  const name = brandName || prompt.split(' ')[0] || 'Brand'
  const iconPath = getRandomIcon(style)
  const layout = LAYOUTS[Math.floor(Math.random() * LAYOUTS.length)]

  onProgress(40, 'Creating design...')
  await sleep(150)

  const svg = generateSVGLogo(name, style, primaryColor, secondaryColor, layout, iconPath)

  onProgress(70, 'Rendering logo...')

  const imageData = await svgToPng(svg)

  onProgress(100, 'Complete!')

  return {
    id: generateId(),
    prompt,
    style,
    primaryColor,
    secondaryColor,
    shape,
    imageData,
    createdAt: new Date(),
  }
}

export async function generateLogoVariations(
  options: GenerateOptions,
  count: number = 4
): Promise<GeneratedLogo[]> {
  const { prompt, style, primaryColor, secondaryColor, shape, brandName, onProgress } = options
  const logos: GeneratedLogo[] = []

  const name = brandName || prompt.split(' ')[0] || 'Brand'

  // Get different layouts for variety
  const shuffledLayouts = shuffleArray([...LAYOUTS])

  // Color variations
  const colorVariations = [
    { bg: primaryColor, accent: secondaryColor },
    { bg: secondaryColor, accent: primaryColor },
    { bg: darkenColor(primaryColor, 20), accent: lightenColor(primaryColor, 30) },
    { bg: '#1A1A1A', accent: primaryColor },
    { bg: '#FFFFFF', accent: primaryColor },
    { bg: lightenColor(primaryColor, 40), accent: darkenColor(primaryColor, 30) },
  ]

  for (let i = 0; i < count; i++) {
    const progress = ((i + 1) / count) * 90
    onProgress(progress, `Creating variation ${i + 1} of ${count}...`)

    const layout = shuffledLayouts[i % shuffledLayouts.length]
    const colors = colorVariations[i % colorVariations.length]
    const iconPath = getRandomIcon(style)

    const svg = generateSVGLogo(name, style, colors.bg, colors.accent, layout, iconPath)
    const imageData = await svgToPng(svg)

    logos.push({
      id: generateId(),
      prompt,
      style,
      primaryColor: colors.bg,
      secondaryColor: colors.accent,
      shape,
      imageData,
      createdAt: new Date(),
    })

    await sleep(100)
  }

  onProgress(100, 'All variations complete!')
  return logos
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function generateId(): string {
  return `logo_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}
