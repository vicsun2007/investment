'use client'

import Sidebar from './Sidebar'
import Header from './Header'
import { TrendingUp, TrendingDown, DollarSign, Building2, Calendar, MapPin, Users, BarChart3 } from 'lucide-react'
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { useTranslation } from '@/hooks/useTranslation'

const portfolioCompanies = [
  {
    id: 1,
    name: 'TechFlow AI',
    sector: 'AI/ML',
    stage: 'Series B',
    investmentDate: '2023-01-15',
    investmentAmount: '$5.0M',
    currentValuation: '$45.0M',
    multiple: '9.0x',
    irr: '125%',
    status: 'Active',
    location: 'San Francisco, CA',
    employees: 120,
    trend: 'up',
  },
  {
    id: 2,
    name: 'FinSecure',
    sector: 'FinTech',
    stage: 'Series A',
    investmentDate: '2023-06-20',
    investmentAmount: '$3.5M',
    currentValuation: '$18.5M',
    multiple: '5.3x',
    irr: '85%',
    status: 'Active',
    location: 'New York, NY',
    employees: 85,
    trend: 'up',
  },
  {
    id: 3,
    name: 'HealthVault',
    sector: 'Healthcare',
    stage: 'Seed',
    investmentDate: '2024-02-10',
    investmentAmount: '$2.0M',
    currentValuation: '$8.0M',
    multiple: '4.0x',
    irr: '60%',
    status: 'Active',
    location: 'Boston, MA',
    employees: 45,
    trend: 'up',
  },
  {
    id: 4,
    name: 'GreenEnergy Co',
    sector: 'CleanTech',
    stage: 'Series A',
    investmentDate: '2022-11-05',
    investmentAmount: '$4.0M',
    currentValuation: '$12.0M',
    multiple: '3.0x',
    irr: '35%',
    status: 'Active',
    location: 'Austin, TX',
    employees: 65,
    trend: 'down',
  },
]

const portfolioStats = {
  totalInvestments: '$14.5M',
  totalValuation: '$83.5M',
  averageMultiple: '5.3x',
  averageIRR: '76%',
  activeCompanies: 4,
  totalCompanies: 4,
}

export default function PortfolioPage() {
  const { t } = useTranslation()
  
  // Mock data for Portfolio Performance
  const performanceData = [
    { month: 'Jan 2022', valuation: 45, invested: 14.5 },
    { month: 'Apr 2022', valuation: 52, invested: 14.5 },
    { month: 'Jul 2022', valuation: 58, invested: 14.5 },
    { month: 'Oct 2022', valuation: 62, invested: 14.5 },
    { month: 'Jan 2023', valuation: 68, invested: 14.5 },
    { month: 'Apr 2023', valuation: 72, invested: 14.5 },
    { month: 'Jul 2023', valuation: 76, invested: 14.5 },
    { month: 'Oct 2023', valuation: 80, invested: 14.5 },
    { month: 'Jan 2024', valuation: 83.5, invested: 14.5 },
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
                <h2 className="text-2xl font-bold text-white">{t.portfolio.title}</h2>
                <p className="mt-1 text-sm text-gray-400">
                  {t.portfolio.subtitle}
                </p>
              </div>
              <div className="flex gap-3">
                <button className="flex items-center gap-2 rounded-lg border border-card-border bg-card-bg px-4 py-2 text-sm font-medium text-white hover:bg-sidebar-hover">
                  <BarChart3 className="h-4 w-4" />
                  {t.portfolio.exportReport}
                </button>
                <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark">
                  {t.portfolio.addCompany}
                </button>
              </div>
            </div>

            {/* Portfolio Stats */}
            <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-lg border border-card-border bg-card-bg p-6">
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-400">{t.portfolio.totalInvested}</p>
                  <DollarSign className="h-5 w-5 text-blue-400" />
                </div>
                <p className="text-2xl font-bold text-white">{portfolioStats.totalInvestments}</p>
                <p className="mt-1 text-xs text-gray-400">{t.portfolio.acrossCompanies} {portfolioStats.activeCompanies}</p>
              </div>

              <div className="rounded-lg border border-card-border bg-card-bg p-6">
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-400">{t.portfolio.totalValuation}</p>
                  <TrendingUp className="h-5 w-5 text-green-400" />
                </div>
                <p className="text-2xl font-bold text-white">{portfolioStats.totalValuation}</p>
                <p className="mt-1 text-xs text-green-400">+{portfolioStats.averageMultiple} {t.portfolio.averageMultiple}</p>
              </div>

              <div className="rounded-lg border border-card-border bg-card-bg p-6">
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-400">{t.portfolio.averageIRR}</p>
                  <BarChart3 className="h-5 w-5 text-purple-400" />
                </div>
                <p className="text-2xl font-bold text-white">{portfolioStats.averageIRR}</p>
                <p className="mt-1 text-xs text-gray-400">{t.portfolio.weightedAverage}</p>
              </div>

              <div className="rounded-lg border border-card-border bg-card-bg p-6">
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-400">{t.portfolio.activeCompanies}</p>
                  <Building2 className="h-5 w-5 text-yellow-400" />
                </div>
                <p className="text-2xl font-bold text-white">
                  {portfolioStats.activeCompanies}/{portfolioStats.totalCompanies}
                </p>
                <p className="mt-1 text-xs text-gray-400">100% {t.portfolio.active}</p>
              </div>
            </div>

            {/* Portfolio Companies Table */}
            <div className="rounded-lg border border-card-border bg-card-bg p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">{t.portfolio.portfolioCompanies}</h3>
                <div className="flex gap-2">
                  <button className="rounded-lg border border-card-border bg-sidebar-bg px-3 py-1.5 text-sm font-medium text-gray-300 hover:bg-sidebar-hover">
                    {t.common.filter}
                  </button>
                  <button className="rounded-lg border border-card-border bg-sidebar-bg px-3 py-1.5 text-sm font-medium text-gray-300 hover:bg-sidebar-hover">
                    {t.common.sort}
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-card-border">
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                        {t.portfolio.company}
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                        {t.portfolio.sector}
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                        {t.portfolio.stage}
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                        {t.portfolio.investment}
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                        {t.portfolio.valuation}
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                        {t.portfolio.multiple}
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                        {t.portfolio.irr}
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                        {t.portfolio.status}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-card-border">
                    {portfolioCompanies.map((company) => (
                      <tr key={company.id} className="hover:bg-sidebar-bg">
                        <td className="px-4 py-4">
                          <div className="text-sm font-medium text-white">{company.name}</div>
                          <div className="mt-1 flex items-center gap-2 text-xs text-gray-400">
                            <MapPin className="h-3 w-3" />
                            <span>{company.location}</span>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <span className="rounded-full bg-blue-500/20 px-2 py-1 text-xs font-medium text-blue-400">
                            {company.sector}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-300">{company.stage}</td>
                        <td className="px-4 py-4">
                          <div className="text-sm font-medium text-white">{company.investmentAmount}</div>
                          <div className="text-xs text-gray-400">{company.investmentDate}</div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="text-sm font-medium text-white">{company.currentValuation}</div>
                          <div className="flex items-center gap-1 text-xs text-gray-400">
                            <Users className="h-3 w-3" />
                            <span>{company.employees} employees</span>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-1">
                            {company.trend === 'up' ? (
                              <TrendingUp className="h-4 w-4 text-green-400" />
                            ) : (
                              <TrendingDown className="h-4 w-4 text-red-400" />
                            )}
                            <span className="text-sm font-medium text-white">{company.multiple}</span>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <span className="text-sm font-medium text-green-400">{company.irr}</span>
                        </td>
                        <td className="px-4 py-4">
                          <span className="rounded-full bg-green-500/20 px-2 py-1 text-xs font-medium text-green-400">
                            {company.status === 'Active' ? t.portfolio.active : company.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Performance Chart Placeholder */}
            <div className="mt-6 rounded-lg border border-card-border bg-card-bg p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">{t.portfolio.portfolioPerformance}</h3>
                <div className="flex gap-2">
                  <button className="rounded-lg border border-card-border bg-sidebar-bg px-3 py-1.5 text-xs font-medium text-gray-300 hover:bg-sidebar-hover">
                    1Y
                  </button>
                  <button className="rounded-lg border border-primary bg-primary px-3 py-1.5 text-xs font-medium text-white">
                    3Y
                  </button>
                  <button className="rounded-lg border border-card-border bg-sidebar-bg px-3 py-1.5 text-xs font-medium text-gray-300 hover:bg-sidebar-hover">
                    All
                  </button>
                </div>
              </div>
              <div className="h-64 rounded-lg bg-sidebar-bg p-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={performanceData}>
                    <defs>
                      <linearGradient id="colorValuation" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis
                      dataKey="month"
                      stroke="#94a3b8"
                      fontSize={11}
                      tick={{ fill: '#94a3b8' }}
                    />
                    <YAxis
                      stroke="#94a3b8"
                      fontSize={11}
                      tick={{ fill: '#94a3b8' }}
                      label={{ value: 'Value ($M)', angle: -90, position: 'insideLeft', fill: '#94a3b8' }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1e293b',
                        border: '1px solid #334155',
                        borderRadius: '8px',
                        color: '#f1f5f9',
                      }}
                      formatter={(value: number) => `$${value}M`}
                    />
                    <Area
                      type="monotone"
                      dataKey="valuation"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorValuation)"
                      name="Portfolio Valuation"
                    />
                    <Line
                      type="monotone"
                      dataKey="invested"
                      stroke="#64748b"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      name="Total Invested"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

