import { Input } from '@/components/ui/input'
import { TableCell } from '@/components/ui/table'
import { cn } from '@/lib/utils'

type TableCellInputProps = {
  hasOrder: boolean
  time: number
  icuChartOrderId: string
  icuIoId: string
}

export default function IcuChartTableCellInput({
  hasOrder,
  time,
  icuChartOrderId,
  icuIoId,
}: TableCellInputProps) {
  return (
    <TableCell className="h-2 border-black p-0 leading-4">
      <Input
        className={cn(
          'rounded-none px-1 focus-visible:border-2 focus-visible:border-primary focus-visible:ring-0',
          hasOrder ? 'bg-red-200' : 'bg-input',
        )}
      />
    </TableCell>
  )
}
