'use client'

import { useSelectedMainViewStore } from '@/lib/store/icu/selected-main-view'
import type { Vet } from '@/types'
import type { IcuChartJoined, IcuChartOrderJoined } from '@/types/icu'
import IcuChart from './chart/icu-chart'
import IcuSummary from './summary/icu-summary'
import { IcuIoPatientJoined } from '@/types/hospital/icu'

export default function IcuMain({
  userName,
  icuChartData,
  icuChartOrderData,
  vetsData,
  targetDate,
  icuIoData,
}: {
  userName: string
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
          userName={userName}
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
