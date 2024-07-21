'use client'

import IcuChart from '@/components/hospital/icu/main/chart/icu-chart'
import IcuChartSearch from '@/components/hospital/icu/main/search/icu-search-chart'
import IcuSummary from '@/components/hospital/icu/main/summary/icu-summary'
import { useSelectedMainViewStore } from '@/lib/store/icu/selected-main-view'
import type {
  IcuChartJoined,
  IcuChartOrderJoined,
  IcuIoPatientJoined,
} from '@/types/icu'

export default function IcuMain({
  icuData,
}: {
  icuData: {
    icuIoData: IcuIoPatientJoined[]
    icuChartData: IcuChartJoined[]
    icuChartOrderData: IcuChartOrderJoined[]
  }
}) {
  const { selectIcudMainView } = useSelectedMainViewStore()

  return (
    <div className="w-full">
      {selectIcudMainView === 'summary' && <IcuSummary icuData={icuData} />}

      {selectIcudMainView === 'chart' && <IcuChart icuData={icuData} />}

      {selectIcudMainView === 'search' && <IcuChartSearch type="search" />}
    </div>
  )
}
