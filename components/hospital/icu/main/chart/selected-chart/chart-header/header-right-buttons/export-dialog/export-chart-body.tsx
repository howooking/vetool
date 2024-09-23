import ChartBody from '@/components/hospital/icu/main/chart/selected-chart/chart-body/chart-body'
import type {
  IcuChartJoined,
  IcuChartOrderJoined,
  IcuIoJoined,
  Vet,
} from '@/types/icu'
import type { IcuOrderColors } from '@/types/adimin'
import { Badge } from '@/components/ui/badge'
import { useMemo } from 'react'
import { DEFAULT_ICU_ORDER_TYPE } from '@/constants/hospital/icu/chart/order'
export default function ExportChartBody({
  selectedChart,
  isPatientOut,
  vetsList,
  selectedIo,
  orderColors,
  selectedChartOrders,
  targetDate,
}: {
  selectedIo: IcuIoJoined
  selectedChart: IcuChartJoined
  selectedChartOrders: IcuChartOrderJoined[]
  vetsList: Vet[]
  orderColors: IcuOrderColors
  isPatientOut: boolean
  targetDate: string
}) {
  const sortedChartOrders = useMemo(
    () =>
      selectedChartOrders
        .filter(
          (order) =>
            order.icu_chart_id.icu_chart_id === selectedChart?.icu_chart_id,
        )
        .sort(
          (prev, next) =>
            DEFAULT_ICU_ORDER_TYPE.map((order) => order.value).findIndex(
              (order) => order === prev.icu_chart_order_type,
            ) -
            DEFAULT_ICU_ORDER_TYPE.map((order) => order.value).findIndex(
              (order) => order === next.icu_chart_order_type,
            ),
        ),
    [selectedChart?.icu_chart_id, selectedChartOrders],
  )

  return (
    <div className="p-4">
      <Badge className="mb-4">{targetDate}</Badge>

      <ChartBody
        selectedChart={selectedChart}
        isPatientOut={isPatientOut}
        vetsList={vetsList}
        orderColors={orderColors}
        selectedIo={selectedIo}
        selectedChartOrders={sortedChartOrders}
      />
    </div>
  )
}
