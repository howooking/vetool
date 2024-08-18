import Notice from '@/components/hospital/home/notice/notice'
import NoticeSkeleton from '@/components/hospital/home/notice/notice-skeleton'
import Todo from '@/components/hospital/home/todo/todo'
import TodoSkeleton from '@/components/hospital/home/todo/todo-skeleton'
import { Suspense } from 'react'
import AutoTest from './auto-test'
import AutocompleteTextarea from './auto-test'

export default function HospitalHomePage({
  params,
}: {
  params: { hos_id: string }
}) {
  return (
    <>
      <div className="flex w-full flex-row gap-2 p-2">
        <Suspense fallback={<NoticeSkeleton />}>
          <Notice hosId={params.hos_id} />
        </Suspense>

        <Suspense fallback={<TodoSkeleton />}>
          <Todo hosId={params.hos_id} />
        </Suspense>
      </div>
      <AutocompleteTextarea className="w-1/2" />
    </>
  )
}
