'use client'

import { MoreVertical } from 'lucide-react'

interface ResearchItem {
  reportName: string
  sector: string
  timeAgo: string
  leadAnalyst: {
    initials: string
    name: string
  }
  aiModel: string
  promptStrategy: string
  score: string
  comments: string
}

const mockData: ResearchItem[] = [
  {
    reportName: 'Series A Fintech Synthesis',
    sector: 'LATAM Market',
    timeAgo: '2h ago',
    leadAnalyst: {
      initials: 'SC',
      name: 'Sarah Chen',
    },
    aiModel: 'Claude 3.5',
    promptStrategy: 'Multi-step Chain',
    score: '9.2',
    comments: 'Excellent risk analysis ...',
  },
  {
    reportName: 'PropTech',
    sector: 'Real Estate',
    timeAgo: '5h ago',
    leadAnalyst: {
      initials: 'MW',
      name: 'Marcus Wu',
    },
    aiModel: 'GPT-4o',
    promptStrategy: 'Financial Analysis',
    score: '8.7',
    comments: 'Strong market insights ...',
  },
]

export default function RecentResearchTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-card-border">
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
              REPORT NAME
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
              LEAD ANALYST
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
              AI MODEL
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
              PROMPT STRATEGY
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
              SCORE
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
              COMMENTS
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
              ACTIONS
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-card-border">
          {mockData.map((item, index) => (
            <tr key={index} className="hover:bg-sidebar-bg">
              <td className="px-4 py-4">
                <div className="text-sm font-medium text-white">{item.reportName}</div>
                <div className="text-xs text-gray-400">
                  {item.sector} • {item.timeAgo}
                </div>
              </td>
              <td className="px-4 py-4">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-medium text-white">
                    {item.leadAnalyst.initials}
                  </div>
                  <span className="text-sm text-gray-300">{item.leadAnalyst.name}</span>
                </div>
              </td>
              <td className="px-4 py-4 text-sm text-gray-300">{item.aiModel}</td>
              <td className="px-4 py-4">
                <div className="flex items-center gap-1 text-sm text-gray-300">
                  <span>{item.promptStrategy}</span>
                </div>
              </td>
              <td className="px-4 py-4">
                <span className="text-sm font-medium text-green-400">{item.score}</span>
              </td>
              <td className="px-4 py-4 text-sm text-gray-400">{item.comments}</td>
              <td className="px-4 py-4">
                <button className="rounded-lg p-1 text-gray-400 hover:bg-sidebar-hover hover:text-white">
                  <MoreVertical className="h-4 w-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

