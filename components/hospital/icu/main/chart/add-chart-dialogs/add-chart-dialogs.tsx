import { useIsChartLoadingStore } from '@/lib/store/icu/is-chart-loading'
import { IcuChartJoined } from '@/types/icu'
import { useParams } from 'next/navigation'
import AddDefaultChartDialog from './add-default-chart-dialog'
import AddBookmarkChartDialog from './bookmark/add-bookmark-chart-dialog'
import CopyPrevChartDialog from './copy-prev-chart-dialog'
import PasteCopiedChartDialog from './paste-copied-chart-dialog'
import type { IcuOrderColors } from '@/types/adimin'

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
    <div className="flex h-icu-chart w-full items-center justify-center gap-10 p-10">
      {!isFirstChart && (
        <CopyPrevChartDialog
          targetDate={target_date as string}
          selectedPatientId={selectedPatientId}
          setIsCreatingChart={setIsChartLoading}
          selectedIoId={selectedIoId}
        />
      )}

      {isFirstChart && (
        <AddDefaultChartDialog
          selectedChart={selectedChart}
          setIsCreatingChart={setIsChartLoading}
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
