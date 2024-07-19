'use client'

import IcuSidebarPatientList from '@/components/hospital/icu/sidebar/icu-sidebar-patient-list'
import { IcuIoPatientJoined } from '@/types/icu'

export default function IcuSidebar({
  icuIoData,
}: {
  icuIoData: IcuIoPatientJoined[]
}) {
  return (
    <aside className="h-icu-chart w-[144px] border-r p-2">
      {/* {isFetching ? (
        <IcuSidebarSkeleton />
      ) : ( */}
      <IcuSidebarPatientList icuIoData={icuIoData} />
    </aside>
  )
}
