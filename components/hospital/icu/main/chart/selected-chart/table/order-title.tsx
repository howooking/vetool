'use client'

import { Button } from '@/components/ui/button'
import { TableCell } from '@/components/ui/table'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { useCreateOrderStore } from '@/lib/store/icu/create-order'
import type { Json } from '@/lib/supabase/database.types'
import { cn } from '@/lib/utils'
import type {
  CopiedOrder,
  IcuChartOrderJoined,
  OrderColorProps,
} from '@/types/icu'

export default function OrderTitle({
  order,
  orderColor,
  preview,
}: {
  order: CopiedOrder | IcuChartOrderJoined
  orderColor: Json
  preview?: boolean
}) {
  const {
    icu_chart_order_type: orderType,
    icu_chart_order_name: orderName,
    icu_chart_order_comment: orderComment,
  } = order

  const orderColorJson: { [key: string]: string } =
    orderColor as OrderColorProps

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
        background: orderColorJson[orderType],
      }}
    >
      <TooltipProvider delayDuration={20}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              onClick={handleDialogOpen}
              className={cn(
                'flex w-[320px] justify-between rounded-none bg-transparent px-2',
                preview ? 'cursor-not-allowed' : 'cursor-pointer',
              )}
            >
              <span className="truncate">{orderName}</span>
              <span className="min-w-16 truncate text-right text-xs text-muted-foreground">
                {orderComment}
              </span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" className={preview ? 'hidden' : ''}>
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
