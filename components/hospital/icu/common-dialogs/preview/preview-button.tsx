import { Button } from '@/components/ui/button'
import { getSelectedChartOrders } from '@/lib/services/icu/search-charts'
import { useCopiedChartStore } from '@/lib/store/icu/copied-chart'
import { useOrderPreviewStore } from '@/lib/store/icu/order-preview'
import { LoaderCircle } from 'lucide-react'
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
      size="sm"
      variant="outline"
      onClick={handleOpenPreviewDialog}
      disabled={isPreviwing}
      className="w-[68px]"
    >
      {isPreviwing ? (
        <LoaderCircle className="h-4 w-4 animate-spin" />
      ) : (
        '미리보기'
      )}
    </Button>
  )
}
