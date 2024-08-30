import { Button } from '@/components/ui/button'
import { getSelectedChartOrders } from '@/lib/services/icu/search-charts'
import { useCopiedChartStore } from '@/lib/store/icu/copied-chart'
import { useOrderPreviewStore } from '@/lib/store/icu/order-preview'
import { Eye, LoaderCircle } from 'lucide-react'
import { useState } from 'react'

export default function PreviewButton({ chartId }: { chartId: string }) {
  const { setCopiedOrders } = useCopiedChartStore()
  const { setPreviewModalOpen } = useOrderPreviewStore()
  const [isPreviwing, setIsPreviewing] = useState(false)

  const handleOpenPreviewDialog = async () => {
    setIsPreviewing(true)

    const sortedChartOrders = await getSelectedChartOrders(chartId)
    setCopiedOrders(sortedChartOrders)

    setPreviewModalOpen(true)
    setIsPreviewing(false)
  }

  return (
    <Button
      size="icon"
      variant="ghost"
      onClick={handleOpenPreviewDialog}
      disabled={isPreviwing}
      className="flex items-center justify-center"
    >
      {isPreviwing ? (
        <LoaderCircle size={18} className="animate-spin" />
      ) : (
        <Eye size={18} />
      )}
    </Button>
  )
}
