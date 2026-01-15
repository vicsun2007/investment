'use client'

import { useEffect, useState } from 'react'
import { useLanguageStore } from '@/store/useLanguageStore'

export default function LanguageProvider({ children }: { children: React.ReactNode }) {
  const setLanguage = useLanguageStore((state) => state.setLanguage)
  const [hasHydrated, setHasHydrated] = useState(false)

  useEffect(() => {
    // 只在客户端挂载后从localStorage读取语言设置，避免 hydration 错误
    if (typeof window !== 'undefined' && !hasHydrated) {
      const savedLang = localStorage.getItem('investment-language')
      if (savedLang === 'zh' || savedLang === 'en') {
        setLanguage(savedLang as 'zh' | 'en')
      } else {
        // 如果没有保存的语言设置，默认使用英文
        setLanguage('en')
      }
      setHasHydrated(true)
    }
  }, [setLanguage, hasHydrated])

  return <>{children}</>
}

