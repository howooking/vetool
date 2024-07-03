import IcuChartMemos from '@/components/hospital/icu/chart/memos/icu-chart-memos'
import IcuChartPatientDetail from '@/components/hospital/icu/chart/patient-detail/icu-chart-patient-detail'
import IcuChartTable from '@/components/hospital/icu/chart/table/icu-chart-table'
import type { IcuChartJoined, IcuChartOrderJoined, Vet } from '@/types/hospital'

export default function IcuChartOrder({
  chartData,
  chartOrderData,
  vetsData,
}: {
  chartData: IcuChartJoined
  chartOrderData: IcuChartOrderJoined[]
  vetsData: Vet[]
}) {
  const { memo_a, memo_b, memo_c, ...restChartData } = chartData

  return (
    <div className="flex flex-col gap-4">
      <IcuChartPatientDetail chartData={restChartData} vetsData={vetsData} />
      <IcuChartTable chartOrderData={chartOrderData} />
      <IcuChartMemos memoA={memo_a} memoB={memo_b} memoC={memo_c} />
    </div>
  )
}
