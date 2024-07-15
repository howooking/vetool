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
import type { IcuUserList } from '@/types/icu'
import { LoaderCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function IcuChartTxSelectUserStep({
  icuUsersData,
}: {
  icuUsersData: IcuUserList[]
}) {
  const { refresh } = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { setStep, txLocalState, setTxLocalState, reset } = useUpsertTxStore()

  const handleSelectUserId = (userId: string) => {
    setTxLocalState({ txUserId: userId })
  }

  const handleUpsertTx = async () => {
    setIsSubmitting(true)

    // // LOG 가공
    // const newLog: TxLog = {
    //   result: txValue.icu_chart_tx_result,
    //   name:
    //     icuUsersData.find((vet) => vet.user_id === txValue.user_id)?.name ??
    //     '유저',
    //   createdAt: date,
    // }

    // const uniqueLogSet = new Set(
    //   [...(txValue.icu_chart_tx_log || []), newLog].map((log) =>
    //     JSON.stringify(log),
    //   ),
    // )

    // const updatedLogs: TxLog[] = Array.from(uniqueLogSet).map((log) =>
    //   JSON.parse(log),
    // )

    await upsertIcuChartTxAndUpdateIcuChartOrder(
      txLocalState?.txId,
      txLocalState?.icuIoId,
      txLocalState?.icuChartOrderId,
      txLocalState,
      txLocalState?.time!,
    )

    toast({
      title: '처치 내역이 업데이트 되었습니다',
    })

    reset()
    setIsSubmitting(false)
    refresh()
  }

  // const handleInputChange =
  //   (field: keyof TxState) => (e: React.ChangeEvent<HTMLInputElement>) => {
  //     setTxValue((prev) => ({ ...prev, [field]: e.target.value }))
  //   }

  // const handlePrevButtonClick = () => {
  //   setUpsertTxState({ step: 'insertTxData' })
  // }

  return (
    <>
      <DialogHeader>
        <DialogTitle>담당자 선택</DialogTitle>
      </DialogHeader>

      <div className="grid gap-4 py-4">
        <Select onValueChange={handleSelectUserId}>
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
        <Button
          type="button"
          variant="outline"
          tabIndex={-1}
          // onClick={handlePrevButtonClick}
        >
          이전
        </Button>
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
