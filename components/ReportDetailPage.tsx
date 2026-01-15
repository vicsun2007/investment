'use client'

import Sidebar from './Sidebar'
import Header from './Header'
import RatingModal from './RatingModal'
import { useState } from 'react'
import { ArrowLeft, Download, Star, MessageSquare, FileText, Eye } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useStore } from '@/store/useStore'

interface ReportDetailPageProps {
  reportId: number
}

export default function ReportDetailPage({ reportId }: ReportDetailPageProps) {
  const router = useRouter()
  const { getRatingsByReportId, addRating } = useStore()
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false)

  // Mock report data - in real app, fetch from API
  const report = {
    id: reportId,
    title: 'Technology Sector Update: Cloud Computing & AI Moats',
    source: 'Goldman Sachs',
    date: 'October 24, 2023',
    type: 'Equity Research',
    content: `
      The acceleration of generative AI workloads is fundamentally restructuring the silicon demand landscape. 
      In our analysis of 2024 capital expenditures, we see a structural shift away from general-purpose compute 
      towards accelerated computing...
    `,
    summary: 'We maintain our Overweight rating on the sector, specifically highlighting the durable competitive advantages of NVIDIA within the data center segment.',
    keyMetrics: {
      targetPrice: '$1,200.00',
      rating: 'Strong Buy',
      riskLevel: 'Medium',
    },
  }

  const ratings = getRatingsByReportId(reportId)
  const averageRating = ratings.length > 0
    ? ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length
    : null

  const handleRatingSubmit = (rating: number, comment: string) => {
    addRating({
      id: Date.now(),
      reportId,
      rating,
      comment,
      rater: 'James Wilson', // In real app, get from auth context
      date: new Date().toISOString(),
    })
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="mx-auto max-w-7xl">
            {/* Back Button */}
            <button
              onClick={() => router.back()}
              className="mb-4 flex items-center gap-2 text-sm text-gray-400 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Reports
            </button>

            {/* Report Header */}
            <div className="mb-6 rounded-lg border border-card-border bg-card-bg p-6">
              <div className="mb-4 flex items-start justify-between">
                <div className="flex-1">
                  <h1 className="mb-2 text-2xl font-bold text-white">{report.title}</h1>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span>{report.source}</span>
                    <span>•</span>
                    <span>{report.date}</span>
                    <span>•</span>
                    <span>{report.type}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="rounded-lg border border-card-border bg-sidebar-bg p-2 text-gray-400 hover:bg-sidebar-hover hover:text-white">
                    <Download className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setIsRatingModalOpen(true)}
                    className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark"
                  >
                    <Star className="h-4 w-4" />
                    Rate Report
                  </button>
                </div>
              </div>

              {/* Summary */}
              <div className="mb-4 rounded-lg border-l-4 border-primary bg-sidebar-bg p-4">
                <p className="text-sm text-gray-300">{report.summary}</p>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="rounded-lg border border-card-border bg-sidebar-bg p-4">
                  <div className="mb-1 text-xs font-medium text-gray-400">TARGET PRICE</div>
                  <div className="text-2xl font-bold text-primary">{report.keyMetrics.targetPrice}</div>
                  <div className="mt-1 text-xs text-green-400">↑ 24% Potential Upside</div>
                </div>
                <div className="rounded-lg border border-card-border bg-sidebar-bg p-4">
                  <div className="mb-1 text-xs font-medium text-gray-400">RATING</div>
                  <div className="text-2xl font-bold text-white">{report.keyMetrics.rating}</div>
                  <div className="mt-2 h-2 w-full rounded-full bg-sidebar-bg">
                    <div className="h-2 rounded-full bg-primary" style={{ width: '85%' }} />
                  </div>
                </div>
                <div className="rounded-lg border border-card-border bg-sidebar-bg p-4">
                  <div className="mb-1 text-xs font-medium text-gray-400">RISK LEVEL</div>
                  <div className="text-2xl font-bold text-white">{report.keyMetrics.riskLevel}</div>
                  <div className="mt-1 text-xs text-gray-400">Regulatory/Export focused</div>
                </div>
              </div>
            </div>

            {/* Ratings Section */}
            {ratings.length > 0 && (
              <div className="mb-6 rounded-lg border border-card-border bg-card-bg p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-white">Ratings & Comments</h2>
                  {averageRating && (
                    <div className="flex items-center gap-2">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <span className="text-lg font-semibold text-white">
                        {averageRating.toFixed(1)}/10
                      </span>
                      <span className="text-sm text-gray-400">({ratings.length} ratings)</span>
                    </div>
                  )}
                </div>
                <div className="space-y-4">
                  {ratings.map((rating) => (
                    <div
                      key={rating.id}
                      className="rounded-lg border border-card-border bg-sidebar-bg p-4"
                    >
                      <div className="mb-2 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-medium text-white">
                            {rating.rater.split(' ').map((n) => n[0]).join('')}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-white">{rating.rater}</div>
                            <div className="text-xs text-gray-400">
                              {new Date(rating.date).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium text-white">{rating.rating}/10</span>
                        </div>
                      </div>
                      {rating.comment && (
                        <p className="text-sm text-gray-300">{rating.comment}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Report Content */}
            <div className="rounded-lg border border-card-border bg-card-bg p-6">
              <h2 className="mb-4 text-lg font-semibold text-white">Report Content</h2>
              <div className="prose prose-invert max-w-none">
                <p className="text-sm leading-relaxed text-gray-300">{report.content}</p>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Rating Modal */}
      <RatingModal
        isOpen={isRatingModalOpen}
        onClose={() => setIsRatingModalOpen(false)}
        reportId={reportId}
        reportTitle={report.title}
        onSubmit={handleRatingSubmit}
      />
    </div>
  )
}

