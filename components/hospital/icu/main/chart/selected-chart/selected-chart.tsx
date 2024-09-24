import ChartBody from '@/components/hospital/icu/main/chart/selected-chart/chart-body/chart-body'
import ChartHeader from '@/components/hospital/icu/main/chart/selected-chart/chart-header/chart-header'
import OutPatientCover from '@/components/hospital/icu/main/chart/selected-chart/out-patient-cover'
import { IcuOrderColors } from '@/types/adimin'
import type {
  IcuChartJoined,
  IcuChartOrderJoined,
  IcuIoJoined,
  Vet,
} from '@/types/icu'
import { useRef } from 'react'
import React from 'react'

const SelectedChart = React.memo(
  ({
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
  }) => {
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
          dx={selectedIo.icu_io_dx}
          cc={selectedIo.icu_io_cc}
          vetsList={vetsList}
          orderColors={orderColors}
        />
        <ChartBody
          selectedChart={selectedChart}
          captureRef={captureRef}
          isPatientOut={isPatientOut}
          vetsList={vetsList}
          selectedIo={selectedIo}
          orderColors={orderColors}
          selectedChartOrders={selectedChartOrders}
        />
        {isPatientOut && <OutPatientCover />}
      </div>
    )
  },
)

SelectedChart.displayName = 'SelectedChart'

export default SelectedChart
