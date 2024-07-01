import IcuPatientList from '@/components/hospital/icu/sidebar/icu-chart-patient-list'
import { createClient } from '@/lib/supabase/server'
import { IcuIoPatientsJoined } from '@/types/hospital'

export default async function IcuChartSidebar({ hosId }: { hosId: string }) {
  const supabase = createClient()

  const { data: patientData, error: patientError } = await supabase
    .from('patients')
    .select('patient_id')
    .match({ hos_id: hosId })

  if (!patientData) {
    return (
      <aside className="mr-4 flex h-chart-sidebar w-[120px] justify-center text-white">
        <span className="flex text-center text-xs text-black">
          입원 환자가 없습니다.
        </span>
      </aside>
    )
  }

  const { data: icuIoData, error: icuIoError } = await supabase
    .from('icu_io')
    .select(`*, patient_id("name", "breed", "patient_id")`)
    .match({ hos_id: hosId })
    .order('in_date', { ascending: true })
    .returns<IcuIoPatientsJoined[]>()

  if (icuIoError) {
    console.log(icuIoError)
    throw new Error(icuIoError.message)
  }

  return (
    <aside className="flex h-chart-sidebar min-w-[144px] justify-center text-white">
      <ul className="flex w-full flex-col gap-3 border-r px-2 pt-4 text-center text-black">
        <IcuPatientList icuIoData={icuIoData} />
      </ul>
    </aside>
  )
}
