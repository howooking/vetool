import IcuHeader from '@/components/hospital/icu/header/icu-header'
import { getInitialIcuData } from '@/lib/services/icu/get-all-icu-data'
import { IcuDataProvider } from '@/providers/icu-provider'
import TanstackQueryProvider from '@/providers/tanstack-query-provider'
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
    <TanstackQueryProvider>
      <IcuDataProvider icuData={initialIcuData}>
        <IcuHeader
          hosId={params.hos_id}
          groupList={initialIcuData.groupListData}
          patientsData={initialIcuData.patientsData}
          vetsData={initialIcuData.vetsListData}
        />
        <div>{children}</div>
      </IcuDataProvider>
    </TanstackQueryProvider>
  )
}
