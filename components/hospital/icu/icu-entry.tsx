'use client'

import LargeLoaderCircle from '@/components/common/large-loader-circle'
import IcuFooter from '@/components/hospital/icu/icu-footer'
import IcuMain from '@/components/hospital/icu/main/icu-main'
import IcuSidebar from '@/components/hospital/icu/sidebar/icu-sidebar'
import { useIcuRealtime } from '@/hooks/use-icu-realtime'
import SidebarSkeleton from './sidebar/sidebar-skeleton'

export default function IcuEntry({
  hosId,
  targetDate,
}: {
  hosId: string
  targetDate: string
}) {
  const {
    icuIoQuery: { data: icuIoData },
    icuChartOrderQuery: { data: icuChartOrderData },
    icuChartQuery: { data: icuChartData },
  } = useIcuRealtime(hosId, targetDate)

  if (!icuIoData || !icuChartOrderData || !icuChartData) {
    return (
      <div className="flex">
        <SidebarSkeleton />
        <LargeLoaderCircle />
      </div>
    )
  }

  return (
    <div className="flex">
      <IcuSidebar
        icuIoData={icuIoData}
        icuChartData={icuChartData}
        vetsListData={[]}
      />

      <div className="h-icu-chart w-full flex-col overflow-y-auto">
        <IcuMain
          icuIoData={icuIoData}
          icuChartData={icuChartData}
          icuChartOrderData={icuChartOrderData}
          vetListData={[]}
        />

        <IcuFooter hosId={hosId} />
      </div>
    </div>
  )
}
