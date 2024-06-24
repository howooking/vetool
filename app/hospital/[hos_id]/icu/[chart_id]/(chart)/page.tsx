import IcuChart from '@/components/hospital/icu/chart/icu-chart'
import { createClient } from '@/lib/supabase/server'
import type { IcuChartJoined } from '@/types/hospital'
export default async function HospitalIcuChartPage({
  params,
}: {
  params: { hos_id: string }
}) {
  const supabase = createClient()
  const { data: icuChartData, error: icuChartError } = await supabase
    .from('icu_chart')
    .select(
      `*,
        icu_io_id(*),
        patient_id("name", "gender", "breed", "patient_id"),
        main_vet("name", "user_id"),
        sub_vet("name", "user_id")
        `,
    )
    .match({ hos_id: params.hos_id })
    .order('created_at', { ascending: true })
    .returns<IcuChartJoined[]>()

  if (icuChartError) {
    console.log(icuChartError)
    throw new Error(icuChartError.message)
  }

  const { data: vetsData, error: vetsError } = await supabase
    .from('users')
    .select('user_id, name, position')
    .match({ hos_id: params.hos_id, is_vet: true })
    .order('rank', { ascending: true })

  if (vetsError) {
    console.log(vetsError)
    throw new Error(vetsError.message)
  }

  return <IcuChart icuChartData={icuChartData} vetsData={vetsData} />
}
