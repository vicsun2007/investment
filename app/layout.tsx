import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Alpha VC Intelligence Hub',
  description: 'AI-powered investment analysis platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" className="dark">
      <body>{children}</body>
    </html>
  )
}

