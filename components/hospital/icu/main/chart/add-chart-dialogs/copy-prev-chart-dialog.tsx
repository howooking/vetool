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
import { copyPrevChart } from '@/lib/services/icu/add-icu-chart'
import { cn } from '@/lib/utils'
import { ClipboardPaste, LoaderCircle } from 'lucide-react'
import { useState } from 'react'

export default function CopyPrevChartDialog({
  targetDate,
  selectedPatient,
  setIsCreatingChart,
}: {
  targetDate: string
  selectedPatient: {
    patientName: string
    patientId: string
  }
  setIsCreatingChart: (isCreatingChart: boolean) => void
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleCopyPrevSelectedChart = async () => {
    setIsSubmitting(true)
    setIsCreatingChart(true)

    const { error } = await copyPrevChart(targetDate, selectedPatient.patientId)

    if (error) {
      toast({
        title: '전날 차트를 복사할 수 없습니다',
        description: '전날 차트가 있는지 확인해주세요',
        variant: 'destructive',
      })
      setIsCreatingChart(false)
      setIsSubmitting(false)
      setIsDialogOpen(false)
      return
    }

    toast({
      title: '전날 차트를 복사하였습니다',
    })
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
          <ClipboardPaste />
          <span>전일 차트복사</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>전일차트복사</DialogTitle>
          <DialogDescription>
            전일차트를 복사하여 {targetDate} 차트가 생성됩니다
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              취소
            </Button>
          </DialogClose>
          <Button onClick={handleCopyPrevSelectedChart} disabled={isSubmitting}>
            복사
            <LoaderCircle
              className={cn(isSubmitting ? 'ml-2 animate-spin' : 'hidden')}
            />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
