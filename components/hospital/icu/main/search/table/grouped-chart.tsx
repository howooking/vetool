import SingleRow from '@/components/hospital/icu/main/search/table/single-row/single-row'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { getSelectedCharts } from '@/lib/services/icu/search-charts'
import { cn, getAgeFromAgeInDays } from '@/lib/utils'
import type { SearchedChart, SelectedSearchedChart } from '@/types/icu'
import { Cat, Dog } from 'lucide-react'
import { useEffect, useState } from 'react'
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
    patient_id: { name, owner_name, species, breed },
  } = charts
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
      <TableCell colSpan={5} className="border-0 p-0 pl-[1px]">
        <Accordion
          type="single"
          collapsible
          className="w-full"
          onValueChange={(value) => setIsAccordionOpen(!!value)}
        >
          <AccordionItem value={icu_io_id} className="border-b-0">
            <AccordionTrigger className="h-10 w-full hover:bg-muted/50 [&[data-state=open]]:bg-muted">
              <div className="flex w-full">
                <div
                  className={cn('flex w-1/4 items-center justify-center gap-1')}
                >
                  {species === 'canine' ? <Dog size={20} /> : <Cat size={20} />}
                  {name}
                  <span className="text-xs text-muted-foreground">
                    ({breed})
                  </span>
                </div>
                <div className={cn('w-1/4 text-center')}>
                  {owner_name || '미등록'}
                </div>
                <div className={cn('w-1/4 text-center')}>{inAndOutDate}</div>
                <div className={cn('w-1/4 text-center')}>
                  {getAgeFromAgeInDays(age_in_days)}
                </div>
              </div>
            </AccordionTrigger>

            <AccordionContent className="py-0">
              <Table>
                <TableHeader className="table-fixed border-b">
                  <TableRow>
                    <TableHead className="text-center">입원일차</TableHead>
                    <TableHead className="text-center">입원일</TableHead>
                    <TableHead className="text-center">진단명</TableHead>
                    <TableHead className="text-center">주요 증상</TableHead>
                    <TableHead className="text-center">미리보기</TableHead>
                    <TableHead className="text-center">복사</TableHead>
                    <TableHead />
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
