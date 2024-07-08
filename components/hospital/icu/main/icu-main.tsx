'use client'

import { useSelectedMainViewStore } from '@/lib/store/icu/selected-main-view'
import type { Vet } from '@/types'
import type { IcuChartJoined, IcuChartOrderJoined } from '@/types/icu'
import IcuChart from './chart/icu-chart'
import IcuSummary from './summary/icu-summary'

export default function IcuMain({
  userName,
  icuChartData,
  icuChartOrderData,
  vetsData,
}: {
  userName: string
  icuChartData: IcuChartJoined[]
  icuChartOrderData: IcuChartOrderJoined[]
  vetsData: Vet[]
}) {
  const { selectIcudMainView } = useSelectedMainViewStore()

  return (
    <div className="w-full">
      {selectIcudMainView === 'summary' && <IcuSummary />}

      {selectIcudMainView === 'chart' && (
        <IcuChart
          userName={userName}
          vetsData={vetsData}
          icuChartData={icuChartData}
          icuChartOrderData={icuChartOrderData}
        />
      )}
    </div>
  )
}
