import IcuHeader from '@/components/hospital/icu/header/icu-header'
import IcuMainAsync from '@/components/hospital/icu/main/icu-main-async'
import IcuMainSkeleton from '@/components/hospital/icu/main/icu-main-skeleton'
import { Suspense } from 'react'

export default function IcuPage({
  params,
}: {
  params: { hos_id: string; target_date: string }
}) {
  return (
    <div className="h-icu-chart overflow-y-scroll">
      <IcuHeader hosId={params.hos_id} />

      <Suspense fallback={<IcuMainSkeleton />}>
        <IcuMainAsync hosId={params.hos_id} targetDate={params.target_date} />
      </Suspense>
    </div>
  )
}
