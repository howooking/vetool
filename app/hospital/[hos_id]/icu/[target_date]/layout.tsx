import IcuFooter from '@/components/hospital/icu/footer/icu-footer'
import IcuHeader from '@/components/hospital/icu/header/icu-header'
import IcuSidebar from '@/components/hospital/icu/sidebar/icu-sidebar'
import { getInitialIcuData } from '@/lib/services/icu/get-initial-icu-data'
import { BasicHosDataProvider } from '@/providers/basic-hos-data-context-privider'
import type { IcuOrderColors } from '@/types/adimin'
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
    <BasicHosDataProvider
      basicHosData={{
        vetsListData: initialIcuData.vetsListData,
        groupListData: initialIcuData.basicHosData.group_list,
        orderColorsData: initialIcuData.basicHosData
          .order_color as IcuOrderColors,
        memoNameListData: initialIcuData.basicHosData.icu_memo_names,
      }}
    >
      <IcuHeader
        hosId={params.hos_id}
        groupList={initialIcuData.basicHosData.group_list}
        patientsData={initialIcuData.patientsData}
        vetsData={initialIcuData.vetsListData}
      />
      <div className="flex">
        <IcuSidebar
          hosGroupList={initialIcuData.basicHosData.group_list}
          icuSidebarData={initialIcuData.icuSidebarData}
          vetsListData={initialIcuData.vetsListData}
        />

        <main className="h-icu-chart w-full overflow-auto">{children}</main>

        <IcuFooter
          hosId={params.hos_id}
          targetDate={params.target_date}
          // isSubscriptionReady={isSubscriptionReady}
        />
      </div>
    </BasicHosDataProvider>
  )
}
