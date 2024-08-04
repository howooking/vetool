'use client'

import PatientForm from '@/components/hospital/patients/patient-form'
import RegisterDialogHeader from '@/components/hospital/patients/register-dialog-header'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import {
  usePatientRegisterDialog,
  usePatientRegisterStep,
} from '@/lib/store/icu/icu-register'

export function PatientRegisterDialog({ hosId }: { hosId: string }) {
  const { setStep } = usePatientRegisterStep()
  const { isRegisterDialogOpen, setIsRegisterDialogOpen } =
    usePatientRegisterDialog()

  return (
    <Dialog open={isRegisterDialogOpen} onOpenChange={setIsRegisterDialogOpen}>
      <DialogTrigger asChild className="absolute left-2 top-2">
        <Button size="sm">환자등록</Button>
      </DialogTrigger>

      <DialogContent className="flex flex-col sm:max-w-[1000px]">
        <RegisterDialogHeader step="patientRegister" />

        <PatientForm setStep={setStep} hosId={hosId} mode="create" />
      </DialogContent>
    </Dialog>
  )
}
