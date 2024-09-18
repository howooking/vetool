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
import { IcuOrderColors } from '@/types/adimin'
import type { CopiedOrder, IcuChartOrderJoined } from '@/types/icu'
import OrderCells from './order-cells'

type ChartTablePropsPreview = {
  selectedChartOrders: CopiedOrder[] | IcuChartOrderJoined[]
  orderColors: IcuOrderColors
  preview: true
}

type ChartTablePropsNonPreview = {
  selectedChartOrders: IcuChartOrderJoined[]
  orderColors: IcuOrderColors
  preview?: false
}

type ChartTableProps = ChartTablePropsPreview | ChartTablePropsNonPreview

export default function DesktopChartTable({
  selectedChartOrders,
  orderColors,
  preview,
}: ChartTableProps) {
  return (
    <Table className="border">
      <TableHeader>
        <TableRow>
          <TableHead className="relative flex w-[320px] items-center justify-center gap-2 text-center">
            <span>오더 목록</span>
            {!preview && (
              <OrderDialog
                icuIoId={selectedChartOrders[0].icu_io_id.icu_io_id}
                icuChartId={selectedChartOrders[0].icu_chart_id.icu_chart_id}
              />
            )}
          </TableHead>

          {TIMES.map((time) => (
            <TableHead className="border text-center" key={time}>
              {time.toString().padStart(2, '0')}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody>
        {!preview && (
          <TxUpsertDialog
            chartId={selectedChartOrders[0].icu_chart_id.icu_chart_id}
          />
        )}

        {selectedChartOrders.map((order) => (
          <TableRow className="divide-x" key={order.icu_chart_order_id}>
            <OrderTitle
              order={order}
              preview={preview}
              orderColors={orderColors}
            />
            <OrderCells preview={preview} order={order} />
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
