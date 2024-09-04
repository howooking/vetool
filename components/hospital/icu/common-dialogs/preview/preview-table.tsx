import { IcuOrderTypeColor } from '@/types/adimin'
import type { CopiedOrder } from '@/types/icu'
import ChartTable from '../../main/chart/selected-chart/table/chart-table'

export default function PreviewTable({
  copiedOrders,
  orderColors,
}: {
  copiedOrders: CopiedOrder[]
  orderColors: IcuOrderTypeColor
}) {
  return (
    <div className="h-[800px] overflow-y-auto">
      <ChartTable
        selectedChartOrders={copiedOrders}
        preview
        orderColors={orderColors}
      />
    </div>
  )
}
