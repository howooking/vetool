'use client'

import { Button } from '@/components/ui/button'
import CustomTooltip from '@/components/ui/custom-tooltip'
import { TableCell } from '@/components/ui/table'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { useIcuOrderStore } from '@/lib/store/icu/icu-order'
import { cn } from '@/lib/utils'
import { useBasicHosDataContext } from '@/providers/basic-hos-data-context-privider'
import { IcuOrderColors } from '@/types/adimin'
import type { SelectedIcuOrder } from '@/types/icu/chart'

export default function OrderTitle({
  order,
  preview,
}: {
  order: SelectedIcuOrder
  preview?: boolean
}) {
  const { order_comment, order_name, order_type } = order

  const {
    basicHosData: { orderColorsData },
  } = useBasicHosDataContext()

  const { toggleModal, setIsEditMode, setSelectedChartOrder } =
    useIcuOrderStore()

  const handleDialogOpen = () => {
    if (preview) return

    toggleModal()
    setIsEditMode(true)
    setSelectedChartOrder(order)
  }

  return (
    <TableCell
      className={cn('w-[320px] p-0')}
      style={{
        background: orderColorsData[order_type as keyof IcuOrderColors],
      }}
    >
      <CustomTooltip
        contents={
          <div className="flex gap-2">
            <span className="font-bold">{order_name}</span>
            <span className="text-xs">{order_comment}</span>
          </div>
        }
        side="right"
        sideOffset={4}
      >
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
      </CustomTooltip>
    </TableCell>
  )
}
