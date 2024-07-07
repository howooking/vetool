'use client'

import { Button } from '@/components/ui/button'
import { useIcuSelectedPatientStore } from '@/lib/store/hospital/icu/icu-selected-patient'
import { useSelectedMainViewStore } from '@/lib/store/hospital/icu/selected-main-view'
import { cn } from '@/lib/utils'
import { IcuIoPatientJoined } from '@/types/hospital/icu'

export default function IcuSidebarPatientButton({
  data,
}: {
  data: IcuIoPatientJoined
}) {
  const { selectedPatientId, setSelectedPatientId } =
    useIcuSelectedPatientStore()
  const { setSelectedIcuMainView } = useSelectedMainViewStore()

  const handlePatientButtonClick = (data: IcuIoPatientJoined) => {
    setSelectedPatientId(data.patient_id.patient_id)
    setSelectedIcuMainView('chart')
  }

  return (
    <Button
      variant="outline"
      size="sm"
      className={cn(
        'flex w-full items-center gap-2',
        selectedPatientId === data.patient_id.patient_id && 'bg-muted',
      )}
      onClick={() => handlePatientButtonClick(data)}
    >
      <span>{data.patient_id.name}</span>
      <span className="truncate text-xs">{data.patient_id.breed}</span>
    </Button>
  )
}
