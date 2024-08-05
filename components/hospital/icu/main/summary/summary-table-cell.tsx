import { TableCell } from '@/components/ui/table'
import { cn } from '@/lib/utils'
import { IcuChartOrderJoined } from '@/types/icu'
import { useMemo } from 'react'

export const countPendingOrders = (
  orders: IcuChartOrderJoined[],
  time: number,
) => {
  return orders.filter((order) => {
    const orderTime = order.icu_chart_order_time[time - 1]
    const orderTx =
      order[`icu_chart_order_tx_${time}` as keyof IcuChartOrderJoined]
    return orderTime === '1' && orderTx === null
  }).length
}

export default function SummaryTableCell({
  time,
  orders,
}: {
  time: number
  orders: IcuChartOrderJoined[]
}) {
  const count = useMemo(() => countPendingOrders(orders, time), [orders, time])

  return (
    <TableCell
      className={cn(
        count > 0 ? 'bg-rose-100/60' : 'bg-green-100/60',
        'text-center',
      )}
    >
      <span>{count}</span>
    </TableCell>
  )
}
