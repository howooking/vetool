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
  icuIoData,
  icuChartOrderData,
  icuUsersData,
}: {
  icuChartData: IcuChartJoined[]
  icuIoData: IcuIoPatientJoined[]
  icuChartOrderData: IcuChartOrderJoined[]
  icuUsersData: IcuUserList[]
}) {
  const { selectIcudMainView } = useSelectedMainViewStore()

  return (
    <div className="w-full">
      {selectIcudMainView === 'summary' && <IcuSummary />}

      {selectIcudMainView === 'chart' && (
        <IcuChart
          icuChartData={icuChartData}
          icuChartOrderData={icuChartOrderData}
          icuIoData={icuIoData}
          icuUsersData={icuUsersData}
        />
      )}

      {selectIcudMainView === 'search' && <IcuChartSearch />}
    </div>
  )
}
