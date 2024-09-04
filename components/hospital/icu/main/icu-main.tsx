'use client'

import LargeLoaderCircle from '@/components/common/large-loader-circle'
import { useSelectedMainViewStore } from '@/lib/store/icu/selected-main-view'
import type { IcuOrderTypeColor } from '@/types/adimin'
import type { IcuData } from '@/types/icu'
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

export default function IcuMain({ icuData }: { icuData: IcuData }) {
  const { selectIcudMainView } = useSelectedMainViewStore()

  return (
    <>
      {selectIcudMainView === 'summary' && (
        <DynamicSummary
          icuChartData={icuData.icuChartData}
          icuChartOrderData={icuData.icuChartOrderData}
        />
      )}

      {selectIcudMainView === 'tx-table' && (
        <DynamicTxTable
          icuChartData={icuData.icuChartData}
          icuChartOrderData={icuData.icuChartOrderData}
        />
      )}

      {selectIcudMainView === 'chart' && <DynamicIcuChart icuData={icuData} />}

      {selectIcudMainView === 'search' && (
        <DynamicIcuChartSearch
          orderColors={
            icuData.icuIoData[0].hos_id.order_color as IcuOrderTypeColor
          }
        />
      )}

      {selectIcudMainView === 'bookmark' && (
        <DynamicBookmark
          orderColors={
            icuData.icuIoData[0].hos_id.order_color as IcuOrderTypeColor
          }
        />
      )}
    </>
  )
}
