import ChartBody from '@/components/hospital/icu/main/chart/selected-chart/chart-body/chart-body'
import ChartHeader from '@/components/hospital/icu/main/chart/selected-chart/chart-header/chart-header'
import OutPatientCover from '@/components/hospital/icu/main/chart/selected-chart/out-patient-cover'
import { IcuOrderColors } from '@/types/adimin'
import type {
  IcuChartJoined,
  IcuChartOrderJoined,
  IcuIoJoined,
  IcuUserList,
} from '@/types/icu'
import { useRef } from 'react'

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
  vetsList: IcuUserList[]
  orderColors: IcuOrderColors
}) {
  const captureRef = useRef<HTMLDivElement>(null)
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
        captureRef={captureRef}
        vetsList={vetsList}
        orderColors={orderColors}
        dx={selectedIo.icu_io_dx}
        cc={selectedIo.icu_io_cc}
      />

      <ChartBody
        captureRef={captureRef}
        selectedChart={selectedChart}
        isPatientOut={isPatientOut}
        vetsList={vetsList}
        orderColors={orderColors}
        selectedIo={selectedIo}
        selectedChartOrders={selectedChartOrders}
      />
      {isPatientOut && <OutPatientCover />}
    </div>
  )
}
