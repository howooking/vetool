import ChartBody from '@/components/hospital/icu/main/chart/selected-chart/chart-body/chart-body'
import type {
  IcuChartJoined,
  IcuChartOrderJoined,
  IcuIoJoined,
  IcuUserList,
} from '@/types/icu'
import type { IcuOrderColors } from '@/types/adimin'
import { Badge } from '@/components/ui/badge'
export default function ExportChartBody({
  selectedIo,
  selectedChart,
  selectedChartOrders,
  isPatientOut,
  vetsList,
  orderColors,
  targetDate,
}: {
  selectedIo: IcuIoJoined
  selectedChart: IcuChartJoined
  selectedChartOrders: IcuChartOrderJoined[]
  vetsList: IcuUserList[]
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
        selectedIo={selectedIo}
        orderColors={orderColors}
        selectedChartOrders={selectedChartOrders}
      />
    </div>
  )
}
