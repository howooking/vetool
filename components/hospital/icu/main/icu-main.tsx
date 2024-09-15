'use client'

import LargeLoaderCircle from '@/components/common/large-loader-circle'
import { useSelectedMainViewStore } from '@/lib/store/icu/selected-main-view'
import type { IcuOrderColors } from '@/types/adimin'
import type {
  IcuChartJoined,
  IcuChartOrderJoined,
  IcuIoJoined,
  Vet,
} from '@/types/icu'
import dynamic from 'next/dynamic'

const DynamicSummary = dynamic(() => import('./summary/summary'), {
  ssr: false,
  loading: () => <LargeLoaderCircle className="h-icu-chart" />,
})
const DynamicTxTable = dynamic(() => import('./tx-table/tx-table'), {
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
const DynamicBookmark = dynamic(() => import('./bookmark/bookmark'), {
  ssr: false,
  loading: () => <LargeLoaderCircle className="h-icu-chart" />,
})

export default function IcuMain({
  icuIoData,
  icuChartData,
  icuChartOrderData,
  vetListData,
  orderColors,
}: {
  icuIoData: IcuIoJoined[]
  icuChartData: IcuChartJoined[]
  icuChartOrderData: IcuChartOrderJoined[]
  vetListData: Vet[]
  orderColors: IcuOrderColors
}) {
  const { selectIcudMainView } = useSelectedMainViewStore()

  return (
    <>
      {selectIcudMainView === 'summary' && (
        <DynamicSummary
          icuChartData={icuChartData}
          icuChartOrderData={icuChartOrderData}
        />
      )}

      {selectIcudMainView === 'tx-table' && (
        <DynamicTxTable
          icuChartData={icuChartData}
          icuChartOrderData={icuChartOrderData}
        />
      )}

      {selectIcudMainView === 'chart' && (
        <DynamicIcuChart
          icuIoData={icuIoData}
          icuChartData={icuChartData}
          icuChartOrderData={icuChartOrderData}
          vetListData={vetListData}
          orderColors={orderColors}
        />
      )}

      {selectIcudMainView === 'search' && (
        <DynamicIcuChartSearch orderColors={orderColors} />
      )}

      {selectIcudMainView === 'bookmark' && (
        <DynamicBookmark orderColors={orderColors} />
      )}
    </>
  )
}
