import { Input } from '@/components/ui/input'
import { TableCell } from '@/components/ui/table'
import { useLongPress } from '@/hooks/use-long-press'
import { useTxMutationStore } from '@/lib/store/icu/tx-mutation'
import { cn } from '@/lib/utils'
import type { IcuChartTx } from '@/types'
import type { TxLog } from '@/types/icu'
import React, { useCallback, useEffect, useState } from 'react'
import { TxDetailHover } from './tx/tx-detail-hover'

type ChartTableCellProps = {
  time: number
  txData: IcuChartTx | null
  icuIoId: string
  icuChartOrderId: string
  icuChartOrderName: string
  hasOrder: boolean
  isDone: boolean
  icuChartTxId?: string
  preview?: boolean
}

const ChartTableCell: React.FC<ChartTableCellProps> = React.memo(
  ({
    time,
    txData,
    icuIoId,
    icuChartOrderId,
    icuChartOrderName,
    hasOrder,
    isDone,
    icuChartTxId,
    preview,
  }) => {
    const [briefTxResultInput, setBriefTxResultInput] = useState('')
    const [isFocused, setIsFocused] = useState(false)
    const {
      isMutationCanceled,
      setIsMutationCanceled,
      setStep,
      setTxLocalState,
    } = useTxMutationStore()

    useEffect(() => {
      if (txData?.icu_chart_tx_result || isMutationCanceled) {
        setBriefTxResultInput('')
        setIsMutationCanceled(false)
      }
    }, [isMutationCanceled, setIsMutationCanceled, txData?.icu_chart_tx_result])

    const longPressEvents = useLongPress({
      onLongPress: () => {
        setTxLocalState({
          icuChartOrderId,
          icuIoId,
          txResult: txData?.icu_chart_tx_result,
          txComment: txData?.icu_chart_tx_comment,
          txId: icuChartTxId,
          time,
          txLog: txData?.icu_chart_tx_log as TxLog[] | null,
          orderName: icuChartOrderName,
        })
        setStep('detailInsert')
      },
      delay: 800,
    })

    const handleRightClick = useCallback(
      (e: React.MouseEvent<HTMLInputElement>) => {
        e.preventDefault()
        setTxLocalState({
          icuChartOrderId,
          icuIoId,
          txResult: txData?.icu_chart_tx_result,
          txComment: txData?.icu_chart_tx_comment,
          txId: icuChartTxId,
          time,
          txLog: txData?.icu_chart_tx_log as TxLog[] | null,
          orderName: icuChartOrderName,
        })
        setStep('detailInsert')
      },
      [
        icuChartOrderId,
        icuIoId,
        txData,
        icuChartTxId,
        time,
        icuChartOrderName,
        setTxLocalState,
        setStep,
      ],
    )

    const handleUpsertBriefTxResultInput = React.useCallback(async () => {
      if ((txData?.icu_chart_tx_result ?? '') === briefTxResultInput.trim()) {
        setBriefTxResultInput('')
        return
      }
      if (icuChartTxId && briefTxResultInput.trim() === '') {
        setBriefTxResultInput('')
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
    }, [
      briefTxResultInput,
      icuChartOrderId,
      icuChartTxId,
      icuIoId,
      setStep,
      setTxLocalState,
      time,
      txData?.icu_chart_tx_result,
    ])

    const handleKeyDown = React.useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
          const target = e.currentTarget
          setTimeout(() => {
            if (target) {
              target.blur()
            }
          }, 0)
        }
      },
      [],
    )

    const hasComment = !!txData?.icu_chart_tx_comment

    return (
      <TableCell className="p-0">
        <div className="relative overflow-hidden">
          <Input
            id={`${icuChartOrderId}-${time}`}
            className={cn(
              'rounded-none border-none border-primary px-1 text-center outline-none ring-inset ring-primary focus-visible:ring-2 focus-visible:ring-primary',
              hasOrder && 'bg-rose-500/10',
              isDone && 'bg-emerald-400/10',
            )}
            onFocus={() => setIsFocused(true)}
            disabled={preview}
            value={briefTxResultInput}
            onChange={(e) => setBriefTxResultInput(e.target.value)}
            onBlur={() => {
              handleUpsertBriefTxResultInput()
              setIsFocused(false)
            }}
            onKeyDown={handleKeyDown}
            onContextMenu={handleRightClick}
            {...longPressEvents}
          />
          <div
            className={cn(
              'absolute inset-0 -z-10 flex items-center justify-center text-black transition',
              isFocused && 'opacity-20',
            )}
          >
            {txData?.icu_chart_tx_result ?? ''}
          </div>
          {hasComment && (
            <TxDetailHover txComment={txData?.icu_chart_tx_comment} />
          )}
        </div>
      </TableCell>
    )
  },
)

ChartTableCell.displayName = 'ChartTableCell'

export default ChartTableCell
