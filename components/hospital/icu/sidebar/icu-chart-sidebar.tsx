import IcuChartPatientList from '@/components/hospital/icu/sidebar/icu-chart-patient-list'
import { createClient } from '@/lib/supabase/server'
import { IcuIoPatientsJoined } from '@/types/hospital'

export default async function IcuChartSidebar({ hosId }: { hosId: string }) {
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
    .order('in_date', { ascending: true })
    .returns<IcuIoPatientsJoined[]>()

  if (icuIoDataError) {
    console.log(icuIoDataError)
    throw new Error(icuIoDataError.message)
  }

  return (
    <aside className="min-w-[144px] border-r">
      <ul className="flex flex-col gap-2 p-2">
        <IcuChartPatientList icuIoData={icuIoData} />
      </ul>
    </aside>
  )
}
