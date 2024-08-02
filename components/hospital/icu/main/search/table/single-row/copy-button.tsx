import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { getSelectedChartOrders } from '@/lib/services/icu/search-charts'
import { useCopiedChartStore } from '@/lib/store/icu/copied-chart'
import { LoaderCircle } from 'lucide-react'
import { useState } from 'react'

export default function CopyButton({ chartId }: { chartId: string }) {
  const { setCopiedChartId, setCopiedOrders } = useCopiedChartStore()
  const [isCopying, setIsCopying] = useState(false)

  const handleCopy = async () => {
    setIsCopying(true)

    setCopiedChartId(chartId)

    const sortedChartOrders = await getSelectedChartOrders(chartId)
    setCopiedOrders(sortedChartOrders)

    toast({
      title: '차트 복사 완료',
      description: '해당 차트가 클립보드에 복사되었습니다',
    })
    setIsCopying(false)
  }

  return (
    <Button
      onClick={handleCopy}
      disabled={isCopying}
      size="sm"
      className="w-[45px]"
    >
      {isCopying ? <LoaderCircle className="h-4 w-4 animate-spin" /> : '복사'}
    </Button>
  )
}
