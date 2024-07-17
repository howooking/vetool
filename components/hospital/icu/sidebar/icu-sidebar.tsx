'use client'

import IcuSidebarPatientList from '@/components/hospital/icu/sidebar/icu-sidebar-patient-list'
import IcuSidebarSkeleton from '@/components/hospital/icu/sidebar/icu-sidebar-skeleton'
import useRealTimeIcuIoData from '@/hooks/use-realtime-Icu-io-data'

export default function IcuSidebar({
  hosId,
  targetDate,
}: {
  hosId: string
  targetDate: string
}) {
  const { isFetching, realTimeIcuIoData } = useRealTimeIcuIoData(
    hosId,
    targetDate,
  )

  return (
    <aside className="min-w-[144px] border-r p-2">
      {isFetching ? (
        <IcuSidebarSkeleton />
      ) : (
        <IcuSidebarPatientList icuIoData={realTimeIcuIoData} />
      )}
    </aside>
  )
}
