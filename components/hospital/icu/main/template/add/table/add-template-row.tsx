import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'
import type { IcuOrderColors } from '@/types/adimin'
import type { SelectedIcuOrder } from '@/types/icu/chart'
import { RefObject } from 'react'

export default function AddTemplateRow({
  order,
  index,
  orderColors,
  onEdit,
  orderRef,
}: {
  order: SelectedIcuOrder
  index: number
  orderColors: IcuOrderColors
  onEdit: (order: Partial<SelectedIcuOrder>, index?: number) => void
  orderRef: RefObject<HTMLTableCellElement>
}) {
  return (
    <TableRow className="divide-x">
      <TableCell
        ref={orderRef}
        className="handle group cursor-grab p-0"
        style={{
          background: orderColors[order.order_type as keyof IcuOrderColors],
        }}
      >
        <Button
          variant="ghost"
          onClick={() =>
            onEdit({
              order_id: order.order_id,
              order_comment: order.order_comment,
              order_name: order.order_name,
              order_type: order.order_type,
            })
          }
          className="flex w-full justify-between rounded-none bg-transparent px-2"
        >
          <span className="truncate">{order.order_name}</span>
          <span className="text-xs text-muted-foreground">
            {order.order_comment}
          </span>
        </Button>
      </TableCell>
    </TableRow>
  )
}
