import { Button } from '@/components/ui/button'
import { useCopiedChartStore } from '@/lib/store/icu/copied-chart'
import { useOrderPreviewStore } from '@/lib/store/icu/order-preview'
import React from 'react'

export default function OpenPrevievDialogButton({
  chartId,
}: {
  chartId: string
}) {
  const { setCopiedChartId } = useCopiedChartStore()
  const { setPreviewModalOpen } = useOrderPreviewStore()

  const handleButtonClick = () => {
    setPreviewModalOpen(true)
    setCopiedChartId(chartId)
  }
  return (
    <Button onClick={handleButtonClick} className="h-6">
      미리보기
    </Button>
  )
}
