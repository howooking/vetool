import { useIsChartLoadingStore } from '@/lib/store/icu/is-creating-chart'
import { IcuChartJoined } from '@/types/icu'
import { useParams } from 'next/navigation'
import AddDefaultChartDialog from './add-default-chart-dialog'
import AddBookmarkChartDialog from './bookmark/add-bookmark-chart-dialog'
import CopyPrevChartDialog from './copy-prev-chart-dialog'
import PasteCopiedChartDialog from './paste-copied-chart-dialog'

export default function AddChartDialogs({
  selectedPatient,
  selectedChart,
  isFirstChart,
}: {
  selectedPatient: {
    patientName: string
    patientId: string
  }
  selectedChart?: IcuChartJoined
  isFirstChart: boolean
}) {
  const { target_date } = useParams()
  const { setIsChartLoading } = useIsChartLoadingStore()

  return (
    <div className="flex h-icu-chart w-full items-center justify-center gap-10 p-10">
      {!isFirstChart && (
        <CopyPrevChartDialog
          targetDate={target_date as string}
          selectedPatient={selectedPatient}
          setIsCreatingChart={setIsChartLoading}
        />
      )}

      {selectedChart && (
        <AddDefaultChartDialog
          selectedChart={selectedChart}
          setIsCreatingChart={setIsChartLoading}
        />
      )}

      <PasteCopiedChartDialog
        targetDate={target_date as string}
        selectedPatient={selectedPatient}
        setIsCreatingChart={setIsChartLoading}
      />
      <AddBookmarkChartDialog />
    </div>
  )
}
