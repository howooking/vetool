'use client'

import IcuChart from '@/components/hospital/icu/main/chart/icu-chart'
import IcuChartSearch from '@/components/hospital/icu/main/search/icu-search-chart'
import IcuSummary from '@/components/hospital/icu/main/summary/icu-summary'
import { useSelectedMainViewStore } from '@/lib/store/icu/selected-main-view'
import type { IcuData } from '@/types/icu'
// import Todo from './todo/todo'

export default function IcuMain({ icuData }: { icuData: IcuData }) {
  const { selectIcudMainView } = useSelectedMainViewStore()

  return (
    <div className="flex">
      {selectIcudMainView === 'summary' && <IcuSummary icuData={icuData} />}

      {/* {selectIcudMainView === 'todo' && <Todo icuData={icuData} />} */}

      {selectIcudMainView === 'chart' && <IcuChart icuData={icuData} />}

      {selectIcudMainView === 'search' && <IcuChartSearch type="search" />}
    </div>
  )
}
