import IcuChartTableCellInput from '@/components/hospital/icu/chart/table//icu-chat-table-cell-input'
import IcuChartTableCellTitle from '@/components/hospital/icu/chart/table/icu-chart-table-cell-title'
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
import IcuChartCreateOrderDialog from './icu-chart-create-order-dialog'

export default function IcuChartTable({
  chartOrderData,
}: {
  chartOrderData: IcuChartOrderJoined[]
}) {
  // 처치 오더가 존재하는 지에 대해 true/false 반환
  const getHasOrder = (orderData: IcuChartOrderJoined, index: number) => {
    if (orderData.icu_chart_order_time) {
      orderData.icu_chart_order_time[index] === '1' ? true : false
    }

    return false
  }

  return (
    <div className="rounded-md border-black bg-white p-4">
      <Table className="border border-black">
        {/* TABLE HEADER */}
        <TableHeader>
          <TableRow className="divide-x border-black">
            <TableHead className="h-10 w-[240px] text-center">처치</TableHead>

            {TIME.map((time) => (
              <TableHead className="h-2 border-black text-center" key={time}>
                {time.toString().padStart(2, '0')}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        {/* TABLE BODY */}
        <TableBody>
          {chartOrderData?.map((orderData) => (
            <TableRow
              className="divide-x border-black"
              key={orderData.icu_chart_order_id}
            >
              {/* TABLE BODY TITLE */}
              <IcuChartTableCellTitle
                chartTx={orderData}
                dataType={orderData.icu_chart_order_type ?? '이름'}
              />

              {/* TABLE BODY TIME */}
              {TIME.map((time, index) => (
                <IcuChartTableCellInput
                  hasOrder={getHasOrder(orderData, index)}
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
              <IcuChartCreateOrderDialog />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}