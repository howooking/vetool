'use client'

import { TableCell } from '@/components/ui/table'
import { useCreateOrderStore } from '@/lib/store/icu/create-order'
import { cn } from '@/lib/utils'
import type { IcuChartOrderJoined } from '@/types/icu'
import { BORDER_COLOR } from './icu-chart-table'

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
        'hover:cursor-pointer hover:bg-gray-50',
        BORDER_COLOR,
        orderType === 'checklist' && 'bg-red-50',
        orderType === 'fluid' && 'bg-blue-50',
        orderType === 'injection' && 'bg-yellow-50',
        orderType === 'test' && 'bg-orange-50',
        orderType === 'manual' && 'bg-purple-50',
        orderType === 'feed' && 'bg-green-50',
      )}
      onClick={handleDialogOpen}
    >
      <span className="mr-1">{orderName}</span>
      <span className="text-[10px] text-muted-foreground">{orderComment}</span>
    </TableCell>
  )
}
