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
      <DialogTrigger asChild className="absolute left-2 top-1.5">
        <Button>환자등록</Button>
      </DialogTrigger>
      <DialogContent
        className="flex flex-col sm:max-w-[1000px]"
        style={{ minHeight: step === 'ownerSearch' ? '680px' : 'auto' }}
      >
        <DialogHeader>
          <DialogTitle>
            {step === 'ownerSearch' && '보호자 검색'}
            {step === 'ownerRegister' && '보호자 등록'}
            {step === 'patientRegister' && '환자 등록'}
          </DialogTitle>
          <DialogDescription>
            {step === 'ownerSearch' && '환자등록 전 보호자를 선택해주세요'}
            {step === 'ownerRegister' && '환자등록 전 보호자를 등록해주세요.'}
          </DialogDescription>
        </DialogHeader>

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
