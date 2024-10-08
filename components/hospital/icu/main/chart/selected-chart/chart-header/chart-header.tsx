'use client'

import HeaderCenter from '@/components/hospital/icu/main/chart/selected-chart/chart-header/header-center/bookmark-and-signalments'
import HeaderRightButtons from '@/components/hospital/icu/main/chart/selected-chart/chart-header/header-right-buttons/header-right-buttons'
import type { SelectedChart } from '@/types/icu/chart'
import type { PatientData } from '@/types/patients'

export default function ChartHeader({
  chartData,
  patientsData,
}: {
  chartData: SelectedChart
  patientsData: PatientData[]
}) {
  return (
    <header className="left-0 top-0 w-full md:fixed">
      <HeaderCenter chartData={chartData} patientsData={patientsData} />

      <HeaderRightButtons chartData={chartData} />
    </header>
  )
}
