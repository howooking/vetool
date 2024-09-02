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
import { deleteOrder } from '@/lib/services/icu/create-new-order'
import { deleteHospitalOrder } from '@/lib/services/icu/hospital-orders'
import { cn } from '@/lib/utils'
import type { IcuChartOrderJoined } from '@/types/icu'
import { LoaderCircle } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'

export default function DeleteOrderAlertDialog({
  selectedChartOrder,
  toggleModal,
  isSettingMode,
}: {
  selectedChartOrder: IcuChartOrderJoined
  toggleModal: () => void
  isSettingMode?: boolean
}) {
  const [isDeleting, setIsDeleting] = useState(false)
  const { hos_id } = useParams()
  const { refresh } = useRouter()

  const handleDeleteOrderClick = async () => {
    setIsDeleting(true)

    if (isSettingMode) {
      await deleteHospitalOrder(hos_id as string, {
        hos_order_names: selectedChartOrder.icu_chart_order_name,
        hos_order_comments: selectedChartOrder.icu_chart_order_comment ?? '',
        hos_order_types: selectedChartOrder.icu_chart_order_type,
      })

      refresh()
    } else {
      await deleteOrder(selectedChartOrder.icu_chart_order_id)
    }

    toast({
      title: `${selectedChartOrder.icu_chart_order_name} 오더를 삭제하였습니다`,
    })
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
