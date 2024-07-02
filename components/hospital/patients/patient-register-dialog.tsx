'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { usePatientRegisterStep } from '@/lib/store/hospital/patients/selected-patient'
import { Owner } from '@/types/hospital'
import { useEffect, useState } from 'react'
import OwnerForm from './owner-form'
import OwnerSearch from './owner-search'
import PatientForm from './patient-form'
import RegisterDialogHeader from './register-dialog-header'

export function PatientRegisterDialog({
  ownerData,
  hosId,
}: {
  ownerData: Owner[]
  hosId: string
}) {
  const { step, setStep } = usePatientRegisterStep()
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    if (!isDialogOpen) {
      setTimeout(() => {
        setStep('ownerSearch')
      }, 500)
    }
  }, [setStep, isDialogOpen])

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild className="absolute left-2 top-2">
        <Button size="sm">환자등록</Button>
      </DialogTrigger>

      <DialogContent className="flex flex-col sm:max-w-[1000px]">
        <RegisterDialogHeader step={step} />

        {step === 'ownerSearch' && (
          <OwnerSearch ownerData={ownerData} setStep={setStep} />
        )}
        {step === 'ownerRegister' && <OwnerForm setStep={setStep} />}
        {step === 'patientRegister' && (
          <PatientForm
            setStep={setStep}
            hosId={hosId}
            setIsDialogOpen={setIsDialogOpen}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}
