'use client'

import Sidebar from './Sidebar'
import Header from './Header'
import { ChevronDown, Download, Play, Star, Plus } from 'lucide-react'
import { useTranslation } from '@/hooks/useTranslation'

const promptTemplates = [
  {
    category: 'DUE DILIGENCE',
    rating: 4.9,
    title: 'Market Sentiment Analysis v4',
    description: 'Extracts competitive moats and risk factors from 10-K and Expert transcripts.',
    example: 'Analyze [Target_Company] across [Market_Data] to identify long-term structural moats...',
    author: {
      name: 'Sarah Chen',
      avatar: 'SC',
    },
    successRate: '92%',
    metric: 'success',
  },
  {
    category: 'IC MEMO',
    rating: 4.7,
    title: 'Unit Economics Stress Test',
    description: 'Generates downside scenarios for CAC/LTV ratios based on sector-specifi...',
    example: 'Calculate stress test for [Cohort_Data] assuming a [Churn_Increase]...',
    author: {
      name: 'Marcus Wu',
      avatar: 'MW',
    },
    efficiency: '+45%',
    metric: 'efficiency',
  },
  {
    category: 'SOURCING',
    rating: 5.0,
    title: 'Proprietary Signal Filter',
    description: 'Cross-references LinkedIn headcount growth with GitHub star velocity for de...',
    example: 'Scrape [GitHub_Repo] and correlate with [Hiring_Trend]...',
    author: {
      name: 'Elena Rossi',
      avatar: 'ER',
    },
    signals: 'High',
    metric: 'signals',
  },
]

const knowledgeHubItems = [
  {
    title: 'Proprietary Findings: Generative AI Infrastructure Costs',
    description:
      'Expert interview data suggests a 25% downward trend in H100 reservation pricing in secondary markets, impacting seed-stage valuation models.',
    tags: ['#AI_Infra', '#ExpertNetwork'],
    sentiment: 'Bullish Signal',
    sentimentColor: 'bg-green-500/20 text-green-400',
    timeAgo: '2h ago',
    views: 142,
  },
  {
    title: 'SaaS Retention Benchmarks - Fintech Vertical',
    description:
      'Internal benchmark analysis of portfolio company data shows NRR (Net Revenue Retention) for mid-market fintech SaaS is stabilizing at 108% post-Q3 contraction.',
    tags: ['#Fintech', '#Portfolio_Data'],
    sentiment: 'Market Neutral',
    sentimentColor: 'bg-orange-500/20 text-orange-400',
    timeAgo: 'Yesterday',
    views: 89,
  },
]

export default function PromptFactoryPage() {
  const { t } = useTranslation()
  
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
                <h2 className="text-2xl font-bold text-white">{t.promptFactory.title}</h2>
                <p className="mt-1 text-sm text-gray-400">
                  {t.promptFactory.subtitle}
                </p>
              </div>
              <button className="flex items-center gap-2 rounded-lg border border-card-border bg-card-bg px-4 py-2 text-sm font-medium text-white hover:bg-sidebar-hover">
                <Download className="h-4 w-4" />
                {t.promptFactory.exportLibrary}
              </button>
            </div>

            {/* Filters */}
            <div className="mb-6 flex gap-2">
              <button className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white">
                {t.promptFactory.allSectors}
              </button>
              <button className="flex items-center gap-1 rounded-lg border border-card-border bg-card-bg px-4 py-2 text-sm font-medium text-gray-300 hover:bg-sidebar-hover">
                SaaS
                <ChevronDown className="h-4 w-4" />
              </button>
              <button className="flex items-center gap-1 rounded-lg border border-card-border bg-card-bg px-4 py-2 text-sm font-medium text-gray-300 hover:bg-sidebar-hover">
                FinTech
                <ChevronDown className="h-4 w-4" />
              </button>
              <button className="flex items-center gap-1 rounded-lg border border-card-border bg-card-bg px-4 py-2 text-sm font-medium text-gray-300 hover:bg-sidebar-hover">
                Healthcare
                <ChevronDown className="h-4 w-4" />
              </button>
              <button className="rounded-lg border border-card-border bg-card-bg px-4 py-2 text-sm font-medium text-gray-300 hover:bg-sidebar-hover">
                Due Diligence
              </button>
            </div>

            {/* High-Value Prompt Templates */}
            <div className="mb-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">{t.promptFactory.highValuePrompts}</h3>
                <a href="#" className="text-sm text-primary hover:underline">
                  {t.promptFactory.viewAllPrompts}
                </a>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {promptTemplates.map((template, index) => (
                  <div
                    key={index}
                    className="rounded-lg border border-card-border bg-card-bg p-5 hover:border-primary/50 transition-colors"
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <span className="rounded bg-sidebar-bg px-2 py-1 text-xs font-medium text-gray-300">
                        {template.category}
                      </span>
                      <div className="flex items-center gap-1 text-xs text-yellow-400">
                        <Star className="h-3 w-3 fill-current" />
                        <span>{template.rating}</span>
                      </div>
                    </div>
                    <h4 className="mb-2 text-base font-semibold text-white">{template.title}</h4>
                    <p className="mb-3 text-sm text-gray-400">{template.description}</p>
                    <div className="mb-3 rounded bg-sidebar-bg p-2 text-xs text-gray-300">
                      {template.example}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-medium text-white">
                          {template.author.avatar}
                        </div>
                        <span className="text-xs text-gray-400">{template.author.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {template.metric === 'success' && (
                          <span className="text-xs font-medium text-green-400">
                            {template.successRate}
                          </span>
                        )}
                        {template.metric === 'efficiency' && (
                          <span className="text-xs font-medium text-blue-400">
                            {template.efficiency}
                          </span>
                        )}
                        {template.metric === 'signals' && (
                          <span className="text-xs font-medium text-red-400">
                            {template.signals}
                          </span>
                        )}
                        <button className="rounded-lg bg-primary p-1.5 text-white hover:bg-primary-dark">
                          <Play className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Knowledge Hub */}
            <div>
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">{t.promptFactory.knowledgeHub}</h3>
                <div className="flex items-center gap-3">
                  <div className="flex gap-1 rounded-lg border border-card-border bg-sidebar-bg">
                    <button className="rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-white">
                      {t.promptFactory.listView}
                    </button>
                    <button className="rounded-lg px-3 py-1.5 text-xs font-medium text-gray-400 hover:text-white">
                      {t.promptFactory.graph}
                    </button>
                  </div>
                  <button className="flex items-center gap-2 rounded-lg border border-card-border bg-card-bg px-3 py-1.5 text-sm font-medium text-gray-300 hover:bg-sidebar-hover">
                    {t.promptFactory.filterResearch}
                  </button>
                </div>
              </div>
              <div className="space-y-3">
                {knowledgeHubItems.map((item, index) => (
                  <div
                    key={index}
                    className="rounded-lg border border-card-border bg-card-bg p-5 hover:border-primary/50 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-lg bg-sidebar-bg">
                        <div className="h-2 w-2 rounded-full bg-primary"></div>
                      </div>
                      <div className="flex-1">
                        <h4 className="mb-2 text-base font-semibold text-white">{item.title}</h4>
                        <p className="mb-3 text-sm text-gray-400">{item.description}</p>
                        <div className="flex items-center gap-2">
                          {item.tags.map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="rounded bg-sidebar-bg px-2 py-1 text-xs text-gray-400"
                            >
                              {tag}
                            </span>
                          ))}
                          <span
                            className={`rounded px-2 py-1 text-xs font-medium ${item.sentimentColor}`}
                          >
                            {item.sentiment}
                          </span>
                          <span className="text-xs text-gray-500">{item.timeAgo}</span>
                          <span className="ml-auto flex items-center gap-1 text-xs text-gray-400">
                            <span>{item.views}</span>
                            <span>👁</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

