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
import { useState } from 'react'

export function PatientRegisterDialog({
  hosId,
  hosPatientIds,
}: {
  hosId: string
  hosPatientIds: string[]
}) {
  const [isPatientRegisterDialogOpen, setIsPatientRegisterDialogOpen] =
    useState(false)

  return (
    <Dialog
      open={isPatientRegisterDialogOpen}
      onOpenChange={setIsPatientRegisterDialogOpen}
    >
      <DialogTrigger asChild className="absolute left-2 top-2">
        <Button size="sm">환자 등록</Button>
      </DialogTrigger>

      <DialogContent
        className="flex flex-col sm:max-w-[1200px]"
        onInteractOutside={(e) => {
          e.preventDefault()
        }}
      >
        <DialogHeader>
          <DialogTitle>환자등록</DialogTitle>
          <DialogDescription>신규 환자를 등록합니다</DialogDescription>
        </DialogHeader>

        <PatientForm
          mode="registerFromPatientRoute"
          hosPatientIds={hosPatientIds}
          hosId={hosId}
          setIsPatientRegisterDialogOpen={setIsPatientRegisterDialogOpen}
        />
      </DialogContent>
    </Dialog>
  )
}
