import AddOutDuePatientDialog from '@/components/hospital/icu/main/out-and-visit/icu-out-chart/add-out-due-patient-dialog'
import IcuOutChart from '@/components/hospital/icu/main/out-and-visit/icu-out-chart/icu-out-chart'
import OutAndVisitSkeleton from '@/components/hospital/icu/main/out-and-visit/out-and-visit-skeleton'
import AddVisitPatientDialog from '@/components/hospital/icu/main/out-and-visit/visit-chart/add-visit-patient-dialog'
import VisitChart from '@/components/hospital/icu/main/out-and-visit/visit-chart/visit-chart'
import { Separator } from '@/components/ui/separator'
import { Suspense } from 'react'

export default async function OutAndVisitPage({
  params,
}: {
  params: {
    hos_id: string
    target_date: string
  }
}) {
  return (
    <div className="p-2">
      <div className="min-h-[360px]">
        <div className="mb-1 flex items-center gap-1 font-semibold">
          <span>퇴원차트</span>
          <AddOutDuePatientDialog />
        </div>
        <Suspense fallback={<OutAndVisitSkeleton />}>
          <IcuOutChart hosId={params.hos_id} targetDate={params.target_date} />
        </Suspense>
      </div>

      <Separator className="my-8" />

      <div className="min-h-[360px]">
        <div className="mb-1 flex items-center gap-1 font-semibold">
          <span>면회리스트</span>
          <AddVisitPatientDialog />
        </div>
        <Suspense fallback={<OutAndVisitSkeleton />}>
          <VisitChart hosId={params.hos_id} targetDate={params.target_date} />
        </Suspense>
      </div>
    </div>
  )
}
