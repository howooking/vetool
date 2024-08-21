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
import { pasteChart } from '@/lib/services/icu/paste-chart'
import { useCopiedChartStore } from '@/lib/store/icu/copied-chart'
import { cn } from '@/lib/utils'
import { CopyCheck, LoaderCircle } from 'lucide-react'
import { useState } from 'react'
export default function PasteCopiedChartDialog({
  targetDate,
  selectedPatientId,
  setIsCreatingChart,
}: {
  targetDate: string
  selectedPatientId: string
  setIsCreatingChart: (isCreatingChart: boolean) => void
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const {
    copiedChartId,
    copiedOrders: copiedChartOrder,
    reset,
  } = useCopiedChartStore()

  const handlePasteCopiedChart = async () => {
    if (!copiedChartId || !copiedChartOrder) {
      setIsDialogOpen(false)

      toast({
        title: '차트 붙여넣기 실패',
        description: '차트를 먼저 복사해주세요',
        variant: 'destructive',
      })
      return
    }

    setIsSubmitting(true)
    setIsCreatingChart(true)

    await pasteChart(selectedPatientId, copiedChartOrder, targetDate)

    toast({
      title: '차트를 붙여넣었습니다',
      description: '복사한 차트는 클립보드에서 제거됩니다',
    })

    reset()
    setIsDialogOpen(false)
    setIsSubmitting(false)
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="flex h-1/3 w-1/4 items-center justify-center gap-2"
        >
          <CopyCheck />
          <span>복사한 차트 붙여넣기</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>복사한 차트 생성</DialogTitle>
          <DialogDescription>
            클립보드에 복사한 차트를 붙여넣어 차트가 생성됩니다
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              취소
            </Button>
          </DialogClose>
          <Button disabled={isSubmitting} onClick={handlePasteCopiedChart}>
            붙여넣기
            <LoaderCircle
              className={cn(isSubmitting ? 'ml-2 animate-spin' : 'hidden')}
            />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
