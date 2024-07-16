'use client'

import IcuChart from '@/components/hospital/icu/main/chart/icu-chart'
import IcuChartSearch from '@/components/hospital/icu/main/search/icu-chart-search'
import IcuSummary from '@/components/hospital/icu/main/summary/icu-summary'
import { useSelectedMainViewStore } from '@/lib/store/icu/selected-main-view'
import type {
  IcuChartJoined,
  IcuChartOrderJoined,
  IcuIoPatientJoined,
  IcuUserList,
} from '@/types/icu'

export default function IcuMain({
  icuChartData,
  icuChartOrderData,
  icuUsersData,
  targetDate,
  icuIoData,
}: {
  icuChartData: IcuChartJoined[]
  icuChartOrderData: IcuChartOrderJoined[]
  icuUsersData: IcuUserList[]
  targetDate: string
  icuIoData: IcuIoPatientJoined[]
}) {
  const { selectIcudMainView } = useSelectedMainViewStore()

  return (
    <div className="w-full">
      {selectIcudMainView === 'summary' && <IcuSummary />}

      {selectIcudMainView === 'chart' && (
        <IcuChart
          icuUsersData={icuUsersData}
          icuChartData={icuChartData}
          icuChartOrderData={icuChartOrderData}
          targetDate={targetDate}
          icuIoData={icuIoData}
        />
      )}

      {selectIcudMainView === 'search' && <IcuChartSearch />}
    </div>
  )
}
