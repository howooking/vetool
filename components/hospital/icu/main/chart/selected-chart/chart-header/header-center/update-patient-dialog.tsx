import PatientForm from '@/components/hospital/patients/patient-form'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { getAgeFromAgeInDays } from '@/lib/utils'
import type { PatientData, PatientDataTable } from '@/types/patients'
import { Cat, Dog, Edit } from 'lucide-react'
import { useMemo, useState } from 'react'

export default function UpdatePatientDialog({
  hosId,
  patientData,
  patientsData,
  ageInDays,
  isPatientOut,
}: {
  hosId: string
  patientData: PatientDataTable
  patientsData: PatientData[]
  ageInDays: number
  isPatientOut: boolean
}) {
  const { name, breed, gender, species } = patientData
  const [isPatientUpdateDialogOpen, setIsPatientUpdateDialogOpen] =
    useState(false)

  const hosPatientIds = useMemo(
    () => patientsData.map((patient) => patient.hos_patient_id),
    [patientsData],
  )

  return (
    <Dialog
      open={isPatientUpdateDialogOpen}
      onOpenChange={setIsPatientUpdateDialogOpen}
    >
      <DialogTrigger asChild>
        <Button variant="ghost" className="flex gap-2 p-0">
          {species === 'canine' ? <Dog size={20} /> : <Cat size={20} />}
          <span>
            {name}
            {isPatientOut && '(퇴원)'}
          </span>{' '}
          ·<span>{breed}</span> ·<span className="uppercase">{gender}</span> ·
          <span>{getAgeFromAgeInDays(ageInDays)} </span> ·
        </Button>
      </DialogTrigger>

      <DialogContent className="flex flex-col sm:max-w-[1000px]">
        <DialogHeader>
          <DialogTitle>{name} 정보 수정</DialogTitle>
          <DialogDescription>환자의 정보를 수정합니다</DialogDescription>
        </DialogHeader>

        <PatientForm
          hosId={hosId}
          edit
          editingPatient={patientData}
          setIsPatientUpdateDialogOpen={setIsPatientUpdateDialogOpen}
          hosPatientIds={hosPatientIds}
        />
      </DialogContent>
    </Dialog>
  )
}
