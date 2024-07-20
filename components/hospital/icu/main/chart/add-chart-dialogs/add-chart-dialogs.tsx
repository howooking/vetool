import AddDefaultChartDialog from '@/components/hospital/icu/main/chart/add-chart-dialogs/add-default-chart-dialog'
import CopyPrevChartDialog from '@/components/hospital/icu/main/chart/add-chart-dialogs/copy-prev-chart-dialog'
import PasteSelectedChartDialog from '@/components/hospital/icu/main/chart/add-chart-dialogs/paste-selected-chart-dialog'
import AddBookmarkChartDialog from '@/components/hospital/icu/main/chart/add-chart-dialogs/add-bookmark-chart-dialog'
import type { IcuChartJoined } from '@/types/icu'
import { useParams } from 'next/navigation'
import { useIsCreatingChartStore } from '@/lib/store/icu/is-creating-chart'

export default function AddChartDialogs({
  selectedPatient,
  icuChartData,
}: {
  selectedPatient: {
    patientName: string
    patientId: string
  }
  icuChartData: IcuChartJoined[]
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
      <PasteSelectedChartDialog
        targetDate={target_date as string}
        selectedPatient={selectedPatient}
        setIsCreatingChart={setIsCreatingChart}
      />
      <AddBookmarkChartDialog
        targetDate={target_date as string}
        selectedPatient={selectedPatient}
        icuChartData={icuChartData}
      />
    </div>
  )
}
