import OrderDialog from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/order-dialog'
import OrderTitle from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/order-title'
import TxUpsertDialog from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/tx/tx-upsert-dialog'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { DEFAULT_ICU_ORDER_TYPE } from '@/constants/hospital/icu/chart/order'
import { TIMES } from '@/constants/hospital/icu/chart/time'
import { IcuOrderColors } from '@/types/adimin'
import type { SelectedChart } from '@/types/icu'
import { useMemo } from 'react'
import OrderCells from './order-cells'

type ChartTablePropsPreview = {
  chartData: SelectedChart
  orderColors: IcuOrderColors
  preview: true
}

type ChartTablePropsNonPreview = {
  chartData: SelectedChart
  orderColors: IcuOrderColors
  preview?: false
}

type ChartTableProps = ChartTablePropsPreview | ChartTablePropsNonPreview

export default function ChartTable({
  chartData,
  orderColors,
  preview,
}: ChartTableProps) {
  const { icu_io, icu_chart_id, orders } = chartData

  const sortedOrders = useMemo(
    () =>
      orders
        .sort((prev, next) => prev.order_name.localeCompare(next.order_name))
        .sort(
          (prev, next) =>
            DEFAULT_ICU_ORDER_TYPE.map((order) => order.value).findIndex(
              (order) => order === prev.order_type,
            ) -
            DEFAULT_ICU_ORDER_TYPE.map((order) => order.value).findIndex(
              (order) => order === next.order_type,
            ),
        ),
    [orders],
  )

  return (
    <Table className="border">
      <TableHeader>
        <TableRow>
          <TableHead className="relative flex w-[320px] items-center justify-center gap-2 text-center">
            <span>오더 목록</span>
            {!preview && <OrderDialog icuChartId={icu_chart_id} />}
          </TableHead>

          {TIMES.map((time) => (
            <TableHead className="border text-center" key={time}>
              {time.toString().padStart(2, '0')}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody>
        {!preview && <TxUpsertDialog chartId={icu_chart_id} />}

        {sortedOrders.map((order) => (
          <TableRow className="divide-x" key={order.order_id}>
            <OrderTitle
              order={order}
              preview={preview}
              orderColors={orderColors}
            />
            <OrderCells
              preview={preview}
              order={order}
              icuIoId={icu_io.icu_io_id}
            />
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
