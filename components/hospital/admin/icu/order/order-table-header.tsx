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
import { TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useCreateOrderStore } from '@/lib/store/icu/create-order'
import type { Json } from '@/lib/supabase/database.types'
import { cn } from '@/lib/utils'
import { Plus } from 'lucide-react'

export default function OrderTableHeader({ orderColor }: { orderColor: Json }) {
  const { isModalOpen, toggleModal, isEditMode, setIsEditMode, resetState } =
    useCreateOrderStore()

  const handleAddDialogOpen = () => {
    setIsEditMode(false)
    resetState()
  }

  return (
    <TableHeader>
      <TableRow>
        <TableHead className="relative flex items-center justify-center gap-2 text-center">
          <span>오더 목록</span>

          <Dialog open={isModalOpen} onOpenChange={toggleModal}>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleAddDialogOpen}
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
              <OrderForm orderColor={orderColor} isSettingMode />
            </DialogContent>
          </Dialog>
        </TableHead>
      </TableRow>
    </TableHeader>
  )
}
