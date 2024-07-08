import { Suspense } from 'react'
import IcuSidebarPatientList from './icu-sidebar-patient-list'
import IcuSidebarSkeleton from './icu-sidebar-skeleton'

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
