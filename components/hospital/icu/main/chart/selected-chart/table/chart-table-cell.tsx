import { Input } from '@/components/ui/input'
import { TableCell } from '@/components/ui/table'
import { deleteIcuChartTx } from '@/lib/services/icu/upsert-chart-tx'
import { useUpsertTxStore } from '@/lib/store/icu/upsert-tx'
import { cn } from '@/lib/utils'
import type { IcuChartTx } from '@/types'
import type { TxLog } from '@/types/icu'
import { LoaderCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

export default function ChartTableCell({
  time,
  txData,
  icuIoId,
  icuChartOrderId,
  hasOrder,
  isDone,
  icuChartTxId,
  isPreview,
}: {
  time: number
  txData: IcuChartTx | null
  icuIoId: string
  icuChartOrderId: string
  hasOrder: boolean
  isDone: boolean
  icuChartTxId?: string
  isPreview?: boolean
}) {
  const { refresh } = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)
  const [briefTxResultInput, setBriefTxResultInput] = useState(
    txData?.icu_chart_tx_result ?? '',
  )
  const { setStep, setTxLocalState, step } = useUpsertTxStore()

  useEffect(() => {
    if (step === 'closed') {
      setBriefTxResultInput(txData?.icu_chart_tx_result ?? '')
    }
  }, [txData?.icu_chart_tx_result, step])

  const longPressTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleUpsertBriefTxResultInput = async () => {
    if (icuChartTxId && briefTxResultInput.trim() === '') {
      if (confirm('처치결과를 삭제하시겠습니까?')) {
        setIsDeleting(true)

        await deleteIcuChartTx(icuChartTxId, icuChartOrderId, time)

        setIsDeleting(false)
        refresh()
        return
      } else {
        setBriefTxResultInput(txData?.icu_chart_tx_result ?? '')
        return
      }
    }

    if ((txData?.icu_chart_tx_result ?? '') === briefTxResultInput.trim()) {
      setBriefTxResultInput(briefTxResultInput.trim())
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
      txUserId: txData?.user_id,
    })

    longPressTimeoutRef.current = setTimeout(() => {
      setBriefTxResultInput(txData?.icu_chart_tx_result ?? '')
      setStep('detailInsert')
    }, 300)
  }

  const handleLongClickEnd = () => {
    if (longPressTimeoutRef.current) {
      clearTimeout(longPressTimeoutRef.current)
    }
  }

  return (
    <TableCell className="p-0">
      {isDeleting ? (
        <LoaderCircle className="mx-auto animate-spin text-muted-foreground opacity-50" />
      ) : (
        <Input
          className={cn(
            'rounded-none border-none border-primary px-1 text-center outline-none ring-inset ring-primary focus-visible:ring-2 focus-visible:ring-primary',
            hasOrder && 'bg-rose-50/60',
            isDone && 'bg-green-50/60',
          )}
          disabled={isDeleting || isPreview}
          value={briefTxResultInput}
          onChange={(e) => setBriefTxResultInput(e.target.value)}
          onBlur={handleUpsertBriefTxResultInput}
          onKeyDown={(e) => e.key === 'Enter' && e.currentTarget.blur()}
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
