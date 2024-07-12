import IcuChartTxImageInput from '@/components/hospital/icu/main/chart/selected-chart/table/tx/icu-chart-tx-image-input'
import IcuChartTxLog from '@/components/hospital/icu/main/chart/selected-chart/table/tx/icu-chart-tx-log'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toast } from '@/components/ui/use-toast'
import {
  updateIcuChartOrder,
  upsertIcuChartTx,
} from '@/lib/services/icu/upsert-chart-tx'
import { useUpsertTxStore } from '@/lib/store/icu/upsert-tx'
import { cn } from '@/lib/utils'
import type { IcuVetList, TxLog, TxState } from '@/types/icu'
import { format } from 'date-fns'
import { LoaderCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function IcuChartUpsertTxDialog({
  vetsData,
}: {
  vetsData: IcuVetList[]
}) {
  const { refresh } = useRouter()
  const { upsertTxState, setUpsertTxState } = useUpsertTxStore()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const fieldName = `icu_chart_order_tx_${upsertTxState.time}`
  const date = format(new Date(), 'yyyy-MM-dd HH:mm')

  // Dialog에서 사용할 txValue 선언
  const [txValue, setTxValue] = useState<TxState>({
    icu_chart_tx_result: upsertTxState.txState?.icu_chart_tx_result ?? '',
    icu_chart_tx_comment: upsertTxState.txState?.icu_chart_tx_comment ?? '',
    icu_chart_tx_images: upsertTxState.txState?.icu_chart_tx_images ?? [],
    icu_chart_tx_log:
      (upsertTxState.txState?.icu_chart_tx_log as TxLog[])?.slice(0, 5) ?? [],
    user_id: null,
  })

  // 로컬 state update
  useEffect(() => {
    setTxValue({
      icu_chart_tx_result:
        upsertTxState.txState?.icu_chart_tx_result?.trim() ?? '',
      icu_chart_tx_comment:
        upsertTxState.txState?.icu_chart_tx_comment?.trim() ?? '',
      icu_chart_tx_images: upsertTxState.txState?.icu_chart_tx_images ?? [],
      icu_chart_tx_log: upsertTxState.txState?.icu_chart_tx_log ?? [],
      user_id: null,
    })
  }, [upsertTxState])

  // 처치 담당자 선택 -> user_id 저장 핸들러
  const handleSelectUserId = (user_id: string) => {
    setTxValue({
      ...upsertTxState.txState,
      user_id: user_id,
    })
  }

  // STEP 1: 처치 결과 입력 후 STEP 2로 넘어가기 위한 핸들러
  const handleNextButtonClick = async () => {
    // 만약 변동 사항이 없다면 early return
    if (
      txValue.icu_chart_tx_result ===
        (upsertTxState.txState?.icu_chart_tx_result ?? '') &&
      txValue.icu_chart_tx_comment ===
        (upsertTxState.txState?.icu_chart_tx_comment ?? '') &&
      txValue.icu_chart_tx_images ===
        (upsertTxState.txState?.icu_chart_tx_images ?? [])
    ) {
      toast({
        variant: 'destructive',
        title: '변경 사항이 존재하지 않습니다',
      })

      return
    }

    setUpsertTxState({
      txState: txValue,
      step: 'selectTxUser',
    })
  }

  // STEP: 2 최종 TX Data UPSERT
  const handleUpsertTxClick = async () => {
    setIsSubmitting(true)

    // LOG 가공
    const newLog: TxLog = {
      result: txValue.icu_chart_tx_result,
      name:
        vetsData.find((vet) => vet.user_id === txValue.user_id)?.name ?? '유저',
      createdAt: date,
    }

    const uniqueLogSet = new Set(
      [...(txValue.icu_chart_tx_log || []), newLog].map((log) =>
        JSON.stringify(log),
      ),
    )

    const updatedLogs: TxLog[] = Array.from(uniqueLogSet).map((log) =>
      JSON.parse(log),
    )

    const chartTxData = await upsertIcuChartTx(
      upsertTxState.txId,
      upsertTxState.ioId,
      upsertTxState.chartOrderId,
      { ...txValue, icu_chart_tx_log: updatedLogs },
    )

    await updateIcuChartOrder(
      upsertTxState.chartOrderId,
      fieldName,
      chartTxData.icu_chart_tx_id,
    )

    setUpsertTxState({
      txState: {
        ...txValue,
      },
      step: 'closed',
    })

    toast({
      title: '처치 상세 내역',
      description: '처치 상세 내역이 업데이트 되었습니다',
    })

    setIsSubmitting(false)
    upsertTxState.step = 'closed'
    refresh()
  }

  const handleInputChange =
    (field: keyof TxState) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setTxValue((prev) => ({ ...prev, [field]: e.target.value }))
    }

  const handlePrevButtonClick = () => {
    setUpsertTxState({ step: 'insertTxData' })
  }

  return (
    <Dialog
      open={upsertTxState.step !== 'closed'}
      onOpenChange={() => setUpsertTxState({ step: 'closed' })}
    >
      <DialogContent className="p-4">
        <div className="absolute left-0 top-[-48px] w-full rounded-md bg-white p-4">
          <Progress value={upsertTxState.step === 'insertTxData' ? 50 : 100} />
        </div>

        {/* STEP 1: insertTxData */}
        {upsertTxState.step === 'insertTxData' && (
          <>
            <DialogHeader>
              <DialogTitle>TX 처치 입력</DialogTitle>
            </DialogHeader>

            <div className="grid gap-4 border p-4">
              {/* title */}
              <div className="flex">
                <div>
                  <h4 className="font-medium leading-none">처치 상세</h4>
                  <p className="text-sm text-muted-foreground">
                    처치 상세 내역을 입력해주세요
                  </p>
                </div>
              </div>

              <div className="grid gap-4">
                {/* tx_result */}
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="result">결과</Label>
                  <Input
                    id="result"
                    type="text"
                    value={txValue.icu_chart_tx_result ?? ''}
                    className="col-span-2 h-8"
                    onChange={handleInputChange('icu_chart_tx_result')}
                    placeholder="결과값 입력"
                  />
                </div>

                {/* tx_comment */}
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="comment">코멘트</Label>
                  <Input
                    id="comment"
                    value={txValue.icu_chart_tx_comment ?? ''}
                    className="col-span-2 h-8"
                    onChange={handleInputChange('icu_chart_tx_comment')}
                  />
                </div>

                {/* tx_images */}
                <IcuChartTxImageInput
                  images={txValue.icu_chart_tx_images}
                  onImagesChange={(newImages) =>
                    setTxValue((prev) => ({
                      ...prev,
                      icu_chart_tx_images: newImages,
                    }))
                  }
                />

                {/* tx_log */}
                <div className="flex items-center gap-4">
                  <IcuChartTxLog logs={txValue.icu_chart_tx_log} />
                </div>
              </div>
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setUpsertTxState({ step: 'closed' })}
                >
                  닫기
                </Button>
              </DialogClose>
              <Button type="button" onClick={handleNextButtonClick}>
                다음
                <LoaderCircle
                  className={cn(isSubmitting ? 'ml-2 animate-spin' : 'hidden')}
                />
              </Button>
            </DialogFooter>
          </>
        )}

        {/* STEP 2: selectTxUser */}
        {upsertTxState.step === 'selectTxUser' && (
          <>
            <DialogHeader>
              <DialogTitle>TX 담당자 선택</DialogTitle>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <Select onValueChange={handleSelectUserId}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="담당자 선택" />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    {vetsData.map((vet) => (
                      <SelectItem key={vet.user_id} value={vet.user_id}>
                        <span>{vet.name}</span>
                        <span className="ml-2 text-xs">
                          {vet.position ?? '미분류'}
                        </span>
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
                onClick={handlePrevButtonClick}
              >
                이전
              </Button>
              <Button
                type="button"
                onClick={handleUpsertTxClick}
                disabled={isSubmitting}
              >
                확인
                <LoaderCircle
                  className={cn(isSubmitting ? 'ml-2 animate-spin' : 'hidden')}
                />
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
