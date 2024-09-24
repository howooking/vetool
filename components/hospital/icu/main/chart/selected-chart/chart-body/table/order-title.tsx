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
import type { CopiedOrder, IcuChartOrderJoined } from '@/types/icu'

export default function OrderTitle({
  order,
  orderColors,
  preview,
}: {
  order: CopiedOrder | IcuChartOrderJoined
  orderColors: IcuOrderColors
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

  const formatOrderName = (name: string, type: string) => {
    if (type === 'injection') {
      const parts = name.split('#')

      if (parts.length > 1) {
        name = parts[0] + '#' + parts[1] + 'ml/kg ' + parts.slice(2).join('#')
      }
    }

    return name.replaceAll('#', ' ')
  }

  const formattedOrderName = formatOrderName(orderName, orderType)

  return (
    <TableCell
      className={cn('w-[320px] p-0')}
      style={{
        background: orderColors[orderType as keyof IcuOrderColors],
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
              <span className="truncate">{formattedOrderName}</span>
              <span className="min-w-16 truncate text-right text-xs text-muted-foreground">
                {orderComment}
              </span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" className={preview ? 'hidden' : ''}>
            <div className="flex gap-2">
              <span className="font-bold">{formattedOrderName}</span>
              <span className="text-xs">{orderComment}</span>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </TableCell>
  )
}
