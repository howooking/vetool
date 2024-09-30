import { IcuAnalysisData } from '@/types/icu/analysis'
import IoStatistics from '@/components/hospital/icu/main/analysis/io-statistics'
import Chart2 from '@/components/hospital/icu/main/analysis/chart-2'

export const description = 'An interactive line chart'

export default function Analysis({
  analysisData,
}: {
  analysisData: IcuAnalysisData[]
}) {
  return (
    <div>
      <IoStatistics analysisData={analysisData} />
      <Chart2 analysisData={analysisData} />
    </div>
  )
}
