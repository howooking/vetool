import { Button } from '@/components/ui/button'
import { getIcuChartByPatientId } from '@/lib/services/icu/get-icu-chart-by-patient-id'
import { useCopiedChartStore } from '@/lib/store/icu/copied-chart'
import { usePreviewDialogStore } from '@/lib/store/icu/preview-dialog'
import { Eye, LoaderCircle } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useState } from 'react'

export default function PreviewButton({
  patientId,
  targetDate,
}: {
  patientId: string
  targetDate: string
}) {
  const { hos_id } = useParams()
  const { setCopiedChart } = useCopiedChartStore()
  const { setPreviewDialogOpen } = usePreviewDialogStore()
  const [isPreviewing, setIsPreviewing] = useState(false)

  const handleOpenPreviewDialog = async () => {
    setIsPreviewing(true)

    const previewChart = await getIcuChartByPatientId(
      hos_id as string,
      targetDate,
      patientId,
    )

    setCopiedChart(previewChart)

    setPreviewDialogOpen(true)
    setIsPreviewing(false)
  }

  return (
    <Button
      size="icon"
      variant="ghost"
      onClick={handleOpenPreviewDialog}
      disabled={isPreviewing}
      className="mx-auto flex items-center justify-center"
    >
      {isPreviewing ? (
        <LoaderCircle size={18} className="animate-spin" />
      ) : (
        <Eye size={18} />
      )}
    </Button>
  )
}
