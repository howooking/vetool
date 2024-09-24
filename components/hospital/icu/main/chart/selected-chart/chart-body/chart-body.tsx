import ChartInfos from '@/components/hospital/icu/main/chart/selected-chart/chart-body/chart-infos/chart-infos'
import ChartMemos from '@/components/hospital/icu/main/chart/selected-chart/chart-body/chart-memos/chart-memos'
import ChartTable from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/chart-table'
import { IcuOrderColors } from '@/types/adimin'
import type {
  IcuChartJoined,
  IcuChartOrderJoined,
  IcuIoJoined,
  Vet,
} from '@/types/icu'
import { RefObject } from 'react'

export default function ChartBody({
  selectedChart,
  isPatientOut,
  vetsList,
  selectedIo,
  orderColors,
  selectedChartOrders,
  captureRef,
}: {
  selectedChart: IcuChartJoined
  isPatientOut: boolean
  vetsList: Vet[]
  selectedIo: IcuIoJoined
  orderColors: IcuOrderColors
  selectedChartOrders: IcuChartOrderJoined[]
  captureRef?: RefObject<HTMLDivElement>
}) {
  const { memo_a, memo_b, memo_c, ...restChartData } = selectedChart

  return (
    <div className="flex flex-col gap-2" ref={captureRef}>
      <ChartInfos
        vetsList={vetsList}
        selectedIo={selectedIo}
        chartData={restChartData}
        isPatientOut={isPatientOut}
      />

      <ChartTable
        selectedChartOrders={selectedChartOrders}
        orderColors={orderColors}
        weight={restChartData.weight}
      />

      <ChartMemos
        memoA={memo_a}
        memoB={memo_b}
        memoC={memo_c}
        icuChartId={selectedChart.icu_chart_id}
        hosIcuMemoNames={selectedIo.hos_id.icu_memo_names}
      />
    </div>
  )
}
