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
import { pasteChartOrder } from '@/lib/services/icu/paste-order'
import { useCopiedChartStore } from '@/lib/store/icu/copied-chart'
import { cn } from '@/lib/utils'
import { Bookmark, LoaderCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
export default function PasteChartDialog({
  targetDate,
  selectedPatient,
}: {
  targetDate: string
  selectedPatient: {
    patientName: string
    patientId: string
  }
}) {
  const { refresh } = useRouter()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { copiedChartId, copiedChartOrder } = useCopiedChartStore()

  const handlePasteSelectedChart = async () => {
    setIsSubmitting(true)

    await pasteChartOrder(
      targetDate,
      selectedPatient.patientId,
      copiedChartId,
      copiedChartOrder,
    )

    toast({
      title: '복사한 차트를 붙여넣었습니다',
    })

    refresh()
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
          <Bookmark />
          <span>복사한 차트 붙여넣기</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>복사한 차트 붙여넣기</DialogTitle>
          <DialogDescription>
            복사한 차트를 붙여넣어 차트가 생성됩니다
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              취소
            </Button>
          </DialogClose>
          <Button disabled={isSubmitting} onClick={handlePasteSelectedChart}>
            불러오기
            <LoaderCircle
              className={cn(isSubmitting ? 'ml-2 animate-spin' : 'hidden')}
            />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
