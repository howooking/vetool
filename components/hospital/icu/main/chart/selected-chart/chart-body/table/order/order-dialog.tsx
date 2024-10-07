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
import type { SelectedIcuOrder } from '@/types/icu/chart'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import OrdererSelectStep from './orderer/orderer-select-step'

export default function OrderDialog({
  icuChartId,
  orders,
  showOrderer,
}: {
  icuChartId: string
  orders: SelectedIcuOrder[]
  showOrderer: boolean
}) {
  const { step, isEditMode, setStep, reset } = useIcuOrderStore()
  const { refresh } = useRouter()

  const handleOpenChange = useCallback(() => {
    if (step === 'closed') {
      setStep('upsert')
    } else {
      setStep('closed')
      refresh()
    }
    reset()
  }, [step, setStep, reset, refresh])

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
        {step === 'upsert' && (
          <OrderForm showOrderer={showOrderer} icuChartId={icuChartId} />
        )}
        {step === 'selectOrderer' && (
          <OrdererSelectStep icuChartId={icuChartId} orders={orders} />
        )}
      </DialogContent>
    </Dialog>
  )
}
