import Summary from '@/components/hospital/icu/main/summary/summary'
import { getIcuSummaryData } from '@/lib/services/icu/summary/get-summary-data'

export default async function SummaryPage({
  params,
}: {
  params: {
    hos_id: string
    target_date: string
  }
}) {
  const summaryData = await getIcuSummaryData(params.hos_id, params.target_date)

  return <Summary summaryData={summaryData} />
}
