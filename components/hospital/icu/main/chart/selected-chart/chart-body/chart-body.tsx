import ChartInfos from '@/components/hospital/icu/main/chart/selected-chart/chart-body/chart-infos/chart-infos'
import ChartMemos from '@/components/hospital/icu/main/chart/selected-chart/chart-body/chart-memos/chart-memos'
import ChartTable from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/chart-table'
import { Memo } from '@/hooks/use-memo-management'
import type { SelectedChart } from '@/types/icu/chart'

export default function ChartBody({ chartData }: { chartData: SelectedChart }) {
  const { memo_a, memo_b, memo_c, icu_chart_id } = chartData

  return (
    <div className="flex flex-col gap-2">
      <ChartInfos chartData={chartData} />

      <ChartTable chartData={chartData} />

      <ChartMemos
        memoA={memo_a as Memo[] | null}
        memoB={memo_b as Memo[] | null}
        memoC={memo_c as Memo[] | null}
        icuChartId={icu_chart_id}
      />
    </div>
  )
}
