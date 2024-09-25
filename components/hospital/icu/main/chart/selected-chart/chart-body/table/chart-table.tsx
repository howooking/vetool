import useIsMobile from '@/hooks/use-is-mobile'
import { IcuOrderColors } from '@/types/adimin'
import type { SelectedChart } from '@/types/icu'
import React from 'react'
import DesktopChartTable from './desktop-chart-table'

const ChartTable = React.memo(
  ({
    chartData,
    orderColors,
  }: {
    chartData: SelectedChart
    orderColors: IcuOrderColors
  }) => {
    // if (isMobile)
    //   return (
    //     <MobileChartTable orderColors={orderColors} chartData={chartData} />
    //   )

    return <DesktopChartTable orderColors={orderColors} chartData={chartData} />
  },
)

ChartTable.displayName = 'ChartTable'

export default ChartTable
