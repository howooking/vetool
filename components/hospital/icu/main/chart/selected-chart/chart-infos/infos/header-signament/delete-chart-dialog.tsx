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
import { AlertCircle, LoaderCircle, Trash2 } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
export default function DeleteChartDialog({
  icuChartId,
  name,
  icuIoId,
}: {
  icuChartId: string
  name: string
  icuIoId: string
}) {
  const { target_date } = useParams()
  const [isOpen, setIsOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isDeletingAllCharts, setIsDeletingAllCharts] = useState(false)
  const { refresh } = useRouter()
  const { setSelectedPatientId } = useIcuSelectedPatientStore()

  const handleDeleteChart = async () => {
    setIsDeleting(true)

    await deleteChart(icuChartId)

    toast({
      title: '차트가 삭제되었습니다',
    })

    setIsDeleting(false)
    setIsOpen(false)
    refresh()
  }
  const handleDeleteAllCharts = async () => {
    setIsDeletingAllCharts(true)

    await deleteAllCharts(icuIoId)

    toast({
      title: `${name}의 모든차트가 삭제되었습니다`,
    })

    setIsDeletingAllCharts(false)
    setSelectedPatientId(null)
    setIsOpen(false)
    refresh()
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
            <p>선택차트삭제 : {target_date}날 차트만 삭제합니다</p>
            <p>모든차트삭제 : 입원기간동안의 차트들을 삭제합니다</p>
            <p className="flex items-center gap-1 text-destructive">
              <AlertCircle size={18} /> 해당 작업은 되돌릴 수 없습니다
            </p>
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
