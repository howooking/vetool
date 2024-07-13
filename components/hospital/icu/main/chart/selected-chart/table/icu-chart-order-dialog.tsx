import IcuIconButton from '@/components/common/icu-icon-button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { useCreateOrderStore } from '@/lib/store/icu/create-order'
import { FilePlus } from 'lucide-react'
import { useParams } from 'next/navigation'
import IcuChartOrderForm from './icu-chart-order-form'

export default function IcuChartOrderDialog({
  chartId,
  ioId,
}: {
  chartId: string
  ioId: string
}) {
  const { target_date } = useParams()
  const { isOpen, isEditMode, setIsOpen, setIsEditMode, resetState } =
    useCreateOrderStore()
  const handleDialogOpen = () => {
    setIsOpen()
    setIsEditMode(false)
    resetState()
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <IcuIconButton icon={FilePlus} onClick={handleDialogOpen} />
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogDescription>{target_date}</DialogDescription>
          <DialogTitle>오더 {isEditMode ? '수정' : '추가'}</DialogTitle>
        </DialogHeader>
        <Separator />

        <IcuChartOrderForm chartId={chartId} ioId={ioId} />
      </DialogContent>
    </Dialog>
  )
}
