import { AccordionContent } from '@/components/ui/accordion'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type { SearchedIcuCharts } from '@/types/icu'
import IcuChartRow from './icu-chart-row/icu-chart-row'

export default function GroupedAccordionContents({
  searchedIcuCharts,
}: {
  searchedIcuCharts: SearchedIcuCharts[]
}) {
  return (
    <AccordionContent className="py-0">
      <Table>
        <TableHeader className="table-fixed border-b">
          <TableRow>
            <TableHead className="text-center">입원일차</TableHead>
            <TableHead className="text-center">입원일</TableHead>
            <TableHead className="text-center">미리보기</TableHead>
            <TableHead className="text-center">복사</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {searchedIcuCharts.map((chart, index) => (
            <IcuChartRow chart={chart} index={index} key={chart.icu_chart_id} />
          ))}
        </TableBody>
      </Table>
    </AccordionContent>
  )
}
