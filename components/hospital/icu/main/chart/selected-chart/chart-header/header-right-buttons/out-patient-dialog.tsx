import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { toast } from '@/components/ui/use-toast'
import { toggleOutPatient } from '@/lib/services/icu/chart/update-icu-chart-infos'
import { cn, hashtagKeyword } from '@/lib/utils'
import type { SelectedChart } from '@/types/icu'
import { LoaderCircle, LogOut, Undo2 } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useState } from 'react'
export default function OutPatientDialog({
  chartData,
}: {
  chartData: SelectedChart
}) {
  const { target_date } = useParams()
  const { icu_io, orders, patient } = chartData
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const isPatientOut = icu_io.out_date !== null

  const handleOutPatient = async () => {
    setIsSubmitting(true)

    const hashtaggedDxCc = hashtagKeyword(
      `${icu_io.icu_io_dx}, ${icu_io.icu_io_cc}`,
    )

    const hashtaggedStringifiedOrderNames = orders
      .filter((order) => order.order_type !== 'checklist')
      .map((order) => `#${order.order_name.trim()}`)
      .join('')

    await toggleOutPatient(
      icu_io.icu_io_id,
      isPatientOut,
      hashtaggedStringifiedOrderNames,
      patient.patient_id,
      hashtaggedDxCc,
      patient.species,
      patient.breed,
      patient.name,
      icu_io.age_in_days,
    )

    toast({
      title: isPatientOut
        ? `${patient.name}의 퇴원을 취소하였습니다`
        : `${patient.name}을(를) 퇴원처리 하였습니다`,
    })

    setIsSubmitting(false)
    setIsDialogOpen(false)
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          {isPatientOut ? <Undo2 size={18} /> : <LogOut size={18} />}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>
            {isPatientOut
              ? `${patient.name}의 퇴원을 취소하시겠습니까?`
              : `${patient.name}을(를) 퇴원시키시겠습니까?`}
          </DialogTitle>
          <DialogDescription>해당 작업은 되돌릴 수 있습니다</DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              취소
            </Button>
          </DialogClose>
          <Button onClick={handleOutPatient} disabled={isSubmitting}>
            {isPatientOut ? '퇴원취소' : '퇴원'}
            <LoaderCircle
              className={cn(isSubmitting ? 'ml-2 animate-spin' : 'hidden')}
            />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
