import { Input } from '@/components/ui/input'
import { TableCell } from '@/components/ui/table'
import { deleteIcuChartTx } from '@/lib/services/icu/upsert-chart-tx'
import { useUpsertTxStore } from '@/lib/store/icu/upsert-tx'
import { cn } from '@/lib/utils'
import { IcuChartTx } from '@/types'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

export default function IcuChartTableCell({
  time,
  txData,
  icuIoId,
  icuChartOrderId,
  hasOrder,
  isDone,
  icuChartTxId,
}: {
  time: number
  txData: IcuChartTx | null
  icuIoId: string
  icuChartOrderId: string
  hasOrder: boolean
  isDone: boolean
  icuChartTxId?: string
}) {
  const { refresh } = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)
  const [briefTxResultInput, setBriefTxResultInput] = useState(
    txData?.icu_chart_tx_result ?? '',
  )
  const { setStep, setTxLocalState } = useUpsertTxStore()

  useEffect(() => {
    setBriefTxResultInput(txData?.icu_chart_tx_result ?? '')
  }, [txData?.icu_chart_tx_result])

  const longPressTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // const [txValue, setTxValue] = useState<TxState>({
  //   icu_chart_tx_result: txData?.icu_chart_tx_result ?? '',
  //   icu_chart_tx_comment: txData?.icu_chart_tx_comment ?? '',
  //   icu_chart_tx_images: txData?.icu_chart_tx_images ?? [],
  //   icu_chart_tx_log: (txData?.icu_chart_tx_log as TxLog[])?.slice(0, 5) ?? [],
  //   user_id: null,
  // })

  // useEffect(() => {
  //   setTxValue({
  //     icu_chart_tx_result: txData?.icu_chart_tx_result?.trim() ?? '',
  //     icu_chart_tx_comment: txData?.icu_chart_tx_comment?.trim() ?? '',
  //     icu_chart_tx_images: txData?.icu_chart_tx_images ?? [],
  //     icu_chart_tx_log: (txData?.icu_chart_tx_log as TxLog[]) ?? [],
  //     user_id: null,
  //   })
  // }, [txData])

  // const handleInputChange =
  //   (field: keyof TxState) => (e: React.ChangeEvent<HTMLInputElement>) => {
  //     setTxValue((prev) => ({ ...prev, [field]: e.target.value }))
  //   }

  const handleUpsertBriefTxResultInput = async () => {
    if (icuChartTxId && briefTxResultInput.trim() === '') {
      if (confirm('처치결과를 삭제하시겠습니까?')) {
        setIsDeleting(true)

        await deleteIcuChartTx(icuChartTxId, icuChartOrderId, time)

        setIsDeleting(false)
        refresh()
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

  // useEffect(() => {
  //   setTxLocalState(txData?.icu_chart_tx_result ?? '')
  // }, [txData?.icu_chart_tx_result])

  // const handleTxBlur = async () => {
  //   if (
  //     txValue.icu_chart_tx_result === (txData?.icu_chart_tx_result ?? '') &&
  //     txValue.icu_chart_tx_comment === (txData?.icu_chart_tx_comment ?? '')
  //   ) {
  //     return
  //   }

  //   setTxState({
  //     txState: txValue,
  //     txId: txId,
  //     ioId: icuIoId,
  //     chartOrderId: IcuChartOrderId,
  //     time,
  //     step: 'selectTxUser',
  //   })
  // // }

  // // 0.3초 이상 Mouse Down시 step 1
  // const handleTouchStart = (e: React.TouchEvent) => {
  //   e.preventDefault()

  //   setTxState({
  //     ioId: icuIoId,
  //     chartOrderId: IcuChartOrderId,
  //     time,
  //     txId: txId,

  //     txState: {
  //       ...txValue,
  //       user_id: null,
  //       icu_chart_tx_result: txData?.icu_chart_tx_result ?? '',
  //       icu_chart_tx_comment: txData?.icu_chart_tx_comment ?? '',
  //       icu_chart_tx_images: txData?.icu_chart_tx_images ?? [],
  //       icu_chart_tx_log: (txData?.icu_chart_tx_log as TxLog[]) ?? [],
  //     },
  //   })

  //   longPressTimeoutRef.current = setTimeout(() => {
  //     setTxState({ step: 'insertTxData' })
  //   }, 300)
  // }

  // const handleTouchEnd = (e: React.TouchEvent) => {
  //   e.preventDefault()

  //   if (longPressTimeoutRef.current) {
  //     clearTimeout(longPressTimeoutRef.current)
  //   }
  // }

  // const handleMouseDown = () => {
  //   setTxState({
  //     ioId: icuIoId,
  //     chartOrderId: IcuChartOrderId,
  //     time,
  //     txId: txId,
  //     txState: {
  //       ...txValue,
  //       user_id: null,
  //       icu_chart_tx_result: txData?.icu_chart_tx_result ?? '',
  //       icu_chart_tx_comment: txData?.icu_chart_tx_comment ?? '',
  //       icu_chart_tx_images: txData?.icu_chart_tx_images ?? [],
  //       icu_chart_tx_log: (txData?.icu_chart_tx_log as TxLog[]) ?? [],
  //     },
  //   })

  //   longPressTimeoutRef.current = setTimeout(() => {
  //     setTxState({ step: 'insertTxData' })
  //   }, 300)
  // }

  // const handleMouseUp = () => {
  //   if (longPressTimeoutRef.current) {
  //     clearTimeout(longPressTimeoutRef.current)
  //   }
  // }

  return (
    <TableCell className="p-0">
      <Input
        className={cn(
          'rounded-none border-none border-primary px-1 text-center outline-none ring-inset ring-primary focus-visible:ring-2 focus-visible:ring-primary',
          hasOrder && 'bg-rose-50',
          isDone && 'bg-green-50',
        )}
        disabled={isDeleting}
        value={briefTxResultInput}
        onChange={(e) => setBriefTxResultInput(e.target.value)}
        onBlur={handleUpsertBriefTxResultInput}
        onKeyDown={(e) => e.key === 'Enter' && e.currentTarget.blur()}
        // onTouchStart={handleTouchStart}
        // onTouchEnd={handleTouchEnd}
        // onTouchCancel={handleTouchEnd}
        // onMouseDown={handleMouseDown}
        // onMouseUp={handleMouseUp}
        // onMouseLeave={handleMouseUp}
      />
    </TableCell>
  )
}
