import { TableCell, TableRow } from '@/components/ui/table'
import { TIMES } from '@/constants/hospital/icu/chart/time'
import { cn, getDaysDifference } from '@/lib/utils'
import type { IcuChartJoined, IcuChartOrderJoined } from '@/types/icu'
import SummaryTableCell from './summary-table-cell'

export default function SummaryTableRow({
  chart,
  orders,
  handleClickRow,
}: {
  chart: IcuChartJoined
  orders: IcuChartOrderJoined[]
  handleClickRow: (patientId: string, patientName: string) => void
}) {
  const hospitalizationDays = getDaysDifference(chart.icu_io_id.in_date) + 1
  const isPatientOut = !!chart.icu_io_id.out_date

  return (
    <TableRow
      className={cn(
        'cursor-pointer divide-x',
        isPatientOut && 'text-muted-foreground line-through',
      )}
      onClick={() =>
        handleClickRow(chart.patient_id.patient_id, chart.patient_id.name)
      }
    >
      <TableCell className="flex w-[200px] items-center justify-between">
        <div>
          <span>{chart.patient_id.name}</span>
          <span className="text-xs">({chart.patient_id.breed})</span>
        </div>
        <span className="text-xs">{hospitalizationDays}일차</span>
      </TableCell>

      {TIMES.map((time) => (
        <SummaryTableCell key={time} time={time} orders={orders} />
      ))}
    </TableRow>
  )
}
