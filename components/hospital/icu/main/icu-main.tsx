'use client'

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
  const { selectIcudMainView } = useSelectedIcuMainViewStore()

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
function useSelectedIcuMainViewStore(): { selectIcudMainView: any } {
  throw new Error('Function not implemented.')
}
