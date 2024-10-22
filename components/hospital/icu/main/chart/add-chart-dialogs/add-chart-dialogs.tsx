import AddDefaultChartDialog from '@/components/hospital/icu/main/chart/add-chart-dialogs/add-default-chart-dialog'
import CopyPrevChartDialog from '@/components/hospital/icu/main/chart/add-chart-dialogs/copy-prev-chart-dialog'
import PasteCopiedChartDialog from '@/components/hospital/icu/main/chart/add-chart-dialogs/paste-copied-chart-dialog'
import AddTemplateChartDialog from '@/components/hospital/icu/main/chart/add-chart-dialogs/template/add-template-chart-dialog'
import type { SelectedChart } from '@/types/icu/chart'
import { Dispatch, SetStateAction } from 'react'

export default function AddChartDialogs({
  chartData,
  isFirstChart,
  setIsChartLoading,
}: {
  isFirstChart?: boolean
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

      <AddTemplateChartDialog setIsChartLoading={setIsChartLoading} />
    </div>
  )
}
