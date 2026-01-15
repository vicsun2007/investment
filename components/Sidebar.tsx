'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  FolderKanban, 
  BookOpen, 
  Users, 
  Settings,
  FileText,
  Sparkles
} from 'lucide-react'
import { clsx } from 'clsx'
import { useTranslation } from '@/hooks/useTranslation'

export default function Sidebar() {
  const { t } = useTranslation()
  const pathname = usePathname()

  const navigation = [
    { name: t.sidebar.dashboard, href: '/', icon: LayoutDashboard },
    { name: t.sidebar.reports, href: '/reports', icon: FileText },
    { name: t.sidebar.promptFactory, href: '/prompt-factory', icon: Sparkles },
    { name: t.sidebar.workspace, href: '/workspace', icon: BookOpen },
    { name: t.sidebar.fundPortfolio, href: '/portfolio', icon: FolderKanban },
    { name: t.sidebar.teamPerformance, href: '/team', icon: Users },
    { name: t.sidebar.settings, href: '/settings', icon: Settings },
  ]

  return (
    <div className="flex h-screen w-64 flex-col bg-sidebar-bg border-r border-card-border">
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 px-6 border-b border-card-border">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
          <span className="text-xl font-bold text-white">A</span>
        </div>
        <div>
          <div className="text-sm font-semibold text-white">Alpha VC</div>
          <div className="text-xs text-gray-400">Intelligence Hub</div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-4 py-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={clsx(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-sidebar-active text-white'
                  : 'text-gray-300 hover:bg-sidebar-hover hover:text-white'
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          )
        })}
      </nav>

      {/* Storage Usage */}
      <div className="border-t border-card-border px-4 py-4">
        <div className="mb-2 flex items-center justify-between text-xs">
          <span className="text-gray-400">{t.sidebar.storageUsage}</span>
        </div>
        <div className="mb-1 flex items-center justify-between text-xs text-gray-300">
          <span>12.4 GB of 20 GB used</span>
        </div>
        <div className="h-2 w-full rounded-full bg-card-bg">
          <div
            className="h-2 rounded-full bg-primary"
            style={{ width: '62%' }}
          />
        </div>
      </div>

      {/* New Research Button */}
      <div className="border-t border-card-border px-4 py-4">
        <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-dark">
          <Sparkles className="h-4 w-4" />
          {t.sidebar.newResearch}
        </button>
      </div>
    </div>
  )
}

