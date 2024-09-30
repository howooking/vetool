import Analysis from '@/components/hospital/icu/main/analysis/analysis'
import { getAnalysisData } from '@/lib/services/icu/analysis/get-analysis-data'

export default async function AnalysisPage({
  params,
}: {
  params: {
    hos_id: string
  }
}) {
  const analysisData = await getAnalysisData(params.hos_id)

  return <Analysis analysisData={analysisData} />
}
