'use client'

import { create } from 'zustand'

type Language = 'zh' | 'en'

interface LanguageStore {
  language: Language
  setLanguage: (lang: Language) => void
  toggleLanguage: () => void
}

// 服务端和客户端初始状态必须一致，默认使用 'en'
// 注意：不要在 store 初始化时访问 localStorage，这会导致序列化错误
export const useLanguageStore = create<LanguageStore>((set) => ({
  language: 'en', // 默认英文，确保服务端和客户端一致
  setLanguage: (lang) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('investment-language', lang)
    }
    set({ language: lang })
  },
  toggleLanguage: () =>
    set((state) => {
      const newLang = state.language === 'zh' ? 'en' : 'zh'
      if (typeof window !== 'undefined') {
        localStorage.setItem('investment-language', newLang)
      }
      return { language: newLang }
    }),
}))

