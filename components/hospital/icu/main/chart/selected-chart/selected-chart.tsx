import ChartInfos from '@/components/hospital/icu/main/chart/selected-chart/chart-infos/chart-infos'
import ChartMemos from '@/components/hospital/icu/main/chart/selected-chart/chart-memos/chart-memos'
import ChartTable from '@/components/hospital/icu/main/chart/selected-chart/table/chart-table'
import type {
  IcuChartJoined,
  IcuChartOrderJoined,
  IcuIoJoined,
  Vet,
} from '@/types/icu'
import { useRef } from 'react'
import ChartHeader from './chart-header/chart-header'
import OutPatientCover from './out-patient-cover'
import { IcuOrderColors } from '@/types/adimin'

export default function SelectedChart({
  selectedIo,
  selectedChart,
  selectedChartOrders,
  isFirstChart,
  vetsList,
  orderColors,
}: {
  selectedIo: IcuIoJoined
  selectedChart: IcuChartJoined
  selectedChartOrders: IcuChartOrderJoined[]
  isFirstChart: boolean
  vetsList: Vet[]
  orderColors: IcuOrderColors
}) {
  const pdfRef = useRef<HTMLDivElement>(null)
  const isPatientOut = selectedIo?.out_date !== null
  const { memo_a, memo_b, memo_c, ...restChartData } = selectedChart

  return (
    <div className="relative flex flex-col gap-2 p-2 pb-[48px]">
      <ChartHeader
        isPatientOut={isPatientOut}
        chartData={restChartData}
        icuIoId={selectedIo.icu_io_id}
        ageInDays={selectedIo.age_in_days}
        selectedChartOrders={selectedChartOrders}
        isFirstChart={isFirstChart}
        pdfRef={pdfRef}
        dx={selectedIo.icu_io_dx}
        cc={selectedIo.icu_io_cc}
      />
      <div className="flex flex-col gap-2" ref={pdfRef}>
        <ChartInfos
          vetsList={vetsList}
          selectedIo={selectedIo}
          chartData={restChartData}
          isPatientOut={isPatientOut}
        />

        <ChartTable
          selectedChartOrders={selectedChartOrders}
          orderColors={orderColors}
        />

        <ChartMemos
          memoA={memo_a}
          memoB={memo_b}
          memoC={memo_c}
          icuChartId={selectedChart.icu_chart_id}
          hosIcuMemoNames={selectedIo.hos_id.icu_memo_names}
        />
      </div>
      {isPatientOut && <OutPatientCover />}
    </div>
  )
}
