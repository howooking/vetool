'use client'

import { useState, useCallback } from 'react'
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
import type { Patient, SelectedIcuOrder } from '@/types/icu/chart'
import { Plus } from 'lucide-react'
import OrdererSelectStep from './orderer/orderer-select-step'

export default function OrderDialog({
  icuChartId,
  orders,
  showOrderer,
  patient,
  weight,
  ageInDays,
}: {
  icuChartId: string
  orders: SelectedIcuOrder[]
  showOrderer: boolean
  patient: Patient
  weight: string
  ageInDays: number
}) {
  const { step, isEditMode, setStep, reset } = useIcuOrderStore()

  const handleOpenChange = useCallback(() => {
    if (step === 'closed') {
      setStep('upsert')
    } else {
      setStep('closed')
    }
    reset()
  }, [step, setStep, reset])

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
          <OrderForm
            showOrderer={showOrderer}
            icuChartId={icuChartId}
            species={patient.species}
            weight={weight}
            ageInDays={ageInDays}
          />
        )}
        {step === 'selectOrderer' && (
          <OrdererSelectStep icuChartId={icuChartId} orders={orders} />
        )}
      </DialogContent>
    </Dialog>
  )
}
