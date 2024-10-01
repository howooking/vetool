import CustomTooltip from '@/components/ui/custom-tooltip'
import { TableCell } from '@/components/ui/table'
import { IcuOrders, IcuTxs } from '@/types'
import { useParams, useRouter, useSearchParams } from 'next/navigation'

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
  patientName,
}: {
  time: number
  order: TxTableCellOrder
  patientId: string
  patientName: string
}) {
  const { hos_id, target_date } = useParams()
  const { push } = useRouter()
  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams)

  const isOrderScheduled = (order: TxTableCellOrder, time: number) => {
    return order.icu_chart_order_time[time - 1] === '1'
  }

  const isTxCompleted = (order: TxTableCellOrder, time: number) => {
    return order.treatments.some((tx) => tx.time === time)
  }

  const renderOrderContent = () => {
    if (!isTxCompleted(order, time) && isOrderScheduled(order, time)) {
      return (
        <div className="flex flex-col whitespace-nowrap py-4">
          <span className="text-sm">{order.icu_chart_order_name}</span>
          <span className="text-xs text-muted-foreground">
            {order.icu_chart_order_comment}
          </span>
        </div>
      )
    }
  }

  const handleCellClick = () => {
    push(
      `/hospital/${hos_id}/icu/${target_date}/chart/${patientId}?order-id=${order.icu_chart_order_id}&time=${time}&${params}`,
    )
  }

  return (
    <TableCell
      onClick={handleCellClick}
      className="cursor-pointer text-center ring-inset ring-primary transition-all hover:ring"
    >
      <CustomTooltip
        contents={
          <>
            {patientName} / {time}
          </>
        }
      >
        {renderOrderContent()}
      </CustomTooltip>
    </TableCell>
  )
}
