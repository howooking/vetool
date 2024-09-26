'use client'

import type { SelectedChart } from '@/types/icu'
import HeaderCenter from './header-center/bookmark-and-signalments'
import HeaderRightButtons from './header-right-buttons/header-right-buttons'

export default function ChartHeader({
  chartData,
}: {
  chartData: SelectedChart
}) {
  return (
    <header className="left-0 top-0 w-full md:fixed">
      <HeaderCenter chartData={chartData} />

      <HeaderRightButtons chartData={chartData} />
    </header>
  )
}
