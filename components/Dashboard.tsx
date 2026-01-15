'use client'

import Sidebar from './Sidebar'
import Header from './Header'
import MetricCard from './MetricCard'
import { FileText, Star, Sparkles, CheckCircle2, Download, Zap } from 'lucide-react'
import RecentResearchTable from './RecentResearchTable'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export default function Dashboard() {
  // Mock data for Team Investment Capability Accumulation
  const capabilityData = [
    { sector: 'Q1', 'Validated Insights': 45, 'Generated Research': 120 },
    { sector: 'Q2', 'Validated Insights': 62, 'Generated Research': 145 },
    { sector: 'Q3', 'Validated Insights': 78, 'Generated Research': 168 },
    { sector: 'Q4', 'Validated Insights': 95, 'Generated Research': 195 },
  ]

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
                <h2 className="text-2xl font-bold text-white">Portfolio Research Hub</h2>
                <p className="mt-1 text-sm text-gray-400">
                  Monitoring team research output and AI-driven capability accumulation.
                </p>
              </div>
              <div className="flex gap-3">
                <button className="flex items-center gap-2 rounded-lg border border-card-border bg-card-bg px-4 py-2 text-sm font-medium text-white hover:bg-sidebar-hover">
                  <Download className="h-4 w-4" />
                  Export Insights
                </button>
                <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark">
                  <Zap className="h-4 w-4" />
                  Analyze Sector
                </button>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              <MetricCard
                title="TOTAL REPORTS"
                value="1,284"
                change="+12.4% vs last month"
                icon={FileText}
              />
              <MetricCard
                title="AVG. QUALITY SCORE"
                value="8.4/10"
                change="+0.5% benchmark: 7.2"
                icon={Star}
                iconColor="text-yellow-400"
              />
              <MetricCard
                title="AI EFFICIENCY"
                value="+42%"
                change="+8% hours saved"
                icon={Sparkles}
                iconColor="text-purple-400"
              />
              <MetricCard
                title="VALIDATED INSIGHTS"
                value="312"
                change="+15% accumulation"
                icon={CheckCircle2}
                iconColor="text-green-400"
              />
            </div>

            {/* Charts Section */}
            <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
              {/* Team Investment Capability */}
              <div className="lg:col-span-2 rounded-lg border border-card-border bg-card-bg p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-white">
                    Team Investment Capability Accumulation
                  </h3>
                  <button className="rounded-lg border border-primary bg-transparent px-3 py-1.5 text-sm font-medium text-primary hover:bg-primary/10">
                    Quarterly View
                  </button>
                </div>
                <div className="h-64 rounded-lg bg-sidebar-bg p-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={capabilityData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                      <XAxis dataKey="sector" stroke="#94a3b8" fontSize={12} />
                      <YAxis stroke="#94a3b8" fontSize={12} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#1e293b',
                          border: '1px solid #334155',
                          borderRadius: '8px',
                          color: '#f1f5f9',
                        }}
                      />
                      <Legend
                        wrapperStyle={{ color: '#94a3b8', fontSize: '12px' }}
                        iconType="rect"
                      />
                      <Bar dataKey="Validated Insights" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="Generated Research" fill="#64748b" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 flex flex-wrap gap-4 text-xs text-gray-400">
                  <span>Fintech</span>
                  <span>SaaS</span>
                  <span>Biotech</span>
                  <span>Web3</span>
                  <span>CleanTech</span>
                  <span>AI/ML</span>
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  Showing Validated Insights (solid) vs Generated Research (light) per sector.
                </p>
              </div>

              {/* AI Model Performance */}
              <div className="rounded-lg border border-card-border bg-card-bg p-6">
                <h3 className="mb-4 text-lg font-semibold text-white">AI Model Performance</h3>
                <div className="space-y-4">
                  <div>
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="text-gray-300">Claude 3.5 Sonnet</span>
                      <span className="text-gray-400">42%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-sidebar-bg">
                      <div className="h-2 rounded-full bg-primary" style={{ width: '42%' }} />
                    </div>
                    <p className="mt-1 text-xs text-green-400">Avg. Quality: 8.9/10</p>
                  </div>
                  <div>
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="text-gray-300">GPT-4o</span>
                      <span className="text-gray-400">38%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-sidebar-bg">
                      <div className="h-2 rounded-full bg-primary" style={{ width: '38%' }} />
                    </div>
                    <p className="mt-1 text-xs text-green-400">Avg. Quality: 8.4/10</p>
                  </div>
                  <div>
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="text-gray-300">Llama 3 (70B)</span>
                      <span className="text-gray-400">20%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-sidebar-bg">
                      <div className="h-2 rounded-full bg-primary" style={{ width: '20%' }} />
                    </div>
                    <p className="mt-1 text-xs text-orange-400">Avg. Quality: 7.1/10</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Research Outputs */}
            <div className="rounded-lg border border-card-border bg-card-bg p-6">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-white">Recent Research Outputs</h3>
                  <p className="mt-1 text-sm text-gray-400">
                    Real-time feed of analyst activities and AI strategies.
                  </p>
                </div>
                <div className="flex gap-2">
                  <button className="rounded-lg border border-card-border bg-sidebar-bg px-3 py-1.5 text-sm font-medium text-gray-300 hover:bg-sidebar-hover">
                    Filter
                  </button>
                  <button className="rounded-lg border border-card-border bg-sidebar-bg px-3 py-1.5 text-sm font-medium text-gray-300 hover:bg-sidebar-hover">
                    Sort
                  </button>
                </div>
              </div>
              <RecentResearchTable />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

