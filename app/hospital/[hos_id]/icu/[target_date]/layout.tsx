import IcuFooter from '@/components/hospital/icu/footer/icu-footer'
import IcuHeader from '@/components/hospital/icu/header/icu-header'
import IcuSidebar from '@/components/hospital/icu/sidebar/icu-sidebar'
import { getInitialIcuData } from '@/lib/services/icu/get-initial-icu-data'
import { IcuDataProvider } from '@/providers/icu-provider'
import React from 'react'

export default async function IcuPageLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { target_date: string; hos_id: string }
}) {
  const initialIcuData = await getInitialIcuData(
    params.hos_id,
    params.target_date,
  )

  return (
    <>
      <IcuHeader
        hosId={params.hos_id}
        groupList={initialIcuData.groupListData}
        patientsData={initialIcuData.patientsData}
        vetsData={initialIcuData.vetsListData}
      />
      <div className="flex">
        <IcuSidebar
          icuIoData={initialIcuData.icuIoData}
          icuChartData={initialIcuData.icuChartData}
          vetsListData={initialIcuData.vetsListData}
        />

        <main className="h-icu-chart w-full overflow-auto">{children}</main>

        <IcuFooter
          hosId={params.hos_id}
          targetDate={params.target_date}
          // isSubscriptionReady={isSubscriptionReady}
        />
      </div>
    </>
  )
}
