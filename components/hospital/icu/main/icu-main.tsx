'use client'

import { useSelectedMainViewStore } from '@/lib/store/icu/selected-main-view'
import type {
  IcuChartJoined,
  IcuChartOrderJoined,
  IcuIoPatientJoined,
  IcuVetList,
} from '@/types/icu'
import IcuChart from './chart/icu-chart'
import IcuSummary from './summary/icu-summary'

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
  vetsData: IcuVetList[]
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
