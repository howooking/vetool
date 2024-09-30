'use client'

import type { SelectedChart } from '@/types/icu/chart'
import AddDefaultChartDialog from './add-default-chart-dialog'
import AddBookmarkChartDialog from './bookmark/add-bookmark-chart-dialog'
import CopyPrevChartDialog from './copy-prev-chart-dialog'
import PasteCopiedChartDialog from './paste-copied-chart-dialog'

export default function AddChartDialogs({
  chartData,
  isFirstChart,
}: {
  isFirstChart: boolean
  chartData: SelectedChart
}) {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-5 p-5 md:h-icu-chart md:flex-row md:gap-10">
      {isFirstChart ? (
        <AddDefaultChartDialog chartData={chartData} />
      ) : (
        <CopyPrevChartDialog />
      )}

      <PasteCopiedChartDialog />

      <AddBookmarkChartDialog />
    </div>
  )
}
