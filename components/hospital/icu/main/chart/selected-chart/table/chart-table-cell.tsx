import { Input } from '@/components/ui/input'
import { TableCell } from '@/components/ui/table'
import { toast } from '@/components/ui/use-toast'
import { useUpsertTxStore } from '@/lib/store/icu/upsert-tx'
import { cn } from '@/lib/utils'
import type { IcuChartTx } from '@/types'
import type { TxLog } from '@/types/icu'
import { LoaderCircle } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'

export default function ChartTableCell({
  time,
  txData,
  icuIoId,
  icuChartOrderId,
  hasOrder,
  isDone,
  icuChartTxId,
  preview,
}: {
  time: number
  txData: IcuChartTx | null
  icuIoId: string
  icuChartOrderId: string
  hasOrder: boolean
  isDone: boolean
  icuChartTxId?: string
  preview?: boolean
}) {
  const [briefTxResultInput, setBriefTxResultInput] = useState(
    txData?.icu_chart_tx_result ?? '',
  )
  const { txLocalState, setStep, setTxLocalState, step, isTxUpserting } =
    useUpsertTxStore()

  useEffect(() => {
    if (step === 'closed') {
      setBriefTxResultInput(txData?.icu_chart_tx_result ?? '')
    }
  }, [txData?.icu_chart_tx_result, step])

  const longPressTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleUpsertBriefTxResultInput = async () => {
    if ((txData?.icu_chart_tx_result ?? '') === briefTxResultInput.trim()) {
      setBriefTxResultInput(briefTxResultInput.trim())
      return
    }

    if (icuChartTxId && briefTxResultInput.trim() === '') {
      toast({
        title: '결과값을 입력해주세요',
        variant: 'destructive',
      })
      setBriefTxResultInput(txData?.icu_chart_tx_result ?? '')
      return
    }

    setTxLocalState({
      time,
      txResult: briefTxResultInput.trim(),
      icuChartOrderId,
      icuIoId,
      txId: icuChartTxId,
    })

    setStep('seletctUser')
  }

  const handleLongClickStart = () => {
    setTxLocalState({
      icuChartOrderId,
      icuIoId,
      txResult: txData?.icu_chart_tx_result,
      txComment: txData?.icu_chart_tx_comment,
      txImages: txData?.icu_chart_tx_images,
      txId: icuChartTxId,
      time,
      txLog: txData?.icu_chart_tx_log as TxLog[] | null,
    })

    longPressTimeoutRef.current = setTimeout(() => {
      setBriefTxResultInput(txData?.icu_chart_tx_result ?? '')
      setStep('detailInsert')
    }, 500)
  }

  const handleLongClickEnd = () => {
    if (longPressTimeoutRef.current) {
      clearTimeout(longPressTimeoutRef.current)
    }
  }

  const targetedIsUpserting = useMemo(
    () =>
      isTxUpserting &&
      time === txLocalState?.time &&
      txLocalState.icuChartOrderId === icuChartOrderId,
    [
      icuChartOrderId,
      isTxUpserting,
      time,
      txLocalState?.icuChartOrderId,
      txLocalState?.time,
    ],
  )

  return (
    <TableCell className="p-0">
      {targetedIsUpserting ? (
        <LoaderCircle className="mx-auto animate-spin text-muted-foreground" />
      ) : (
        <Input
          id={`${icuChartOrderId}-tx-result-${time}`}
          className={cn(
            'rounded-none border-none border-primary px-1 text-center outline-none ring-inset ring-primary focus-visible:ring-2 focus-visible:ring-primary',
            hasOrder && 'bg-rose-100/60',
            isDone && 'bg-green-100/60',
          )}
          disabled={preview || isTxUpserting}
          value={briefTxResultInput}
          onChange={(e) => setBriefTxResultInput(e.target.value)}
          onBlur={handleUpsertBriefTxResultInput}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              const target = e.currentTarget
              setTimeout(() => {
                if (target) {
                  target.blur()
                }
              }, 0)
            }
          }}
          onTouchStart={handleLongClickStart}
          onTouchEnd={handleLongClickEnd}
          onTouchCancel={handleLongClickEnd}
          onMouseDown={handleLongClickStart}
          onMouseUp={handleLongClickEnd}
          onMouseLeave={handleLongClickEnd}
        />
      )}
    </TableCell>
  )
}
