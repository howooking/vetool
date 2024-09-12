import { useIsChartLoadingStore } from '@/lib/store/icu/is-chart-loading'
import type { IcuOrderColors } from '@/types/adimin'
import { IcuChartJoined } from '@/types/icu'
import { useParams } from 'next/navigation'
import AddDefaultChartDialog from './add-default-chart-dialog'
import AddBookmarkChartDialog from './bookmark/add-bookmark-chart-dialog'
import CopyPrevChartDialog from './copy-prev-chart-dialog'
import PasteCopiedChartDialog from './paste-copied-chart-dialog'

export default function AddChartDialogs({
  selectedPatientId,
  selectedChart,
  isFirstChart,
  orderColors,
  selectedIoId,
}: {
  selectedPatientId: string
  selectedChart?: IcuChartJoined
  isFirstChart: boolean
  orderColors: IcuOrderColors
  selectedIoId: string
}) {
  const { target_date } = useParams()
  const { setIsChartLoading } = useIsChartLoadingStore()

  return (
    <div className="flex w-full flex-col items-center justify-center gap-5 p-5 md:h-icu-chart md:flex-row md:gap-10">
      {isFirstChart ? (
        <AddDefaultChartDialog
          selectedChart={selectedChart}
          setIsCreatingChart={setIsChartLoading}
        />
      ) : (
        <CopyPrevChartDialog
          targetDate={target_date as string}
          selectedPatientId={selectedPatientId}
          setIsCreatingChart={setIsChartLoading}
          selectedIoId={selectedIoId}
        />
      )}

      <PasteCopiedChartDialog
        targetDate={target_date as string}
        selectedPatientId={selectedPatientId}
        setIsCreatingChart={setIsChartLoading}
        selectedIoId={selectedIoId}
      />
      <AddBookmarkChartDialog
        orderColors={orderColors}
        selectedIoId={selectedIoId}
      />
    </div>
  )
}
