import IcuChartOrderDialog from '@/components/hospital/icu/main/chart/selected-chart/table/icu-chart-order-dialog'
import IcuChartTableCellTitle from '@/components/hospital/icu/main/chart/selected-chart/table/icu-chart-table-cell-title'
import IcuChartTableCell from '@/components/hospital/icu/main/chart/selected-chart/table/icu-chat-table-cell'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { HOURS } from '@/constants/hospital/icu/chart/time'
import { cn } from '@/lib/utils'
import { IcuChartTx } from '@/types'
import type { IcuChartOrderJoined, IcuUserList } from '@/types/icu'
import IcuChartUpsertTxDialog from './tx/icu-chart-upsert-tx-dialog'

export const BORDER_COLOR = 'border-slate-400'

export default function IcuChartTable({
  selectedChartOrders,
  icuUsersData,
}: {
  selectedChartOrders: IcuChartOrderJoined[]
  icuUsersData: IcuUserList[]
}) {
  // 처치 오더가 존재하는 지에 대해 true/false 반환
  const hasOrder = (orderData: IcuChartOrderJoined, index: number) => {
    if (orderData.icu_chart_order_time) {
      return orderData.icu_chart_order_time[index] === '1'
    }
    return false
  }

  return (
    <Table className={cn('border', BORDER_COLOR)}>
      <TableHeader>
        <TableRow className={cn(BORDER_COLOR)}>
          <TableHead className="flex w-[296px] items-center justify-center gap-2 text-center">
            <span>오더 목록</span>
            <IcuChartOrderDialog
              icuIoId={selectedChartOrders[0].icu_io_id.icu_io_id}
              icuChartId={selectedChartOrders[0].icu_chart_id}
            />
          </TableHead>

          {HOURS.map((time) => (
            <TableHead
              className={cn('border-l text-center', BORDER_COLOR)}
              key={time}
            >
              {time.toString().padStart(2, '0')}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody>
        <IcuChartUpsertTxDialog icuUsersData={icuUsersData} />

        {selectedChartOrders.map((order) => (
          <TableRow
            // todo divide x
            className={cn('divide-x', BORDER_COLOR)}
            key={order.icu_chart_order_id}
          >
            <IcuChartTableCellTitle order={order} />

            {HOURS.map((time, index) => (
              <IcuChartTableCell
                key={time}
                time={time}
                txData={
                  order[`icu_chart_order_tx_${time}`] as IcuChartTx | null
                }
                ioId={order.icu_io_id.icu_io_id}
                chartOrderId={order.icu_chart_order_id}
                hasOrder={hasOrder(order, index)}
              />
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
