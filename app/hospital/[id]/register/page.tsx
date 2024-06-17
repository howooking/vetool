import RegisterPatientForm from '@/components/hospital/register/register-patient-form'

export default async function HospitalRegisterPage({
  params,
}: {
  params: { id: string }
}) {
  return (
    <div>
      <h1>환자 등록</h1>
      <RegisterPatientForm hosId={params.id} />
    </div>
  )
}
