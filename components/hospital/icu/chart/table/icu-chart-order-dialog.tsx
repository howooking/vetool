import IcuChartOrderForm from '@/components/hospital/icu/chart/table/icu-chart-order-form'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { useCreateOrderStore } from '@/lib/store/hospital/icu/chart/create-order'
import { useIcuSelectedDateStore } from '@/lib/store/hospital/icu/selected-date'
import { IcuChartOrderJoined } from '@/types/hospital'
import { FilePlus } from 'lucide-react'

export default function IcuChartOrderDialog({
  chartId,
  ioId,
}: {
  chartId: string
  ioId: string
}) {
  const { selectedDate } = useIcuSelectedDateStore()
  const { isOpen, setIsOpen, setMode, resetState } = useCreateOrderStore()
  const handleDialogOpen = () => {
    setIsOpen()
    setMode('create')
    resetState()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogOpen}>
      <DialogTrigger>
        <div className="flex w-full items-center rounded-md border border-black px-16 py-1">
          <span>처치 추가</span>
          <FilePlus size="16" strokeWidth={1.5} className="ml-2" />
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogDescription>{selectedDate}</DialogDescription>
          <DialogTitle>처치 추가</DialogTitle>
        </DialogHeader>
        <Separator />

        <IcuChartOrderForm chartId={chartId} ioId={ioId} />
      </DialogContent>
    </Dialog>
  )
}
