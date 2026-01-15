'use client'

import Sidebar from './Sidebar'
import Header from './Header'
import { Upload, FileText, RefreshCw, ChevronDown, Zap, Copy, ThumbsUp, ThumbsDown, Shield, Check } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from '@/hooks/useTranslation'

export default function WorkspacePage() {
  const { t } = useTranslation()
  const [selectedModel, setSelectedModel] = useState('Claude 3.5 Sonnet')

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <div className="flex flex-1 overflow-hidden">
          {/* Left Sidebar - Context Library */}
          <div className="w-80 border-r border-card-border bg-card-bg p-4">
            <div className="mb-6">
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-400">
                {t.workspace.contextLibrary}
              </h3>
              <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-card-border bg-sidebar-bg p-8 text-center">
                <Upload className="mb-3 h-8 w-8 text-gray-400" />
                <p className="mb-1 text-sm font-medium text-white">{t.workspace.uploadReports}</p>
                <p className="text-xs text-gray-400">PDF, XLSX, CSV (Max 50MB)</p>
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-400">
                {t.workspace.recentDocuments}
              </h3>
              <div className="space-y-2">
                <div className="flex items-center gap-3 rounded-lg border border-card-border bg-sidebar-bg p-3">
                  <FileText className="h-5 w-5 text-gray-400" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">Q3 Market Outlook.pdf</p>
                    <p className="text-xs text-gray-400">2.4 MB</p>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <RefreshCw className="h-3 w-3 animate-spin" />
                    {t.workspace.processing}
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-lg border border-card-border bg-sidebar-bg p-3">
                  <FileText className="h-5 w-5 text-gray-400" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">Series_B_Cap_Table.xlsx</p>
                    <p className="text-xs text-gray-400">142 KB • 2 days ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-lg border border-card-border bg-sidebar-bg p-3">
                  <FileText className="h-5 w-5 text-gray-400" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">Competitor_Analysis_v2.docx</p>
                    <p className="text-xs text-gray-400">890 KB • 1 week ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex flex-1 flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto p-6">
              <div className="mx-auto max-w-4xl">
                {/* Breadcrumbs */}
                <div className="mb-4 text-xs uppercase tracking-wider text-gray-400">
                  PROJECT ALPHA {'>'} DUE DILIGENCE ANALYSIS
                </div>

                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-white">{t.workspace.aiResearchCopilot}</h2>
                  <div className="flex items-center gap-2">
                    <button className="flex items-center gap-2 rounded-lg border border-card-border bg-card-bg px-3 py-2 text-sm font-medium text-white hover:bg-sidebar-hover">
                      {selectedModel}
                      <ChevronDown className="h-4 w-4" />
                    </button>
                    <button className="rounded-lg border border-card-border bg-card-bg p-2 text-gray-400 hover:bg-sidebar-hover hover:text-white">
                      <RefreshCw className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* User Prompt */}
                <div className="mb-4 flex items-start gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-medium text-white">
                    JW
                  </div>
                  <div className="flex-1 rounded-lg bg-blue-500/20 p-4">
                    <p className="text-sm text-white">
                      Based on the uploaded Q3 Market Outlook, what are the primary risks for the
                      Fintech sector in the next 18 months? Please format as a table comparing risk
                      level and mitigation strategy.
                    </p>
                  </div>
                </div>

                {/* AI Response */}
                <div className="mb-4 flex items-start gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-600 text-xs font-medium text-white">
                    AI
                  </div>
                  <div className="flex-1 rounded-lg bg-card-bg border border-card-border p-4">
                    <p className="mb-4 text-sm text-gray-300">
                      According to the <strong>Q3 Market Outlook (Section 4.2)</strong> and current
                      macro indicators, here are the primary risks identified for the Fintech
                      sector:
                    </p>

                    {/* Table */}
                    <div className="mb-4 overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="border-b border-card-border">
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-400">
                              {t.workspace.riskFactor}
                            </th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-400">
                              {t.workspace.impact}
                            </th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-400">
                              {t.workspace.mitigationStrategy}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-card-border">
                            <td className="px-4 py-3 text-sm text-white">Regulatory Tightening</td>
                            <td className="px-4 py-3">
                              <span className="rounded-full bg-red-500/20 px-2 py-1 text-xs font-medium text-red-400">
                                {t.workspace.high}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-300">
                              Increased compliance automation and regional licensing.
                            </td>
                          </tr>
                          <tr className="border-b border-card-border">
                            <td className="px-4 py-3 text-sm text-white">Credit Defaults</td>
                            <td className="px-4 py-3">
                              <span className="rounded-full bg-orange-500/20 px-2 py-1 text-xs font-medium text-orange-400">
                                {t.workspace.medium}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-300">
                              Enhanced AI-driven underwriting models.
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    {/* Citations */}
                    <div className="mb-4 flex items-center gap-2 text-xs text-gray-400">
                      <span>{t.workspace.citations}:</span>
                      <a href="#" className="flex items-center gap-1 text-primary hover:underline">
                        <FileText className="h-3 w-3" />
                        Q3 Market Outlook.pdf (p. 24)
                      </a>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <button className="flex items-center gap-1 rounded-lg border border-card-border bg-sidebar-bg px-3 py-1.5 text-xs font-medium text-gray-300 hover:bg-sidebar-hover">
                        <ThumbsUp className="h-3 w-3" />
                        {t.workspace.helpful}
                      </button>
                      <button className="flex items-center gap-1 rounded-lg border border-card-border bg-sidebar-bg px-3 py-1.5 text-xs font-medium text-gray-300 hover:bg-sidebar-hover">
                        <ThumbsDown className="h-3 w-3" />
                      </button>
                      <button className="flex items-center gap-1 rounded-lg border border-card-border bg-sidebar-bg px-3 py-1.5 text-xs font-medium text-gray-300 hover:bg-sidebar-hover">
                        <Copy className="h-3 w-3" />
                        {t.workspace.copy}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Input Field */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder={t.workspace.askAnything}
                    className="w-full rounded-lg border border-card-border bg-card-bg px-4 py-3 pl-10 pr-12 text-sm text-white placeholder-gray-400 focus:border-primary focus:outline-none"
                  />
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <span>🎤</span>
                  </div>
                  <button className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg bg-primary p-2 text-white hover:bg-primary-dark">
                    <Zap className="h-4 w-4" />
                  </button>
                </div>

                {/* Disclaimer */}
                <p className="mt-2 text-xs text-gray-500">
                  {t.workspace.disclaimer}
                </p>

                {/* Vault Security */}
                <div className="mt-4 flex items-center gap-2 text-xs text-gray-400">
                  <div className="flex items-center gap-1 rounded-lg bg-green-500/20 px-2 py-1 text-green-400">
                    <Shield className="h-3 w-3" />
                    <Check className="h-3 w-3" />
                    <span>{t.workspace.vaultSecurity}</span>
                  </div>
                  <span>{t.workspace.endToEndEncrypted}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Prompt Factory */}
          <div className="w-80 border-l border-card-border bg-card-bg p-4">
            <div className="mb-6">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
                  {t.workspace.promptFactory}
                </h3>
                <button className="text-gray-400 hover:text-white">?</button>
              </div>

              <div className="mb-4">
                <label className="mb-2 block text-xs font-medium text-gray-400">
                  {t.workspace.contextMode}
                </label>
                <div className="flex gap-2">
                  <button className="flex-1 rounded-lg bg-primary px-3 py-2 text-xs font-medium text-white">
                    {t.workspace.discovery}
                  </button>
                  <button className="flex-1 rounded-lg border border-card-border bg-sidebar-bg px-3 py-2 text-xs font-medium text-gray-300 hover:bg-sidebar-hover">
                    {t.workspace.financial}
                  </button>
                </div>
              </div>

              <div className="mb-4">
                <label className="mb-2 block text-xs font-medium text-gray-400">
                  {t.workspace.keyIndicators}
                </label>
                <div className="flex flex-wrap gap-2">
                  {['CAGR', 'TAM', 'Burn Rate', 'EBITDA'].map((indicator) => (
                    <button
                      key={indicator}
                      className="rounded-lg border border-card-border bg-sidebar-bg px-2 py-1 text-xs font-medium text-gray-300 hover:bg-sidebar-hover"
                    >
                      {indicator} ×
                    </button>
                  ))}
                  <button className="rounded-lg border border-card-border bg-sidebar-bg px-2 py-1 text-xs font-medium text-primary hover:bg-sidebar-hover">
                    {t.workspace.add}
                  </button>
                </div>
              </div>

              <div className="mb-4">
                <label className="mb-2 block text-xs font-medium text-gray-400">
                  {t.workspace.analysisFocus}
                </label>
                <button className="flex w-full items-center justify-between rounded-lg border border-card-border bg-sidebar-bg px-3 py-2 text-xs font-medium text-gray-300 hover:bg-sidebar-hover">
                  {t.workspace.competitiveLandscape}
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>

              <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark">
                <Zap className="h-4 w-4" />
                {t.workspace.buildAndApplyPrompt}
              </button>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-400">
                {t.workspace.savedTemplates}
              </h3>
              <div className="space-y-3">
                <div className="rounded-lg border border-card-border bg-sidebar-bg p-3">
                  <div className="mb-1 text-xs font-medium text-gray-400">DUE DILIGENCE</div>
                  <h4 className="mb-1 text-sm font-semibold text-white">Initial Founder Vetting</h4>
                  <p className="mb-2 text-xs text-gray-400">
                    Analyzes background, previous exits, and technical capability based on CV...
                  </p>
                  <button className="text-gray-400 hover:text-white">⋯</button>
                </div>
                <div className="rounded-lg border border-card-border bg-sidebar-bg p-3">
                  <div className="mb-1 text-xs font-medium text-gray-400">MARKET</div>
                  <h4 className="mb-1 text-sm font-semibold text-white">Competitor Moat Analysis</h4>
                  <p className="mb-2 text-xs text-gray-400">
                    Extracts 3-year roadmap projections and compares against market leaders...
                  </p>
                  <button className="text-gray-400 hover:text-white">⋯</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

