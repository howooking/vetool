import { Input } from '@/components/ui/input'
import { TableCell } from '@/components/ui/table'
import { useLongPress } from '@/hooks/use-long-press'
import { useTxMutationStore } from '@/lib/store/icu/tx-mutation'
import { cn } from '@/lib/utils'
import type { Treatment, TxLog } from '@/types/icu/chart'
import { useSearchParams } from 'next/navigation'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { TxDetailHover } from './tx/tx-detail-hover'

type ChartTableCellProps = {
  time: number
  treatment?: Treatment
  icuChartOrderId: string
  icuChartOrderName: string
  isDone: boolean
  icuChartTxId?: string
  preview?: boolean
  orderer: string
  toggleOrderTime: (orderId: string, time: number) => void
  showOrderer: boolean
}

const Cell: React.FC<ChartTableCellProps> = React.memo(
  ({
    time,
    treatment,
    icuChartOrderId,
    icuChartOrderName,
    isDone,
    icuChartTxId,
    preview,
    orderer,
    toggleOrderTime,
    showOrderer,
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
        toggleOrderTime(icuChartOrderId, time)
      },
      [icuChartOrderId, time, toggleOrderTime],
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
        txId: icuChartTxId,
      })
      setStep('seletctUser')
    }, [
      briefTxResultInput,
      icuChartOrderId,
      icuChartTxId,
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

    const hasOrder = useMemo(() => orderer !== '0', [orderer])

    return (
      <TableCell className="p-0">
        <div className="relative overflow-hidden">
          <Input
            id={`${icuChartOrderId}&${time}`}
            className={cn(
              'h-11 rounded-none border-none border-primary px-1 text-center outline-none ring-inset ring-primary focus-visible:ring-2 focus-visible:ring-primary',
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

          {hasOrder && showOrderer && (
            <div
              className={cn(
                'absolute bottom-0.5 right-0.5 -z-10 text-[10px] leading-none text-muted-foreground',
              )}
            >
              {orderer}
            </div>
          )}

          {hasComment && <TxDetailHover txComment={treatment?.tx_comment} />}
        </div>
      </TableCell>
    )
  },
)

Cell.displayName = 'Cell'

export default Cell
