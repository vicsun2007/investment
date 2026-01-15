import ReportDetailPage from '@/components/ReportDetailPage'

interface PageProps {
  params: {
    id: string
  }
}

export default function ReportDetail({ params }: PageProps) {
  return <ReportDetailPage reportId={parseInt(params.id)} />
}

