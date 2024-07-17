import NoResult from '@/components/common/no-result'
import OrderPreviewDialog from '@/components/hospital/icu/main/search/order-preview-dialog'
import SearchChartTableRow from '@/components/hospital/icu/main/search/search-chart-table-row'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import type { IcuChartListJoined } from '@/types/icu'
import { useRef, useState } from 'react'

const TABLE_TITLES = [
  '환자명',
  'DX',
  'CC',
  '차트 생성일',
  '복사',
  '오더 미리보기',
] as const

export default function SearchChartTable({
  data,
  register,
}: {
  data: IcuChartListJoined[][]
  register?: boolean
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <div className="w-full rounded-md border">
      <div className="flex items-center border-b transition-colors hover:bg-muted/50">
        {TABLE_TITLES.map((title) => (
          <div
            key={title}
            className="inline-flex h-10 w-full items-center justify-center whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          >
            {title}
          </div>
        ))}
      </div>

      {/* 테이블 본문 */}
      {data.length > 0 ? (
        data.map((chartList) =>
          chartList.length > 1 ? (
            // CASE 1: 하나의 io_id, 다수의 chart_id -> Accordion화
            <Accordion
              key={chartList[0].icu_io_id}
              type="single"
              collapsible
              className="w-full"
            >
              <AccordionItem value={chartList[0].icu_io_id}>
                <AccordionTrigger className="p-0" noIcon>
                  <SearchChartTableRow
                    name={chartList[0].patient_id.name}
                    dx={chartList[0].icu_chart_dx}
                    cc={chartList[0].icu_chart_cc}
                    targetDate={chartList[0].target_date}
                    chartId={chartList[0].icu_chart_id}
                    setIsDialogOpen={setIsDialogOpen}
                    register={register}
                  />
                </AccordionTrigger>

                {chartList.slice(1).map((chart) => (
                  <AccordionContent
                    key={chart.icu_chart_id}
                    className="flex py-0"
                  >
                    <SearchChartTableRow
                      name={chart.patient_id.name}
                      dx={chart.icu_chart_dx}
                      cc={chart.icu_chart_cc}
                      targetDate={chart.target_date}
                      chartId={chart.icu_chart_id}
                      setIsDialogOpen={setIsDialogOpen}
                      register={register}
                    />
                  </AccordionContent>
                ))}
              </AccordionItem>
            </Accordion>
          ) : (
            // CASE 2: 하나의 io_id, 하나의 chart_id
            <div key={chartList[0].icu_io_id} className="flex">
              <SearchChartTableRow
                name={chartList[0].patient_id.name}
                dx={chartList[0].icu_chart_dx}
                cc={chartList[0].icu_chart_cc}
                targetDate={chartList[0].target_date}
                chartId={chartList[0].icu_chart_id}
                setIsDialogOpen={setIsDialogOpen}
                register={register}
              />
            </div>
          ),
        )
      ) : (
        // CASE 3: 검색 결과 없음
        <NoResult title="결과가 없습니다" className="h-40" />
      )}

      {isDialogOpen && (
        <OrderPreviewDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          register={register}
        />
      )}
    </div>
  )
}
