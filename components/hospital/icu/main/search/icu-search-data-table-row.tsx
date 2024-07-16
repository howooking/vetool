import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { ORDER_OF_ORDERS } from '@/constants/hospital/icu/chart'
import { selectedChartOrderList } from '@/lib/services/icu/select-chart-list'
import { useIcuSelectedChartStore } from '@/lib/store/icu/icu-selected-chart'
import { IcuChartOrderJoined } from '@/types/icu'
import { ChevronDown } from 'lucide-react'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

export default function IcuSearchDataTableRow({
  name,
  dx,
  cc,
  targetDate,
  chartId,
  setIsDialogOpen,
  onRefClick,
  register,
}: {
  name: string
  dx: string | null
  cc: string | null
  targetDate: string
  chartId: string
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>
  onRefClick?: () => void
  register?: boolean
}) {
  const rowData = [name, dx, cc, targetDate]
  const [selectedChartOrders, setSelectedChartOrders] = useState<
    IcuChartOrderJoined[]
  >([])

  const { setSelectedTargetDate, setSelectedIcuChartId, setCopiedChartOrder } =
    useIcuSelectedChartStore()

  useEffect(() => {
    const fetchChartOrderList = async () => {
      const fetchedChartOrders = await selectedChartOrderList(chartId)

      const selectedChartOrders = fetchedChartOrders.sort(
        (prev, next) =>
          ORDER_OF_ORDERS.findIndex(
            (itme) => itme === prev.icu_chart_order_type,
          ) -
          ORDER_OF_ORDERS.findIndex(
            (itme) => itme === next.icu_chart_order_type,
          ),
      )

      setSelectedChartOrders(selectedChartOrders)
    }

    fetchChartOrderList()
  }, [])

  const handleOpenChartPreviewModal = () => {
    if (setIsDialogOpen) {
      setIsDialogOpen(true)
      setSelectedIcuChartId(chartId)
      setSelectedTargetDate(targetDate)
    }
  }

  const handleCopyButtonClick = () => {
    if (register) {
      return
    }
    setCopiedChartOrder(selectedChartOrders)
    setSelectedIcuChartId(chartId)

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

      {/* Accordion Trigger */}
      {onRefClick && (
        <ChevronDown
          className="absolute right-4 top-2 shrink-0 text-muted-foreground transition-transform duration-200 hover:cursor-pointer"
          size={24}
          onClick={onRefClick}
        />
      )}
    </div>
  )
}
