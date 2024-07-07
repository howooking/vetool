import { createClient } from '@/lib/supabase/server'
import { IcuIoPatientJoined } from '@/types/hospital/icu'
import { Squirrel } from 'lucide-react'
import IcuSidebarPatientButton from './icu-sidebar-patient-button'

export default async function IcuSidebarPatientList({
  hosId,
  targetDate,
}: {
  hosId: string
  targetDate: string
}) {
  const supabase = createClient()

  const { data: icuIoData, error: icuIoDataError } = await supabase
    .from('icu_io')
    .select(
      `
        *,
        patient_id("name", "breed", "patient_id")
      `,
    )
    .match({ hos_id: hosId })
    .lte('in_date', targetDate)
    // ! 클라이언트 사이드에서 필터링하던거 쿼리로 필터링, 복잡함
    .or(`out_date.is.null, out_date.gte.${targetDate}`)
    .order('in_date', { ascending: true })
    .returns<IcuIoPatientJoined[]>()

  if (icuIoDataError) {
    console.log(icuIoDataError)
    throw new Error(icuIoDataError.message)
  }

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
