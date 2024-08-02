import { Button } from '@/components/ui/button'
import { getSelectedChartOrders } from '@/lib/services/icu/search-charts'
import { useCopiedChartStore } from '@/lib/store/icu/copied-chart'
import { LoaderCircle } from 'lucide-react'
import { useState } from 'react'

export default function ConfirmCopyButton({ chartId }: { chartId: string }) {
  const { setCopiedChartId, setCopiedOrders, setIsConfirmCopyDialogOpen } =
    useCopiedChartStore()
  const [isCopying, setIsCopying] = useState(false)

  const handleOpenConfirmCopyDialog = async () => {
    setCopiedChartId(chartId)

    setIsCopying(true)
    const sortedChartOrders = await getSelectedChartOrders(chartId)
    setCopiedOrders(sortedChartOrders)
    setIsCopying(false)

    setIsConfirmCopyDialogOpen(true)
  }

  return (
    <Button
      onClick={handleOpenConfirmCopyDialog}
      disabled={isCopying}
      size="sm"
      className="w-[45px]"
    >
      {isCopying ? <LoaderCircle className="h-4 w-4 animate-spin" /> : '선택'}
    </Button>
  )
}
