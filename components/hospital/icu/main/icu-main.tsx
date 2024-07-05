'use client'

import { useIcuMainViewStore } from '@/lib/store/hospital/icu/icu-main-view'
import type { IcuChartJoined, IcuChartOrderJoined, Vet } from '@/types/hospital'
import IcuChart from './chart/icu-chart'
import IcuSummary from './summary/icu-summary'

export default function IcuMain({
  icuChartData,
  icuChartOrderData,
  vetsData,
}: {
  icuChartData: IcuChartJoined[]
  icuChartOrderData: IcuChartOrderJoined[]
  vetsData: Vet[]
}) {
  const { selectIcudMainView } = useIcuMainViewStore()

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
