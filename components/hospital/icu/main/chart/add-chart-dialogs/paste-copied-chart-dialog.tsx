/* eslint-disable react-hooks/exhaustive-deps */
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
import { pasteChart } from '@/lib/services/icu/chart/paste-chart'
import { useCopiedChartStore } from '@/lib/store/icu/copied-chart'
import { cn } from '@/lib/utils'
import { CopyCheck, LoaderCircle } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
export default function PasteCopiedChartDialog() {
  const { target_date, patient_id } = useParams()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { copiedChartId, reset } = useCopiedChartStore()
  const { refresh } = useRouter()

  const handlePasteCopiedChart = useCallback(async () => {
    if (!copiedChartId) {
      setIsDialogOpen(false)

      toast({
        title: '차트 붙여넣기 실패',
        description: '차트를 먼저 복사해주세요',
        variant: 'destructive',
      })
      return
    }

    setIsSubmitting(true)

    await pasteChart(patient_id as string, copiedChartId, target_date as string)

    toast({
      title: '차트를 붙여넣었습니다',
      description: '복사한 차트는 클립보드에서 제거됩니다',
    })

    reset()
    setIsDialogOpen(false)
    setIsSubmitting(false)
  }, [copiedChartId, patient_id, reset, target_date])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'v') {
        event.preventDefault()
        handlePasteCopiedChart()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handlePasteCopiedChart])

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="hidden h-[200px] w-full items-center justify-center gap-2 md:flex md:h-1/3 md:w-1/4"
        >
          <CopyCheck size={20} />
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

        <DialogFooter className="gap-2 md:gap-0">
          <DialogClose asChild>
            <Button type="button" variant="outline" tabIndex={-1}>
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
