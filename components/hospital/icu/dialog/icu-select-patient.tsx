'use client'

import { HospitalPatientsColumns } from '@/components/hospital/patients/columns'
import { Button } from '@/components/ui/button'
import DataTable from '@/components/ui/data-table'
import { DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useSelectedPatientStore } from '@/lib/store/hospital/patients/selected-patient'
import { Patients } from '@/types/hospital'
import { useState } from 'react'

export default function IcuSelectPatientDialog({
  patients,
}: {
  patients: Patients[]
}) {
  const { patientId } = useSelectedPatientStore()
  const [isNext, setIsNext] = useState(false)

  return (
    <>
      <DialogHeader>
        <DialogTitle>환자 조회</DialogTitle>
      </DialogHeader>
      <DataTable columns={HospitalPatientsColumns} data={patients!} />
      <DialogFooter>
        {isNext ? (
          <Button
            type="button"
            onClick={() => setIsNext(true)}
            disabled={!patientId}
          >
            등록
          </Button>
        ) : (
          <Button
            type="button"
            onClick={() => setIsNext(true)}
            disabled={!patientId}
          >
            다음
          </Button>
        )}
      </DialogFooter>
    </>
  )
}
