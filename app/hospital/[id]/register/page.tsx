import RegisterPatientForm from '@/components/hospital/register/register-patient-form'

export default async function HospitalRegisterPage({
  params,
}: {
  params: { id: string }
}) {
  return <RegisterPatientForm hosId={params.id} />
}
