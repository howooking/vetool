import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { TIMES } from '@/constants/hospital/icu/chart/time'
import { useIcuSelectedPatientStore } from '@/lib/store/icu/icu-selected-patient'
import { useSelectedMainViewStore } from '@/lib/store/icu/selected-main-view'
import { cn } from '@/lib/utils'
import type { IcuData } from '@/types/icu'
import SummaryTableCell from './summary-table-cell'

export default function SummaryTable({ icuData }: { icuData: IcuData }) {
  const { icuChartData, icuChartOrderData } = icuData
  const { setSelectedIcuMainView } = useSelectedMainViewStore()
  const { setSelectedPatient } = useIcuSelectedPatientStore()
  const handleClickRow = (patientId: string, patientName: string) => {
    setSelectedIcuMainView('chart')
    setSelectedPatient({ patientId, patientName })
  }

  return (
    <Table className="border">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[200px] text-center">
            <span>환자목록</span>
          </TableHead>

          {TIMES.map((time) => (
            <TableHead className={cn('border text-center')} key={time}>
              {time.toString().padStart(2, '0')}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody>
        {icuChartData.map((chart) => (
          <TableRow
            className={cn(
              'cursor-pointer divide-x',
              chart.icu_io_id.out_date
                ? 'text-muted-foreground line-through'
                : '',
            )}
            key={chart.icu_chart_id}
            onClick={() =>
              handleClickRow(chart.patient_id.patient_id, chart.patient_id.name)
            }
          >
            <TableCell
              className={cn(
                'flex w-[200px] items-center justify-between gap-2',
              )}
            >
              <div
                className={cn(
                  chart.icu_io_id.out_date
                    ? 'text-muted-foreground line-through'
                    : '',
                )}
              >
                {chart.patient_id.name}
                <span className="text-xs text-muted-foreground">
                  {' '}
                  ({chart.patient_id.breed})
                </span>
              </div>
              <span className="text-xs text-muted-foreground"></span>
              <span className="text-xs text-muted-foreground">
                {chart.weight ? `${chart.weight}kg` : ''}
              </span>
            </TableCell>

            {TIMES.map((time, index) => {
              const orders = icuChartOrderData.filter(
                (el) =>
                  el.icu_chart_id.icu_chart_id === chart.icu_chart_id &&
                  !el.icu_io_id.out_date,
              )

              return <SummaryTableCell key={time} time={time} orders={orders} />
            })}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
