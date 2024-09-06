'use client'

import IcuFooter from '@/components/hospital/icu/icu-footer'
import IcuMain from '@/components/hospital/icu/main/icu-main'
import IcuSidebar from '@/components/hospital/icu/sidebar/icu-sidebar'
import { useIcuRealTimeSubscription } from '@/hooks/use-icu-realtime-subscription'
import type { IcuData } from '@/types/icu'

export default function IcuEntry({
  hosId,
  icuData,
}: {
  hosId: string
  icuData: IcuData
}) {
  const { icuChartData, icuChartOrderData, icuIoData, vetsListData } = icuData
  useIcuRealTimeSubscription(hosId)

  return (
    <div className="flex">
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
        />

        <IcuFooter hosId={hosId} />
      </div>
    </div>
  )
}
