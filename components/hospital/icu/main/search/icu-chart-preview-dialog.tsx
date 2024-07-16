import IcuChartPreviewTable from '@/components/hospital/icu/main/search/icu-chart-preview-table'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { selectedChartOrderList } from '@/lib/services/icu/select-chart-list'
import type { IcuChartOrderJoined } from '@/types/icu'
import { useEffect, useState } from 'react'
import { IcuChartPreviewSkeleton } from './icu-chart-preview-skeleton'
import { toast } from '@/components/ui/use-toast'
import { useCopiedChartOrderStore } from '@/lib/store/icu/copied-chart-order'

const ORDER_OF_ORDERS = [
  'checklist',
  'fluid',
  'injection',
  'test',
  'manual',
  'feed',
] as const

export default function IcuChartPreviewDialog({
  open,
  onOpenChange,
  chartId,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  chartId: string
}) {
  const { setCopiedChartOrder } = useCopiedChartOrderStore()
  const [isLoading, setIsLoading] = useState(false)
  const [selectedChartOrders, setSelectedChartOrders] = useState<
    IcuChartOrderJoined[]
  >([])

  useEffect(() => {
    setIsLoading(true)

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

      setIsLoading(false)
    }

    fetchChartOrderList()
  }, [])

  const handleCopyButtonClick = () => {
    setCopiedChartOrder(selectedChartOrders)
    onOpenChange(false)

    toast({
      title: '차트 복사 완료',
      description: '해당 차트가 클립보드에 복사되었습니다',
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:min-w-[1200px]">
        <DialogHeader>
          <DialogTitle>차트 미리보기</DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <IcuChartPreviewSkeleton />
        ) : (
          <IcuChartPreviewTable selectedChartOrders={selectedChartOrders} />
        )}

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              닫기
            </Button>
          </DialogClose>
          <Button type="submit" onClick={handleCopyButtonClick}>
            차트 복사
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
