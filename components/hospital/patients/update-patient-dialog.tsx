'use client'

import PatientForm from '@/components/hospital/patients/patient-form'
import RegisterDialogHeader from '@/components/hospital/patients/register-dialog-header'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import {
  usePatientRegisterDialog,
  usePatientRegisterStep,
} from '@/lib/store/icu/icu-register'
import type { PatientDataTable } from '@/types/patients'

export default function UpdatePatientDialog({
  hosId,
  patient,
}: {
  hosId: string
  patient: PatientDataTable
}) {
  const { setStep } = usePatientRegisterStep()
  const { isRegisterDialogOpen, setIsRegisterDialogOpen } =
    usePatientRegisterDialog()

  const defaultValues = {
    name: patient.name,
    hos_patient_id: patient.hos_patient_id,
    species: patient.species,
    breed: patient.breed,
    gender: patient.gender,
    birth: new Date(patient.birth + 'T00:00:00'),
    microchip_no: patient.microchip_no ?? '',
    memo: patient.memo ?? '',
    owner_name: patient.owner_name,
    weight: '',
  }

  return (
    <Dialog open={isRegisterDialogOpen} onOpenChange={setIsRegisterDialogOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem
          onSelect={(event) => {
            event.preventDefault()
          }}
        >
          수정
        </DropdownMenuItem>
      </DialogTrigger>

      <DialogContent className="flex flex-col sm:max-w-[1000px]">
        <RegisterDialogHeader step="updatePatient" />

        <PatientForm
          setStep={setStep}
          hosId={hosId}
          defaultValues={defaultValues}
          patientId={patient.patient_id}
          mode="edit"
        />
      </DialogContent>
    </Dialog>
  )
}
