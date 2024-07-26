import { Button } from '@/components/ui/button'
import { DEFAULT_ICU_ORDER_TYPE } from '@/constants/hospital/icu/chart/order'
import { selectedChartOrderList } from '@/lib/services/icu/search-charts'
import { useCopiedChartStore } from '@/lib/store/icu/copied-chart'
import { useOrderPreviewStore } from '@/lib/store/icu/order-preview'
import { LoaderCircle } from 'lucide-react'
import { useState } from 'react'

export default function OpenPrevievDialogButton({
  chartId,
}: {
  chartId: string
}) {
  const { setCopiedChartId, setCopiedChartOrder } = useCopiedChartStore()
  const { setPreviewModalOpen } = useOrderPreviewStore()
  const [isPreviwing, setIsPreviewing] = useState(false)

  const fetchChartOrderList = async () => {
    const fetchedChartOrders = await selectedChartOrderList(chartId)
    const selectedChartOrders = fetchedChartOrders.sort(
      (prev, next) =>
        DEFAULT_ICU_ORDER_TYPE.map((order) => order.value).findIndex(
          (order) => order === prev.icu_chart_order_type,
        ) -
        DEFAULT_ICU_ORDER_TYPE.map((order) => order.value).findIndex(
          (order) => order === next.icu_chart_order_type,
        ),
    )
    setCopiedChartOrder(selectedChartOrders)
  }
  const handleButtonClick = async () => {
    setIsPreviewing(true)
    setCopiedChartId(chartId)

    await fetchChartOrderList()
    setIsPreviewing(false)

    setPreviewModalOpen(true)
  }
  return (
    <Button
      onClick={handleButtonClick}
      variant="outline"
      size="sm"
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
