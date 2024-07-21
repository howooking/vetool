'use client'

import { useRealtimeSubscription } from '@/hooks/use-realtime-subscription'
import type {
  IcuChartJoined,
  IcuChartOrderJoined,
  IcuIoPatientJoined,
} from '@/types/icu'
import IcuFooter from './icu-footer'
import IcuMain from './main/icu-main'
import IcuSidebar from './sidebar/icu-sidebar'

export default function IcuEntry({
  hosId,
  icuData,
}: {
  hosId: string
  icuData: {
    icuIoData: IcuIoPatientJoined[]
    icuChartData: IcuChartJoined[]
    icuChartOrderData: IcuChartOrderJoined[]
  }
}) {
  useRealtimeSubscription(hosId)

  return (
    <div className="flex">
      <IcuSidebar icuIoData={icuData.icuIoData} />

      <div className="h-icu-chart w-full overflow-y-auto">
        <IcuMain icuData={icuData} />
        <IcuFooter />
      </div>
    </div>
  )
}
