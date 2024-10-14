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
      <div className="min-h-[360px]">
        <h4 className="mb-1 font-semibold">퇴원차트</h4>
        <Suspense fallback={<OutAndVisitSkeleton />}>
          <IcuOutChart hosId={params.hos_id} targetDate={params.target_date} />
        </Suspense>
      </div>

      <Separator className="my-8" />

      <div className="min-h-[360px]">
        <h4 className="mb-1 font-semibold">면회리스트</h4>
        <Suspense fallback={<OutAndVisitSkeleton />}>
          <VisitChart hosId={params.hos_id} targetDate={params.target_date} />
        </Suspense>
      </div>
    </div>
  )
}
