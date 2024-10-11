'use client'

import LargeLoaderCircle from '@/components/common/large-loader-circle'
import type { SelectedChart } from '@/types/icu/chart'
import type { PatientData } from '@/types/patients'
import { useEffect, useState } from 'react'
import AddChartDialogs from './add-chart-dialogs/add-chart-dialogs'
import Chart from './chart'

export default function ChartEntry({
  chartData,
  patientsData,
}: {
  chartData: SelectedChart
  patientsData: PatientData[]
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
        isFirstChart={false}
        setIsChartLoading={setIsChartLoading}
      />
    )
  }

  // chart가 있고 order가 없는 경우 => 첫날차트
  if (chartData.orders.length === 0) {
    return (
      <AddChartDialogs
        isFirstChart={true}
        chartData={chartData}
        setIsChartLoading={setIsChartLoading}
      />
    )
  }

  return <Chart chartData={chartData} patientsData={patientsData} />
}
