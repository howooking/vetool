import useIsMobile from '@/hooks/use-is-mobile'
import { IcuOrderColors } from '@/types/adimin'
import type { IcuChartOrderJoined } from '@/types/icu'
import DesktopChartTable from './desktop-chart-table'
import MobileChartTable from './mobile-chart-table'
import React from 'react'

const ChartTable = React.memo(
  ({
    selectedChartOrders,
    orderColors,
  }: {
    selectedChartOrders: IcuChartOrderJoined[]
    orderColors: IcuOrderColors
  }) => {
    const isMobile = useIsMobile()

    if (isMobile)
      return (
        <MobileChartTable
          orderColors={orderColors}
          selectedChartOrders={selectedChartOrders}
        />
      )

    return (
      <DesktopChartTable
        orderColors={orderColors}
        selectedChartOrders={selectedChartOrders}
      />
    )
  },
)

ChartTable.displayName = 'ChartTable'

export default ChartTable
