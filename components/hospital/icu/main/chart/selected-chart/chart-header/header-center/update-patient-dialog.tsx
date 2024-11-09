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
import { getAgeFromAgeInDays, convertPascalCased } from '@/lib/utils'
import { useBasicHosDataContext } from '@/providers/basic-hos-data-context-provider'
import type { PatientDataTable } from '@/types/patients'
import { Cat, Dog } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useMemo, useState } from 'react'

export default function UpdatePatientDialog({
  patientData,
  ageInDays,
  weight,
  weightMeasuredDate,
  icuChartId,
}: {
  patientData: PatientDataTable
  ageInDays: number
  weight: string
  weightMeasuredDate: string | null
  icuChartId: string
}) {
  const { hos_id } = useParams()
  const { name, breed, gender, species } = patientData
  const [isPatientUpdateDialogOpen, setIsPatientUpdateDialogOpen] =
    useState(false)
  const {
    basicHosData: { patientsData },
  } = useBasicHosDataContext()

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
        <Button variant="ghost" className="flex gap-2">
          {species === 'canine' ? <Dog size={20} /> : <Cat size={20} />}
          <span>{name}</span> ·<span>{convertPascalCased(breed)}</span> ·
          <span className="uppercase">{gender}</span> ·
          <span>{getAgeFromAgeInDays(ageInDays)} </span>
          <span>·</span>
          <span className="">
            {weight === '' ? '체중 입력' : `${weight}kg`}
            <span className="hidden md:inline">{` (${weightMeasuredDate!})`}</span>
          </span>
        </Button>
      </DialogTrigger>

      <DialogContent className="flex flex-col sm:max-w-[1000px]">
        <DialogHeader>
          <DialogTitle>{name} 정보 수정</DialogTitle>
          <DialogDescription>환자의 정보를 수정합니다</DialogDescription>
        </DialogHeader>

        <PatientForm
          mode="updateFromIcuRoute"
          hosId={hos_id as string}
          editingPatient={patientData}
          setIsPatientUpdateDialogOpen={setIsPatientUpdateDialogOpen}
          hosPatientIds={hosPatientIds}
          weight={weight}
          weightMeasuredDate={weightMeasuredDate}
          icuChartId={icuChartId}
        />
      </DialogContent>
    </Dialog>
  )
}
