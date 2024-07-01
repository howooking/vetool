'use client'

import { TableCell } from '@/components/ui/table'
import { useCreateOrderStore } from '@/lib/store/hospital/icu/chart/create-order'
import { cn } from '@/lib/utils'
import { IcuChartOrderJoined } from '@/types/hospital'

export default function IcuChartTableCellTitle({
  chartOrder,
  dataType,
}: {
  chartOrder: IcuChartOrderJoined
  dataType: string | null
}) {
  const {
    icu_chart_order_name: orderName,
    icu_chart_order_comment: orderComment,
  } = chartOrder
  const { setIsOpen, setMode, setChartOrder } = useCreateOrderStore()

  const handleDialogOpen = () => {
    setIsOpen()
    setMode('edit')
    setChartOrder(chartOrder)
  }

  return (
    <TableCell
      className={cn(
        'h-full border-b border-black leading-4 hover:cursor-pointer hover:bg-gray-50',
        dataType === 'checklist' && 'bg-red-50', // checklist red-50
        dataType === 'fluid' && 'bg-blue-50', // fluid blue
        dataType === 'feed' && 'bg-green-50', // feed green
        dataType === 'manual' && 'bg-purple-50', // manual green
        dataType !== 'checklist' && // etc yellow
          dataType !== 'feed' &&
          dataType !== 'fluid' &&
          dataType !== 'manual' &&
          'bg-yellow-50',
      )}
      onClick={handleDialogOpen}
    >
      <span className="mr-1 text-black">{orderName}</span>
      <span className="text-[10px] text-gray-500">{orderComment}</span>
    </TableCell>
  )
}
