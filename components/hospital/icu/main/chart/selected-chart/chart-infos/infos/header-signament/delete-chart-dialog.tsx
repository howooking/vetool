import WarningMessage from '@/components/common/warning-message'
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
import {
  deleteAllCharts,
  deleteChart,
} from '@/lib/services/icu/delete-icu-chart'
import { useIcuSelectedPatientStore } from '@/lib/store/icu/icu-selected-patient'
import { cn } from '@/lib/utils'
import { LoaderCircle, Trash2 } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useState } from 'react'
export default function DeleteChartDialog({
  icuChartId,
  name,
  icuIoId,
  patientId,
}: {
  icuChartId: string
  name: string
  icuIoId: string
  patientId: string
}) {
  const { target_date } = useParams()
  const [isOpen, setIsOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isDeletingAllCharts, setIsDeletingAllCharts] = useState(false)
  const { setSelectedPatient } = useIcuSelectedPatientStore()

  const handleDeleteChart = async () => {
    setIsDeleting(true)

    const isIcuIoDeleted = await deleteChart(
      icuChartId,
      icuIoId,
      target_date as string,
      patientId,
    )

    toast({
      title: '차트가 삭제되었습니다',
    })

    setIsDeleting(false)
    isIcuIoDeleted && setSelectedPatient(null)
    setIsOpen(false)
  }
  const handleDeleteAllCharts = async () => {
    setIsDeletingAllCharts(true)

    await deleteAllCharts(icuIoId)

    toast({
      title: `${name}의 모든차트가 삭제되었습니다`,
    })

    setIsDeletingAllCharts(false)
    setSelectedPatient(null)
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-6 w-6">
          <Trash2 className="h-3 w-3" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{name}의 차트를 삭제하시겠습니까?</DialogTitle>
          <DialogDescription className="flex flex-col gap-1">
            <span>선택차트삭제 : {target_date}날 차트만 삭제합니다</span>
            <span>모든차트삭제 : 입원기간동안의 차트들을 모두 삭제합니다</span>
            <WarningMessage text="해당작업은 실행 후 되될릴 수 없습니다." />
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              취소
            </Button>
          </DialogClose>
          <Button onClick={handleDeleteChart} disabled={isDeleting}>
            선택차트삭제
            <LoaderCircle
              className={cn(isDeleting ? 'ml-2 animate-spin' : 'hidden')}
            />
          </Button>
          <Button
            onClick={handleDeleteAllCharts}
            disabled={isDeletingAllCharts}
            variant="destructive"
          >
            모든차트삭제
            <LoaderCircle
              className={cn(
                isDeletingAllCharts ? 'ml-2 animate-spin' : 'hidden',
              )}
            />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
