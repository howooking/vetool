'use client'

import { TIMES } from '@/constants/hospital/icu/chart/time'
import { useIcuOrderStore } from '@/lib/store/icu/icu-order'
import type { SelectedIcuOrder } from '@/types/icu/chart'
import { useCallback, useEffect, useState } from 'react'
import { DebouncedState } from 'use-debounce'
import Cell from './cell'

export default function CellsRow({
  preview,
  order,
  debouncedSetOrdererSelectStep,
}: {
  preview?: boolean
  order: SelectedIcuOrder
  debouncedSetOrdererSelectStep: DebouncedState<() => void>
}) {
  const { order_times, order_id, treatments, order_name } = order

  const [orderTimeState, setOrderTimeState] = useState(order_times)

  useEffect(() => {
    setOrderTimeState(order_times)
  }, [order_times])

  const { setOrderTimePendingQueue } = useIcuOrderStore()

  const toggleOrderTime = useCallback(
    (orderId: string, time: number) => {
      setOrderTimeState((prevOrderTime) => {
        const newOrderTime = [...prevOrderTime]
        newOrderTime[time - 1] = newOrderTime[time - 1] !== '0' ? '0' : '...'
        return newOrderTime
      })

      setOrderTimePendingQueue((prev) => [
        ...prev,
        {
          orderId: orderId,
          orderTime: time,
        },
      ])

      debouncedSetOrdererSelectStep()
    },
    [debouncedSetOrdererSelectStep, setOrderTimePendingQueue],
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
        return (
          <Cell
            preview={preview}
            key={time}
            time={time}
            treatment={selectedTx}
            icuChartOrderId={order_id}
            isDone={isDone}
            orderer={orderer}
            icuChartOrderName={order_name}
            icuChartTxId={selectedTx?.tx_id}
            toggleOrderTime={toggleOrderTime}
          />
        )
      })}
    </>
  )
}
