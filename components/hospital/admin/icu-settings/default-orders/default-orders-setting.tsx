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
import { useIcuOrderStore } from '@/lib/store/icu/icu-order'
import { cn } from '@/lib/utils'
import type { IcuDefaultChartJoined, IcuOrderColors } from '@/types/adimin'
import type { SelectedIcuOrder } from '@/types/icu/chart'
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
    step,
    setStep,
    setSelectedChartOrder,
    isEditMode,
    setIsEditMode,
    reset,
  } = useIcuOrderStore()

  const handleAddDialogOpen = useCallback(() => {
    setIsEditMode(false)
    reset()
  }, [reset, setIsEditMode])

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

  const handleOpenChange = useCallback(() => {
    if (step === 'closed') {
      setStep('upsert')
    } else {
      setStep('closed')
    }
    reset()
  }, [step, setStep, reset])

  const handleEditOrderDialogOpen = (order: Partial<SelectedIcuOrder>) => {
    setStep('upsert')
    setIsEditMode(true)
    setSelectedChartOrder(order)
  }

  return (
    <Table className="h-full max-w-3xl border">
      <TableHeader>
        <TableRow>
          <TableHead className="relative flex items-center justify-center gap-2 text-center">
            <span>오더 목록</span>

            <Dialog open={step !== 'closed'} onOpenChange={handleOpenChange}>
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

                {step === 'upsert' && <DefaultOrderForm />}
              </DialogContent>
            </Dialog>
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {sortedOrders.map((order) => (
          <TableRow className={cn('divide-x')} key={order.default_chart_id}>
            <TableCell
              className={cn('p-0')}
              style={{
                background:
                  orderColor[
                    order.default_chart_order_type as keyof IcuOrderColors
                  ],
              }}
            >
              <Button
                variant="ghost"
                onClick={() =>
                  handleEditOrderDialogOpen({
                    order_id: order.default_chart_id,
                    order_comment: order.default_chart_order_comment,
                    order_name: order.default_chart_order_name,
                    order_type: order.default_chart_order_type,
                  })
                }
                className={cn(
                  'flex w-full justify-between rounded-none bg-transparent px-2',
                )}
              >
                <span className="truncate">
                  {order.default_chart_order_name}
                </span>
                <span className="text-xs text-muted-foreground">
                  {order.default_chart_order_comment}
                </span>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
