import ChartInfos from '@/components/hospital/icu/main/chart/selected-chart/chart-infos/chart-infos'
import ChartMemos from '@/components/hospital/icu/main/chart/selected-chart/chart-memos/chart-memos'
import ChartTable from '@/components/hospital/icu/main/chart/selected-chart/table/chart-table'
import type {
  IcuChartJoined,
  IcuChartOrderJoined,
  IcuUserList,
} from '@/types/icu'

export default function SelectedChart({
  selectedChart,
  selectedChartOrders,
  icuUsersData,
  isPatientOut,
}: {
  selectedChart: IcuChartJoined
  selectedChartOrders: IcuChartOrderJoined[]
  icuUsersData: IcuUserList[]
  isPatientOut: boolean
}) {
  const { memo_a, memo_b, memo_c, ...restChartData } = selectedChart
  return (
    <div className="flex flex-col gap-4 p-2 pb-[48px]">
      <ChartInfos
        chartData={restChartData}
        icuUsersData={icuUsersData}
        isPatientOut={isPatientOut}
      />
      <ChartTable
        selectedChartOrders={selectedChartOrders}
        icuUsersData={icuUsersData}
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
