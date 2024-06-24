import IcuChartOrderMemos from '@/components/hospital/icu/chart/order/icu-chart-order-memos'
import IcuChartOrderPatientDetail from '@/components/hospital/icu/chart/order/icu-chart-order-patient-detail'
import IcuChartOrderTx from '@/components/hospital/icu/chart/order/icu-chart-order-tx'
import type { IcuChartJoined, Vets } from '@/types/hospital'

export default function IcuChartOrder({
  chartData,
  vetsData,
}: {
  chartData: IcuChartJoined
  vetsData: Vets[]
}) {
  const { memo_a, memo_b, memo_c, ...restChartData } = chartData

  return (
    <div className="flex flex-col">
      <IcuChartOrderPatientDetail
        chartData={restChartData}
        vetsData={vetsData}
      />
      <IcuChartOrderTx />
      <IcuChartOrderMemos memoA={memo_a} memoB={memo_b} memoC={memo_c} />
    </div>
  )
}
