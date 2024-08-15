import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { COLUMN_WIDTH } from '@/components/hospital/icu/main/search/table/search-chart-table'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { getSelectedCharts } from '@/lib/services/icu/search-charts'
import { cn, getAgeFromAgeInDays, getPatientSymptoms } from '@/lib/utils'
import type { SearchedChart, SelectedSearchedChart } from '@/types/icu'
import { Cat, Dog } from 'lucide-react'
import { useEffect, useState } from 'react'
import SingleRow from './single-row/single-row'
export default function GroupedChart({ charts }: { charts: SearchedChart }) {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false)
  const [singleRowCharts, setSingleRowCharts] = useState<
    SelectedSearchedChart[]
  >([])

  const {
    icu_io_id,
    age_in_days,
    in_date,
    out_date,
    search_tags,
    patient_id: { name, owner_name, species, breed },
  } = charts
  const { dx, cc } = getPatientSymptoms(search_tags)
  const inAndOutDate = `${in_date} ~ ${out_date}`

  useEffect(() => {
    if (isAccordionOpen) {
      const fetchSelectedCharts = async () => {
        const selectedCharts = await getSelectedCharts(icu_io_id)

        setSingleRowCharts(selectedCharts)
      }

      fetchSelectedCharts()
    }
  }, [icu_io_id, isAccordionOpen])

  return (
    <TableRow key={icu_io_id}>
      <TableCell colSpan={7} className="p-0">
        <Accordion
          type="single"
          collapsible
          className="w-full"
          onValueChange={(value) => setIsAccordionOpen(!!value)}
        >
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
                <div className={cn('w-auto flex-1 text-center')}>{dx}</div>
                <div className={cn('flex-1 text-center')}>{cc}</div>
              </div>
            </AccordionTrigger>

            <AccordionContent className="py-0">
              <Table className="table-fixed">
                <TableHeader className="border-b">
                  <TableRow>
                    <TableHead className="text-center">입원일차</TableHead>
                    <TableHead className="text-center">입원일</TableHead>
                    <TableHead className="text-center">미리보기</TableHead>
                    <TableHead className="text-center">복사</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {singleRowCharts.map((chart, index) => (
                    <SingleRow
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
