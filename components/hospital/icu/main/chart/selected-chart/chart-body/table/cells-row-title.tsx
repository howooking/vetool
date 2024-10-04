'use client'

import { Button } from '@/components/ui/button'
import { TableCell } from '@/components/ui/table'
import { useIcuOrderStore } from '@/lib/store/icu/icu-order'
import { cn } from '@/lib/utils'
import { useBasicHosDataContext } from '@/providers/basic-hos-data-context-privider'
import { IcuOrderColors } from '@/types/adimin'
import type { SelectedIcuOrder } from '@/types/icu/chart'

export default function CellsRowTitle({
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

  const { setStep, setIsEditMode, setSelectedChartOrder } = useIcuOrderStore()

  const handleEditOrderDialogOpen = () => {
    if (preview) return
    setStep('upsert')
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
      <Button
        variant="ghost"
        onClick={handleEditOrderDialogOpen}
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
    </TableCell>
  )
}
