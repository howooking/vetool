'use client'

import LargeLoaderCircle from '@/components/common/large-loader-circle'
import OrderDialog from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/order/order-dialog'
import TxUpsertDialog from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/tx/tx-upsert-dialog'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { toast } from '@/components/ui/use-toast'
import { TIMES } from '@/constants/hospital/icu/chart/time'
import { upsertOrder } from '@/lib/services/icu/chart/order-mutation'
import { useIcuOrderStore } from '@/lib/store/icu/icu-order'
import { formatOrders, sortOrders } from '@/lib/utils'
import { useBasicHosDataContext } from '@/providers/basic-hos-data-context-provider'
import type { SelectedChart } from '@/types/icu/chart'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import CellsRow from './cells-row'
import CellsRowTitle from './cells-row-title'
import { useTxMutationStore } from '@/lib/store/icu/tx-mutation'
import DeleteOrdersAlertDialog from './order/delete-orders-alert-dialog'

export default function ChartTable({
  chartData,
  preview,
}: {
  chartData: SelectedChart
  preview?: boolean
}) {
  const {
    icu_chart_id,
    orders,
    patient,
    weight,
    icu_io: { age_in_days },
  } = chartData
  const { setStep, reset, orderTimePendingQueue, orderPendingQueue } =
    useIcuOrderStore()
  const { setStep: setTxStep } = useTxMutationStore()
  const {
    basicHosData: { showOrderer, vetsListData },
  } = useBasicHosDataContext()

  const [isSorting, setIsSorting] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const sortedOrders = useMemo(() => {
    const sorted = sortOrders([...orders])
    setIsSorting(false)
    return sorted
  }, [orders])

  const handleUpsertMultipleOrderTimesWithoutOrderer = useCallback(async () => {
    const formattedOrders = formatOrders(orderTimePendingQueue)

    for (const order of formattedOrders) {
      const currentOrder = orders.find((o) => o.order_id === order.orderId)
      if (!currentOrder) continue

      const updatedOrderTimes = [...currentOrder.order_times]
      for (const time of order.orderTimes) {
        updatedOrderTimes[time - 1] =
          updatedOrderTimes[time - 1] === '0' ? vetsListData[0].name : '0'
      }

      await upsertOrder(
        chartData.patient.hos_id,
        icu_chart_id,
        order.orderId,
        updatedOrderTimes,
        {
          icu_chart_order_name: currentOrder.order_name,
          icu_chart_order_comment: currentOrder.order_comment,
          icu_chart_order_type: currentOrder.order_type,
        },
      )
    }

    toast({
      title: '오더시간을 변경하였습니다',
    })

    reset()
  }, [
    chartData.patient.hos_id,
    icu_chart_id,
    orderTimePendingQueue,
    orders,
    reset,
    vetsListData,
  ])

  const debouncedUpsertingOrderTimes = useDebouncedCallback(
    showOrderer
      ? () => setStep('selectOrderer')
      : handleUpsertMultipleOrderTimesWithoutOrderer,
    1500,
  )

  const debouncedMultipleTreatments = useDebouncedCallback(() => {
    if (orderTimePendingQueue.length >= 2) setTxStep('detailInsert')
  }, 1000)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // 다중 오더 붙여넣기
      if (
        (event.ctrlKey || event.metaKey) &&
        event.key === 'v' &&
        orderPendingQueue.length > 0
      ) {
        event.preventDefault()
        setStep('selectOrderer')
      }

      // 다중 오더 삭제
      if (
        (event.ctrlKey || event.metaKey) &&
        (event.key === 'Backspace' || event.key === 'Delete') &&
        orderPendingQueue.length > 0
      ) {
        event.preventDefault()
        setIsDialogOpen(true)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [setStep, orderPendingQueue])

  if (isSorting) {
    return <LargeLoaderCircle className="h-icu-chart" />
  }

  return (
    <Table className="border">
      <TableHeader className="sticky top-0 z-10 bg-white shadow-sm">
        <TableRow>
          <TableHead className="relative flex w-[320px] items-center justify-center gap-2 text-center">
            <span>오더 목록</span>
            {!preview && (
              <OrderDialog
                icuChartId={icu_chart_id}
                orders={orders}
                showOrderer={showOrderer}
                patient={patient}
                weight={weight}
                ageInDays={age_in_days}
              />
            )}
          </TableHead>

          {TIMES.map((time) => (
            <TableHead className="border text-center" key={time}>
              {time.toString().padStart(2, '0')}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {!preview && <TxUpsertDialog />}

        {sortedOrders.map((order) => (
          <TableRow className="divide-x" key={order.order_id}>
            <CellsRowTitle order={order} preview={preview} />
            <CellsRow
              preview={preview}
              order={order}
              debouncedUpsertingOrderTimes={debouncedUpsertingOrderTimes}
              debouncedMultipleTreatments={debouncedMultipleTreatments}
              showOrderer={showOrderer}
            />
          </TableRow>
        ))}
      </TableBody>

      <DeleteOrdersAlertDialog
        isDialogOpen={isDialogOpen}
        setDialogOpen={setIsDialogOpen}
      />
    </Table>
  )
}
