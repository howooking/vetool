import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { toast } from '@/components/ui/use-toast'
import { pasteChart } from '@/lib/services/icu/chart/paste-chart'
import { useCopiedChartStore } from '@/lib/store/icu/copied-chart'
import { useParams } from 'next/navigation'
import type { Dispatch, SetStateAction } from 'react'

export function ConfirmCopyDialog({
  setIsChartLoading,
}: {
  setIsChartLoading: Dispatch<SetStateAction<boolean>>
}) {
  const { target_date, patient_id } = useParams()
  const {
    isConfirmCopyDialogOpen,
    setIsConfirmCopyDialogOpen,
    copiedChartId,
    reset,
  } = useCopiedChartStore()

  const handleConfirmCopy = async () => {
    setIsChartLoading(true)

    await pasteChart(
      patient_id as string,
      copiedChartId!,
      target_date as string,
    )

    toast({
      title: '차트를 생성하였습니다',
    })

    reset()
  }
  return (
    <Dialog
      open={isConfirmCopyDialogOpen}
      onOpenChange={setIsConfirmCopyDialogOpen}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>차트를 생성하시겠습니까?</DialogTitle>
          <DialogDescription />
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsConfirmCopyDialogOpen(false)}
            >
              취소
            </Button>
            <Button onClick={handleConfirmCopy}>확인</Button>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
