import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { TIME } from '@/constants/hospital/icu/chart/time'
import { IcuChartOrderJoined } from '@/types/hospital'
import IcuChartTableCellTitle from './icu-chart-table-cell-title'
import IcuChartTableCellInput from './icu-chat-table-cell-input'
import IcuChartOrderDialog from './icu-chart-order-dialog'

export default function IcuChartTable({
  selectedChartOrders,
}: {
  selectedChartOrders: IcuChartOrderJoined[]
}) {
  // 처치 오더가 존재하는 지에 대해 true/false 반환
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
                chartOrder={orderData}
                dataType={orderData.icu_chart_order_type ?? 'manual'}
              />

              {/* TABLE BODY TIME */}
              {TIME.map((time, index) => (
                <IcuChartTableCellInput
                  hasOrder={hasOrder(orderData, index)}
                  key={time}
                  time={time}
                  icuChartOrderId={orderData.icu_chart_order_id}
                  icuIoId={orderData.icu_io_id.icu_io_id}
                />
              ))}
            </TableRow>
          ))}
          <TableRow className="flex w-[240px] justify-center">
            <TableCell>
              <IcuChartOrderDialog
                chartId={selectedChartOrders[0].icu_chart_id!}
                ioId={selectedChartOrders[0].icu_io_id.icu_io_id!}
              />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}
