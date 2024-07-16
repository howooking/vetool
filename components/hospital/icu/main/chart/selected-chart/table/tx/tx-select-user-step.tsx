import { Button } from '@/components/ui/button'
import { DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toast } from '@/components/ui/use-toast'
import { upsertIcuChartTxAndUpdateIcuChartOrder } from '@/lib/services/icu/upsert-chart-tx'
import { useUpsertTxStore } from '@/lib/store/icu/upsert-tx'
import { cn } from '@/lib/utils'
import type { IcuUserList, TxLog } from '@/types/icu'
import { format } from 'date-fns'
import { LoaderCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function TxSelectUserStep({
  icuUsersData,
}: {
  icuUsersData: IcuUserList[]
}) {
  const { refresh } = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { txLocalState, setTxLocalState, reset } = useUpsertTxStore()

  const handleSelectUserId = (userId: string) => {
    setTxLocalState({ txUserId: userId })
  }

  const handleUpsertTx = async () => {
    setIsSubmitting(true)

    const newLog: TxLog = {
      result: txLocalState?.txResult ?? '',
      name:
        icuUsersData.find((vet) => vet.user_id === txLocalState?.txUserId)
          ?.name ?? '미선택',
      createdAt: format(new Date(), 'yyyy-MM-dd HH:mm'),
    }

    const updatedLogs = [...(txLocalState?.txLog ?? []), newLog]

    await upsertIcuChartTxAndUpdateIcuChartOrder(txLocalState, updatedLogs)

    toast({
      title: '처치 내역이 업데이트 되었습니다',
    })

    reset()
    setIsSubmitting(false)
    refresh()
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>담당자 선택</DialogTitle>
      </DialogHeader>

      <div className="grid gap-4 py-4">
        <Select
          onValueChange={handleSelectUserId}
          defaultValue={txLocalState?.txUserId || 'none'}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="담당자 선택" />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              {icuUsersData.map((user) => (
                <SelectItem key={user.user_id} value={user.user_id}>
                  <span>{user.name}</span>
                  <span className="ml-2 text-xs">{user.position}</span>
                </SelectItem>
              ))}

              <SelectItem value="none">
                <span>미선택</span>
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <DialogFooter>
        <Button type="button" onClick={handleUpsertTx} disabled={isSubmitting}>
          확인
          <LoaderCircle
            className={cn(isSubmitting ? 'ml-2 animate-spin' : 'hidden')}
          />
        </Button>
      </DialogFooter>
    </>
  )
}
