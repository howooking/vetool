'use client'

import type { SelectedChart } from '@/types/icu'
import HeaderCenter from './header-center/bookmark-and-signalments'

export default function ChartHeader({
  chartData,
}: {
  chartData: SelectedChart
}) {
  return (
    <header className="left-0 top-0 w-full md:fixed">
      <HeaderCenter chartData={chartData} />

      {/* <HeaderRightButtons
        icuChartId={icu_chart_id}
        chartData={chartData}
        captureRef={captureRef}
        isFirstChart={isFirstChart}
        icuIoId={icuIoId}
        name={name}
        isPatientOut={isPatientOut}
        selectedChartOrders={selectedChartOrders}
        vetsList={vetsList}
        orderColors={orderColors}
        dx={dx}
        cc={cc}
      /> */}
    </header>
  )
}
