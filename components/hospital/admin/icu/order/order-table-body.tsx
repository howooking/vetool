import { Button } from '@/components/ui/button'
import { TableBody, TableCell, TableRow } from '@/components/ui/table'
import { DEFAULT_ICU_ORDER_TYPE } from '@/constants/hospital/icu/chart/order'
import { useCreateOrderStore } from '@/lib/store/icu/create-order'
import { cn } from '@/lib/utils'
import { IcuOrderColors } from '@/types/adimin'
import type { IcuDefaultChartJoined } from '@/types/icu'
import { useMemo } from 'react'

export default function OrderTableBody({
  defaultChartOrders,
  isLoading,
}: {
  defaultChartOrders: IcuDefaultChartJoined[]
  isLoading: boolean
}) {
  const { toggleModal, setIsEditMode, setChartOrder, setDefaultChartId } =
    useCreateOrderStore()

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

  const orderColors = defaultChartOrders[0].hos_id.order_color as IcuOrderColors

  const handleEditDialogOpen = (sortedOrder: IcuDefaultChartJoined) => {
    toggleModal()
    setIsEditMode(true)
    setDefaultChartId(sortedOrder.default_chart_id)
    setChartOrder({
      icu_chart_order_name: sortedOrder.default_chart_order_name,
      icu_chart_order_comment: sortedOrder.default_chart_order_comment,
      icu_chart_order_type: sortedOrder.default_chart_order_type,
    })
  }

  return (
    <TableBody>
      {sortedOrders.map((sortedOrder) => (
        <TableRow className={cn('divide-x')} key={sortedOrder.default_chart_id}>
          <TableCell
            className={cn('p-0')}
            style={{
              background:
                orderColors[
                  sortedOrder.default_chart_order_type as keyof IcuOrderColors
                ],
            }}
          >
            <Button
              variant="ghost"
              onClick={() => handleEditDialogOpen(sortedOrder)}
              disabled={isLoading}
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
  )
}
