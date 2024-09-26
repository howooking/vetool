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
import { cn } from '@/lib/utils'
import { IcuOrderColors } from '@/types/adimin'
import type {
  CopiedOrder,
  IcuChartOrderJoined,
  SelectedIcuOrder,
} from '@/types/icu'

export default function OrderTitle({
  order,
  orderColors,
  preview,
}: {
  order: SelectedIcuOrder
  orderColors: IcuOrderColors
  preview?: boolean
}) {
  const { order_comment, order_name, order_type } = order

  const { toggleModal, setIsEditMode, setChartOrder } = useCreateOrderStore()

  const handleDialogOpen = () => {
    if (preview) return

    toggleModal()
    setIsEditMode(true)
    setChartOrder(order)
  }

  return (
    <TableCell
      className={cn('w-[320px] p-0')}
      style={{
        background: orderColors[order_type as keyof IcuOrderColors],
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
              <span className="truncate">{order_name}</span>
              <span className="min-w-16 truncate text-right text-xs text-muted-foreground">
                {order_comment}
              </span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" className={preview ? 'hidden' : ''}>
            <div className="flex gap-2">
              <span className="font-bold">{order_name}</span>
              <span className="text-xs">{order_comment}</span>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </TableCell>
  )
}
