'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { DEFAULT_ICU_ORDER_TYPE } from '@/constants/hospital/icu/chart/order'
import { useCreateOrderStore } from '@/lib/store/icu/create-order'
import { cn } from '@/lib/utils'
import type { IcuOrderColors } from '@/types/adimin'
import { IcuDefaultChartJoined } from '@/types/icu'
import { Plus } from 'lucide-react'
import { useCallback, useMemo } from 'react'
import DefaultOrderForm from './default-order-form'

export default function DefaultOrdersSetting({
  defaultChartOrders,
  orderColor,
}: {
  defaultChartOrders: IcuDefaultChartJoined[]
  orderColor: IcuOrderColors
}) {
  const {
    isModalOpen,
    toggleModal,
    setSelectedChartOrder,
    isEditMode,
    setIsEditMode,
    resetState,
  } = useCreateOrderStore()

  const handleAddDialogOpen = useCallback(() => {
    setIsEditMode(false)
    resetState()
  }, [resetState, setIsEditMode])

  const sortedOrders = useMemo(() => {
    return defaultChartOrders.sort(
      (prev, next) =>
        DEFAULT_ICU_ORDER_TYPE.findIndex(
          (order) => order.value === prev.default_chart_order_type,
        ) -
        DEFAULT_ICU_ORDER_TYPE.findIndex(
          (order) => order.value === next.default_chart_order_type,
        ),
    )
  }, [defaultChartOrders])

  const handleEditDialogOpen = useCallback(
    (sortedOrder: IcuDefaultChartJoined) => {
      toggleModal()
      setIsEditMode(true)
      setSelectedChartOrder({
        order_name: sortedOrder.default_chart_order_name,
        order_comment: sortedOrder.default_chart_order_comment,
        order_type: sortedOrder.default_chart_order_type,
        order_id: sortedOrder.default_chart_id,
      })
    },
    [setIsEditMode, setSelectedChartOrder, toggleModal],
  )

  return (
    <Table className="h-full max-w-3xl border">
      <TableHeader>
        <TableRow>
          <TableHead className="relative flex items-center justify-center gap-2 text-center">
            <span>오더 목록</span>

            <Dialog open={isModalOpen} onOpenChange={toggleModal}>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleAddDialogOpen}
                  className="absolute right-1 top-0.5"
                >
                  <Plus size={18} />
                </Button>
              </DialogTrigger>

              <DialogContent className="max-w-3xl">
                <DialogHeader>
                  <DialogTitle>오더 {isEditMode ? '수정' : '추가'}</DialogTitle>
                  <DialogDescription />
                </DialogHeader>

                <DefaultOrderForm />
              </DialogContent>
            </Dialog>
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {sortedOrders.map((sortedOrder) => (
          <TableRow
            className={cn('divide-x')}
            key={sortedOrder.default_chart_id}
          >
            <TableCell
              className={cn('p-0')}
              style={{
                background:
                  orderColor[
                    sortedOrder.default_chart_order_type as keyof IcuOrderColors
                  ],
              }}
            >
              <Button
                variant="ghost"
                onClick={() => handleEditDialogOpen(sortedOrder)}
                className={cn(
                  'flex w-full justify-between rounded-none bg-transparent px-2',
                )}
              >
                <span className="truncate">
                  {sortedOrder.default_chart_order_name}
                </span>
                <span className="text-xs text-muted-foreground">
                  {sortedOrder.default_chart_order_comment}
                </span>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
