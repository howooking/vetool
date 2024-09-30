import type { SummaryData } from '@/types/icu/summary'
import SummaryTable from './table/summary-table'

export default function Summary({
  summaryData,
}: {
  summaryData: SummaryData[]
}) {
  return (
    <div className="flex h-icu-chart w-full flex-col gap-2 overflow-auto p-2 pb-[48px]">
      <SummaryTable summaryData={summaryData} />
    </div>
  )
}
