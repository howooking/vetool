import TxDetailInsertStep from '@/components/hospital/icu/main/chart/selected-chart/table/tx/detail-insert-step/tx-detail-insert-step'
import TxSelectUserStep from '@/components/hospital/icu/main/chart/selected-chart/table/tx/tx-select-user-step'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { useUpsertTxStore } from '@/lib/store/icu/upsert-tx'
import type { IcuUserList } from '@/types/icu'

export default function TxUpsertDialog({
  icuUsersData,
}: {
  icuUsersData: IcuUserList[]
}) {
  const { step, setStep } = useUpsertTxStore()

  return (
    <Dialog open={step !== 'closed'} onOpenChange={() => setStep('closed')}>
      <DialogContent>
        {step === 'detailInsert' && <TxDetailInsertStep />}

        {step === 'seletctUser' && (
          <TxSelectUserStep icuUsersData={icuUsersData} />
        )}
      </DialogContent>
    </Dialog>
  )
}
