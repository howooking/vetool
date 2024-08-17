import { TableCell } from '@/components/ui/table'
import { IcuChartOrderJoined } from '@/types/icu'
import { useCallback } from 'react'

export default function TxTableCell({
  time,
  order,
}: {
  time: number
  order: IcuChartOrderJoined
}) {
  const getOrderName = useCallback(
    (order: IcuChartOrderJoined) => {
      if (
        order.icu_chart_order_time[time - 1] === '1' &&
        order[`icu_chart_order_tx_${time}` as keyof IcuChartOrderJoined] ===
          null
      ) {
        return order.icu_chart_order_name
      }
    },
    [time],
  )
  return <TableCell className="text-center">{getOrderName(order)}</TableCell>
}