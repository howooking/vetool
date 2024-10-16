import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { useCopiedChartStore } from '@/lib/store/icu/copied-chart'
import { useIcuOrderStore } from '@/lib/store/icu/icu-order'
import { Copy, CopyCheck, LoaderCircle } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'

export default function CopyChartButton({
  icuChartId,
}: {
  icuChartId: string
}) {
  const [isCopying, setIsCopying] = useState(false)
  const { copiedChartId, setCopiedChartId } = useCopiedChartStore()
  const { orderPendingQueue } = useIcuOrderStore()

  const handleCopy = useCallback(async () => {
    setIsCopying(true)

    setCopiedChartId(icuChartId)

    toast({
      title: '차트 복사 완료',
      description: '붙여넣기 할 차트로 이동해주세요',
    })

    setIsCopying(false)
  }, [icuChartId, setCopiedChartId])

  useEffect(() => {
    if (orderPendingQueue.length) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'c') {
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
  }, [orderPendingQueue, handleCopy])

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
