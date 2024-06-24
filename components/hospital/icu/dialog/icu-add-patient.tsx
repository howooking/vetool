'use client'

import IcuRegisterPatientForm from '@/components/hospital/icu/register/icu-register-patient-form'
import HospitalRegisterPatientForm from '@/components/hospital/patients/register/register-patient-form'
import { DialogHeader, DialogTitle } from '@/components/ui/dialog'
import type { IcuDialogProps } from '@/types/hospital/icu'
import { useState } from 'react'

export default function IcuAddPatientDialog({
  hosId,
  groupList,
  vets,
}: Omit<IcuDialogProps, 'patients'>) {
  const [isNextStep, setIsNextStep] = useState(false)

  return (
    <>
      <DialogHeader className="pb-4">
        <DialogTitle>입원 환자 등록</DialogTitle>
      </DialogHeader>

      {isNextStep ? (
        <IcuRegisterPatientForm
          hosId={hosId}
          groupList={groupList}
          vets={vets}
        />
      ) : (
        <HospitalRegisterPatientForm
          hosId={hosId}
          setIsNextStep={setIsNextStep}
          icu
        />
      )}
    </>
  )
}
