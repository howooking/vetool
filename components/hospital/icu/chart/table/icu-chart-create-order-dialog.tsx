import IcuChartCreateOrderForm from '@/components/hospital/icu/chart/table/icu-chart-create-order-form'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useIcuSelectedPatientStore } from '@/lib/store/hospital/icu/icu-selected-patient'
import { useIcuSelectedDateStore } from '@/lib/store/hospital/icu/selected-date'
import { FilePlus } from 'lucide-react'
import { useState } from 'react'

export default function IcuChartCreateOrderDialog({
  chartId,
  ioId,
}: {
  chartId: string
  ioId: string
}) {
  const [isOpen, setIsOpen] = useState(false)
  const { selectedPatientName: patientName } = useIcuSelectedPatientStore()
  const { selectedDate } = useIcuSelectedDateStore()

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <div className="flex w-full items-center rounded-md border border-black px-16 py-1">
          <span>처치 추가</span>
          <FilePlus size="16" strokeWidth={1.5} className="ml-2" />
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogDescription>{selectedDate}</DialogDescription>
          <DialogTitle>{patientName}님 처치 추가</DialogTitle>
        </DialogHeader>
        <IcuChartCreateOrderForm
          chartId={chartId}
          ioId={ioId}
          setIsOpen={setIsOpen}
        />
      </DialogContent>
    </Dialog>
  )
}
