'use client'

import Sidebar from './Sidebar'
import Header from './Header'
import { TrendingUp, FileText, Star, Clock, Award, Target, BarChart3 } from 'lucide-react'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const teamMembers = [
  {
    id: 1,
    name: 'Sarah Chen',
    role: 'Senior Analyst',
    avatar: 'SC',
    reportsGenerated: 142,
    avgQualityScore: 8.9,
    hoursSaved: 45,
    insightsValidated: 28,
    sector: 'FinTech',
    trend: 'up',
  },
  {
    id: 2,
    name: 'Marcus Wu',
    role: 'Investment Manager',
    avatar: 'MW',
    reportsGenerated: 98,
    avgQualityScore: 8.5,
    hoursSaved: 38,
    insightsValidated: 22,
    sector: 'SaaS',
    trend: 'up',
  },
  {
    id: 3,
    name: 'Elena Rossi',
    role: 'Research Analyst',
    avatar: 'ER',
    reportsGenerated: 115,
    avgQualityScore: 8.7,
    hoursSaved: 42,
    insightsValidated: 19,
    sector: 'AI/ML',
    trend: 'up',
  },
  {
    id: 4,
    name: 'David Kim',
    role: 'Associate',
    avatar: 'DK',
    reportsGenerated: 67,
    avgQualityScore: 7.8,
    hoursSaved: 25,
    insightsValidated: 12,
    sector: 'Healthcare',
    trend: 'up',
  },
]

const teamStats = {
  totalReports: 422,
  avgQualityScore: 8.5,
  totalHoursSaved: 150,
  totalInsights: 81,
  activeMembers: 4,
}

const performanceMetrics = [
  {
    label: 'Reports Generated',
    value: teamStats.totalReports,
    change: '+12.4%',
    icon: FileText,
    color: 'text-blue-400',
  },
  {
    label: 'Avg Quality Score',
    value: `${teamStats.avgQualityScore}/10`,
    change: '+0.5%',
    icon: Star,
    color: 'text-yellow-400',
  },
  {
    label: 'Hours Saved',
    value: `${teamStats.totalHoursSaved}h`,
    change: '+8%',
    icon: Clock,
    color: 'text-green-400',
  },
  {
    label: 'Validated Insights',
    value: teamStats.totalInsights,
    change: '+15%',
    icon: Award,
    color: 'text-purple-400',
  },
]

export default function TeamPage() {
  // Mock data for Quality Score Trend
  const qualityScoreData = [
    { quarter: 'Q1 2023', avgScore: 7.8, target: 8.0 },
    { quarter: 'Q2 2023', avgScore: 8.1, target: 8.0 },
    { quarter: 'Q3 2023', avgScore: 8.3, target: 8.0 },
    { quarter: 'Q4 2023', avgScore: 8.4, target: 8.0 },
    { quarter: 'Q1 2024', avgScore: 8.5, target: 8.0 },
  ]

  // Mock data for Productivity Metrics
  const productivityData = [
    { month: 'Jan', reports: 85, hoursSaved: 32 },
    { month: 'Feb', reports: 92, hoursSaved: 35 },
    { month: 'Mar', reports: 88, hoursSaved: 33 },
    { month: 'Apr', reports: 95, hoursSaved: 38 },
    { month: 'May', reports: 102, hoursSaved: 40 },
    { month: 'Jun', reports: 98, hoursSaved: 37 },
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
                <h2 className="text-2xl font-bold text-white">Team Performance</h2>
                <p className="mt-1 text-sm text-gray-400">
                  Track team productivity, quality metrics, and AI efficiency gains
                </p>
              </div>
              <div className="flex gap-3">
                <button className="flex items-center gap-2 rounded-lg border border-card-border bg-card-bg px-4 py-2 text-sm font-medium text-white hover:bg-sidebar-hover">
                  <BarChart3 className="h-4 w-4" />
                  Export Report
                </button>
                <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark">
                  View Analytics
                </button>
              </div>
            </div>

            {/* Team Stats */}
            <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {performanceMetrics.map((metric, index) => (
                <div key={index} className="rounded-lg border border-card-border bg-card-bg p-6">
                  <div className="mb-2 flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-400">{metric.label}</p>
                    <metric.icon className={`h-5 w-5 ${metric.color}`} />
                  </div>
                  <p className="text-2xl font-bold text-white">{metric.value}</p>
                  <div className="mt-2 flex items-center gap-1 text-sm text-green-400">
                    <TrendingUp className="h-4 w-4" />
                    <span>{metric.change}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Team Members Performance */}
            <div className="mb-6 rounded-lg border border-card-border bg-card-bg p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">Team Members Performance</h3>
                <div className="flex gap-2">
                  <button className="rounded-lg border border-card-border bg-sidebar-bg px-3 py-1.5 text-sm font-medium text-gray-300 hover:bg-sidebar-hover">
                    Filter
                  </button>
                  <button className="rounded-lg border border-card-border bg-sidebar-bg px-3 py-1.5 text-sm font-medium text-gray-300 hover:bg-sidebar-hover">
                    Sort
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {teamMembers.map((member) => (
                  <div
                    key={member.id}
                    className="rounded-lg border border-card-border bg-sidebar-bg p-5 hover:border-primary/50 transition-colors"
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-sm font-medium text-white">
                          {member.avatar}
                        </div>
                        <div>
                          <h4 className="text-base font-semibold text-white">{member.name}</h4>
                          <p className="text-sm text-gray-400">{member.role}</p>
                        </div>
                      </div>
                      <span className="rounded-full bg-blue-500/20 px-2 py-1 text-xs font-medium text-blue-400">
                        {member.sector}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="mb-1 flex items-center gap-2 text-xs text-gray-400">
                          <FileText className="h-3 w-3" />
                          <span>Reports</span>
                        </div>
                        <p className="text-lg font-semibold text-white">{member.reportsGenerated}</p>
                      </div>
                      <div>
                        <div className="mb-1 flex items-center gap-2 text-xs text-gray-400">
                          <Star className="h-3 w-3" />
                          <span>Avg Score</span>
                        </div>
                        <p className="text-lg font-semibold text-white">{member.avgQualityScore}/10</p>
                      </div>
                      <div>
                        <div className="mb-1 flex items-center gap-2 text-xs text-gray-400">
                          <Clock className="h-3 w-3" />
                          <span>Hours Saved</span>
                        </div>
                        <p className="text-lg font-semibold text-white">{member.hoursSaved}h</p>
                      </div>
                      <div>
                        <div className="mb-1 flex items-center gap-2 text-xs text-gray-400">
                          <Award className="h-3 w-3" />
                          <span>Insights</span>
                        </div>
                        <p className="text-lg font-semibold text-white">{member.insightsValidated}</p>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center gap-1 text-xs text-green-400">
                      <TrendingUp className="h-3 w-3" />
                      <span>Performance trending up</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance Trends */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {/* Quality Score Trend */}
              <div className="rounded-lg border border-card-border bg-card-bg p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-white">Quality Score Trend</h3>
                  <button className="rounded-lg border border-card-border bg-sidebar-bg px-3 py-1.5 text-xs font-medium text-gray-300 hover:bg-sidebar-hover">
                    Quarterly
                  </button>
                </div>
                <div className="h-64 rounded-lg bg-sidebar-bg p-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={qualityScoreData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                      <XAxis dataKey="quarter" stroke="#94a3b8" fontSize={11} tick={{ fill: '#94a3b8' }} />
                      <YAxis
                        stroke="#94a3b8"
                        fontSize={11}
                        tick={{ fill: '#94a3b8' }}
                        domain={[7.5, 8.6]}
                        label={{ value: 'Score', angle: -90, position: 'insideLeft', fill: '#94a3b8' }}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#1e293b',
                          border: '1px solid #334155',
                          borderRadius: '8px',
                          color: '#f1f5f9',
                        }}
                        formatter={(value: number) => value.toFixed(1)}
                      />
                      <Legend
                        wrapperStyle={{ color: '#94a3b8', fontSize: '12px' }}
                        iconType="line"
                      />
                      <Line
                        type="monotone"
                        dataKey="avgScore"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        dot={{ fill: '#3b82f6', r: 4 }}
                        name="Average Score"
                      />
                      <Line
                        type="monotone"
                        dataKey="target"
                        stroke="#64748b"
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        dot={false}
                        name="Target"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Productivity Metrics */}
              <div className="rounded-lg border border-card-border bg-card-bg p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-white">Productivity Metrics</h3>
                  <button className="rounded-lg border border-card-border bg-sidebar-bg px-3 py-1.5 text-xs font-medium text-gray-300 hover:bg-sidebar-hover">
                    Monthly
                  </button>
                </div>
                <div className="h-64 rounded-lg bg-sidebar-bg p-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={productivityData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                      <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tick={{ fill: '#94a3b8' }} />
                      <YAxis stroke="#94a3b8" fontSize={11} tick={{ fill: '#94a3b8' }} />
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
                      <Bar dataKey="reports" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Reports Generated" />
                      <Bar dataKey="hoursSaved" fill="#10b981" radius={[4, 4, 0, 0]} name="Hours Saved" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Sector Distribution */}
            <div className="mt-6 rounded-lg border border-card-border bg-card-bg p-6">
              <h3 className="mb-4 text-lg font-semibold text-white">Sector Focus Distribution</h3>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {['FinTech', 'SaaS', 'AI/ML', 'Healthcare'].map((sector) => (
                  <div key={sector} className="rounded-lg border border-card-border bg-sidebar-bg p-4">
                    <div className="mb-2 text-sm font-medium text-gray-400">{sector}</div>
                    <div className="mb-2 text-2xl font-bold text-white">
                      {Math.floor(Math.random() * 30 + 20)}%
                    </div>
                    <div className="h-2 w-full rounded-full bg-card-bg">
                      <div
                        className="h-2 rounded-full bg-primary"
                        style={{ width: `${Math.floor(Math.random() * 30 + 20)}%` }}
                      />
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

