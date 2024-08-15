import HosTodo from '@/components/hospital/home/hos-todo/hos-todo'
import NoticeTodoSkeleton from '@/components/hospital/home/notice-todo-skeleton'
import Notice from '@/components/hospital/home/notice/notice'
import { Suspense } from 'react'

export default function HospitalHomePage({
  params,
}: {
  params: { hos_id: string }
}) {
  return (
    <div className="flex flex-col gap-2 p-2">
      <Suspense fallback={<NoticeTodoSkeleton />}>
        <Notice hosId={params.hos_id} />
      </Suspense>

      <Suspense fallback={<NoticeTodoSkeleton />}>
        <HosTodo hosId={params.hos_id} />
      </Suspense>
    </div>
  )
}
