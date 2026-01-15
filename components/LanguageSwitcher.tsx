'use client'

import { useLanguageStore } from '@/store/useLanguageStore'
import { Globe } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function LanguageSwitcher() {
  const [mounted, setMounted] = useState(false)
  const language = useLanguageStore((state) => state.language)
  const setLanguage = useLanguageStore((state) => state.setLanguage)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const languages = [
    { code: 'zh', label: '中文', flag: '🇨🇳' },
    { code: 'en', label: 'English', flag: '🇺🇸' },
  ]

  const currentLang = languages.find((lang) => lang.code === language) || languages[0]

  // 确保只在客户端渲染
  if (!mounted) {
    return (
      <div className="flex items-center gap-2 rounded-lg border border-card-border bg-sidebar-bg px-3 py-2 text-sm font-medium text-white min-w-[120px] justify-center">
        <Globe className="h-4 w-4 flex-shrink-0 text-blue-400" />
        <span className="text-lg leading-none">🇨🇳</span>
        <span className="whitespace-nowrap font-medium">中文</span>
      </div>
    )
  }

  return (
    <div className="relative z-50" data-testid="language-switcher">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-lg border border-card-border bg-sidebar-bg px-3 py-2 text-sm font-medium text-white hover:bg-sidebar-hover hover:border-primary transition-all min-w-[120px] justify-center"
        type="button"
        aria-label="Switch language"
        title={`Current: ${currentLang.label} - Click to switch`}
        data-testid="language-switcher-button"
      >
        <Globe className="h-4 w-4 flex-shrink-0 text-blue-400" data-testid="globe-icon" />
        <span className="text-lg leading-none">{currentLang.flag}</span>
        <span className="whitespace-nowrap font-medium">{currentLang.label}</span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full mt-2 w-40 rounded-lg border border-card-border bg-card-bg shadow-lg z-20">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code as 'zh' | 'en')
                  setIsOpen(false)
                }}
                className={`w-full flex items-center gap-2 px-4 py-2 text-sm text-left transition-colors ${
                  language === lang.code
                    ? 'bg-sidebar-active text-white'
                    : 'text-gray-300 hover:bg-sidebar-hover hover:text-white'
                }`}
              >
                <span>{lang.flag}</span>
                <span>{lang.label}</span>
                {language === lang.code && (
                  <span className="ml-auto text-primary">✓</span>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

