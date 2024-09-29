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
  const { basicHosData, icuSidebarData, patientsData, vetsListData } =
    // todo: 함수 명 getIcuData로  변경
    await getInitialIcuData(params.hos_id, params.target_date)

  return (
    <BasicHosDataProvider
      basicHosData={{
        vetsListData: vetsListData,
        groupListData: basicHosData.group_list,
        orderColorsData: basicHosData.order_color as IcuOrderColors,
        memoNameListData: basicHosData.icu_memo_names,
      }}
    >
      <IcuHeader
        hosId={params.hos_id}
        groupList={basicHosData.group_list}
        patientsData={patientsData}
        vetsData={vetsListData}
      />
      <div className="flex">
        <IcuSidebar
          hosGroupList={basicHosData.group_list}
          icuSidebarData={icuSidebarData ?? []}
          vetsListData={vetsListData}
        />

        <main className="h-icu-chart w-full overflow-auto">{children}</main>

        <IcuFooter hosId={params.hos_id} targetDate={params.target_date} />
      </div>
    </BasicHosDataProvider>
  )
}
