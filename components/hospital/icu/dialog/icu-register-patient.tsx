'use client'

import { DialogHeader, DialogTitle } from '@/components/ui/dialog'
import RegisterPatientForm from '@/components/hospital/register/register-patient-form'

export default function IcuRegisterPatientDialog({
  hostId,
}: {
  hostId: string
}) {
  return (
    <>
      <DialogHeader className="pb-4">
        <DialogTitle>입원 환자 등록</DialogTitle>
      </DialogHeader>
      <RegisterPatientForm hosId={hostId} />
    </>
  )
}
