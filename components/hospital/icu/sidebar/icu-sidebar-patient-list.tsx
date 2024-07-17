import IcuSidebarPatientButton from '@/components/hospital/icu/sidebar/icu-sidebar-patient-button'
import type { IcuIoPatientJoined } from '@/types/icu'
import { Squirrel } from 'lucide-react'

export default function IcuSidebarPatientList({
  icuIoData,
}: {
  icuIoData: IcuIoPatientJoined[]
}) {
  return (
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
  )
}
