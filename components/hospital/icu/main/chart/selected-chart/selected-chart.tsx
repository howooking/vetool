import type {
  IcuChartJoined,
  IcuChartOrderJoined,
  IcuVetList,
} from '@/types/icu'
import ChartInfos from './chart-infos/chart-infos'
import IcuChartMemo from './memo/icu-chart-memo'
import IcuChartTable from './table/icu-chart-table'

export default function SelectedChart({
  userName,
  selectedChart,
  selectedChartOrders,
  vetsData,
}: {
  userName: string
  selectedChart: IcuChartJoined
  selectedChartOrders: IcuChartOrderJoined[]
  vetsData: IcuVetList[]
}) {
  const { memo_a, memo_b, memo_c, ...restChartData } = selectedChart
  return (
    <div className="flex flex-col gap-2 p-2 pb-[48px]">
      <ChartInfos chartData={restChartData} vetsData={vetsData} />
      <IcuChartTable
        userName={userName}
        selectedChartOrders={selectedChartOrders}
        vetsData={vetsData}
      />
      <IcuChartMemo memoA={memo_a} memoB={memo_b} memoC={memo_c} />
    </div>
  )
}
