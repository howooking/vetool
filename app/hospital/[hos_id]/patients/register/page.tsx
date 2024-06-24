import HospitalRegisterPatientForm from '@/components/hospital/patients/register/register-patient-form'

export default async function HospitalPatientsRegisterPage({
  params,
}: {
  params: { id: string }
}) {
  return (
    <div>
      <h1>환자 등록</h1>
      <HospitalRegisterPatientForm hosId={params.id} />
    </div>
  )
}
