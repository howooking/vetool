'use client'

import { useRealtimeSubscription } from '@/hooks/use-realtime-subscription'
import type { IcuData } from '@/types/icu'
import IcuFooter from './icu-footer'
import IcuMain from './main/icu-main'
import IcuSidebar from './sidebar/icu-sidebar'

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
      <IcuSidebar icuIoData={icuData.icuIoData} />

      <div className="h-icu-chart w-full">
        <IcuMain icuData={icuData} />
        <IcuFooter />
      </div>
    </div>
  )
}
