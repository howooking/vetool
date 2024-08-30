import type { CopiedOrder } from '@/types/icu'
import ChartTable from '../../main/chart/selected-chart/table/chart-table'

export default function PreviewTable({
  copiedOrders,
}: {
  copiedOrders: CopiedOrder[]
}) {
  return (
    <div className="h-[800px] overflow-y-auto">
      <ChartTable selectedChartOrders={copiedOrders} preview />
    </div>
  )
}
