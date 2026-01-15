'use client'

import { useLanguageStore } from '@/store/useLanguageStore'
import { zh } from '@/locales/zh'
import { en } from '@/locales/en'

const translations = {
  zh,
  en,
}

export function useTranslation() {
  const language = useLanguageStore((state) => state.language)
  const t = translations[language] || translations.zh // 默认使用中文

  return { t, language }
}

