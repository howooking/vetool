'use client'

import IcuFooter from '@/components/hospital/icu/icu-footer'
import IcuMain from '@/components/hospital/icu/main/icu-main'
import IcuNotification from '@/components/hospital/icu/notification/icu-notification'
import IcuSidebar from '@/components/hospital/icu/sidebar/icu-sidebar'
import { useIcuRealtimeSubscription } from '@/hooks/use-icu-realtime-subscription'
import type { IcuData } from '@/types/icu'

export default function IcuEntry({
  hosId,
  icuData,
}: {
  hosId: string
  icuData: IcuData
}) {
  useIcuRealtimeSubscription(hosId)

  return (
    <div className="flex">
      <IcuSidebar
        icuIoData={icuData.icuIoData}
        icuChartData={icuData.icuChartData}
        vetsListData={icuData.vetsListData}
      />

      <div className="h-icu-chart w-full overflow-auto">
        <IcuMain icuData={icuData} />
        <IcuFooter />
        <IcuNotification />
      </div>
    </div>
  )
}
