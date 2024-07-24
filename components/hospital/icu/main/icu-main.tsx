'use client'

import IcuChart from '@/components/hospital/icu/main/chart/icu-chart'
import IcuChartSearch from '@/components/hospital/icu/main/search/icu-search-chart'
import { useSelectedMainViewStore } from '@/lib/store/icu/selected-main-view'
import type { IcuData } from '@/types/icu'
import Summary from './summary/summary'
import Todo from './todo/todo'

export default function IcuMain({ icuData }: { icuData: IcuData }) {
  const { selectIcudMainView } = useSelectedMainViewStore()

  return (
    <>
      {selectIcudMainView === 'summary' && <Summary icuData={icuData} />}

      {selectIcudMainView === 'todo' && <Todo icuData={icuData} />}

      {selectIcudMainView === 'chart' && <IcuChart icuData={icuData} />}

      {selectIcudMainView === 'search' && <IcuChartSearch type="search" />}
    </>
  )
}
