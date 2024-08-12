import { patientsColumns } from '@/components/hospital/patients/patient-columns'
import { PatientRegisterDialog } from '@/components/hospital/patients/patient-register-dialog'
import DataTable from '@/components/ui/data-table'
import { getPatients } from '@/lib/services/patient/patient'

export default async function HospitalPatientsPage({
  params,
}: {
  params: { hos_id: string }
}) {
  const patientsData = await getPatients(params.hos_id)

  return (
    <div className="p-2">
      <PatientRegisterDialog hosId={params.hos_id} />

      <DataTable
        columns={patientsColumns}
        data={patientsData}
        searchPlaceHolder="환자번호, 환자이름, 보호자이름을 검색하세요"
        rowLength={12}
      />
    </div>
  )
}
