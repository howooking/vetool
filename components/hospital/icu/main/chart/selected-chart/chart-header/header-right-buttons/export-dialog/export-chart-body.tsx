import ChartBody from '@/components/hospital/icu/main/chart/selected-chart/chart-body/chart-body'
import type {
  IcuChartJoined,
  IcuChartOrderJoined,
  IcuIoJoined,
  Vet,
} from '@/types/icu'
import type { IcuOrderColors } from '@/types/adimin'
import { Badge } from '@/components/ui/badge'
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
  return (
    <div className="p-4">
      <Badge className="mb-4">{targetDate}</Badge>

      <ChartBody
        selectedChart={selectedChart}
        isPatientOut={isPatientOut}
        vetsList={vetsList}
        orderColors={orderColors}
        selectedIo={selectedIo}
        selectedChartOrders={selectedChartOrders}
      />
    </div>
  )
}
