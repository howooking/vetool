import RegisterPatientForm from '@/components/hospital/register/register-patient-form'

export default async function HospitalRegisterPage({
  params,
}: {
  params: { id: string }
}) {
  return (
    <div className="pl-4 text-[#fafafa] sm:w-full lg:w-[60rem]">
      <p className="py-4 text-[40px] font-bold">환자 등록</p>
      <RegisterPatientForm hos_id={params.id} />
    </div>
  )
}
