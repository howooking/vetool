import { Input } from '@/components/ui/input'
import { TableCell } from '@/components/ui/table'
import { useLongPress } from '@/hooks/use-long-press'
import { useTxMutationStore } from '@/lib/store/icu/tx-mutation'
import { cn } from '@/lib/utils'
import type { Treatment, TxLog } from '@/types/icu/chart'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import type { DebouncedState } from 'use-debounce'
import { TxDetailHover } from './tx/tx-detail-hover'
import { useSearchParams } from 'next/navigation'

type ChartTableCellProps = {
  time: number
  treatment?: Treatment
  icuIoId: string
  icuChartOrderId: string
  icuChartOrderName: string
  isDone: boolean
  icuChartTxId?: string
  preview?: boolean
  hasOrder: boolean
  toggleOrderTime: (time: number) => void
  handleUpdateOrderTime: DebouncedState<() => void>
}

const Cell: React.FC<ChartTableCellProps> = React.memo(
  ({
    time,
    treatment,
    icuIoId,
    icuChartOrderId,
    icuChartOrderName,
    isDone,
    icuChartTxId,
    preview,
    hasOrder,
    toggleOrderTime,
    handleUpdateOrderTime,
  }) => {
    const [briefTxResultInput, setBriefTxResultInput] = useState('')
    const [isFocused, setIsFocused] = useState(false)

    const {
      isMutationCanceled,
      setIsMutationCanceled,
      setStep,
      setTxLocalState,
    } = useTxMutationStore()

    const searchParams = useSearchParams()
    const params = new URLSearchParams(searchParams)
    const orderId = params.get('order-id')
    const orderTime = params.get('time')

    useEffect(() => {
      const cellInputId = document.getElementById(`${orderId}&${orderTime}`)

      if (cellInputId) cellInputId.focus()
    }, [orderId, orderTime])

    useEffect(() => {
      if (treatment?.tx_result || isMutationCanceled) {
        setBriefTxResultInput('')
        setIsMutationCanceled(false)
      }
    }, [isMutationCanceled, setIsMutationCanceled, treatment?.tx_result])

    const handleOpenTxDetail = useCallback(() => {
      setTxLocalState({
        icuChartOrderId,
        icuIoId,
        txResult: treatment?.tx_result,
        txComment: treatment?.tx_comment,
        txId: icuChartTxId,
        time,
        txLog: treatment?.tx_log as TxLog[] | null,
        orderName: icuChartOrderName,
      })
      setStep('detailInsert')
    }, [
      icuChartOrderId,
      icuChartOrderName,
      icuChartTxId,
      icuIoId,
      setStep,
      setTxLocalState,
      time,
      treatment?.tx_comment,
      treatment?.tx_log,
      treatment?.tx_result,
    ])

    const longPressEvents = useLongPress({
      onLongPress: handleOpenTxDetail,
      delay: 800,
    })

    const handleRightClick = useCallback(
      (e: React.MouseEvent<HTMLInputElement>) => {
        e.preventDefault()
        toggleOrderTime(time)
        handleUpdateOrderTime()
      },
      [handleUpdateOrderTime, time, toggleOrderTime],
    )

    const handleUpsertBriefTxResultInput = useCallback(async () => {
      if ((treatment?.tx_result ?? '') === briefTxResultInput.trim()) {
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
      treatment?.tx_result,
    ])

    const handleKeyDown = useCallback(
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

    const hasComment = useMemo(
      () => !!treatment?.tx_comment,
      [treatment?.tx_comment],
    )

    return (
      <TableCell className="p-0">
        <div className="relative overflow-hidden">
          <Input
            id={`${icuChartOrderId}&${time}`}
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
            {treatment?.tx_result ?? ''}
          </div>
          {hasComment && <TxDetailHover txComment={treatment?.tx_comment} />}
        </div>
      </TableCell>
    )
  },
)

Cell.displayName = 'Cell'

export default Cell
