import { create } from 'zustand'

interface Report {
  id: number
  title: string
  source: string
  date: string
  type: string
  size: string
  status: 'Pending' | 'Analyzed' | 'Confirmed'
  score: number | null
  analyst: string | null
}

interface Rating {
  id: number
  reportId: number
  rating: number
  comment: string
  rater: string
  date: string
}

interface Store {
  reports: Report[]
  ratings: Rating[]
  addReport: (report: Report) => void
  updateReport: (id: number, updates: Partial<Report>) => void
  addRating: (rating: Rating) => void
  getRatingsByReportId: (reportId: number) => Rating[]
}

export const useStore = create<Store>((set, get) => ({
  reports: [],
  ratings: [],

  addReport: (report) =>
    set((state) => ({
      reports: [...state.reports, report],
    })),

  updateReport: (id, updates) =>
    set((state) => ({
      reports: state.reports.map((report) =>
        report.id === id ? { ...report, ...updates } : report
      ),
    })),

  addRating: (rating) =>
    set((state) => ({
      ratings: [...state.ratings, rating],
    })),

  getRatingsByReportId: (reportId) => {
    return get().ratings.filter((rating) => rating.reportId === reportId)
  },
}))

