import SearchPatientContainer from '@/components/hospital/icu/header/register-dialog/search-patient/search-patient-containter'
import PatientRegisterDialog from '@/components/hospital/patients/patient-register-dialog'
import UploadPatientArea from '@/components/hospital/patients/upload-patient-area'

export default async function HospitalPatientsPage(props: {
  params: Promise<{ hos_id: string }>
}) {
  const params = await props.params

  return (
    <div className="p-2">
      <PatientRegisterDialog hosId={params.hos_id} />

      <UploadPatientArea />

      <SearchPatientContainer itemsPerPage={10} />
    </div>
  )
}
