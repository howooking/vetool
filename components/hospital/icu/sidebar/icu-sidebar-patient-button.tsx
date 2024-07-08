'use client'

import { Button } from '@/components/ui/button'
import { useIcuSelectedPatientStore } from '@/lib/store/hospital/icu/icu-selected-patient'
import { useSelectedMainViewStore } from '@/lib/store/hospital/icu/selected-main-view'
import { cn } from '@/lib/utils'
import { IcuIoPatientJoined } from '@/types/hospital/icu'
import { useEffect } from 'react'

export default function IcuSidebarPatientButton({
  data,
  firstPatientId,
}: {
  data: IcuIoPatientJoined
  firstPatientId: string
}) {
  const { selectedPatientId, setSelectedPatientId } =
    useIcuSelectedPatientStore()
  const { selectIcudMainView, setSelectedIcuMainView } =
    useSelectedMainViewStore()

  const handlePatientButtonClick = (data: IcuIoPatientJoined) => {
    setSelectedPatientId(data.patient_id.patient_id)
    setSelectedIcuMainView('chart')
  }

  useEffect(() => {
    if (selectIcudMainView === 'chart') {
      setSelectedPatientId(firstPatientId)
    }
  }, [firstPatientId, selectIcudMainView, setSelectedPatientId])

  return (
    <Button
      variant="outline"
      size="sm"
      className={cn(
        'flex w-full justify-between gap-2',
        selectedPatientId === data.patient_id.patient_id && 'bg-muted',
      )}
      onClick={() => handlePatientButtonClick(data)}
    >
      <span>{data.patient_id.name}</span>
      <span className="truncate text-[10px]">{data.patient_id.breed}</span>
    </Button>
  )
}
