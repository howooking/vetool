import { Button } from '@/components/ui/button'
import { useCopiedChartStore } from '@/lib/store/icu/copied-chart'
import { LoaderCircle } from 'lucide-react'
import { useState } from 'react'

export default function PasteBookmarkButton({ chartId }: { chartId: string }) {
  const [isFetching, setIsFetching] = useState(false)
  const { setIsConfirmCopyDialogOpen, setCopiedChartId } = useCopiedChartStore()

  const handleSelect = async () => {
    setIsFetching(true)
    setCopiedChartId(chartId)
    setIsConfirmCopyDialogOpen(true)
    setIsFetching(false)
  }

  return (
    <Button
      size="sm"
      onClick={handleSelect}
      disabled={isFetching}
      className="w-[45px]"
    >
      {isFetching ? (
        <LoaderCircle size={16} className="animate-spin" />
      ) : (
        '선택'
      )}
    </Button>
  )
}
