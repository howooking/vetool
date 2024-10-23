/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import CellsRow from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/cells-row'
import CellsRowTitle from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/cells-row-title'
import DeleteOrdersAlertDialog from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/order/delete-orders-alert-dialog'
import OrderDialog from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/order/order-dialog'
import TxUpsertDialog from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/tx/tx-upsert-dialog'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { toast } from '@/components/ui/use-toast'
import { TIMES } from '@/constants/hospital/icu/chart/time'
import useIsCommandPressed from '@/hooks/use-is-command-pressed'
import useLocalStorage from '@/hooks/use-local-storage'
import {
  reorderOrders,
  upsertOrder,
} from '@/lib/services/icu/chart/order-mutation'
import { useIcuOrderStore } from '@/lib/store/icu/icu-order'
import { useTxMutationStore } from '@/lib/store/icu/tx-mutation'
import { cn, formatOrders, hasOrderSortingChanges } from '@/lib/utils'
import { useBasicHosDataContext } from '@/providers/basic-hos-data-context-provider'
import type { SelectedChart, SelectedIcuOrder } from '@/types/icu/chart'
import { ArrowUpDown } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Sortable } from 'react-sortablejs'
import SortableOrderWrapper from './order/sortable-order-wrapper'

export default function ChartTable({
  chartData,
  preview,
}: {
  chartData: SelectedChart
  preview?: boolean
}) {
  const orderTitleRef = useRef<HTMLTableCellElement>(null)
  const {
    icu_chart_id,
    orders,
    patient,
    weight,
    icu_io: { age_in_days },
  } = chartData
  const [isSorting, setIsSorting] = useState(false)
  const [sortedOrders, setSortedOrders] = useState<SelectedIcuOrder[]>(orders)
  const [shouldScrollToBottom, setShouldScrollToBottom] = useState(false)
  const [isDeleteOrdersDialogOpen, setIsDeleteOrdersDialogOpen] =
    useState(false)
  const {
    setStep,
    reset,
    selectedTxPendingQueue,
    orderTimePendingQueue,
    selectedOrderPendingQueue,
    copiedOrderPendingQueue,
  } = useIcuOrderStore()
  const { setStep: setTxStep } = useTxMutationStore()
  const {
    basicHosData: { showOrderer, vetsListData },
  } = useBasicHosDataContext()
  const isCommandPressed = useIsCommandPressed()

  useEffect(() => {
    if (isSorting) {
      setSortedOrders([...orders])
    }
  }, [orders, isSorting])

  // -------- 시간 가이드라인 --------
  const [guidelineTimes, setGuidelineTimes] = useLocalStorage(
    'guideline-times',
    [2, 10, 18],
  )
  const handleToggleGuidelineTimes = (time: number) => {
    if (guidelineTimes.includes(time)) {
      setGuidelineTimes(guidelineTimes.filter((t) => t !== time))
    } else {
      setGuidelineTimes([...guidelineTimes, time])
    }
  }
  // -----------------------------

  // ----- 표에서 수직 안내선 -----
  const [hoveredColumn, setHoveredColumn] = useState<number | null>(null)
  const handleColumnHover = useCallback(
    (columnIndex: number) => setHoveredColumn(columnIndex),
    [],
  )
  const handleColumnLeave = useCallback(() => setHoveredColumn(null), [])
  // ------------------------

  const handleUpsertOrderTimesWithoutOrderer = useCallback(async () => {
    const formattedOrders = formatOrders(orderTimePendingQueue)

    for (const order of formattedOrders) {
      const currentOrder = orders.find((o) => o.order_id === order.orderId)
      if (!currentOrder) continue

      const updatedOrderTimes = currentOrder.order_times.map((time, index) =>
        order.orderTimes.includes(index + 1)
          ? time === '0'
            ? vetsListData[0].name
            : '0'
          : time,
      )

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

  useEffect(() => {
    if (!isCommandPressed && orderTimePendingQueue.length >= 1) {
      showOrderer
        ? setStep('selectOrderer')
        : handleUpsertOrderTimesWithoutOrderer()
    }
    if (!isCommandPressed && selectedTxPendingQueue.length >= 1) {
      setTxStep('detailInsert')
    }
  }, [
    handleUpsertOrderTimesWithoutOrderer,
    isCommandPressed,
    orderTimePendingQueue,
    selectedTxPendingQueue,
    selectedTxPendingQueue.length,
    setStep,
    setTxStep,
    showOrderer,
  ])

  // ----- 다중 오더 붙여넣기, 삭제 기능 -----
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        (event.ctrlKey || event.metaKey) &&
        event.key === 'v' &&
        copiedOrderPendingQueue.length > 0
      ) {
        event.preventDefault()
        setStep('selectOrderer')
      }

      if (
        ((event.metaKey && event.key === 'Backspace') ||
          event.key === 'Delete') &&
        selectedOrderPendingQueue.length > 0
      ) {
        event.preventDefault()
        setIsDeleteOrdersDialogOpen(true)
      }
    }
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [
    setStep,
    orderTimePendingQueue,
    copiedOrderPendingQueue.length,
    selectedOrderPendingQueue.length,
  ])
  // ------------------------------------

  useEffect(() => {
    if (shouldScrollToBottom && orderTitleRef.current) {
      orderTitleRef.current.scrollIntoView({ behavior: 'smooth' })
      setShouldScrollToBottom(false)
    }
  }, [orders, shouldScrollToBottom])

  const handleSortButtonClick = async () => {
    if (isSorting && !hasOrderSortingChanges(chartData.orders, sortedOrders)) {
      setIsSorting(!isSorting)
      return
    }

    if (isSorting) {
      const orderIds = sortedOrders.map((order) => order.order_id)

      await reorderOrders(orderIds)

      toast({
        title: '오더 목록을 변경하였습니다',
      })
    }

    setIsSorting(!isSorting)
  }

  const handleReorder = (event: Sortable.SortableEvent) => {
    const newOrders = [...sortedOrders]
    const [movedOrder] = newOrders.splice(event.oldIndex as number, 1)

    newOrders.splice(event.newIndex as number, 0, movedOrder)
    setSortedOrders(newOrders)
  }

  return (
    <Table className="border">
      <TableHeader className="sticky top-0 z-10 bg-white shadow-sm">
        <TableRow>
          <TableHead className="relative flex w-[320px] max-w-[320px] items-center justify-center gap-2 text-center">
            {!preview && (
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  'absolute left-1',
                  isSorting && 'animate-pulse text-primary',
                )}
                onClick={handleSortButtonClick}
              >
                <ArrowUpDown size={18} />
              </Button>
            )}
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
            <TableHead
              className="cursor-pointer border text-center"
              key={time}
              onClick={() => handleToggleGuidelineTimes(time)}
            >
              {time.toString().padStart(2, '0')}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      {!preview && <TxUpsertDialog />}

      {isSorting ? (
        <SortableOrderWrapper
          orders={sortedOrders}
          onOrdersChange={setSortedOrders}
          onSortEnd={handleReorder}
        >
          {sortedOrders.map((order, index) => (
            <TableRow className="divide-x" key={order.order_id}>
              <CellsRowTitle
                index={index}
                order={order}
                orderTitleRef={orderTitleRef}
                preview={preview}
                isSorting={isSorting}
              />
              <CellsRow
                preview={preview}
                order={order}
                showOrderer={showOrderer}
                hoveredColumn={hoveredColumn}
                handleColumnHover={handleColumnHover}
                handleColumnLeave={handleColumnLeave}
                guidelineTimes={guidelineTimes}
              />
            </TableRow>
          ))}
        </SortableOrderWrapper>
      ) : (
        <TableBody>
          {sortedOrders.map((order, index) => (
            <TableRow className="w-full divide-x" key={order.order_id}>
              <CellsRowTitle
                index={index}
                order={order}
                preview={preview}
                isSorting={isSorting}
              />
              <CellsRow
                preview={preview}
                order={order}
                showOrderer={showOrderer}
                hoveredColumn={hoveredColumn}
                handleColumnHover={handleColumnHover}
                handleColumnLeave={handleColumnLeave}
                guidelineTimes={guidelineTimes}
              />
            </TableRow>
          ))}
        </TableBody>
      )}

      <DeleteOrdersAlertDialog
        isDeleteOrdersDialogOpen={isDeleteOrdersDialogOpen}
        setIsDeleteOrdersDialogOpen={setIsDeleteOrdersDialogOpen}
      />
    </Table>
  )
}
