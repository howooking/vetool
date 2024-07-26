import IcuChartTableCell from '@/components/hospital/icu/main/chart/selected-chart/table/chart-table-cell'
import OrderDialog from '@/components/hospital/icu/main/chart/selected-chart/table/order-dialog'
import OrderTitle from '@/components/hospital/icu/main/chart/selected-chart/table/order-title'
import TxUpsertDialog from '@/components/hospital/icu/main/chart/selected-chart/table/tx/tx-upsert-dialog'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { TIMES } from '@/constants/hospital/icu/chart/time'
import { cn } from '@/lib/utils'
import type { IcuChartOrderJoined } from '@/types/icu'

export default function ChartTable({
  selectedChartOrders,
  preview,
}: {
  selectedChartOrders: IcuChartOrderJoined[]
  preview?: boolean
}) {
  return (
    <Table className="border">
      <TableHeader>
        <TableRow>
          <TableHead className="flex w-[296px] items-center justify-center gap-2 text-center">
            <span>오더 목록</span>
            {!preview && (
              <OrderDialog
                icuIoId={selectedChartOrders[0].icu_io_id.icu_io_id}
                icuChartId={selectedChartOrders[0].icu_chart_id.icu_chart_id}
              />
            )}
          </TableHead>

          {TIMES.map((time) => (
            <TableHead className={cn('border text-center')} key={time}>
              {time.toString().padStart(2, '0')}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody>
        {!preview && <TxUpsertDialog />}

        {selectedChartOrders.map((order) => (
          <TableRow className={cn('divide-x')} key={order.icu_chart_order_id}>
            <OrderTitle order={order} preview={preview} />

            {TIMES.map((time, index) => {
              const isDone =
                !preview &&
                order.icu_chart_order_time[index] === '1' &&
                order[`icu_chart_order_tx_${time}`] !== null
              return (
                <IcuChartTableCell
                  preview={preview}
                  key={time}
                  time={time}
                  txData={order[`icu_chart_order_tx_${time}`]}
                  icuIoId={order.icu_io_id.icu_io_id}
                  icuChartOrderId={order.icu_chart_order_id}
                  hasOrder={order.icu_chart_order_time[index] === '1'}
                  isDone={isDone}
                  icuChartTxId={
                    order[`icu_chart_order_tx_${time}`]?.icu_chart_tx_id
                  }
                />
              )
            })}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
