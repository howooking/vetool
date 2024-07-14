import { Input } from '@/components/ui/input'
import { TableCell } from '@/components/ui/table'
import { useUpsertTxStore } from '@/lib/store/icu/upsert-tx'
import { cn } from '@/lib/utils'
import { IcuChartTx } from '@/types'
import type { TxLog, TxState } from '@/types/icu'
import { useEffect, useRef, useState } from 'react'

export default function IcuChartTableCell({
  hour,
  txData,
  icuIoId,
  IcuChartOrderId,
  hasOrder,
  isDone,
}: {
  hour: number
  txData: IcuChartTx | null
  icuIoId: string
  IcuChartOrderId: string
  hasOrder: boolean
  isDone: boolean
}) {
  const txId = txData?.icu_chart_tx_id!
  const { setUpsertTxState } = useUpsertTxStore()
  const longPressTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const [txValue, setTxValue] = useState<TxState>({
    icu_chart_tx_result: txData?.icu_chart_tx_result ?? '',
    icu_chart_tx_comment: txData?.icu_chart_tx_comment ?? '',
    icu_chart_tx_images: txData?.icu_chart_tx_images ?? [],
    icu_chart_tx_log: (txData?.icu_chart_tx_log as TxLog[])?.slice(0, 5) ?? [],
    user_id: null,
  })

  useEffect(() => {
    setTxValue({
      icu_chart_tx_result: txData?.icu_chart_tx_result?.trim() ?? '',
      icu_chart_tx_comment: txData?.icu_chart_tx_comment?.trim() ?? '',
      icu_chart_tx_images: txData?.icu_chart_tx_images ?? [],
      icu_chart_tx_log: (txData?.icu_chart_tx_log as TxLog[]) ?? [],
      user_id: null,
    })
  }, [txData])

  const handleInputChange =
    (field: keyof TxState) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setTxValue((prev) => ({ ...prev, [field]: e.target.value }))
    }

  const handleTxBlur = async () => {
    if (
      txValue.icu_chart_tx_result === (txData?.icu_chart_tx_result ?? '') &&
      txValue.icu_chart_tx_comment === (txData?.icu_chart_tx_comment ?? '')
    ) {
      return
    }

    setUpsertTxState({
      txState: txValue,
      txId: txId,
      ioId: icuIoId,
      chartOrderId: IcuChartOrderId,
      time: hour,
      step: 'selectTxUser',
    })
  }

  // 0.3초 이상 Mouse Down시 step 1
  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault()

    setUpsertTxState({
      ioId: icuIoId,
      chartOrderId: IcuChartOrderId,
      time: hour,
      txId: txId,

      txState: {
        ...txValue,
        user_id: null,
        icu_chart_tx_result: txData?.icu_chart_tx_result ?? '',
        icu_chart_tx_comment: txData?.icu_chart_tx_comment ?? '',
        icu_chart_tx_images: txData?.icu_chart_tx_images ?? [],
        icu_chart_tx_log: (txData?.icu_chart_tx_log as TxLog[]) ?? [],
      },
    })

    longPressTimeoutRef.current = setTimeout(() => {
      setUpsertTxState({ step: 'insertTxData' })
    }, 300)
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.preventDefault()

    if (longPressTimeoutRef.current) {
      clearTimeout(longPressTimeoutRef.current)
    }
  }

  const handleMouseDown = () => {
    setUpsertTxState({
      ioId: icuIoId,
      chartOrderId: IcuChartOrderId,
      time: hour,
      txId: txId,
      txState: {
        ...txValue,
        user_id: null,
        icu_chart_tx_result: txData?.icu_chart_tx_result ?? '',
        icu_chart_tx_comment: txData?.icu_chart_tx_comment ?? '',
        icu_chart_tx_images: txData?.icu_chart_tx_images ?? [],
        icu_chart_tx_log: (txData?.icu_chart_tx_log as TxLog[]) ?? [],
      },
    })

    longPressTimeoutRef.current = setTimeout(() => {
      setUpsertTxState({ step: 'insertTxData' })
    }, 300)
  }

  const handleMouseUp = () => {
    if (longPressTimeoutRef.current) {
      clearTimeout(longPressTimeoutRef.current)
    }
  }

  return (
    <TableCell className="p-0">
      <Input
        className={cn(
          'rounded-none border-none px-1 text-center focus-visible:ring-4 focus-visible:ring-primary',
          hasOrder && 'bg-rose-100',
          isDone && 'bg-green-100',
        )}
        value={txValue.icu_chart_tx_result ?? ''}
        onChange={handleInputChange('icu_chart_tx_result')}
        onBlur={handleTxBlur}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      />
    </TableCell>
  )
}
