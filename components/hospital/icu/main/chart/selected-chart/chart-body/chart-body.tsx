import ChartInfos from '@/components/hospital/icu/main/chart/selected-chart/chart-body/chart-infos/chart-infos'
import ChartMemos from '@/components/hospital/icu/main/chart/selected-chart/chart-body/chart-memos/chart-memos'
import ChartTable from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/chart-table'
import { IcuOrderColors } from '@/types/adimin'
import type {
  IcuChartJoined,
  IcuChartOrderJoined,
  IcuIoJoined,
  SelectedChart,
  Vet,
} from '@/types/icu'
import { RefObject } from 'react'

export default function ChartBody({ chartData }: { chartData: SelectedChart }) {
  const { memo_a, memo_b, memo_c, icu_chart_id } = chartData
  return (
    <div
      className="flex flex-col gap-2"
      // ref={captureRef}
    >
      <ChartInfos chartData={chartData} />

      <ChartTable
        chartData={chartData}
        orderColors={{
          po: '#faf5ff',
          feed: '#fdf2f8',
          test: '#fefce8',
          fluid: '#eef2ff',
          manual: '#ecfeff',
          checklist: '#fff7ed',
          injection: '#f0fdf4',
        }}
      />

      <ChartMemos
        memoA={memo_a}
        memoB={memo_b}
        memoC={memo_c}
        icuChartId={icu_chart_id}
      />
    </div>
  )
}
