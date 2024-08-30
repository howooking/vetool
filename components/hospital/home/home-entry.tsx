'use client'

import Notice from '@/components/hospital/home/notice/notice'
import Todo from '@/components/hospital/home/todo/todo'
import { useHomeRealtimeSubscription } from '@/hooks/use-home-realtime-subscription'
import type { NoticeUserJoined } from '@/types/hospital/notice'
import type { QueriedTodo } from '@/types/hospital/todo'

export default function HomeEntry({
  noticesData,
  todosData,
  hosId,
}: {
  noticesData: NoticeUserJoined[]
  todosData: QueriedTodo[]
  hosId: string
}) {
  useHomeRealtimeSubscription(hosId)

  return (
    <div className="flex w-full flex-row gap-2 p-2">
      <Notice noticesData={noticesData} hosId={hosId} />
      <Todo todosData={todosData} hosId={hosId} />
    </div>
  )
}
