'use client'

import IcuFooter from '@/components/hospital/icu/icu-footer'
import IcuMain from '@/components/hospital/icu/main/icu-main'
import IcuSidebar from '@/components/hospital/icu/sidebar/icu-sidebar'
import { toast } from '@/components/ui/use-toast'
import { useIcuRealTimeSubscription } from '@/hooks/use-icu-realtime-subscription'
import type { IcuData } from '@/types/icu'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

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

  useEffect(() => {
    toast({
      title: isSubscriptionReady
        ? '차트의 실시간 변경을 감지하고 있습니다'
        : '실시간 채널 입장 중...',
      className: `${isSubscriptionReady ? 'bg-green-500' : 'bg-amber-500'} text-white`,
    })
  }, [isSubscriptionReady])

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

        <IcuFooter hosId={hosId} />
      </div>
    </div>
  )
}
