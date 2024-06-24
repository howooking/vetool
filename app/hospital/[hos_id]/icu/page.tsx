import IcuChart from '@/components/hospital/icu/chart/icu-chart'
import IcuDialog from '@/components/hospital/icu/dialog/icu-dialog'
import { createClient } from '@/lib/supabase/server'
import type { IcuChartJoined } from '@/types/hospital'

export default async function IcuPage({
  params,
}: {
  params: { hos_id: string }
}) {
  const hosId = params.hos_id
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

  const { data: patientsData, error: patientsError } = await supabase
    .from('patients')
    .select('*')
    .match({ hos_id: hosId })

  if (patientsError) {
    console.log(patientsError)
    throw new Error(patientsError.message)
  }

  const { data: vetsData, error: vetsError } = await supabase
    .from('users')
    .select('name, position, user_id')
    .match({ hos_id: hosId })

  if (vetsError) {
    console.log(vetsError)
    throw new Error(vetsError.message)
  }

  const { data: groupListData, error: groupListError } = await supabase
    .from('hospitals')
    .select('group_list')
    .match({ hos_id: hosId })

  if (groupListError) {
    console.log(groupListError)
    throw new Error(groupListError.message)
  }

  return (
    <div className="w-full">
      <IcuChart icuChartData={icuChartData} vetsData={vetsData} />
      <IcuDialog
        hosId={hosId}
        patients={patientsData}
        vets={vetsData}
        groupList={groupListData[0].group_list}
      />
    </div>
  )
}
