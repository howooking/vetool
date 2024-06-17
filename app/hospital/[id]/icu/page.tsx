import IcuDialog from '@/components/hospital/icu/dialog/icu-dialog'
import { createClient } from '@/lib/supabase/server'

export default async function IcuPage({ params }: { params: { id: string } }) {
  const supabase = createClient()
  const { data: patientsData } = await supabase
    .from('patients')
    .select('*')
    .match({ hos_id: params.id })

  return <IcuDialog hosId={params.id} patients={patientsData!} />
}
