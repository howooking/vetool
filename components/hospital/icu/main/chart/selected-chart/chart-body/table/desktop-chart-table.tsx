import OrderCells from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/order-cells'
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
import { TIMES } from '@/constants/hospital/icu/chart/time'
import { getDrugs } from '@/lib/services/icu/get-drugs'
import { IcuOrderColors } from '@/types/adimin'
import type {
  CopiedOrder,
  IcuChartOrderJoined,
  SearchedDrugProducts,
} from '@/types/icu'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

type ChartTablePropsPreview = {
  selectedChartOrders: CopiedOrder[] | IcuChartOrderJoined[]
  orderColors: IcuOrderColors
  preview: true
  weight: string
}

type ChartTablePropsNonPreview = {
  selectedChartOrders: IcuChartOrderJoined[]
  orderColors: IcuOrderColors
  preview?: false
  weight: string
}

type ChartTableProps = ChartTablePropsPreview | ChartTablePropsNonPreview

export default function DesktopChartTable({
  selectedChartOrders,
  orderColors,
  preview,
  weight,
}: ChartTableProps) {
  const { hos_id } = useParams()

  const [searchedDrugs, setSearchedDrugs] = useState<SearchedDrugProducts[]>([])

  useEffect(() => {
    getDrugs(hos_id as string).then((data) => {
      setSearchedDrugs(data.map(({ name, mass_vol }) => ({ name, mass_vol })))
    })
  }, [hos_id])

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
                weight={weight}
                searchedDrugs={searchedDrugs}
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
