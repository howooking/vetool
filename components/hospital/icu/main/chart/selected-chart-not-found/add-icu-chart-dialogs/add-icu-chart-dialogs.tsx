import { useParams } from 'next/navigation'
import AddDefaultChartDialog from '@/components/hospital/icu/main/chart/selected-chart-not-found/add-icu-chart-dialogs/add-default-chart-dialog'
import PasteIcuChartDialog from '@/components/hospital/icu/main/chart/selected-chart-not-found/add-icu-chart-dialogs/paste-icu-chart-dialog'
import CopyPrevChartDialog from '@/components/hospital/icu/main/chart/selected-chart-not-found/add-icu-chart-dialogs/copy-prev-chart-dialog'

export default function AddIcuChartDialogs({
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
        selectedPatientId={selectedPatientId}
      />
      <PasteIcuChartDialog
        targetDate={target_date as string}
        selectedPatientId={selectedPatientId}
      />
    </div>
  )
}
