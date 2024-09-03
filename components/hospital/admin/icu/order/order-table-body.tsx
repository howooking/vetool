import { Button } from '@/components/ui/button'
import { TableBody, TableCell, TableRow } from '@/components/ui/table'
import { DEFAULT_ICU_ORDER_TYPE } from '@/constants/hospital/icu/chart/order'
import { useCreateOrderStore } from '@/lib/store/icu/create-order'
import { cn } from '@/lib/utils'
import type { IcuDefaultChartJoined, OrderColorProps } from '@/types/icu'
import { useMemo } from 'react'

export default function OrderTableBody({
  defaultChartOrders,
}: {
  defaultChartOrders: IcuDefaultChartJoined[]
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

  const orderColorJson: { [key: string]: string } = sortedOrders[0].hos_id
    .order_color as OrderColorProps

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
              background: orderColorJson[sortedOrder.default_chart_order_type],
            }}
          >
            <TooltipProvider delayDuration={20}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    onClick={() => handleEditDialogOpen(sortedOrder)}
                    className={cn(
                      'flex w-[320px] justify-between rounded-none bg-transparent px-2',
                    )}
                  >
                    <span className="truncate">
                      {sortedOrder.default_chart_order_name}
                    </span>
                    <span className="min-w-16 truncate text-right text-xs text-muted-foreground">
                      {sortedOrder.default_chart_order_comment}
                    </span>
                  </Button>
                </TooltipTrigger>

                <TooltipContent side="right">
                  <div className="flex gap-2">
                    <span className="font-bold">
                      {sortedOrder.default_chart_order_name}
                    </span>
                    <span className="text-xs">
                      {sortedOrder.default_chart_order_comment}
                    </span>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  )
}
