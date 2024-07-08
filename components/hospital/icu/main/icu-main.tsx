'use client'

import { useSelectedMainViewStore } from '@/lib/store/hospital/icu/selected-main-view'
import type { IcuChartJoined, IcuChartOrderJoined, Vet } from '@/types/hospital'
import IcuChart from './chart/icu-chart'
import IcuSummary from './summary/icu-summary'
import { IcuIoPatientJoined } from '@/types/hospital/icu'

export default function IcuMain({
  icuChartData,
  icuChartOrderData,
  vetsData,
  targetDate,
  icuIoData,
}: {
  icuChartData: IcuChartJoined[]
  icuChartOrderData: IcuChartOrderJoined[]
  vetsData: Vet[]
  targetDate: string
  icuIoData: IcuIoPatientJoined[]
}) {
  const { selectIcudMainView } = useSelectedMainViewStore()

  return (
    <div className="w-full">
      {selectIcudMainView === 'summary' && <IcuSummary />}

      {selectIcudMainView === 'chart' && (
        <IcuChart
          vetsData={vetsData}
          icuChartData={icuChartData}
          icuChartOrderData={icuChartOrderData}
          targetDate={targetDate}
          icuIoData={icuIoData}
        />
      )}
    </div>
  )
}
