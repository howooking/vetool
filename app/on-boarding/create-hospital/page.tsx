import CreateHospitalForm from '@/components/on-boarding/create-hospital/create-hospital-form'
import React from 'react'

export default function CreateHospitalPage() {
  return (
    <div className="sm:w-1/2">
      <h1>신규 병원 추가</h1>
      <CreateHospitalForm />
    </div>
  )
}
