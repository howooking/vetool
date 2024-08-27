import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { getSelectedChartOrders } from '@/lib/services/icu/search-charts'
import { useCopiedChartStore } from '@/lib/store/icu/copied-chart'
import { Copy, CopyCheck, LoaderCircle } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'

export default function CopyChartButton({
  icuChartId,
}: {
  icuChartId: string
}) {
  const [isCopying, setIsCopying] = useState(false)
  const { copiedChartId, setCopiedChartId, setCopiedOrders } =
    useCopiedChartStore()

  const handleCopy = useCallback(async () => {
    setIsCopying(true)

    setCopiedChartId(icuChartId)

    const selectedChartOrders = await getSelectedChartOrders(icuChartId)
    setCopiedOrders(selectedChartOrders)

    toast({
      title: '차트 복사 완료',
      description: '붙여넣기 할 차트로 이동해주세요',
    })

    setIsCopying(false)
  }, [icuChartId, setCopiedChartId, setCopiedOrders])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'c') {
        // 선택한 텍스트가 있는지 확인
        if (!window.getSelection()?.toString()) {
          event.preventDefault()
          handleCopy()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleCopy, icuChartId])

  const isCopied = copiedChartId === icuChartId

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
