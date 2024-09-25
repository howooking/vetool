import DesktopChartTable from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/desktop-chart-table'
import MobileChartTable from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/mobile-chart-table'
import useIsMobile from '@/hooks/use-is-mobile'
import { IcuOrderColors } from '@/types/adimin'
import type { IcuChartOrderJoined } from '@/types/icu'
import React from 'react'

const ChartTable = React.memo(
  ({
    selectedChartOrders,
    orderColors,
    weight,
    species,
  }: {
    selectedChartOrders: IcuChartOrderJoined[]
    orderColors: IcuOrderColors
    weight: string
    species: string
  }) => {
    const isMobile = useIsMobile()

    if (isMobile)
      return (
        <MobileChartTable
          orderColors={orderColors}
          selectedChartOrders={selectedChartOrders}
          weight={weight}
          species={species}
        />
      )

    return (
      <DesktopChartTable
        orderColors={orderColors}
        selectedChartOrders={selectedChartOrders}
        weight={weight}
        species={species}
      />
    )
  },
)

ChartTable.displayName = 'ChartTable'

export default ChartTable
