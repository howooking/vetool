'use client'

import Notice from '@/components/hospital/home/notice/notice'
import Todo from '@/components/hospital/home/todo/todo'
import { useHospitalHomeRealtime } from '@/hooks/use-hospital-home-realtime'
import { HosListData } from '@/types/hospital'
import type { NoticeWithUser } from '@/types/hospital/notice'
import type { QueriedTodo } from '@/types/hospital/todo'
import HospitalSelector from '../header/hospital-selector'

export default function HomeEntry({
  noticesData,
  todosData,
  hosId,
  hosList,
  isSuper,
}: {
  noticesData: NoticeWithUser[]
  todosData: QueriedTodo[]
  hosId: string
  hosList: HosListData[]
  isSuper: boolean
}) {
  useHospitalHomeRealtime(hosId)

  return (
    <div className="flex w-full flex-col gap-2 p-2 md:flex-row">
      {isSuper && <HospitalSelector hosList={hosList} />}
      <Notice noticesData={noticesData} hosId={hosId} />
      <Todo todosData={todosData} hosId={hosId} />
    </div>
  )
}
