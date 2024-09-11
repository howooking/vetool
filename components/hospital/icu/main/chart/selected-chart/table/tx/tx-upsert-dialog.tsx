import TxDetailInsertStep from '@/components/hospital/icu/main/chart/selected-chart/table/tx/detail-insert-step/tx-detail-insert-step'
import TxSelectUserStep from '@/components/hospital/icu/main/chart/selected-chart/table/tx/tx-select-user-step'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { useTxMutationStore } from '@/lib/store/icu/tx-mutation'
import { useCallback } from 'react'

export default function TxUpsertDialog({ chartId }: { chartId: string }) {
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

        {step === 'seletctUser' && <TxSelectUserStep chartId={chartId} />}
      </DialogContent>
    </Dialog>
  )
}
