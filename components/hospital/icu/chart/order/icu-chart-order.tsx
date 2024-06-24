import IcuChartOrderMemos from '@/components/hospital/icu/chart/order/icu-chart-order-memos'
import IcuChartOrderPatientDetail from '@/components/hospital/icu/chart/order/icu-chart-order-patient-detail'
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
      <div className="h-[500px]">chart</div>
      <IcuChartOrderMemos memoA={memo_a} memoB={memo_b} memoC={memo_c} />
    </div>
  )
}
