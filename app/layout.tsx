import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space',
})

export const metadata: Metadata = {
  title: 'LogoAI - Create World-Class Logos with AI',
  description: 'Generate professional, stunning logos instantly with our advanced AI-powered logo maker. Transform your vision into beautiful brand identity.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30 relative overflow-hidden">
          {/* Animated gradient orbs - Light theme */}
          <div className="fixed inset-0 overflow-hidden pointer-events-none">
            {/* Primary orb - purple */}
            <div
              className="absolute -top-[300px] -right-[200px] w-[600px] h-[600px] rounded-full animate-float-slow"
              style={{
                background: 'radial-gradient(circle, rgba(124, 58, 237, 0.08) 0%, transparent 70%)',
                filter: 'blur(60px)',
              }}
            />
            {/* Secondary orb - pink */}
            <div
              className="absolute top-[40%] -left-[200px] w-[500px] h-[500px] rounded-full animate-float-slow"
              style={{
                background: 'radial-gradient(circle, rgba(219, 39, 119, 0.06) 0%, transparent 70%)',
                filter: 'blur(60px)',
                animationDelay: '2s',
              }}
            />
            {/* Tertiary orb - orange */}
            <div
              className="absolute -bottom-[200px] right-[20%] w-[400px] h-[400px] rounded-full animate-float-slow"
              style={{
                background: 'radial-gradient(circle, rgba(234, 88, 12, 0.05) 0%, transparent 70%)',
                filter: 'blur(60px)',
                animationDelay: '4s',
              }}
            />
            {/* Center glow */}
            <div
              className="absolute top-[30%] left-[50%] -translate-x-1/2 w-[800px] h-[400px] rounded-full animate-pulse-glow"
              style={{
                background: 'radial-gradient(ellipse, rgba(124, 58, 237, 0.03) 0%, transparent 60%)',
                filter: 'blur(80px)',
              }}
            />
          </div>

          {/* Subtle grid pattern */}
          <div
            className="fixed inset-0 pointer-events-none opacity-[0.015]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)
              `,
              backgroundSize: '64px 64px',
            }}
          />

          {/* Noise texture */}
          <div className="noise" />

          {/* Main content */}
          <div className="relative z-10">
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}
