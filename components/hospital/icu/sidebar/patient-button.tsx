import React, { useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { useIcuSelectedPatientIdStore } from '@/lib/store/icu/icu-selected-patient'
import { useSelectedMainViewStore } from '@/lib/store/icu/selected-main-view'
import { cn } from '@/lib/utils'
import type { IcuIoJoined } from '@/types/icu'

type PatientButtonProps = {
  data: IcuIoJoined
}

const PatientButton: React.FC<PatientButtonProps> = React.memo(({ data }) => {
  const { selectedPatientId, setSelectedPatientId } =
    useIcuSelectedPatientIdStore()
  const { setSelectedIcuMainView } = useSelectedMainViewStore()

  const handlePatientButtonClick = useCallback(() => {
    setSelectedPatientId(data.patient_id.patient_id)
    setSelectedIcuMainView('chart')
  }, [data.patient_id.patient_id, setSelectedPatientId, setSelectedIcuMainView])

  return (
    <Button
      variant="outline"
      size="sm"
      className={cn(
        'w-full',
        selectedPatientId === data.patient_id.patient_id && 'bg-muted',
      )}
      onClick={handlePatientButtonClick}
    >
      <div
        className={cn(
          'flex w-full justify-between gap-2',
          data.out_date && 'text-muted-foreground line-through',
        )}
      >
        <span>{data.patient_id.name}</span>
        <span className="truncate text-[10px]">{data.patient_id.breed}</span>
      </div>
    </Button>
  )
})

PatientButton.displayName = 'PatientButton'

export default PatientButton
