import { TableCell } from '@/components/ui/table'
import { cn } from '@/lib/utils'
import { IcuChartOrderJoined } from '@/types/hospital'
import React from 'react'

export default function IcuChartTableCellTitle({
  chartTx,
  dataType,
}: {
  chartTx: IcuChartOrderJoined
  dataType: string | null
}) {
  const {
    icu_chart_order_name: orderName,
    icu_chart_order_comment: orderComment,
  } = chartTx
  return (
    <TableCell
      className={cn(
        'relative border-b border-black leading-4',
        dataType === 'checklist' && 'bg-red-50', // checklist red-50
        dataType === 'fluid' && 'bg-blue-50', // fluid blue
        dataType === 'feed' && 'bg-green-50', // feed green
        dataType !== 'checklist' && // etc yellow
          dataType !== 'feed' &&
          dataType !== 'fluid' &&
          'bg-yellow-50',
      )}
    >
      <span className="mr-1 text-black">{orderName}</span>
      <span className="text-[10px] text-gray-500">{orderComment}</span>
    </TableCell>
  )
}
