import IcuChartTableCellTitle from '@/components/hospital/icu/main/chart/selected-chart/table/icu-chart-table-cell-title'
import IcuChartTableCell from '@/components/hospital/icu/main/chart/selected-chart/table/icu-chat-table-cell'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { TIME } from '@/constants/hospital/icu/chart/time'
import { IcuChartTx } from '@/types'
import type { IcuChartOrderJoined } from '@/types/icu'

export default function IcuChartPreviewTable({
  selectedChartOrders,
}: {
  selectedChartOrders: IcuChartOrderJoined[]
}) {
  const hasOrder = (orderData: IcuChartOrderJoined, index: number) => {
    if (orderData.icu_chart_order_time) {
      return orderData.icu_chart_order_time[index] === '1'
    }

    return false
  }

  return (
    <div className="rounded-md">
      <Table className="border border-black">
        {/* TABLE HEADER */}
        <TableHeader>
          <TableRow className="divide-x border-black">
            <TableHead className="h-10 w-[296px] text-center">처치</TableHead>

            {TIME.map((time) => (
              <TableHead className="h-2 border-black text-center" key={time}>
                {time.toString().padStart(2, '0')}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        {/* TABLE BODY */}
        <TableBody>
          {selectedChartOrders?.map((orderData) => (
            <TableRow
              className="divide-x border-black"
              key={orderData.icu_chart_order_id}
            >
              {/* TABLE BODY TITLE */}
              <IcuChartTableCellTitle
                orderData={orderData}
                dataType={orderData.icu_chart_order_type ?? 'manual'}
              />

              {/* TABLE BODY TIME */}
              {TIME.map((time, index) => (
                <IcuChartTableCell
                  key={time}
                  time={time}
                  txData={
                    orderData[`icu_chart_order_tx_${time}`] as IcuChartTx | null
                  }
                  ioId={orderData.icu_io_id.icu_io_id}
                  chartOrderId={orderData.icu_chart_order_id}
                  hasOrder={hasOrder(orderData, index)}
                />
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
