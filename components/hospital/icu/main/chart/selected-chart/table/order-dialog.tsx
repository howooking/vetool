import OrderForm from '@/components/hospital/icu/main/chart/selected-chart/table/order-form'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useCreateOrderStore } from '@/lib/store/icu/create-order'
import type { Json } from '@/lib/supabase/database.types'
import { Plus } from 'lucide-react'

export default function OrderDialog({
  icuIoId,
  icuChartId,
  orderColor,
}: {
  icuIoId: string
  icuChartId: string
  orderColor?: Json
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
        <Button
          variant="ghost"
          size="icon"
          onClick={handleDialogOpen}
          className="absolute right-1 top-0.5"
        >
          <Plus size={18} />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>오더 {isEditMode ? '수정' : '추가'}</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <OrderForm
          icuIoId={icuIoId}
          icuChartId={icuChartId}
          orderColor={orderColor}
        />
      </DialogContent>
    </Dialog>
  )
}
