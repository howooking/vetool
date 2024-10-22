import IcuFooter from '@/components/hospital/icu/footer/icu-footer'
import IcuHeader from '@/components/hospital/icu/header/icu-header'
import IcuSidebar from '@/components/hospital/icu/sidebar/icu-sidebar'
import { getIcuData } from '@/lib/services/icu/get-icu-data'
import { BasicHosDataProvider } from '@/providers/basic-hos-data-context-provider'
import type { IcuOrderColors } from '@/types/adimin'
import React from 'react'

export default async function IcuPageLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { target_date: string; hos_id: string }
}) {
  const {
    basicHosData,
    icuSidebarData,
    patientsData,
    vetsListData,
    templateData,
  } = await getIcuData(params.hos_id, params.target_date)

  return (
    <BasicHosDataProvider
      basicHosData={{
        patientsData: patientsData,
        vetsListData: vetsListData,
        groupListData: basicHosData.group_list,
        orderColorsData: basicHosData.order_color as IcuOrderColors,
        memoNameListData: basicHosData.icu_memo_names,
        showOrderer: basicHosData.show_orderer,
        maintenanceRateCalcMethod: basicHosData.maintenance_rate_calc_method,
        rerCalcMethod: basicHosData.rer_calc_method,
        sidebarData: icuSidebarData ?? [],
        templateData: templateData ?? [],
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

        <main className="h-icu-chart w-full overflow-scroll md:w-[calc(100vw-198px)]">
          {children}
        </main>
      </div>

      <IcuFooter hosId={params.hos_id} targetDate={params.target_date} />
    </BasicHosDataProvider>
  )
}
