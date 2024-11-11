'use client'

import QuickOrderInsertInput from '@/components/hospital/icu/main/chart/selected-chart/chart-body/quick-order-insert-input'
import CellsRow from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/cells-row'
import CellsRowTitle from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/cells-row-title'
import DeleteOrdersAlertDialog from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/order/delete-orders-alert-dialog'
import OrderDialog from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/order/order-dialog'
import SortableOrderWrapper from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/order/sortable-order-wrapper'
import TxUpsertDialog from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/tx/tx-upsert-dialog'
import AddTemplateOrdersButton from '@/components/hospital/icu/main/template/add/add-template-orders-button'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { toast } from '@/components/ui/use-toast'
import { TIMES } from '@/constants/hospital/icu/chart/time'
import useIsCommandPressed from '@/hooks/use-is-command-pressed'
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
import { useCallback, useEffect, useState } from 'react'
import { Sortable } from 'react-sortablejs'

export default function ChartTable({
  chartData,
  preview,
  isExport,
}: {
  chartData: SelectedChart
  preview?: boolean
  isExport?: boolean
}) {
  const {
    icu_chart_id,
    orders,
    patient,
    weight,
    icu_io: { age_in_days },
  } = chartData

  const hosId = chartData.patient.hos_id
  const [isSorting, setIsSorting] = useState(false)
  const [sortedOrders, setSortedOrders] = useState<SelectedIcuOrder[]>(orders)
  const [isDeleteOrdersDialogOpen, setIsDeleteOrdersDialogOpen] =
    useState(false)
  const {
    orderStep,
    setOrderStep,
    reset,
    selectedTxPendingQueue,
    orderTimePendingQueue,
    selectedOrderPendingQueue,
    copiedOrderPendingQueue,
    isEditOrderMode,
  } = useIcuOrderStore()

  const {
    basicHosData: { showOrderer, vetsListData, orderColorsData },
  } = useBasicHosDataContext()
  const isCommandPressed = useIsCommandPressed()

  useEffect(() => {
    setSortedOrders(orders)
  }, [orders])

  // ----- 표에서 수직 안내선 -----
  const [hoveredColumn, setHoveredColumn] = useState<number | null>(null)
  const handleColumnHover = useCallback(
    (columnIndex: number) => setHoveredColumn(columnIndex),
    [],
  )
  const handleColumnLeave = useCallback(() => setHoveredColumn(null), [])
  // --------------------------

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

      await upsertOrder(hosId, icu_chart_id, order.orderId, updatedOrderTimes, {
        icu_chart_order_name: currentOrder.order_name,
        icu_chart_order_comment: currentOrder.order_comment,
        icu_chart_order_type: currentOrder.order_type,
        icu_chart_order_priority: currentOrder.id,
      })
    }

    toast({
      title: '오더시간을 변경하였습니다',
    })

    reset()
  }, [hosId, icu_chart_id, orderTimePendingQueue, orders, reset, vetsListData])

  // -------- 커멘드키 뗐을 때 작업 --------
  const { txStep, setTxStep } = useTxMutationStore()
  useEffect(() => {
    if (!isCommandPressed && orderTimePendingQueue.length >= 1) {
      showOrderer
        ? setOrderStep('selectOrderer')
        : handleUpsertOrderTimesWithoutOrderer()
    }
    if (!isCommandPressed && selectedTxPendingQueue.length >= 1) {
      if (txStep === 'closed') {
        setTxStep('detailInsert')
      }
    }
  }, [
    handleUpsertOrderTimesWithoutOrderer,
    isCommandPressed,
    orderTimePendingQueue,
    selectedTxPendingQueue,
    selectedTxPendingQueue.length,
    setOrderStep,
    setTxStep,
    showOrderer,
    txStep,
  ])
  // ---------------------------------

  // ----- 다중 오더 붙여넣기, 삭제 기능 -----
  const handleUpsertOrderWithoutOrderer = useCallback(async () => {
    for (const order of copiedOrderPendingQueue) {
      await upsertOrder(
        hosId as string,
        icu_chart_id,
        undefined,
        order.order_times!,
        {
          icu_chart_order_name: order.order_name!,
          icu_chart_order_comment: order.order_comment!,
          icu_chart_order_type: order.order_type!,
          icu_chart_order_priority: order.id!,
        },
      )
    }

    toast({
      title: '오더를 붙여넣었습니다',
    })

    reset()
  }, [hosId, icu_chart_id, copiedOrderPendingQueue, reset])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        (event.ctrlKey || event.metaKey) &&
        event.key === 'v' &&
        copiedOrderPendingQueue.length > 0
      ) {
        event.preventDefault()
        showOrderer
          ? setOrderStep('selectOrderer')
          : handleUpsertOrderWithoutOrderer()
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    setTxStep,
    orderTimePendingQueue,
    copiedOrderPendingQueue.length,
    selectedOrderPendingQueue.length,
  ])
  // ------------------------------------

  const handleSortButtonClick = useCallback(async () => {
    if (isSorting && !hasOrderSortingChanges(chartData.orders, sortedOrders)) {
      setIsSorting(false)
      return
    }

    if (isSorting) {
      const orderIds = sortedOrders.map((order) => order.order_id)

      await reorderOrders(orderIds)

      toast({
        title: '오더 순서를 변경하였습니다',
      })
    }

    setIsSorting(!isSorting)
  }, [chartData.orders, isSorting, sortedOrders])

  const handleReorder = useCallback(
    (event: Sortable.SortableEvent) => {
      const newOrders = [...sortedOrders]
      const [movedOrder] = newOrders.splice(event.oldIndex as number, 1)
      newOrders.splice(event.newIndex as number, 0, movedOrder)
      setSortedOrders(newOrders)
    },
    [sortedOrders],
  )

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 's') {
        event.preventDefault()
        handleSortButtonClick()
      }

      if (isSorting && event.key === 'Escape') {
        event.preventDefault()
        handleSortButtonClick()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleSortButtonClick, isSorting])

  return (
    <Table className="border">
      <TableHeader className="sticky top-0 z-20 bg-white shadow-sm">
        <TableRow>
          <TableHead className="flex w-[320px] items-center justify-between px-0.5 text-center">
            {!preview && (
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  isSorting && 'animate-pulse text-primary',
                  'shrink-0',
                )}
                onClick={handleSortButtonClick}
              >
                <ArrowUpDown size={18} />
              </Button>
            )}

            <span className="w-full text-center">오더 목록</span>

            {!preview && (
              <OrderDialog
                icuChartId={icu_chart_id}
                orders={orders}
                showOrderer={showOrderer}
                patient={patient}
                weight={weight}
                ageInDays={age_in_days}
                orderStep={orderStep}
                reset={reset}
                isEditOrderMode={isEditOrderMode}
                setOrderStep={setOrderStep}
                isExport={isExport}
                setSortedOrders={setSortedOrders}
              />
            )}

            {<AddTemplateOrdersButton />}
          </TableHead>

          {TIMES.map((time) => (
            <TableHead
              className={cn(
                preview ? 'cursor-default' : 'cursor-pointer',
                'border text-center',
              )}
              key={time}
            >
              {time.toString().padStart(2, '0')}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>

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
                preview={preview}
                isSorting={isSorting}
              />
              <CellsRow
                orderStep={orderStep}
                preview={preview}
                isSorting={isSorting}
                order={order}
                showOrderer={showOrderer}
                hoveredColumn={hoveredColumn}
                handleColumnHover={handleColumnHover}
                handleColumnLeave={handleColumnLeave}
                selectedTxPendingQueue={selectedTxPendingQueue}
                orderTimePendingQueueLength={orderTimePendingQueue.length}
              />
            </TableRow>
          ))}
        </SortableOrderWrapper>
      ) : (
        <TableBody>
          {sortedOrders.map((order, index) => (
            <TableRow className="w-full divide-x" key={order.order_id}>
              <CellsRowTitle index={index} order={order} preview={preview} />
              <CellsRow
                preview={preview}
                order={order}
                showOrderer={showOrderer}
                hoveredColumn={hoveredColumn}
                handleColumnHover={handleColumnHover}
                handleColumnLeave={handleColumnLeave}
                selectedTxPendingQueue={selectedTxPendingQueue}
                orderStep={orderStep}
                orderTimePendingQueueLength={orderTimePendingQueue.length}
              />
            </TableRow>
          ))}

          {!isExport && !preview && (
            <TableRow className="hover:bg-transparent">
              <TableCell className="p-0">
                <QuickOrderInsertInput
                  icuChartId={icu_chart_id}
                  setSortedOrders={setSortedOrders}
                  orderColorsData={orderColorsData}
                />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      )}

      {!isExport && (
        <>
          <TxUpsertDialog />
          <DeleteOrdersAlertDialog
            isDeleteOrdersDialogOpen={isDeleteOrdersDialogOpen}
            setIsDeleteOrdersDialogOpen={setIsDeleteOrdersDialogOpen}
            setSortedOrders={setSortedOrders}
          />
        </>
      )}
    </Table>
  )
}
