import IcuIconButton from '@/components/common/icu-icon-button'
import OrderForm from '@/components/hospital/icu/main/chart/selected-chart/table/order-form'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useCreateOrderStore } from '@/lib/store/icu/create-order'
import { FilePlus } from 'lucide-react'

export default function OrderDialog({
  icuIoId,
  icuChartId,
}: {
  icuIoId: string
  icuChartId: string
}) {
  const { isModalOpen, isEditMode, toggleModal, setIsEditMode, resetState } =
    useCreateOrderStore()
  const handleDialogOpen = () => {
    setIsEditMode(false)
    resetState()
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={toggleModal}>
      <DialogTrigger asChild>
        <IcuIconButton icon={FilePlus} onClick={handleDialogOpen} />
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>오더 {isEditMode ? '수정' : '추가'}</DialogTitle>
        </DialogHeader>
        <OrderForm icuIoId={icuIoId} icuChartId={icuChartId} />
      </DialogContent>
    </Dialog>
  )
}
