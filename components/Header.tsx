'use client'

import { Search, Bell, MessageSquare } from 'lucide-react'

export default function Header() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-card-border bg-card-bg px-6">
      <div className="flex items-center gap-6">
        <h1 className="text-lg font-semibold text-white">Intelligence Dashboard</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search insights..."
            className="h-9 w-64 rounded-lg border border-card-border bg-sidebar-bg pl-10 pr-4 text-sm text-white placeholder-gray-400 focus:border-primary focus:outline-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
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

