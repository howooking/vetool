'use client'

import LargeLoaderCircle from '@/components/common/large-loader-circle'
import { useSelectedMainViewStore } from '@/lib/store/icu/selected-main-view'
import type { IcuData } from '@/types/icu'
import dynamic from 'next/dynamic'

const DynamicSummary = dynamic(() => import('./summary/summary'), {
  ssr: false,
  loading: () => <LargeLoaderCircle className="h-icu-chart" />,
})
const DynamicTodo = dynamic(() => import('./todo/todo'), {
  ssr: false,
  loading: () => <LargeLoaderCircle className="h-icu-chart" />,
})
const DynamicIcuChart = dynamic(() => import('./chart/icu-chart'), {
  ssr: false,
  loading: () => <LargeLoaderCircle className="h-icu-chart" />,
})
const DynamicIcuChartSearch = dynamic(
  () => import('./search/icu-search-chart'),
  { ssr: false, loading: () => <LargeLoaderCircle className="h-icu-chart" /> },
)

export default function IcuMain({ icuData }: { icuData: IcuData }) {
  const { selectIcudMainView } = useSelectedMainViewStore()

  return (
    <>
      {selectIcudMainView === 'summary' && <DynamicSummary icuData={icuData} />}

      {selectIcudMainView === 'todo' && <DynamicTodo icuData={icuData} />}

      {selectIcudMainView === 'chart' && <DynamicIcuChart icuData={icuData} />}

      {selectIcudMainView === 'search' && <DynamicIcuChartSearch />}
    </>
  )
}
