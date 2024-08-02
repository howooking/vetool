import { Button } from '@/components/ui/button'
import { getSelectedChartOrders } from '@/lib/services/icu/search-charts'
import { useCopiedChartStore } from '@/lib/store/icu/copied-chart'
import { LoaderCircle } from 'lucide-react'
import { useState } from 'react'

export default function PasteBookmarkButton({ chartId }: { chartId: string }) {
  const [isFetching, setIsFetching] = useState(false)
  const { setIsConfirmCopyDialogOpen, setCopiedChartId, setCopiedChartOrders } =
    useCopiedChartStore()

  const handleSelect = async () => {
    setCopiedChartId(chartId)

    setIsFetching(true)
    const sortedChartOrders = await getSelectedChartOrders(chartId)
    setCopiedChartOrders(sortedChartOrders)
    setIsFetching(false)

    setIsConfirmCopyDialogOpen(true)
  }

  return (
    <Button
      size="sm"
      onClick={handleSelect}
      disabled={isFetching}
      className="w-[45px]"
    >
      {isFetching ? <LoaderCircle className="h-4 w-4 animate-spin" /> : '선택'}
    </Button>
  )
}
