import { LucideIcon } from 'lucide-react'
import { TrendingUp } from 'lucide-react'

interface MetricCardProps {
  title: string
  value: string
  change: string
  icon: LucideIcon
  iconColor?: string
}

export default function MetricCard({ title, value, change, icon: Icon, iconColor = 'text-blue-400' }: MetricCardProps) {
  return (
    <div className="rounded-lg border border-card-border bg-card-bg p-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-400">{title}</p>
          <p className="mt-2 text-3xl font-bold text-white">{value}</p>
          <div className="mt-2 flex items-center gap-1 text-sm text-green-400">
            <TrendingUp className="h-4 w-4" />
            <span>{change}</span>
          </div>
        </div>
        <div className={`rounded-lg bg-sidebar-bg p-3 ${iconColor}`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  )
}

