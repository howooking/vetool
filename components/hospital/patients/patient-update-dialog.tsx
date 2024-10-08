'use client'

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
import type { PatientDataTable } from '@/types/patients'
import { Edit } from 'lucide-react'
import { useState } from 'react'

export default function PatientUpdateDialog({
  hosId,
  editingPatient,
  hosPatientIds,
}: {
  hosId: string
  editingPatient: PatientDataTable
  hosPatientIds: string[]
}) {
  const [isPatientUpdateDialogOpen, setIsPatientUpdateDialogOpen] =
    useState(false)
  return (
    <Dialog
      open={isPatientUpdateDialogOpen}
      onOpenChange={setIsPatientUpdateDialogOpen}
    >
      <DialogTrigger asChild>
        <Button size="icon" variant="ghost">
          <Edit size={16} />
        </Button>
      </DialogTrigger>

      <DialogContent className="flex flex-col sm:max-w-[1000px]">
        <DialogHeader>
          <DialogTitle>{editingPatient.name} 정보 수정</DialogTitle>
          <DialogDescription>환자의 정보를 수정합니다</DialogDescription>
        </DialogHeader>

        <PatientForm
          hosPatientIds={hosPatientIds}
          hosId={hosId}
          edit
          editingPatient={editingPatient}
          setIsPatientUpdateDialogOpen={setIsPatientUpdateDialogOpen}
        />
      </DialogContent>
    </Dialog>
  )
}
