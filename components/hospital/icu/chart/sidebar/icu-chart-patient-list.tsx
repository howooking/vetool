'use client'

import { Button } from '@/components/ui/button'
import { useIcuSelectedPatientStore } from '@/lib/store/hospital/icu/icu-selected-patient'

export default function IcuChartPatientList({
  name,
  breed,
  patientId,
}: {
  name: string
  breed: string
  patientId: string
}) {
  const { setSelectedPatient } = useIcuSelectedPatientStore()

  return (
    <Button
      variant="outline"
      size="sm"
      className="ellipsis w-32 justify-between px-2"
      onClick={() => setSelectedPatient(patientId)}
    >
      <span className="max-w-14 truncate pr-1 text-xs">{name}</span>
      <span className="max-w-12 truncate text-[10px] text-slate-600">
        {breed}
      </span>
    </Button>
  )
}
