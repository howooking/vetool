'use client'

import { TableCell } from '@/components/ui/table'
import { useCreateOrderStore } from '@/lib/store/icu/create-order'
import { cn } from '@/lib/utils'
import type { IcuChartOrderJoined } from '@/types/icu'

export default function IcuChartTableCellTitle({
  order,
}: {
  order: IcuChartOrderJoined
}) {
  const {
    icu_chart_order_type: orderType,
    icu_chart_order_name: orderName,
    icu_chart_order_comment: orderComment,
  } = order

  const { toggleModal, setIsEditMode, setChartOrder } = useCreateOrderStore()

  const handleDialogOpen = () => {
    toggleModal()
    setIsEditMode(true)
    setChartOrder(order)
  }

  return (
    <TableCell
      className={cn(
        'flex w-[296px] cursor-pointer items-center justify-between gap-2 transition hover:opacity-70',
        orderType === 'checklist' && 'bg-orange-50',
        orderType === 'fluid' && 'bg-sky-50',
        orderType === 'injection' && 'bg-pink-50',
        orderType === 'test' && 'bg-amber-50',
        orderType === 'manual' && 'bg-indigo-50',
        orderType === 'feed' && 'bg-emerald-50',
      )}
      onClick={handleDialogOpen}
      title={orderComment ?? ''}
    >
      <span className="whitespace-nowrap">{orderName}</span>
      <span className="truncate text-xs text-muted-foreground">
        {orderComment}
      </span>
    </TableCell>
  )
}
