'use client'

import IcuFooter from '@/components/hospital/icu/footer/icu-footer'
import IcuMain from '@/components/hospital/icu/main/icu-main'
import IcuSidebar from '@/components/hospital/icu/sidebar/icu-sidebar'
import { useQueryIcuRealtime } from '@/hooks/use-query-icu-realtime'
import { useIcuContext } from '@/providers/icu-provider'

export default function IcuPage({
  params,
}: {
  params: {
    hos_id: string
    target_date: string
  }
}) {
  const { icuData } = useIcuContext()

  const {
    isSubscriptionReady,
    icuIoQuery: { data: icuIoData },
    icuChartQuery: { data: icuChartData },
    icuOrderQuery: { data: icuOrderData },
  } = useQueryIcuRealtime(
    params.hos_id,
    params.target_date,
    icuData.icuIoData,
    icuData.icuChartData,
    icuData.icuChartOrderData,
  )

  return (
    <div className="flex flex-col md:flex-row">
      <IcuSidebar
        icuIoData={icuIoData}
        icuChartData={icuChartData}
        vetsListData={icuData.vetsListData}
      />

      <div className="h-[calc(100vh-86px)] w-full flex-col overflow-y-auto md:h-icu-chart">
        <IcuMain
          icuIoData={icuIoData}
          icuChartData={icuChartData}
          icuChartOrderData={icuOrderData}
          vetListData={icuData.vetsListData}
          orderColors={icuData.orderColorsData}
        />

        <IcuFooter
          hosId={params.hos_id}
          isSubscriptionReady={isSubscriptionReady}
        />
      </div>
    </div>
  )
}
