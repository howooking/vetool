'use client'

import PatientForm from '@/components/hospital/patients/patient-form'
import RegisterDialogHeader from '@/components/hospital/patients/register-dialog-header'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { usePatientRegisterStep } from '@/lib/store/icu/icu-register'
import { useState } from 'react'

export function PatientRegisterDialog({ hosId }: { hosId: string }) {
  const { setStep } = usePatientRegisterStep()
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild className="absolute left-2 top-2">
        <Button size="sm">환자등록</Button>
      </DialogTrigger>

      <DialogContent className="flex flex-col sm:max-w-[1000px]">
        <RegisterDialogHeader step="patientRegister" />

        <PatientForm
          setStep={setStep}
          hosId={hosId}
          setIsDialogOpen={setIsDialogOpen}
        />
      </DialogContent>
    </Dialog>
  )
}
