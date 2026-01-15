import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: {
          DEFAULT: '#3b82f6',
          dark: '#2563eb',
        },
        sidebar: {
          bg: '#0f172a',
          hover: '#1e293b',
          active: '#3b82f6',
        },
        card: {
          bg: '#1e293b',
          border: '#334155',
        },
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}
export default config

