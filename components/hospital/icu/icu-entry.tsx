'use client'

import IcuFooter from '@/components/hospital/icu/icu-footer'
import IcuMain from '@/components/hospital/icu/main/icu-main'
import IcuSidebar from '@/components/hospital/icu/sidebar/icu-sidebar'
import { useIcuRealtime } from '@/hooks/use-icu-realtime'
import type { IcuData } from '@/types/icu'

export default function IcuEntry({
  hosId,
  targetDate,
  initialIcuData,
}: {
  hosId: string
  targetDate: string
  initialIcuData: IcuData
}) {
  const {
    icuIoQuery: { data: icuIoData },
    icuChartOrderQuery: { data: icuChartOrderData },
    icuChartQuery: { data: icuChartData },
  } = useIcuRealtime(hosId, targetDate, initialIcuData)

  return (
    <div className="flex">
      <IcuSidebar
        icuIoData={icuIoData}
        icuChartData={icuChartData}
        vetsListData={initialIcuData.vetsListData}
      />

      <div className="h-icu-chart w-full flex-col overflow-y-auto">
        <IcuMain
          icuData={
            {
              icuIoData,
              icuChartData,
              icuChartOrderData,
              vetsListData: initialIcuData.vetsListData,
            } as IcuData
          }
        />
        <IcuFooter hosId={hosId} />
      </div>
    </div>
  )
}
