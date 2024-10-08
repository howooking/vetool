import { Button } from '@/components/ui/button'
import { getIcuChart } from '@/lib/services/icu/chart/get-icu-chart'
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

    const { selectedChartData } = await getIcuChart(
      hos_id as string,
      targetDate,
      patientId,
    )

    setCopiedChart(selectedChartData)

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
