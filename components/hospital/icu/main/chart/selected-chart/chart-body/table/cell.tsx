import { Input } from '@/components/ui/input'
import { TableCell } from '@/components/ui/table'
import { useLongPress } from '@/hooks/use-long-press'
import { useIcuOrderStore } from '@/lib/store/icu/icu-order'
import { useTxMutationStore } from '@/lib/store/icu/tx-mutation'
import { cn } from '@/lib/utils'
import type { Treatment, TxLog } from '@/types/icu/chart'
import { useSearchParams } from 'next/navigation'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { TxDetailHover } from './tx/tx-detail-hover'
import useIsCommandPressed from '@/hooks/use-is-command-pressed'

type CellProps = {
  time: number
  treatment?: Treatment
  icuChartOrderId: string
  isDone: boolean
  icuChartTxId?: string
  preview?: boolean
  orderer: string
  toggleOrderTime: (orderId: string, time: number) => void
  showOrderer: boolean
  isHovered: boolean
  onMouseEnter: (columnIndex: number) => void
  onMouseLeave: () => void
  isGuidelineTime: boolean
}

const Cell: React.FC<CellProps> = React.memo(
  ({
    time,
    treatment,
    icuChartOrderId,
    isDone,
    icuChartTxId,
    preview,
    orderer,
    toggleOrderTime,
    showOrderer,
    isHovered,
    onMouseEnter,
    onMouseLeave,
    isGuidelineTime,
  }) => {
    const isCommandPressed = useIsCommandPressed()
    const [briefTxResultInput, setBriefTxResultInput] = useState('')
    const [isFocused, setIsFocused] = useState(false)

    const { setSelectedTxPendingQueue, selectedTxPendingQueue } =
      useIcuOrderStore()
    const {
      isMutationCanceled,
      setIsMutationCanceled,
      setStep,
      setTxLocalState,
    } = useTxMutationStore()

    const hasOrder = useMemo(() => orderer !== '0', [orderer])
    const hasComment = useMemo(
      () => !!treatment?.tx_comment,
      [treatment?.tx_comment],
    )
    const isInPendingQueue = useMemo(
      () =>
        selectedTxPendingQueue.some(
          (item) => item.orderId === icuChartOrderId && item.orderTime === time,
        ),
      [icuChartOrderId, selectedTxPendingQueue, time],
    )

    useEffect(() => {
      if (treatment?.tx_result || isMutationCanceled) {
        setBriefTxResultInput('')
        setIsMutationCanceled(false)
      }
    }, [isMutationCanceled, setIsMutationCanceled, treatment?.tx_result])

    // ---- 처치표에서 이동해 왔을 때 auto focus ----
    const searchParams = useSearchParams()
    const params = new URLSearchParams(searchParams)
    const orderId = params.get('order-id')
    const orderTime = params.get('time')

    useEffect(() => {
      const cellInputId = document.getElementById(`${orderId}&${orderTime}`)
      if (cellInputId) cellInputId.focus()
    }, [orderId, orderTime])
    // ----------------------------------------

    // -------- 상세 처치 입력 --------
    const handleOpenTxDetail = useCallback(() => {
      setTxLocalState({
        icuChartOrderId,
        txResult: treatment?.tx_result,
        txComment: treatment?.tx_comment,
        txId: icuChartTxId,
        time,
        txLog: treatment?.tx_log as TxLog[] | null,
      })

      setStep('detailInsert')
    }, [
      icuChartOrderId,
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
    // ---------------------------

    const toggleCellInQueue = useCallback(
      (orderId: string, time: number) => {
        setSelectedTxPendingQueue((prev) => {
          const existingIndex = prev.findIndex(
            (item) => item.orderId === orderId && item.orderTime === time,
          )
          if (existingIndex !== -1) {
            return prev.filter((_, index) => index !== existingIndex)
          } else {
            return [
              ...prev,
              {
                txId: icuChartTxId,
                orderId,
                orderTime: time,
              },
            ]
          }
        })
      },
      [setSelectedTxPendingQueue, icuChartTxId],
    )

    const handleClick = useCallback(
      (e: React.MouseEvent<HTMLInputElement>) => {
        setIsFocused(true)
        e.preventDefault()
        if (e.metaKey || e.ctrlKey) {
          e.currentTarget.blur()
          toggleCellInQueue(icuChartOrderId, time)
        }
      },
      [icuChartOrderId, time, toggleCellInQueue],
    )

    const handleRightClick = useCallback(
      (e: React.MouseEvent<HTMLInputElement>) => {
        e.preventDefault()
        if (e.metaKey || e.ctrlKey) {
          e.currentTarget.blur()
          toggleOrderTime(icuChartOrderId, time)
        }
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

    return (
      <TableCell className="p-0">
        <div className="relative overflow-hidden">
          <Input
            id={`${icuChartOrderId}&${time}`}
            className={cn(
              isGuidelineTime && 'bg-amber-300/10',
              isHovered && 'bg-muted/50',
              hasOrder && 'bg-rose-400/10',
              isDone && 'bg-emerald-400/10',
              isInPendingQueue && 'ring-2',
              'h-11 rounded-none border-none px-1 text-center outline-none ring-inset focus-visible:ring-2 focus-visible:ring-primary',
            )}
            disabled={preview}
            value={briefTxResultInput}
            onChange={(e) => setBriefTxResultInput(e.target.value)}
            onBlur={() => {
              handleUpsertBriefTxResultInput()
              setIsFocused(false)
            }}
            onKeyDown={handleKeyDown}
            onClick={handleClick}
            onContextMenu={handleRightClick}
            {...longPressEvents}
            onMouseEnter={() => onMouseEnter(time)}
            onMouseLeave={onMouseLeave}
          />
          <div
            className={cn(
              'absolute inset-0 -z-10 flex items-center justify-center',
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
