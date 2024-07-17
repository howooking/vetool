import { Button } from '@/components/ui/button'
import { useIcuSelectedPatientStore } from '@/lib/store/icu/icu-selected-patient'
import { useSelectedMainViewStore } from '@/lib/store/icu/selected-main-view'
import { cn } from '@/lib/utils'
import type { IcuIoPatientJoined } from '@/types/icu'

export default function IcuSidebarPatientButton({
  data,
}: {
  data: IcuIoPatientJoined
}) {
  const { selectedPatient, setSelectedPatient } = useIcuSelectedPatientStore()
  const { setSelectedIcuMainView } = useSelectedMainViewStore()

  const handlePatientButtonClick = (data: IcuIoPatientJoined) => {
    setSelectedPatient({
      patientId: data.patient_id.patient_id,
      patientName: data.patient_id.name,
    })
    setSelectedIcuMainView('chart')
  }

  return (
    <Button
      variant="outline"
      size="sm"
      className={cn(
        'flex w-full justify-between gap-2',
        selectedPatient?.patientId === data.patient_id.patient_id && 'bg-muted',
      )}
      onClick={() => handlePatientButtonClick(data)}
    >
      <span>{data.patient_id.name}</span>
      <span className="truncate text-[10px]">{data.patient_id.breed}</span>
    </Button>
  )
}
