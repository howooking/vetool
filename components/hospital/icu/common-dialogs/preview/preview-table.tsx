import ChartTable from '@/components/hospital/icu/main/chart/selected-chart/table/chart-table'
import { IcuOrderTypeColor } from '@/types/adimin'
import type { CopiedOrder } from '@/types/icu'

export default function PreviewTable({
  copiedOrders,
  // orderColors,
}: {
  copiedOrders: CopiedOrder[]
  // orderColors: IcuOrderTypeColor
}) {
  return (
    <div className="max-h-[800px] overflow-y-auto">
      <ChartTable
        selectedChartOrders={copiedOrders}
        preview
        // orderColors={orderColors}
      />
    </div>
  )
}
