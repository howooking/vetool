import { Button } from '@/components/ui/button'
import { useIcuSelectedPatientIdStore } from '@/lib/store/icu/icu-selected-patient'
import { useSelectedMainViewStore } from '@/lib/store/icu/selected-main-view'
import { cn } from '@/lib/utils'
import type { IcuIoPatientJoined } from '@/types/icu'

export default function PatientButton({ data }: { data: IcuIoPatientJoined }) {
  const { selectedPatientId, setSelectedPatientId: setSelectedPatientId } =
    useIcuSelectedPatientIdStore()
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
        'w-full',
        selectedPatientId === data.patient_id.patient_id && 'bg-muted',
      )}
      onClick={() => handlePatientButtonClick(data)}
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
}
