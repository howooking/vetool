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
  const getOrder = useCallback(
    (order: IcuChartOrderJoined) => {
      if (
        order.icu_chart_order_time[time - 1] === '1' &&
        order[`icu_chart_order_tx_${time}` as keyof IcuChartOrderJoined] ===
          null
      ) {
        return (
          <div className="flex flex-col gap-1">
            <span>{order.icu_chart_order_name}</span>
            <span className="text-xs text-muted-foreground">
              {order.icu_chart_order_comment}
            </span>
          </div>
        )
      }
    },
    [time],
  )
  return <TableCell className="text-center">{getOrder(order)}</TableCell>
}
