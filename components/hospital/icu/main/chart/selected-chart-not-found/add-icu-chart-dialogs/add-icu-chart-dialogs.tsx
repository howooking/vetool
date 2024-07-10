import { useParams } from 'next/navigation'
import AddDefaultChartDialog from './add-default-chart-dialog'
import CopyBookmarkDialog from './copy-bookmark-dialog'
import CopyPrevChartDialog from './copy-prev-chart-dialog'

export default function AddIcuChartDialogs({
  selectedPatientId,
}: {
  selectedPatientId: string
}) {
  const { target_date } = useParams()
  return (
    <div className="flex h-icu-chart w-full items-center justify-center gap-10">
      <CopyPrevChartDialog
        targetDate={target_date as string}
        selectedPatientId={selectedPatientId}
      />
      <AddDefaultChartDialog
        targetDate={target_date as string}
        selectedPatientId={selectedPatientId}
      />
      <CopyBookmarkDialog
        targetDate={target_date as string}
        selectedPatientId={selectedPatientId}
      />
    </div>
  )
}
