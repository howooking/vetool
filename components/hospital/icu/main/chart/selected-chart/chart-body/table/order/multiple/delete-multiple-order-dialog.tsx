import WarningMessage from '@/components/common/warning-message'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { deleteOrder } from '@/lib/services/icu/chart/order-mutation'
import { useIcuOrderStore } from '@/lib/store/icu/icu-order'
import type { SelectedIcuOrder } from '@/types/icu/chart'

export default function DeleteMultipleOrderDialog() {
  const { setStep, reset, orderPendingQueue } = useIcuOrderStore()

  const handleDeleteOrderClick = async () => {
    // await deleteOrder(selectedChartOrder.order_id!)

    toast({
      title: `오더를 모두 삭제하였습니다`,
    })

    reset()
    setStep('closed')
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          type="button"
          className="mr-auto"
          variant="destructive"
          tabIndex={-1}
        >
          모두 삭제
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>오더 모두 삭제</AlertDialogTitle>
          <AlertDialogDescription>
            선택한 오더 전부를 삭제합니다
            <WarningMessage text="해당작업은 실행 후 되될릴 수 없습니다." />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>취소</AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive hover:bg-destructive/80"
            onClick={handleDeleteOrderClick}
          >
            삭제
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
