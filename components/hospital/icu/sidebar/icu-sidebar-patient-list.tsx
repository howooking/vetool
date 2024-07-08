import { getIcuIoData } from '@/lib/services/icu/get-icu-io-data'
import { Squirrel } from 'lucide-react'
import IcuSidebarPatientButton from './icu-sidebar-patient-button'

export default async function IcuSidebarPatientList({
  hosId,
  targetDate,
}: {
  hosId: string
  targetDate: string
}) {
  const icuIoData = await getIcuIoData(hosId, targetDate)

  return (
    <ul className="flex flex-col gap-2">
      {icuIoData.length === 0 ? (
        <li className="flex h-40 w-full flex-col items-center justify-center gap-2">
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
