import NoResultSquirrel from '@/components/common/no-result-squirrel'
import SortableOrderWrapper from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/order/sortable-order-wrapper'
import AddTemplateDialog from '@/components/hospital/icu/main/template/add/table/add-template-dialog'
import AddTemplateHeader from '@/components/hospital/icu/main/template/add/table/add-template-header'
import AddTemplateRow from '@/components/hospital/icu/main/template/add/table/add-template-row'
import TemplateOrderForm from '@/components/hospital/icu/main/template/add/template-order-form'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { toast } from '@/components/ui/use-toast'
import { reorderOrders } from '@/lib/services/icu/chart/order-mutation'
import { useIcuOrderStore } from '@/lib/store/icu/icu-order'
import { useTemplateStore } from '@/lib/store/icu/template'
import { useBasicHosDataContext } from '@/providers/basic-hos-data-context-provider'
import type { SelectedIcuOrder } from '@/types/icu/chart'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Sortable } from 'react-sortablejs'

export default function TemplateOrdersTable({
  editMode,
}: {
  editMode?: boolean
}) {
  const lastOrderRef = useRef<HTMLTableCellElement>(null)
  const { templateOrders, setTemplateOrders, setOrderIndex } =
    useTemplateStore()
  const {
    step,
    setStep,
    setSelectedChartOrder,
    isEditMode,
    setIsEditMode,
    reset,
  } = useIcuOrderStore()
  const {
    basicHosData: { orderColorsData },
  } = useBasicHosDataContext()
  const [isSorting, setIsSorting] = useState(false)
  const [shouldScrollToBottom, setShouldScrollToBottom] = useState(false)
  const [sortedOrders, setSortedOrders] = useState<SelectedIcuOrder[]>([])

  useEffect(() => {
    if (Array.isArray(templateOrders)) {
      const orders = templateOrders

      setSortedOrders(orders as SelectedIcuOrder[])
    } else {
      setSortedOrders([])
    }
  }, [templateOrders])

  const handleOpenChange = useCallback(() => {
    if (step === 'closed') {
      setStep('upsert')
    } else {
      setStep('closed')
    }
    reset()
  }, [step, setStep, reset])

  const handleEditOrderDialogOpen = (
    order: Partial<SelectedIcuOrder>,
    index?: number,
  ) => {
    setStep('upsert')
    setIsEditMode(true)
    setSelectedChartOrder(order)
    setOrderIndex(index)
  }

  useEffect(() => {
    if (shouldScrollToBottom && lastOrderRef.current) {
      lastOrderRef.current.scrollIntoView({ behavior: 'smooth' })
      setShouldScrollToBottom(false)
    }
  }, [sortedOrders, shouldScrollToBottom])

  const handleReorder = async (event: Sortable.SortableEvent) => {
    if (editMode) {
      const orderIds = sortedOrders.map((order) => order.order_id)
      const item = orderIds.splice(event.oldIndex as number, 1)[0]
      orderIds.splice(event.newIndex as number, 0, item)

      await reorderOrders(orderIds as string[])
    }

    const item = templateOrders.splice(event.oldIndex as number, 1)[0]
    templateOrders.splice(event.newIndex as number, 0, item)
    setTemplateOrders(templateOrders)

    toast({
      title: '오더 목록을 변경하였습니다',
    })
  }

  return (
    <Table className="h-full border">
      <AddTemplateHeader isSorting={isSorting} onSortingChange={setIsSorting}>
        <AddTemplateDialog
          isOpen={step !== 'closed'}
          onOpenChange={handleOpenChange}
          isEditMode={isEditMode}
        >
          <TemplateOrderForm isEditModalOpen />
        </AddTemplateDialog>
      </AddTemplateHeader>

      {isSorting ? (
        <SortableOrderWrapper
          orders={sortedOrders}
          onOrdersChange={setSortedOrders}
          onSortEnd={handleReorder}
        >
          {sortedOrders.map((order, index) => (
            <AddTemplateRow
              key={index}
              order={order}
              index={index}
              orderColors={orderColorsData}
              onEdit={handleEditOrderDialogOpen}
              orderRef={lastOrderRef}
            />
          ))}
        </SortableOrderWrapper>
      ) : (
        <TableBody>
          {!sortedOrders.length ? (
            <TableRow className="h-[360px]">
              <TableCell className="text-center" colSpan={5}>
                <NoResultSquirrel text="저장할 오더를 추가해주세요" />
              </TableCell>
            </TableRow>
          ) : (
            sortedOrders.map((order, index) => (
              <AddTemplateRow
                key={index}
                order={order}
                index={index}
                orderColors={orderColorsData}
                onEdit={handleEditOrderDialogOpen}
                orderRef={lastOrderRef}
              />
            ))
          )}
        </TableBody>
      )}
    </Table>
  )
}
