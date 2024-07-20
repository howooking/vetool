'use client'

import { useRealtimeSubscription } from '@/hooks/use-realtime-subscription'
import type {
  IcuChartJoined,
  IcuChartOrderJoined,
  IcuIoPatientJoined,
  IcuUserList,
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
    icuUsersData: IcuUserList[]
  }
}) {
  useRealtimeSubscription(hosId)

  return (
    <div className="flex">
      <IcuSidebar icuIoData={icuData.icuIoData} />

      <div className="h-icu-chart w-full overflow-y-auto">
        <IcuMain
          icuChartData={icuData.icuChartData}
          icuIoData={icuData.icuIoData}
          icuChartOrderData={icuData.icuChartOrderData}
          icuUsersData={icuData.icuUsersData}
        />
        <IcuFooter />
      </div>
    </div>
  )
}
