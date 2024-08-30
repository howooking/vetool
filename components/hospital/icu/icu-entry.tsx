'use client'

import IcuFooter from '@/components/hospital/icu/icu-footer'
import IcuMain from '@/components/hospital/icu/main/icu-main'
import IcuSidebar from '@/components/hospital/icu/sidebar/icu-sidebar'
import { useIcuRealTime } from '@/hooks/use-icu-realtime-subscription'
import type { IcuData } from '@/types/icu'

export default function IcuEntry({
  hosId,
  icuData,
}: {
  hosId: string
  icuData: IcuData
}) {
  useIcuRealTime(hosId)

  return (
    <div className="flex">
      <IcuSidebar
        icuIoData={icuData.icuIoData}
        icuChartData={icuData.icuChartData}
        vetsListData={icuData.vetsListData}
      />

      <div className="h-icu-chart w-full flex-col overflow-y-auto">
        <IcuMain icuData={icuData} />
        {/* notification을 footer안으로 이동 */}
        <IcuFooter hosId={hosId} />
      </div>
    </div>
  )
}
