import ChartInfos from '@/components/hospital/icu/main/chart/selected-chart/chart-infos/chart-infos'
import ChartMemos from '@/components/hospital/icu/main/chart/selected-chart/chart-memos/chart-memos'
import ChartTable from '@/components/hospital/icu/main/chart/selected-chart/table/chart-table'
import type {
  IcuChartJoined,
  IcuChartOrderJoined,
  IcuIoPatientJoined,
} from '@/types/icu'

import { useRef } from 'react'
import ChartHeader from './chart-header/chart-header'

export default function SelectedChart({
  selectedIo,
  selectedChart,
  selectedChartOrders,
  isPatientOut,
  isFirstChart,
}: {
  selectedIo: IcuIoPatientJoined
  selectedChart: IcuChartJoined
  selectedChartOrders: IcuChartOrderJoined[]
  isPatientOut: boolean
  isFirstChart: boolean
}) {
  const pdfRef = useRef<HTMLDivElement>(null)
  const { memo_a, memo_b, memo_c, ...restChartData } = selectedChart

  return (
    <div
      className="flex flex-col gap-2 overflow-auto p-2 pb-[48px]"
      ref={pdfRef}
    >
      <ChartHeader
        isPatientOut={isPatientOut}
        chartData={restChartData}
        icuIoId={selectedIo.icu_io_id}
        ageInDays={selectedIo.age_in_days}
        selectedChartOrders={selectedChartOrders}
        isFirstChart={isFirstChart}
        pdfRef={pdfRef}
      />

      <ChartInfos
        selectedIo={selectedIo}
        chartData={restChartData}
        isPatientOut={isPatientOut}
      />

      <ChartTable selectedChartOrders={selectedChartOrders} />

      <ChartMemos
        memoA={memo_a}
        memoB={memo_b}
        memoC={memo_c}
        icuChartId={selectedChart.icu_chart_id}
        hosIcuMemoNames={selectedChart.hos_id.icu_memo_names}
      />
    </div>
  )
}
