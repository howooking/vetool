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
import { toggleOutPatient } from '@/lib/services/icu/update-icu-chart-infos'
import { cn } from '@/lib/utils'
import type { IcuChartOrderJoined } from '@/types/icu'
import { LoaderCircle, UserRoundMinus, UserRoundPlus } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useState } from 'react'
export default function OutPatientDialog({
  icuIoId,
  name,
  isPatientOut,
  selectedChartOrders,
}: {
  icuIoId: string
  name: string
  isPatientOut: boolean
  selectedChartOrders: IcuChartOrderJoined[]
}) {
  const chartId = selectedChartOrders[0].icu_chart_id.icu_chart_id
  const { target_date } = useParams()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleOutPatient = async () => {
    setIsSubmitting(true)
    const filteredSelectedChartOrderNames = selectedChartOrders
      .filter((order) => order.icu_chart_order_type !== 'checklist')
      .map((order) => order.icu_chart_order_name)
      .join(', ')

    await toggleOutPatient(
      icuIoId,
      chartId,
      isPatientOut,
      target_date as string,
      filteredSelectedChartOrderNames,
    )

    toast({
      title: isPatientOut
        ? `${name}의 퇴원을 취소하였습니다`
        : `${name}을(를) 퇴원처리 하였습니다`,
    })

    setIsSubmitting(false)
    setIsDialogOpen(false)
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          {isPatientOut ? (
            <UserRoundPlus size={18} />
          ) : (
            <UserRoundMinus size={18} />
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>
            {isPatientOut
              ? `${name}의 퇴원을 취소하시겠습니까?`
              : `${name}을(를) ${target_date}에 퇴원시키시겠습니까?`}
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
