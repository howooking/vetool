'use client'

import IcuFooter from '@/components/hospital/icu/icu-footer'
import IcuMain from '@/components/hospital/icu/main/icu-main'
import IcuSidebar from '@/components/hospital/icu/sidebar/icu-sidebar'
import {
  useIcuChartRealtime,
  useIcuIoRealtime,
  useIcuOrderRealtime,
} from '@/hooks/use-icu-realtime'
import { IcuData } from '@/types/icu'
// import { useIcuRealTime } from '@/hooks/use-icu-realtime-subscription'
// import type { IcuData } from '@/types/icu'

export default function IcuEntry({
  hosId,
  targetDate,
}: {
  hosId: string
  targetDate: string
}) {
  const { data: icuIoData, isLoading: icuIoDataLoading } = useIcuIoRealtime(
    hosId,
    targetDate,
  )
  const { data: icuChartData, isLoading: icuChartDataLoading } =
    useIcuChartRealtime(hosId, targetDate)
  const { data: icuChartOrderData, isLoading: icuChartOrderDataLoading } =
    useIcuOrderRealtime(hosId, targetDate)

  console.log(icuIoData)

  if (icuIoDataLoading || icuChartDataLoading || icuChartOrderDataLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex">
      <IcuSidebar
        icuIoData={icuIoData!}
        // icuChartData={icuChartData!}
        // vetsListData={icuData.vetsListData}
      />

      <div className="h-icu-chart w-full flex-col overflow-y-auto">
        <IcuMain
          icuData={
            {
              icuIoData,
              icuChartData,
              icuChartOrderData,
              vetsListData: [],
            } as IcuData
          }
        />
        {/* notification을 footer안으로 이동 */}
        <IcuFooter hosId={hosId} />
      </div>
    </div>
  )
}
