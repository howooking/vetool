'use client'

import OrderForm from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/order/order-form'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useIcuOrderStore } from '@/lib/store/icu/icu-order'
import { Plus } from 'lucide-react'
import { useCallback } from 'react'
import OrdererSelectStep from './orderer/orderer-select-step'

export default function OrderDialog({ icuChartId }: { icuChartId: string }) {
  const { step, isEditMode, setStep, reset } = useIcuOrderStore()

  const handleOpenChange = useCallback(() => {
    step === 'closed' ? setStep('upsert') : setStep('closed')
    reset()
  }, [step, reset, setStep])

  return (
    <Dialog open={step !== 'closed'} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleOpenChange}
          className="absolute right-1 top-0.5"
        >
          <Plus size={18} />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          {step === 'upsert' && (
            <DialogTitle>오더 {isEditMode ? '수정' : '추가'}</DialogTitle>
          )}
          {step === 'selectOrderer' && <DialogTitle>수의사 선택</DialogTitle>}
          <DialogDescription />
        </DialogHeader>
        {step === 'upsert' && <OrderForm />}
        {step === 'selectOrderer' && (
          <OrdererSelectStep icuChartId={icuChartId} />
        )}
      </DialogContent>
    </Dialog>
  )
}
