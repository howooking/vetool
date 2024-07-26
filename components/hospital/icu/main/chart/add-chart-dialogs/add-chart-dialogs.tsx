import AddDefaultChartDialog from '@/components/hospital/icu/main/chart/add-chart-dialogs/add-default-chart-dialog'
import CopyPrevChartDialog from '@/components/hospital/icu/main/chart/add-chart-dialogs/copy-prev-chart-dialog'
import { useIsCreatingChartStore } from '@/lib/store/icu/is-creating-chart'
import { useParams } from 'next/navigation'
import AddBookmarkChartDialog from './bookmark/add-bookmark-chart-dialog'
import PasteCopiedChartDialog from './paste-selected-chart-dialog'

export default function AddChartDialogs({
  selectedPatient,
}: {
  selectedPatient: {
    patientName: string
    patientId: string
  }
}) {
  const { target_date } = useParams()
  const { setIsCreatingChart } = useIsCreatingChartStore()

  return (
    <div className="flex h-icu-chart w-full items-center justify-center gap-10 p-10">
      <CopyPrevChartDialog
        targetDate={target_date as string}
        selectedPatient={selectedPatient}
        setIsCreatingChart={setIsCreatingChart}
      />
      <AddDefaultChartDialog
        targetDate={target_date as string}
        selectedPatient={selectedPatient}
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
