import IcuChartTableCellTitle from '@/components/hospital/icu/main/chart/selected-chart/table/icu-chart-table-cell-title'
import IcuChartTableCell from '@/components/hospital/icu/main/chart/selected-chart/table/icu-chat-table-cell'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { TIMES } from '@/constants/hospital/icu/chart/time'
import type { IcuChartOrderJoined } from '@/types/icu'

export default function IcuChartPreviewTable({
  selectedChartOrders,
}: {
  selectedChartOrders: IcuChartOrderJoined[]
}) {
  return (
    <div className="rounded-md">
      <Table className="border border-black">
        {/* TABLE HEADER */}
        <TableHeader>
          <TableRow className="divide-x border-black">
            <TableHead className="h-10 w-[296px] text-center">처치</TableHead>

            {TIMES.map((time) => (
              <TableHead className="h-2 border-black text-center" key={time}>
                {time.toString().padStart(2, '0')}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        {/* TABLE BODY */}
        <TableBody>
          {selectedChartOrders?.map((order) => (
            <TableRow
              className="divide-x border-black"
              key={order.icu_chart_order_id}
            >
              {/* TABLE BODY TITLE */}
              <IcuChartTableCellTitle order={order} />

              {/* TABLE BODY TIME */}
              {TIMES.map((time, index) => {
                const isDone =
                  order.icu_chart_order_time[index] === '1' &&
                  order[`icu_chart_order_tx_${time}`] !== null
                return (
                  <IcuChartTableCell
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
    </div>
  )
}
