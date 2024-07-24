'use client'

import IcuFooter from '@/components/hospital/icu/icu-footer'
import IcuMain from '@/components/hospital/icu/main/icu-main'
import IcuSidebar from '@/components/hospital/icu/sidebar/icu-sidebar'
import { useRealtimeSubscription } from '@/hooks/use-realtime-subscription'
import type { IcuData } from '@/types/icu'

export default function IcuEntry({
  hosId,
  icuData,
}: {
  hosId: string
  icuData: IcuData
}) {
  useRealtimeSubscription(hosId)

  return (
    <div className="flex">
      <IcuSidebar
        icuIoData={icuData.icuIoData}
        icuChartData={icuData.icuChartData}
        vetsListData={icuData.vetsListData}
      />

      <div className="h-icu-chart w-full">
        <IcuMain icuData={icuData} />
        <IcuFooter />
      </div>
    </div>
  )
}
