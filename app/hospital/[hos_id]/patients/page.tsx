import { patientsColumns } from '@/components/hospital/patients/patient-columns'
import PatientRegisterDialog from '@/components/hospital/patients/patient-register-dialog'
import UploadPatientArea from '@/components/hospital/patients/upload-patient-area'
import DataTable from '@/components/ui/data-table'
import { getPatients } from '@/lib/services/patient/patient'

export default async function HospitalPatientsPage(props: {
  params: Promise<{ hos_id: string }>
}) {
  const params = await props.params
  const patientsData = await getPatients(params.hos_id)

  return (
    <div className="p-2">
      <div className="l fixed top-2 z-30 flex items-center gap-2">
        <PatientRegisterDialog
          hosId={params.hos_id}
          hosPatientIds={patientsData.map((patient) => patient.hos_patient_id)}
        />

        <UploadPatientArea />
      </div>

      <DataTable
        columns={patientsColumns}
        data={patientsData}
        searchPlaceHolder="환자번호, 환자이름, 보호자이름을 검색하세요"
        rowLength={12}
      />
    </div>
  )
}
