import { TableCell } from '@/components/ui/table'
import { CELL_COLORS } from '@/constants/hospital/icu/chart/colors'
import { IcuChartOrderJoined } from '@/types/icu'
import { useMemo } from 'react'

const countPendingOrders = (orders: IcuChartOrderJoined[], time: number) => {
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
  const pendingCount = useMemo(
    () => countPendingOrders(orders, time),
    [orders, time],
  )

  return (
    <TableCell
      className="text-center"
      style={{
        backgroundColor:
          pendingCount > 0 ? CELL_COLORS.NOT_DONE : CELL_COLORS.DONE,
      }}
    >
      {pendingCount}
    </TableCell>
  )
}
