import IcuOutChart from '@/components/hospital/icu/main/out-and-visit/icu-out-chart/icu-out-chart'
import OutAndVisitSkeleton from '@/components/hospital/icu/main/out-and-visit/out-and-visit-skeleton'
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
      <h4>퇴원차트</h4>
      <Suspense fallback={<OutAndVisitSkeleton />}>
        <IcuOutChart hosId={params.hos_id} targetDate={params.target_date} />
      </Suspense>

      <Separator className="my-8" />

      <h4>면회차트</h4>
      <Suspense fallback={<OutAndVisitSkeleton />}>
        <VisitChart hosId={params.hos_id} targetDate={params.target_date} />
      </Suspense>
    </div>
  )
}
