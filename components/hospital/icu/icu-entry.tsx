'use client'

import IcuMain from '@/components/hospital/icu/main/icu-main'
import IcuSidebar from '@/components/hospital/icu/sidebar/icu-sidebar'
import { useIcuRealTimeSubscription } from '@/hooks/use-icu-realtime-subscription'
import type { IcuData } from '@/types/icu'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import IcuFooter from './footer/icu-footer'

export default function IcuEntry({
  hosId,
  icuData,
}: {
  hosId: string
  icuData: IcuData
}) {
  const {
    icuChartData,
    icuChartOrderData,
    icuIoData,
    vetsListData,
    orderColorsData,
  } = icuData
  const isSubscriptionReady = useIcuRealTimeSubscription(hosId)

  const { refresh } = useRouter()
  useEffect(() => {
    const interval = setInterval(() => {
      console.log('interval refreshing')
      refresh()
    }, 7000)
    return () => clearInterval(interval)
  }, [hosId, refresh])

  return (
    <div className="flex flex-col md:flex-row">
      <IcuSidebar
        icuIoData={icuIoData}
        icuChartData={icuChartData}
        vetsListData={vetsListData}
      />

      <div className="h-icu-chart w-full flex-col overflow-y-auto">
        <IcuMain
          icuIoData={icuIoData}
          icuChartData={icuChartData}
          icuChartOrderData={icuChartOrderData}
          vetListData={vetsListData}
          orderColors={orderColorsData}
        />

        <IcuFooter hosId={hosId} isSubscriptionReady={isSubscriptionReady} />
      </div>
    </div>
  )
}
