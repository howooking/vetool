import { useParams } from 'next/navigation'
import AddDefaultChartDialog from './add-default-chart-dialog'
import CopyPrevChartDialog from './copy-prev-chart-dialog'

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
        selectedPatient={selectedPatient}
      />
    </div>
  )
}
