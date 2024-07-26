import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { cn, getAgeFromAgeInDays } from '@/lib/utils'
import { SearchedChart } from '@/types/icu'
import { Cat, Dog } from 'lucide-react'
import GroupedChartRow from './grouped-chart-row'
import { COLUMN_WIDTH } from './search-chart-table'
export default function GroupedChart({
  charts,
  type,
}: {
  charts: SearchedChart[]
  type: 'search' | 'register' | 'bookmark'
}) {
  const {
    icu_chart_id,
    icu_chart_cc,
    icu_chart_dx,
    patient_id: { name, owner_name, species, breed },
    icu_io_id: { icu_io_id, age_in_days, in_date, out_date },
  } = charts[0]
  const inAndOutDate = `${in_date} ~ ${out_date}`

  return (
    <TableRow key={icu_chart_id}>
      <TableCell colSpan={7} className="p-0">
        <Accordion key={icu_io_id} type="single" collapsible className="w-full">
          <AccordionItem value={icu_io_id} className="border-b-0">
            <AccordionTrigger className="h-10 w-full hover:bg-muted/50 [&[data-state=open]]:bg-muted">
              <div className="flex w-full items-center">
                <div
                  className={cn(
                    COLUMN_WIDTH.name,
                    'flex items-center justify-center gap-1',
                  )}
                >
                  {species === 'canine' ? <Dog size={20} /> : <Cat size={20} />}
                  {name}
                  <span className="text-xs text-muted-foreground">
                    ({breed})
                  </span>
                </div>
                <div className={cn(COLUMN_WIDTH.ownerName, 'text-center')}>
                  {owner_name || '미등록'}
                </div>
                <div className={cn(COLUMN_WIDTH.inAndOutDate, 'text-center')}>
                  {inAndOutDate}
                </div>
                <div className={cn(COLUMN_WIDTH.ageInDays, 'text-center')}>
                  {getAgeFromAgeInDays(age_in_days)}
                </div>
                <div className={cn('w-auto flex-1 text-center')}>
                  {icu_chart_dx}
                </div>
                <div className={cn('flex-1 text-center')}>{icu_chart_cc}</div>
              </div>
            </AccordionTrigger>

            <AccordionContent className="py-0">
              <Table>
                <TableHeader className="border-b">
                  <TableRow>
                    <TableHead className="text-center">입원일차</TableHead>
                    <TableHead className="text-center">입원일</TableHead>
                    <TableHead className="text-center">미리보기</TableHead>
                    <TableHead className="text-center">
                      {type === 'search' && '복사'}
                      {type === 'register' && '선택'}
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {charts.map((chart, index) => (
                    <GroupedChartRow
                      type={type}
                      chart={chart}
                      index={index}
                      key={chart.icu_chart_id}
                    />
                  ))}
                </TableBody>
              </Table>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </TableCell>
    </TableRow>
  )
}
