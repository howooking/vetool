import { HospitalPatientsColumns } from '@/components/hospital/patients/columns'
import DataTable from '@/components/ui/data-table'
import { createClient } from '@/lib/supabase/server'
import { PatientData, PatientDataTable } from '@/types/hospital/patients'

export default async function HospitalPatientsPage({
  params,
}: {
  params: { hos_id: string }
}) {
  const supabase = createClient()
  const { data: patientsData, error: patientsError } = await supabase
    .from('patients')
    .select(
      `
        *,
        owner_id(*)
      `,
    )
    .match({ hos_id: params.hos_id })
    .order('is_alive', { ascending: false })
    .order('created_at', { ascending: false })
    .returns<PatientData[]>()

  if (patientsError) {
    console.log(patientsError.message)
    throw new Error(patientsError.message)
  }

  if (patientsData.length === 0) {
    return <>환자 없음</>
  }

  const data: PatientDataTable[] = patientsData.map((patient) => ({
    birth: patient.birth,
    name: patient.name,
    gender: patient.gender,
    breed: patient.breed,
    species: patient.species,
    owner_id: patient.owner_id.owner_id,
    created_at: patient.created_at,
    hos_id: patient.hos_id,
    patient_id: patient.patient_id,
    microchip_no: patient.microchip_no,
    hos_owner_id: patient.owner_id.hos_owner_id,
    hos_patient_id: patient.hos_patient_id,
    memo: patient.memo,
    is_alive: patient.is_alive,
    owner_address: patient.owner_id.owner_address,
    owner_level: patient.owner_id.owner_level,
    owner_memo: patient.owner_id.owner_memo,
    owner_name: patient.owner_id.owner_name,
    owner_phone_number: patient.owner_id.owner_phone_number,
  }))

  return (
    <div className="p-2">
      <DataTable
        columns={HospitalPatientsColumns}
        data={data}
        searchKeyword="name"
        searchPlaceHolder="환자이름을 검색해주세요"
      />
    </div>
  )
}
