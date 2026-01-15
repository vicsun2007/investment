import type { Metadata } from 'next'
import './globals.css'
import LanguageProvider from '@/components/LanguageProvider'

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
    <html lang="en" className="dark">
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  )
}

