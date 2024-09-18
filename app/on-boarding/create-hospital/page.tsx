import CreateHospitalForm from '@/components/on-boarding/create-hospital/create-hospital-form'
import PrevButton from '@/components/on-boarding/prev-button'
import { Suspense } from 'react'

export default function CreateHospitalPage() {
  return (
    <>
      <PrevButton />
      <h2 className="text-2xl font-bold tracking-wider">병원 생성</h2>

      <Suspense fallback={null}>
        <CreateHospitalForm />
      </Suspense>
    </>
  )
}
