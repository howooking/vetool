import { HospitalPatientsColumns } from '@/components/hospital/patients/columns'
import DataTable from '@/components/ui/data-table'
import { createClient } from '@/lib/supabase/server'

export default async function HospitalPatientsPage({
  params,
}: {
  params: { id: string }
}) {
  const supabase = createClient()
  const { data: patientsData } = await supabase
    .from('patients')
    .select('*')
    .match({ hos_id: params.id })

  return (
    <div>
      <h1>환자 조회</h1>
      <DataTable columns={HospitalPatientsColumns} data={patientsData!} />
    </div>
  )
}
