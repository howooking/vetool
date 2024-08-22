'use client'

import Notice from '@/components/hospital/home/notice/notice'
import Todo from '@/components/hospital/home/todo/todo'
import { useHomeRealtimeSubscription } from '@/hooks/use-home-realtime-subscription'
import type { Todo as TodosData } from '@/types'
import type { NoticeUserJoined } from '@/types/hospital/notice'

export default function HomeEntry({
  noticesData,
  todosData,
  hosId,
}: {
  noticesData: NoticeUserJoined[]
  todosData: TodosData[]
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
