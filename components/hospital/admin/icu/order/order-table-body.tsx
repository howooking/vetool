import { Button } from '@/components/ui/button'
import { TableBody, TableCell, TableRow } from '@/components/ui/table'
import { DEFAULT_ICU_ORDER_TYPE } from '@/constants/hospital/icu/chart/order'
import { useCreateOrderStore } from '@/lib/store/icu/create-order'
import { cn } from '@/lib/utils'
import type { HospitalIcuOrder } from '@/types/icu'
import { useMemo } from 'react'

export default function OrderTableBody({
  hospitalOrder,
}: {
  hospitalOrder: HospitalIcuOrder
}) {
  const { toggleModal, setIsEditMode, setOrderIndex, setChartOrder } =
    useCreateOrderStore()

  const sortedOrders = useMemo(() => {
    const orderEntries = hospitalOrder.hos_order_names.map((name, index) => ({
      name,
      type: hospitalOrder.hos_order_types[index],
      comment: hospitalOrder.hos_order_comments[index],
    }))

    return orderEntries.sort(
      (prev, next) =>
        DEFAULT_ICU_ORDER_TYPE.findIndex((order) => order.value === prev.type) -
        DEFAULT_ICU_ORDER_TYPE.findIndex((order) => order.value === next.type),
    )
  }, [hospitalOrder])

  const handleEditDialogOpen = (index: number) => {
    toggleModal()
    setIsEditMode(true)
    setOrderIndex(index)
    setChartOrder({
      icu_chart_order_type: hospitalOrder.hos_order_types[index],
      icu_chart_order_name: hospitalOrder.hos_order_names[index],
      icu_chart_order_comment: hospitalOrder.hos_order_comments[index],
    })
  }

  return (
    <TableBody>
      {sortedOrders.map((sortedOrder, index) => (
        <TableRow className={cn('divide-x')} key={sortedOrder.name + index}>
          <TableCell
            className={cn('p-0')}
            style={{
              background: DEFAULT_ICU_ORDER_TYPE.find(
                (order) => order.value === sortedOrder.type,
              )?.color,
            }}
          >
            <Button
              variant="ghost"
              onClick={() => handleEditDialogOpen(index)}
              className={cn(
                'flex w-full justify-between rounded-none bg-transparent px-2',
              )}
            >
              <span className="truncate">{sortedOrder.name}</span>
              <span className="min-w-16 truncate text-right text-xs text-muted-foreground">
                {sortedOrder.comment}
              </span>
            </Button>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  )
}
