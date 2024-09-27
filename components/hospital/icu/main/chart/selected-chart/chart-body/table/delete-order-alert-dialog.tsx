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
import { deleteDefaultChartOrder } from '@/lib/services/icu/hospital-orders'
import { deleteOrder } from '@/lib/services/icu/order-mutation'
import { useCreateOrderStore } from '@/lib/store/icu/create-order'
import type { SelectedIcuOrder } from '@/types/icu'
import { useRouter } from 'next/navigation'

export default function DeleteOrderAlertDialog({
  selectedChartOrder,
  toggleModal,
  isDefaultOrderSetting,
}: {
  selectedChartOrder: SelectedIcuOrder
  toggleModal: () => void
  isDefaultOrderSetting?: boolean
}) {
  const { refresh } = useRouter()
  const { defaultChartId } = useCreateOrderStore()

  const handleDeleteOrderClick = async () => {
    if (isDefaultOrderSetting && defaultChartId) {
      await deleteDefaultChartOrder(defaultChartId)
      toggleModal()
      refresh()
      return
    }

    await deleteOrder(selectedChartOrder.order_id)

    toast({
      title: `${selectedChartOrder.order_name} 오더를 삭제하였습니다`,
    })
    toggleModal()
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
          삭제
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {selectedChartOrder.order_name} 오더 삭제
          </AlertDialogTitle>
          <AlertDialogDescription>
            선택한 오더를 삭제합니다
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
