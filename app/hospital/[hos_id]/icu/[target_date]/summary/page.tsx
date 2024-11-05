import NoResult from '@/components/common/no-result'
import Summary from '@/components/hospital/icu/main/summary/summary'
import { getIcuSummaryData } from '@/lib/services/icu/summary/get-summary-data'

export default async function SummaryPage(
  props: {
    params: Promise<{
      hos_id: string
      target_date: string
    }>
  }
) {
  const params = await props.params;
  const summaryData = await getIcuSummaryData(params.hos_id, params.target_date)

  if (!summaryData) {
    return (
      <NoResult title="등록된 입원환자가 없습니다" className="h-icu-chart" />
    )
  }

  return <Summary summaryData={summaryData} />
}
