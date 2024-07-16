import IcuSidebarPatientList from '@/components/hospital/icu/sidebar/icu-sidebar-patient-list'
import IcuSidebarSkeleton from '@/components/hospital/icu/sidebar/icu-sidebar-skeleton'
import { Suspense } from 'react'

export default async function IcuSidebar({
  hosId,
  targetDate,
}: {
  hosId: string
  targetDate: string
}) {
  return (
    <aside className="min-w-[144px] border-r p-2">
      <Suspense fallback={<IcuSidebarSkeleton />}>
        <IcuSidebarPatientList hosId={hosId} targetDate={targetDate} />
      </Suspense>
    </aside>
  )
}
