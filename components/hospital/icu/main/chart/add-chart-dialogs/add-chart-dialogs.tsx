import { useIsCreatingChartStore } from '@/lib/store/icu/is-creating-chart'
import { IcuChartJoined } from '@/types/icu'
import { useParams } from 'next/navigation'
import AddDefaultChartDialog from './add-default-chart-dialog'
import AddBookmarkChartDialog from './bookmark/add-bookmark-chart-dialog'
import CopyPrevChartDialog from './copy-prev-chart-dialog'
import PasteCopiedChartDialog from './paste-selected-chart-dialog'

export default function AddChartDialogs({
  firstChart,
  selectedPatient,
  selectedChart,
}: {
  firstChart?: boolean
  selectedPatient: {
    patientName: string
    patientId: string
  }
  selectedChart?: IcuChartJoined
}) {
  const { target_date } = useParams()
  const { setIsCreatingChart } = useIsCreatingChartStore()

  return (
    <div className="flex h-icu-chart w-full items-center justify-center gap-10 p-10">
      {!firstChart && (
        <CopyPrevChartDialog
          targetDate={target_date as string}
          selectedPatient={selectedPatient}
          setIsCreatingChart={setIsCreatingChart}
        />
      )}

      <AddDefaultChartDialog
        selectedChart={selectedChart}
        setIsCreatingChart={setIsCreatingChart}
      />
      <PasteCopiedChartDialog
        targetDate={target_date as string}
        selectedPatient={selectedPatient}
        setIsCreatingChart={setIsCreatingChart}
      />
      <AddBookmarkChartDialog />
    </div>
  )
}
