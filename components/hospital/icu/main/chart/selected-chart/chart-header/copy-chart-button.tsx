import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { getSelectedChartOrders } from '@/lib/services/icu/search-charts'
import { useCopiedChartStore } from '@/lib/store/icu/copied-chart'
import { Copy, CopyCheck, LoaderCircle } from 'lucide-react'
import { useMemo, useState } from 'react'

export default function CopyChartButton({ chartId }: { chartId: string }) {
  const [isCopying, setIsCopying] = useState(false)
  const { copiedChartId, setCopiedChartId, setCopiedOrders } =
    useCopiedChartStore()

  const handleCopy = async () => {
    setIsCopying(true)

    setCopiedChartId(chartId)

    const selectedChartOrders = await getSelectedChartOrders(chartId)
    setCopiedOrders(selectedChartOrders)

    toast({
      title: '차트 복사 완료',
      description: '붙여넣기 할 차트로 이동해주세요',
    })

    setIsCopying(false)
  }

  const isCopied = useMemo(
    () => copiedChartId === chartId,
    [chartId, copiedChartId],
  )

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleCopy}
      disabled={isCopying}
    >
      {isCopying ? (
        <LoaderCircle size={16} className="animate-spin" />
      ) : isCopied ? (
        <CopyCheck size={18} />
      ) : (
        <Copy size={18} />
      )}
    </Button>
  )
}
