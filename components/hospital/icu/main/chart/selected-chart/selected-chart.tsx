import type {
  IcuChartJoined,
  IcuChartOrderJoined,
  IcuVetList,
} from '@/types/icu'
import ChartInfos from './chart-infos/chart-infos'
import ChartMemos from './chart-memos/chart-memos'
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
      <ChartMemos
        memoA={memo_a}
        memoB={memo_b}
        memoC={memo_c}
        icuChartId={selectedChart.icu_chart_id}
        hosIcuMemoNames={selectedChart.hos_id.icu_memo_names}
      />
    </div>
  )
}
