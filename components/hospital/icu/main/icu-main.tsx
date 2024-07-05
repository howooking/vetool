'use client'

import type { IcuChartJoined, IcuChartOrderJoined, Vet } from '@/types/hospital'
import IcuChart from './chart/icu-chart'
import IcuSummary from './summary/icu-summary'
import { useSelectedMainViewStore } from '@/lib/store/hospital/icu/selected-main-view'

export default function IcuMain({
  icuChartData,
  icuChartOrderData,
  vetsData,
}: {
  icuChartData: IcuChartJoined[]
  icuChartOrderData: IcuChartOrderJoined[]
  vetsData: Vet[]
}) {
  const { selectIcudMainView } = useSelectedMainViewStore()

  return (
    <div className="w-full p-2">
      {selectIcudMainView === 'summary' && <IcuSummary />}

      {selectIcudMainView === 'chart' && (
        <IcuChart
          vetsData={vetsData}
          icuChartData={icuChartData}
          icuChartOrderData={icuChartOrderData}
        />
      )}
    </div>
  )
}
