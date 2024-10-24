'use client'

import LargeLoaderCircle from '@/components/common/large-loader-circle'
import AddChartDialogs from '@/components/hospital/icu/main/chart/add-chart-dialogs/add-chart-dialogs'
import Chart from '@/components/hospital/icu/main/chart/chart'
import type { SelectedChart } from '@/types/icu/chart'
import { useEffect, useState } from 'react'

export default function ChartEntry({
  chartData,
}: {
  chartData: SelectedChart
}) {
  const [isChartLoading, setIsChartLoading] = useState(false)

  useEffect(() => {
    setIsChartLoading(false)
  }, [chartData])

  if (isChartLoading) {
    return <LargeLoaderCircle className="h-icu-chart" />
  }

  // chart가 없는 경우 => 첫날 차트가 아님
  if (!chartData) {
    return (
      <AddChartDialogs
        chartData={chartData}
        setIsChartLoading={setIsChartLoading}
      />
    )
  }

  // chart가 있고 order가 없는 경우 => 첫날차트
  if (chartData.orders.length === 0) {
    return (
      <AddChartDialogs
        isFirstChart
        chartData={chartData}
        setIsChartLoading={setIsChartLoading}
      />
    )
  }

  return <Chart chartData={chartData} />
}
