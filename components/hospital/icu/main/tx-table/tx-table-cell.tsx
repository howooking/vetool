import { TableCell } from '@/components/ui/table'
import { IcuOrders, IcuTxs } from '@/types'
import { useParams, useRouter } from 'next/navigation'

type TxTableCellOrder = Pick<
  IcuOrders,
  | 'icu_chart_order_id'
  | 'icu_chart_order_time'
  | 'icu_chart_order_name'
  | 'icu_chart_order_comment'
> & {
  treatments: Pick<IcuTxs, 'time'>[]
}

export default function TxTableCell({
  time,
  order,
  patientId,
}: {
  time: number
  order: TxTableCellOrder
  patientId: string
}) {
  const { hos_id, target_date } = useParams()
  const { push } = useRouter()
  const isOrderScheduled = (order: TxTableCellOrder, time: number) => {
    return order.icu_chart_order_time[time - 1] === '1'
  }

  const isTxCompleted = (order: TxTableCellOrder, time: number) => {
    return order.treatments.some((tx) => tx.time === time)
  }

  const renderOrderContent = () => {
    if (isTxCompleted(order, time) || isOrderScheduled(order, time)) {
      return (
        <div className="flex flex-col gap-1">
          <span>{order.icu_chart_order_name}</span>
          <span className="text-xs text-muted-foreground">
            {order.icu_chart_order_comment}
          </span>
        </div>
      )
    }

    return null
  }

  const handleCellClick = () => {
    push(`/hospital/${hos_id}/icu/${target_date}/chart/${patientId}`)
  }

  return (
    <TableCell
      onClick={handleCellClick}
      className="cursor-pointer text-center transition-all hover:opacity-60"
    >
      {renderOrderContent()}
    </TableCell>
  )
}
