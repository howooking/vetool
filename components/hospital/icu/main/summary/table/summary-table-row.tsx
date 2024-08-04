import SummaryTableCell from '@/components/hospital/icu/main/summary/table/summary-table-cell'
import { TableCell, TableRow } from '@/components/ui/table'
import { TIMES } from '@/constants/hospital/icu/chart/time'
import { cn, getDaysDifference } from '@/lib/utils'
import type { IcuChartJoined, IcuChartOrderJoined } from '@/types/icu'

export default function SummaryTableRow({
  chart,
  orders,
  handleClickRow,
}: {
  chart: IcuChartJoined
  orders: IcuChartOrderJoined[]
  handleClickRow: (patientId: string, patientName: string) => void
}) {
  const ioDaysDifference = getDaysDifference(chart.icu_io_id.in_date)
  const isDisabled = !!chart.icu_io_id.out_date
  const rowClassName = cn(
    'cursor-pointer divide-x',
    isDisabled && 'text-muted-foreground line-through',
  )

  return (
    <TableRow
      className={rowClassName}
      onClick={() =>
        handleClickRow(chart.patient_id.patient_id, chart.patient_id.name)
      }
    >
      <TableCell className="flex w-[200px] items-center justify-between gap-2">
        <div className={cn(isDisabled && 'text-muted-foreground line-through')}>
          {chart.patient_id.name}
          <span className="text-xs text-muted-foreground">
            ({chart.patient_id.breed})
          </span>
        </div>
        <span className="text-xs text-muted-foreground">
          {ioDaysDifference}일차
        </span>
      </TableCell>

      {TIMES.map((time) => (
        <SummaryTableCell key={time} time={time} orders={orders} />
      ))}
    </TableRow>
  )
}
