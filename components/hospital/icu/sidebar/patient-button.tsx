import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { IcuSidebarIoData } from '@/types/icu/chart'
import { useParams, useRouter } from 'next/navigation'
import { useCallback } from 'react'

export default function PatientButton({ data }: { data: IcuSidebarIoData }) {
  const { push } = useRouter()
  const { hos_id, target_date, patient_id } = useParams()

  const handlePatientButtonClick = useCallback(() => {
    push(
      `/hospital/${hos_id}/icu/${target_date}/chart/${data.patient.patient_id}`,
    )
  }, [data.patient.patient_id, push, hos_id, target_date])
  return (
    <Button
      variant="outline"
      size="sm"
      className={cn(
        'w-full',
        patient_id === data.patient.patient_id && 'bg-muted',
      )}
      onClick={handlePatientButtonClick}
    >
      <div
        className={cn(
          'flex w-full justify-between gap-2',
          data.out_date && 'text-muted-foreground line-through',
        )}
      >
        <span>{data.patient.name}</span>
        <span className="truncate text-[10px]">{data.patient.breed}</span>
      </div>
    </Button>
  )
}
