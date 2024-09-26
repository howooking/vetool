'use client'

import type { IcuOrderColors } from '@/types/adimin'
import { SelectedChart } from '@/types/icu'
import { useParams } from 'next/navigation'
import AddDefaultChartDialog from './add-default-chart-dialog'
import CopyPrevChartDialog from './copy-prev-chart-dialog'

export default function AddChartDialogs({
  chartData,
  isFirstChart,
}: {
  isFirstChart: boolean
  chartData: SelectedChart
}) {
  const { target_date } = useParams()

  return (
    <div className="flex w-full flex-col items-center justify-center gap-5 p-5 md:h-icu-chart md:flex-row md:gap-10">
      {isFirstChart ? (
        <AddDefaultChartDialog chartData={chartData} />
      ) : (
        <CopyPrevChartDialog
          targetDate={target_date as string}
          chartData={chartData}
        />
      )}

      {/* <PasteCopiedChartDialog
        targetDate={target_date as string}
        selectedPatientId={selectedPatientId}
        selectedIoId={selectedIoId}
      />
      <AddBookmarkChartDialog
        orderColors={orderColors}
        selectedIoId={selectedIoId}
      /> */}
    </div>
  )
}
