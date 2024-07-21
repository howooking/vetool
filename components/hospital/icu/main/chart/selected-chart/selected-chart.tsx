import ChartInfos from '@/components/hospital/icu/main/chart/selected-chart/chart-infos/chart-infos'
import ChartMemos from '@/components/hospital/icu/main/chart/selected-chart/chart-memos/chart-memos'
import ChartTable from '@/components/hospital/icu/main/chart/selected-chart/table/chart-table'
import type {
  IcuChartJoined,
  IcuChartOrderJoined,
  IcuIoPatientJoined,
} from '@/types/icu'

export default function SelectedChart({
  selectedIo,
  selectedChart,
  selectedChartOrders,
  isPatientOut,
}: {
  selectedIo: IcuIoPatientJoined
  selectedChart: IcuChartJoined
  selectedChartOrders: IcuChartOrderJoined[]
  isPatientOut: boolean
}) {
  const { memo_a, memo_b, memo_c, ...restChartData } = selectedChart
  return (
    <div className="flex flex-col gap-2 p-2 pb-[48px]">
      <ChartInfos
        selectedIo={selectedIo}
        chartData={restChartData}
        isPatientOut={isPatientOut}
      />
      <ChartTable selectedChartOrders={selectedChartOrders} />

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
