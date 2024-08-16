'use client'

import { Button } from '@/components/ui/button'
import { TableCell } from '@/components/ui/table'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { DEFAULT_ICU_ORDER_TYPE } from '@/constants/hospital/icu/chart/order'
import { useCreateOrderStore } from '@/lib/store/icu/create-order'
import { cn } from '@/lib/utils'
import type { CopiedOrder, IcuChartOrderJoined } from '@/types/icu'

export default function OrderTitle({
  order,
  preview,
}: {
  order: CopiedOrder | IcuChartOrderJoined
  preview?: boolean
}) {
  const {
    icu_chart_order_type: orderType,
    icu_chart_order_name: orderName,
    icu_chart_order_comment: orderComment,
  } = order

  const { toggleModal, setIsEditMode, setChartOrder } = useCreateOrderStore()

  const handleDialogOpen = () => {
    if (preview) return

    toggleModal()
    setIsEditMode(true)
    setChartOrder(order as IcuChartOrderJoined)
  }

  return (
    <TableCell
      className={cn('w-[320px] p-0')}
      style={{
        background: DEFAULT_ICU_ORDER_TYPE.find(
          (order) => order.value === orderType,
        )?.color,
      }}
    >
      <TooltipProvider delayDuration={20}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              onClick={handleDialogOpen}
              className="flex w-[320px] justify-between rounded-none bg-transparent"
            >
              <span className="truncate">{orderName}</span>
              <span className="min-w-16 truncate text-right text-xs text-muted-foreground">
                {orderComment}
              </span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <div className="flex gap-2">
              <span className="font-bold">{orderName}</span>
              <span className="text-xs">{orderComment}</span>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </TableCell>
  )
}
