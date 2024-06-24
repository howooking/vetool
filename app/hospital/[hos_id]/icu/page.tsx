import IcuDialog from '@/components/hospital/icu/dialog/icu-dialog'
import { createClient } from '@/lib/supabase/server'

export default async function IcuPage({
  params,
}: {
  params: { hos_id: string }
}) {
  const hosId = params.hos_id
  const supabase = createClient()
  const { data: patientsData, error: patientsError } = await supabase
    .from('patients')
    .select('*')
    .match({ hos_id: hosId })

  if (patientsError) {
    console.log(patientsError.message)
    throw new Error(patientsError.message)
  }

  const { data: vetsData, error: vetsError } = await supabase
    .from('users')
    .select('name, position, user_id')
    .match({ hos_id: hosId })

  if (vetsError) {
    console.log(vetsError.message)
    throw new Error(vetsError.message)
  }

  const { data: groupListData, error: groupListError } = await supabase
    .from('hospitals')
    .select('group_list')
    .match({ hos_id: hosId })

  if (groupListError) {
    console.log(groupListError.message)
    throw new Error(groupListError.message)
  }

  return (
    <div>
      <span>IcuPage</span>
      <IcuDialog
        hosId={hosId}
        patients={patientsData}
        vets={vetsData}
        groupList={groupListData[0].group_list}
      />
    </div>
  )
}
