import type { SelectedChart } from '@/types/icu/chart'
import { Dispatch, SetStateAction } from 'react'
import AddDefaultChartDialog from './add-default-chart-dialog'
import AddBookmarkChartDialog from './bookmark/add-bookmark-chart-dialog'
import CopyPrevChartDialog from './copy-prev-chart-dialog'
import PasteCopiedChartDialog from './paste-copied-chart-dialog'

export default function AddChartDialogs({
  chartData,
  isFirstChart,
  setIsChartLoading,
}: {
  isFirstChart: boolean
  chartData: SelectedChart
  setIsChartLoading: Dispatch<SetStateAction<boolean>>
}) {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-5 p-5 md:h-icu-chart md:flex-row md:gap-10">
      {isFirstChart ? (
        <AddDefaultChartDialog
          chartData={chartData}
          setIsChartLoading={setIsChartLoading}
        />
      ) : (
        <CopyPrevChartDialog setIsChartLoading={setIsChartLoading} />
      )}

      <PasteCopiedChartDialog setIsChartLoading={setIsChartLoading} />

      <AddBookmarkChartDialog setIsChartLoading={setIsChartLoading} />
    </div>
  )
}
