import SummaryTable from '@/components/hospital/icu/main/summary/table/summary-table'
import type { IcuChartJoined, IcuChartOrderJoined } from '@/types/icu'

export default function Summary({
  icuChartData,
  icuChartOrderData,
}: {
  icuChartData: IcuChartJoined[]
  icuChartOrderData: IcuChartOrderJoined[]
}) {
  return (
    <div className="flex h-icu-chart w-full flex-col gap-2 overflow-auto p-2 pb-[48px]">
      <SummaryTable
        icuChartData={icuChartData}
        icuChartOrderData={icuChartOrderData}
      />
    </div>
  )
}
