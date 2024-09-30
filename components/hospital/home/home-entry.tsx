'use client'

import Notice from '@/components/hospital/home/notice/notice'
import Todo from '@/components/hospital/home/todo/todo'
import { useHospitalHomeRealtime } from '@/hooks/use-hospital-home-realtime'
import type { NoticeWithUser } from '@/types/hospital/notice'
import type { QueriedTodo } from '@/types/hospital/todo'

export default function HomeEntry({
  noticesData,
  todosData,
  hosId,
}: {
  noticesData: NoticeWithUser[]
  todosData: QueriedTodo[]
  hosId: string
}) {
  useHospitalHomeRealtime(hosId)

  return (
    <div className="flex w-full flex-col gap-2 p-2 md:flex-row">
      <Notice noticesData={noticesData} hosId={hosId} />
      <Todo todosData={todosData} hosId={hosId} />
    </div>
  )
}
