'use client'

import { TIMES } from '@/constants/hospital/icu/chart/time'
import { useIcuOrderStore } from '@/lib/store/icu/icu-order'
import type { SelectedIcuOrder } from '@/types/icu/chart'
import { useCallback, useEffect, useState } from 'react'
import { DebouncedState } from 'use-debounce'
import Cell from './cell'

type CellProps = {
  preview?: boolean
  order: SelectedIcuOrder
  debouncedUpsertOrderTimes: DebouncedState<() => void>
  debouncedMultipleTreatments: DebouncedState<() => void>
  showOrderer: boolean
  hoveredColumn: number | null
  handleColumnHover: (columnIndex: number) => void
  handleColumnLeave: () => void
}

export default function CellsRow({
  preview,
  order,
  debouncedUpsertOrderTimes,
  debouncedMultipleTreatments,
  showOrderer,
  hoveredColumn,
  handleColumnHover,
  handleColumnLeave,
}: CellProps) {
  const { order_times, order_id, treatments } = order
  const { setOrderTimePendingQueue, step } = useIcuOrderStore()
  const [orderTimeState, setOrderTimeState] = useState(order_times)

  useEffect(() => {
    setOrderTimeState(order_times)
  }, [order_times, step])

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

      debouncedUpsertOrderTimes()
    },
    [debouncedUpsertOrderTimes, setOrderTimePendingQueue],
  )

  return (
    <>
      {TIMES.map((time, index) => {
        const isDone =
          order_times[index] !== '0' &&
          treatments.some((treatment) => treatment.time === time)
        const orderer = orderTimeState[time - 1]
        const selectedTx = treatments.find(
          (treatment) => treatment.time === time,
        )
        const isHovered = hoveredColumn === index + 1

        return (
          <Cell
            preview={preview}
            key={time}
            time={time}
            treatment={selectedTx}
            icuChartOrderId={order_id}
            isDone={isDone}
            orderer={orderer}
            icuChartTxId={selectedTx?.tx_id}
            toggleOrderTime={toggleOrderTime}
            showOrderer={showOrderer}
            debouncedMultipleTreatments={debouncedMultipleTreatments}
            isHovered={isHovered}
            onMouseEnter={handleColumnHover}
            onMouseLeave={handleColumnLeave}
          />
        )
      })}
    </>
  )
}
