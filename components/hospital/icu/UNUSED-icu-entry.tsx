'use client'

import IcuMain from '@/components/hospital/icu/main/icu-main'
import IcuSidebar from '@/components/hospital/icu/sidebar/icu-sidebar'
import { useIcuRealTimeSubscription } from '@/hooks/use-icu-realtime-subscription'
import type { IcuData } from '@/types/icu'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import IcuFooter from './footer/icu-footer'
import { useQueryIcuRealtime } from '@/hooks/use-query-icu-realtime'
import { useIcuContext } from '@/providers/icu-provider'

export default function IcuEntry({
  hosId,
  targetDate,
}: {
  hosId: string
  targetDate: string
}) {
  const { icuData } = useIcuContext()

  const { isSubscriptionReady, icuChartQuery, icuIoQuery, icuOrderQuery } =
    useQueryIcuRealtime(
      hosId,
      targetDate,
      icuData.icuIoData,
      icuData.icuChartData,
      icuData.icuChartOrderData,
    )

  return (
    <div className="flex flex-col md:flex-row">
      {/* <IcuSidebar
        icuIoData={icuIoQuery}
        icuChartData={icuChartQuery}
        vetsListData={icuData.vetsListData}
      />

      <div className="h-[calc(100vh-86px)] w-full flex-col overflow-y-auto md:h-icu-chart">
        <IcuMain
          icuIoData={icuIoQuery}
          icuChartData={icuChartQuery}
          icuChartOrderData={icuOrderQuery}
          vetListData={icuData.vetsListData}
          orderColors={icuData.orderColorsData}
        />

        <IcuFooter hosId={hosId} isSubscriptionReady={isSubscriptionReady} />
      </div> */}
    </div>
  )
}
