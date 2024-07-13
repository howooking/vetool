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
import { deleteOrder } from '@/lib/services/icu/create-new-order'
import { cn } from '@/lib/utils'
import type { IcuChartOrderJoined } from '@/types/icu'
import { LoaderCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function DeleteOrderAlertDialog({
  selectedChartOrder,
  toggleModal,
}: {
  selectedChartOrder: IcuChartOrderJoined
  toggleModal: () => void
}) {
  const [isDeleting, setIsDeleting] = useState(false)

  const { refresh } = useRouter()

  const handleDeleteOrderClick = async () => {
    setIsDeleting(true)

    await deleteOrder(selectedChartOrder.icu_chart_order_id)

    refresh()
    toggleModal()
    setIsDeleting(false)
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          type="button"
          className="mr-auto"
          variant="destructive"
          disabled={isDeleting}
        >
          삭제
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {selectedChartOrder.icu_chart_order_name} 오더 삭제
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
            <LoaderCircle
              className={cn(isDeleting ? 'ml-2 animate-spin' : 'hidden')}
            />
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
