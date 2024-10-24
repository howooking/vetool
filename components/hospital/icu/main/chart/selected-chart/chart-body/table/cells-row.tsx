'use client'

import { TIMES } from '@/constants/hospital/icu/chart/time'
import {
  type OrderTimePendingQueue,
  useIcuOrderStore,
} from '@/lib/store/icu/icu-order'
import { useTxMutationStore } from '@/lib/store/icu/tx-mutation'
import type { SelectedIcuOrder } from '@/types/icu/chart'
import { useCallback, useEffect, useState } from 'react'
import Cell from './cell'

type CellsRowProps = {
  preview?: boolean
  order: SelectedIcuOrder
  showOrderer: boolean
  hoveredColumn: number | null
  handleColumnHover: (columnIndex: number) => void
  handleColumnLeave: () => void
  guidelineTimes: number[]
  isSorting?: boolean
  setOrderStep?: (
    orderStep: 'closed' | 'upsert' | 'selectOrderer' | 'multipleEdit',
  ) => void
  selectedTxPendingQueue: OrderTimePendingQueue[]
}

export default function CellsRow({
  preview,
  order,
  showOrderer,
  hoveredColumn,
  handleColumnHover,
  handleColumnLeave,
  guidelineTimes,
  isSorting,
  setOrderStep,
  selectedTxPendingQueue,
}: CellsRowProps) {
  const { order_times, order_id, treatments } = order
  const {
    setSelectedOrderPendingQueue,
    setOrderTimePendingQueue,
    setSelectedTxPendingQueue,
  } = useIcuOrderStore()

  const {
    isMutationCanceled,
    setIsMutationCanceled,
    setTxStep,
    setTxLocalState,
  } = useTxMutationStore()

  const [orderTimeState, setOrderTimeState] = useState(order_times)

  useEffect(() => {
    setOrderTimeState(order_times)
  }, [order_times, setOrderStep])

  const toggleOrderTime = useCallback(
    (orderId: string, time: number) => {
      setOrderTimeState((prevOrderTime) => {
        const newOrderTime = [...prevOrderTime]
        newOrderTime[time - 1] = newOrderTime[time - 1] !== '0' ? '0' : '...'
        return newOrderTime
      })

      setOrderTimePendingQueue((prev) => {
        const existingIndex = prev.findIndex(
          (item) => item.orderId === orderId && item.orderTime === time,
        )

        if (existingIndex !== -1) {
          return prev.filter((_, index) => index !== existingIndex)
        } else {
          return [...prev, { orderId, orderTime: time }]
        }
      })
    },
    [setOrderTimePendingQueue],
  )

  return (
    <>
      {TIMES.map((time, index) => {
        const isDone =
          order_times[index] !== '0' &&
          treatments.some((treatment) => treatment.time === time)
        const orderer = orderTimeState[time - 1]
        const tx = treatments.find((treatment) => treatment.time === time)
        const isHovered = hoveredColumn === index + 1
        const isGuidelineTime = guidelineTimes.includes(time)

        return (
          <Cell
            preview={preview}
            key={time}
            time={time}
            treatment={tx}
            icuChartOrderId={order_id}
            isDone={isDone}
            orderer={orderer}
            icuChartTxId={tx?.tx_id}
            toggleOrderTime={toggleOrderTime}
            showOrderer={showOrderer}
            isHovered={isHovered}
            onMouseEnter={handleColumnHover}
            onMouseLeave={handleColumnLeave}
            isGuidelineTime={isGuidelineTime}
            isSorting={isSorting}
            setSelectedTxPendingQueue={setSelectedTxPendingQueue}
            selectedTxPendingQueue={selectedTxPendingQueue}
            isMutationCanceled={isMutationCanceled}
            setIsMutationCanceled={setIsMutationCanceled}
            setTxStep={setTxStep}
            setTxLocalState={setTxLocalState}
            setSelectedOrderPendingQueue={setSelectedOrderPendingQueue}
          />
        )
      })}
    </>
  )
}
