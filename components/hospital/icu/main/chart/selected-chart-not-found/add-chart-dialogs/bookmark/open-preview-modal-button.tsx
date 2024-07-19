import { Button } from '@/components/ui/button'
import { useCopiedChartStore } from '@/lib/store/icu/copied-chart'
import { useOrderPreviewStore } from '@/lib/store/icu/order-preview'
import React from 'react'

export default function OpenPreviewModalButton({
  chartId,
}: {
  chartId: string
}) {
  const { setCopiedChartId } = useCopiedChartStore()
  const { onOpenChange } = useOrderPreviewStore()

  const handleButtonClick = () => {
    onOpenChange(true)
    setCopiedChartId(chartId)
  }
  return (
    <Button onClick={handleButtonClick} className="h-6">
      미리보기
    </Button>
  )
}
