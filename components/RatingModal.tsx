'use client'

import { X, Star } from 'lucide-react'
import { useState } from 'react'

interface RatingModalProps {
  isOpen: boolean
  onClose: () => void
  reportId: number
  reportTitle: string
  onSubmit: (rating: number, comment: string) => void
}

export default function RatingModal({
  isOpen,
  onClose,
  reportId,
  reportTitle,
  onSubmit,
}: RatingModalProps) {
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [comment, setComment] = useState('')

  if (!isOpen) return null

  const handleSubmit = () => {
    if (rating > 0) {
      onSubmit(rating, comment)
      setRating(0)
      setComment('')
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-lg border border-card-border bg-card-bg p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">Rate Report</h3>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-gray-400 hover:bg-sidebar-hover hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mb-4">
          <p className="mb-2 text-sm text-gray-400">{reportTitle}</p>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
              <button
                key={value}
                onClick={() => setRating(value)}
                onMouseEnter={() => setHoveredRating(value)}
                onMouseLeave={() => setHoveredRating(0)}
                className="rounded p-1 transition-colors"
              >
                <Star
                  className={`h-6 w-6 ${
                    value <= (hoveredRating || rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-600'
                  }`}
                />
              </button>
            ))}
            {rating > 0 && (
              <span className="ml-2 text-sm font-medium text-white">{rating}/10</span>
            )}
          </div>
        </div>

        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium text-gray-300">Comment</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add your feedback..."
            rows={4}
            className="w-full rounded-lg border border-card-border bg-sidebar-bg px-3 py-2 text-sm text-white placeholder-gray-500 focus:border-primary focus:outline-none"
          />
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-lg border border-card-border bg-sidebar-bg px-4 py-2 text-sm font-medium text-gray-300 hover:bg-sidebar-hover"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={rating === 0}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Submit Rating
          </button>
        </div>
      </div>
    </div>
  )
}

