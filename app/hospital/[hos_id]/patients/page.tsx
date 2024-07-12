import { patientsColumns } from '@/components/hospital/patients/patient-columns'
import { PatientRegisterDialog } from '@/components/hospital/patients/patient-register-dialog'
import DataTable from '@/components/ui/data-table'
import { createClient } from '@/lib/supabase/server'
import { PatientData, PatientDataTable } from '@/types/patients'

export default async function HospitalPatientsPage({
  params,
}: {
  params: { hos_id: string }
}) {
  const supabase = createClient()

  const { data: patientsData, error: patientsError } = await supabase
    .from('patients')
    .select('*')
    .match({ hos_id: params.hos_id })
    .order('is_alive', { ascending: false })
    .order('created_at', { ascending: false })
    .returns<PatientData[]>()

  if (patientsError) {
    console.log(patientsError.message)
    throw new Error(patientsError.message)
  }

  const data: PatientDataTable[] = patientsData.map((patient) => ({
    birth: patient.birth,
    name: patient.name,
    gender: patient.gender,
    breed: patient.breed,
    species: patient.species,
    owner_id: patient.owner_id,
    created_at: patient.created_at,
    hos_id: patient.hos_id,
    patient_id: patient.patient_id,
    microchip_no: patient.microchip_no,
    hos_patient_id: patient.hos_patient_id,
    memo: patient.memo,
    is_alive: patient.is_alive,
    owner_name: patient.owner_name,
    isIcu: false,
  }))

  return (
    <div className="p-2">
      <PatientRegisterDialog hosId={params.hos_id} />

      <DataTable
        columns={patientsColumns}
        data={data}
        searchPlaceHolder="환자번호, 환자이름, 보호자이름을 검색하세요"
        rowLength={12}
      />
    </div>
  )
}
