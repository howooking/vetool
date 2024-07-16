import { Dialog, DialogContent } from '@/components/ui/dialog'
import { useUpsertTxStore } from '@/lib/store/icu/upsert-tx'
import type { IcuUserList } from '@/types/icu'
import TxDetailInsertStep from './detail-insert-step/tx-detail-insert-step'
import TxSelectUserStep from './tx-select-user-step'

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
