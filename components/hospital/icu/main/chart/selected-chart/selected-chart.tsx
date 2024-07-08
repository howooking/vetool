import type { Vet } from '@/types'
import type { IcuChartJoined, IcuChartOrderJoined } from '@/types/icu'
import IcuChartPatientDetail from './patient-detail/icu-chart-patient-detail'
import IcuChartTable from './table/icu-chart-table'
import IcuChartMemo from '@/components/hospital/icu/main/chart/selected-chart/memo/icu-chart-memo'

export default function SelectedChart({
  userName,
  selectedChart,
  selectedChartOrders,
  vetsData,
}: {
  userName: string
  selectedChart: IcuChartJoined
  selectedChartOrders: IcuChartOrderJoined[]
  vetsData: Vet[]
}) {
  const { memo_a, memo_b, memo_c, ...restChartData } = selectedChart
  return (
    <div className="flex flex-col gap-2 p-2 pb-[48px]">
      <IcuChartPatientDetail chartData={restChartData} vetsData={vetsData} />
      <IcuChartTable
        userName={userName}
        selectedChartOrders={selectedChartOrders}
        vetsData={vetsData}
      />
      <IcuChartMemo memoA={memo_a} memoB={memo_b} memoC={memo_c} />
    </div>
  )
}
