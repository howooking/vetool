import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { ORDER_OF_ORDERS } from '@/constants/hospital/icu/chart/order'
import { selectedChartOrderList } from '@/lib/services/icu/select-chart-list'
import { useCopiedChartStore } from '@/lib/store/icu/copied-chart'
import { IcuChartOrderJoined } from '@/types/icu'
import { Dispatch, SetStateAction, useState } from 'react'

export default function SearchChartTableRow({
  name,
  dx,
  cc,
  targetDate,
  chartId,
  setIsDialogOpen,
  register,
}: {
  name: string
  dx: string | null
  cc: string | null
  targetDate: string
  chartId: string
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>
  register?: boolean
}) {
  const rowData = [name, dx, cc, targetDate]
  const [selectedChartOrders, setSelectedChartOrders] = useState<
    IcuChartOrderJoined[]
  >([])

  const {
    setSelectedTargetDate,
    setCopiedChartId,
    setCopiedChartOrder,
    setIsCopyDialogOpen,
  } = useCopiedChartStore()

  const fetchChartOrderList = async () => {
    const fetchedChartOrders = await selectedChartOrderList(chartId)

    const selectedChartOrders = fetchedChartOrders.sort(
      (prev, next) =>
        ORDER_OF_ORDERS.findIndex(
          (itme) => itme === prev.icu_chart_order_type,
        ) -
        ORDER_OF_ORDERS.findIndex((itme) => itme === next.icu_chart_order_type),
    )

    setSelectedChartOrders(selectedChartOrders)
  }

  const handleOpenChartPreviewModal = (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.stopPropagation()

    if (setIsDialogOpen) {
      console.log(chartId)
      setIsDialogOpen(true)
      setCopiedChartId(chartId)
      setSelectedTargetDate(targetDate)
      fetchChartOrderList()
    }
  }

  const handleCopyButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()

    setCopiedChartOrder(selectedChartOrders)
    setCopiedChartId(chartId)

    if (register) {
      setIsCopyDialogOpen(true)
      return
    }

    toast({
      title: '차트 복사 완료',
      description: '해당 차트가 클립보드에 복사되었습니다',
    })
  }

  return (
    <div className="relative flex w-full items-center border-b text-sm transition-colors hover:bg-accent hover:text-accent-foreground">
      {rowData.map((data, index) => (
        <span
          key={index}
          className="flex h-10 w-full items-center justify-center font-normal text-foreground"
        >
          {data ?? '없음'}
        </span>
      ))}

      <div className="flex w-full justify-center">
        <Button onClick={handleCopyButtonClick} className="h-6">
          {register ? '선택' : '복사'}
        </Button>
      </div>

      <div className="flex w-full justify-center">
        <Button onClick={handleOpenChartPreviewModal} className="h-6">
          오더 보기
        </Button>
      </div>
    </div>
  )
}
