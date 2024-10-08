'use client'

import TxDetailInsertStep from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/tx/detail-insert-step/tx-detail-insert-step'
import TxSelectUserStep from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/tx/tx-select-user-step'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { useTxMutationStore } from '@/lib/store/icu/tx-mutation'
import { useCallback } from 'react'

export default function TxUpsertDialog() {
  const { step, setStep, reset, setIsMutationCanceled } = useTxMutationStore()

  const handleClose = useCallback(() => {
    setStep('closed')
    setIsMutationCanceled(true)
    reset()
  }, [setStep, setIsMutationCanceled, reset])

  return (
    <Dialog open={step !== 'closed'} onOpenChange={handleClose}>
      <DialogContent>
        {step === 'detailInsert' && <TxDetailInsertStep />}

        {step === 'seletctUser' && <TxSelectUserStep />}
      </DialogContent>
    </Dialog>
  )
}
