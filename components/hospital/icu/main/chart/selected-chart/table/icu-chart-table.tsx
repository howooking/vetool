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

// export const BORDER_COLOR = 'border-slate-200'

export default function IcuChartTable({
  selectedChartOrders,
  icuUsersData,
}: {
  selectedChartOrders: IcuChartOrderJoined[]
  icuUsersData: IcuUserList[]
}) {
  return (
    <Table className="border">
      <TableHeader className={cn('')}>
        <TableRow className={cn('')}>
          <TableHead className="flex w-[296px] items-center justify-center gap-2 text-center">
            <span>오더 목록</span>
            <IcuChartOrderDialog
              icuIoId={selectedChartOrders[0].icu_io_id.icu_io_id}
              icuChartId={selectedChartOrders[0].icu_chart_id}
            />
          </TableHead>

          {HOURS.map((time) => (
            <TableHead className={cn('border text-center')} key={time}>
              {time.toString().padStart(2, '0')}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody>
        <IcuChartUpsertTxDialog icuUsersData={icuUsersData} />

        {selectedChartOrders.map((order) => (
          <TableRow className={cn('divide-x')} key={order.icu_chart_order_id}>
            <IcuChartTableCellTitle order={order} />

            {HOURS.map((hour, index) => {
              const isDone =
                order.icu_chart_order_time[index] === '1' &&
                order[`icu_chart_order_tx_${hour}`] !== null
              return (
                <IcuChartTableCell
                  key={hour}
                  hour={hour}
                  txData={order[`icu_chart_order_tx_${hour}`]}
                  icuIoId={order.icu_io_id.icu_io_id}
                  IcuChartOrderId={order.icu_chart_order_id}
                  hasOrder={order.icu_chart_order_time[index] === '1'}
                  isDone={isDone}
                />
              )
            })}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
