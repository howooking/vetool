import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { TIMES } from '@/constants/hospital/icu/chart/time'
import { useIcuSelectedPatientIdStore } from '@/lib/store/icu/icu-selected-patient'
import { useSelectedMainViewStore } from '@/lib/store/icu/selected-main-view'
import { cn } from '@/lib/utils'
import type { IcuData } from '@/types/icu'
import SummaryTableRow from './summary-table-row'

export default function SummaryTable({ icuData }: { icuData: IcuData }) {
  const { icuChartData, icuChartOrderData } = icuData
  const { setSelectedIcuMainView } = useSelectedMainViewStore()
  const { setSelectedPatientId } = useIcuSelectedPatientIdStore()

  const handleClickRow = (patientId: string) => {
    setSelectedIcuMainView('chart')
    setSelectedPatientId(patientId)
  }

  return (
    <Table className="border">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[200px] text-center">환자목록</TableHead>

          {TIMES.map((time) => (
            <TableHead className={cn('border text-center')} key={time}>
              {time.toString().padStart(2, '0')}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody>
        {icuChartData.map((chart) => (
          <SummaryTableRow
            key={chart.patient_id.patient_id}
            chart={chart}
            handleClickRow={handleClickRow}
            orders={icuChartOrderData.filter(
              (order) => order.icu_chart_id.icu_chart_id === chart.icu_chart_id,
            )}
          />
        ))}
      </TableBody>
    </Table>
  )
}
