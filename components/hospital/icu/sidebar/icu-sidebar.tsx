'use client'

import { IcuIoPatientJoined } from '@/types/icu'
import { Squirrel } from 'lucide-react'
import IcuSidebarPatientButton from './icu-sidebar-patient-button'

export default function IcuSidebar({
  icuIoData,
}: {
  icuIoData: IcuIoPatientJoined[]
}) {
  return (
    <aside className="h-icu-chart w-[144px] shrink-0 border-r p-2">
      <ul className="flex flex-col gap-2">
        {icuIoData.length === 0 ? (
          <li className="flex w-full flex-col items-center justify-center gap-2 pt-10">
            <Squirrel size={40} className="hover:scale-x-[-1]" />
            <span className="text-xs font-bold">입원환자 없음</span>
          </li>
        ) : (
          icuIoData.map((data) => (
            <li key={data.icu_io_id} className="w-full">
              <IcuSidebarPatientButton data={data} />
            </li>
          ))
        )}
      </ul>
    </aside>
  )
}
