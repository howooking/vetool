import IcuPatientList from '@/components/hospital/icu/sidebar/icu-chart-patient-list'
import { createClient } from '@/lib/supabase/server'
import { IcuIoPatientsJoined } from '@/types/hospital'

export default async function IcuChartSidebar({ hosId }: { hosId: string }) {
  const supabase = createClient()

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
    <aside className="mr-4 flex h-chart-sidebar w-[120px] justify-center text-white">
      <ul className="flex w-full flex-col gap-3 text-center text-black">
        <IcuPatientList icuIoData={icuIoData} />
      </ul>
    </aside>
  )
}
