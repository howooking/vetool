import { patientsColumns } from '@/components/hospital/patients/patient-columns'
import DataTable from '@/components/ui/data-table'
import type { PatientData, PatientDataTable } from '@/types/patients'

export default function PatientSearchTable({
  patientData,
}: {
  patientData: PatientData[]
}) {
  const icuRegisterPatientsData: PatientDataTable[] = patientData.map(
    (patient) => ({
      birth: patient.birth,
      name: patient.name,
      gender: patient.gender,
      breed: patient.breed,
      species: patient.species,
      created_at: patient.created_at,
      hos_id: patient.hos_id,
      patient_id: patient.patient_id,
      microchip_no: patient.microchip_no,
      hos_patient_id: patient.hos_patient_id,
      memo: patient.memo,
      is_alive: patient.is_alive,
      owner_name: patient.owner_name,
      hos_owner_id: patient.hos_owner_id,
      isIcu: true,
    }),
  )

  return (
    <DataTable
      columns={patientsColumns}
      data={icuRegisterPatientsData}
      searchPlaceHolder="환자번호, 환자이름, 보호자이름을 검색하세요"
      rowLength={8}
    />
  )
}
