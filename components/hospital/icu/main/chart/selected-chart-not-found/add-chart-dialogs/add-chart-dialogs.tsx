import AddDefaultChartDialog from '@/components/hospital/icu/main/chart/selected-chart-not-found/add-chart-dialogs/add-default-chart-dialog'
import CopyPrevChartDialog from '@/components/hospital/icu/main/chart/selected-chart-not-found/add-chart-dialogs/copy-prev-chart-dialog'
import PasteChartDialog from '@/components/hospital/icu/main/chart/selected-chart-not-found/add-chart-dialogs/paste-chart-dialog'
import { useParams } from 'next/navigation'

export default function AddChartDialogs({
  selectedPatient,
}: {
  selectedPatient: {
    patientName: string
    patientId: string
  }
}) {
  const { target_date } = useParams()
  return (
    <div className="flex h-icu-chart w-full items-center justify-center gap-10">
      <CopyPrevChartDialog
        targetDate={target_date as string}
        selectedPatient={selectedPatient}
      />
      <AddDefaultChartDialog
        targetDate={target_date as string}
        selectedPatient={selectedPatient}
      />
      <PasteChartDialog
        targetDate={target_date as string}
        selectedPatient={selectedPatient}
      />
    </div>
  )
}
