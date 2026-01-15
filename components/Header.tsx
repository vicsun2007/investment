'use client'

import { Search, Bell, MessageSquare, Globe } from 'lucide-react'
import { useTranslation } from '@/hooks/useTranslation'
import { useLanguageStore } from '@/store/useLanguageStore'
import { useState } from 'react'
import { usePathname } from 'next/navigation'

export default function Header() {
  const { t } = useTranslation()
  const pathname = usePathname()
  const language = useLanguageStore((state) => state.language)
  const setLanguage = useLanguageStore((state) => state.setLanguage)
  const [isOpen, setIsOpen] = useState(false)

  // 根据路由获取页面标题
  const getPageTitle = () => {
    if (pathname === '/') {
      return t.header.pages.dashboard
    } else if (pathname.startsWith('/reports')) {
      return t.header.pages.reports
    } else if (pathname.startsWith('/prompt-factory')) {
      return t.header.pages.promptFactory
    } else if (pathname.startsWith('/workspace')) {
      return t.header.pages.workspace
    } else if (pathname.startsWith('/portfolio')) {
      return t.header.pages.portfolio
    } else if (pathname.startsWith('/team')) {
      return t.header.pages.team
    } else if (pathname.startsWith('/settings')) {
      return t.header.pages.settings
    }
    return t.header.pages.dashboard // 默认
  }

  const languages = [
    { code: 'zh', label: '中文', flag: '🇨🇳' },
    { code: 'en', label: 'English', flag: '🇺🇸' },
  ]

  const currentLang = languages.find((lang) => lang.code === language) || languages[0]

  return (
    <header className="flex h-16 items-center justify-between border-b border-card-border bg-card-bg px-6">
      <div className="flex items-center gap-6">
        <h1 className="text-lg font-semibold text-white">{getPageTitle()}</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder={t.header.searchPlaceholder}
            className="h-9 w-64 rounded-lg border border-card-border bg-sidebar-bg pl-10 pr-4 text-sm text-white placeholder-gray-400 focus:border-primary focus:outline-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Language Switcher - 直接内联在Header中 */}
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
        <button className="relative rounded-lg p-2 text-gray-400 hover:bg-sidebar-hover hover:text-white">
          <Bell className="h-5 w-5" />
        </button>
        <button className="relative rounded-lg p-2 text-gray-400 hover:bg-sidebar-hover hover:text-white">
          <MessageSquare className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-sidebar-hover">
          <div className="h-8 w-8 rounded-full bg-primary"></div>
          <div className="text-sm">
            <div className="font-medium text-white">James Wilson</div>
            <div className="text-xs text-gray-400">Managing Partner</div>
          </div>
        </div>
      </div>
    </header>
  )
}

