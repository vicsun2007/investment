'use client'

import Sidebar from './Sidebar'
import Header from './Header'
import { Upload, FileText, Search, Filter, MoreVertical, Eye, Download, Star } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const mockReports = [
  {
    id: 1,
    title: 'Technology Sector Update: Cloud Computing & AI Moats',
    source: 'Goldman Sachs',
    date: 'October 24, 2023',
    type: 'Equity Research',
    size: '2.4 MB',
    status: 'Analyzed',
    score: 9.2,
    analyst: 'Sarah Chen',
  },
  {
    id: 2,
    title: 'Fintech Market Analysis Q3 2024',
    source: 'Morgan Stanley',
    date: 'September 15, 2023',
    type: 'Industry Report',
    size: '1.8 MB',
    status: 'Pending',
    score: null,
    analyst: null,
  },
  {
    id: 3,
    title: 'Healthcare Innovation Trends',
    source: 'JP Morgan',
    date: 'August 30, 2023',
    type: 'Sector Report',
    size: '3.1 MB',
    status: 'Analyzed',
    score: 8.7,
    analyst: 'Marcus Wu',
  },
]

export default function ReportsPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="mx-auto max-w-7xl">
            {/* Page Header */}
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">Research Reports</h2>
                <p className="mt-1 text-sm text-gray-400">
                  Manage and analyze investment research reports
                </p>
              </div>
              <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark">
                <Upload className="h-4 w-4" />
                Upload Report
              </button>
            </div>

            {/* Search and Filters */}
            <div className="mb-6 flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search reports..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-lg border border-card-border bg-card-bg pl-10 pr-4 py-2 text-sm text-white placeholder-gray-400 focus:border-primary focus:outline-none"
                />
              </div>
              <button className="flex items-center gap-2 rounded-lg border border-card-border bg-card-bg px-4 py-2 text-sm font-medium text-gray-300 hover:bg-sidebar-hover">
                <Filter className="h-4 w-4" />
                Filter
              </button>
            </div>

            {/* Reports List */}
            <div className="space-y-3">
              {mockReports.map((report) => (
                <div
                  key={report.id}
                  className="rounded-lg border border-card-border bg-card-bg p-5 hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-sidebar-bg">
                        <FileText className="h-6 w-6 text-gray-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="mb-1 text-base font-semibold text-white">{report.title}</h3>
                        <div className="mb-2 flex items-center gap-4 text-sm text-gray-400">
                          <span>{report.source}</span>
                          <span>•</span>
                          <span>{report.date}</span>
                          <span>•</span>
                          <span>{report.type}</span>
                          <span>•</span>
                          <span>{report.size}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span
                            className={`rounded-full px-2 py-1 text-xs font-medium ${
                              report.status === 'Analyzed'
                                ? 'bg-green-500/20 text-green-400'
                                : 'bg-yellow-500/20 text-yellow-400'
                            }`}
                          >
                            {report.status}
                          </span>
                          {report.score && (
                            <div className="flex items-center gap-1 text-sm text-gray-300">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span>{report.score}/10</span>
                            </div>
                          )}
                          {report.analyst && (
                            <span className="text-sm text-gray-400">Analyst: {report.analyst}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => router.push(`/reports/${report.id}`)}
                        className="rounded-lg border border-card-border bg-sidebar-bg p-2 text-gray-400 hover:bg-sidebar-hover hover:text-white"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="rounded-lg border border-card-border bg-sidebar-bg p-2 text-gray-400 hover:bg-sidebar-hover hover:text-white">
                        <Download className="h-4 w-4" />
                      </button>
                      <button className="rounded-lg border border-card-border bg-sidebar-bg p-2 text-gray-400 hover:bg-sidebar-hover hover:text-white">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

