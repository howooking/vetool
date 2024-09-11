import { IcuOrderColors } from '@/types/adimin'
import type { CopiedOrder } from '@/types/icu'
import DesktopChartTable from '../../main/chart/selected-chart/table/desktop-chart-table'

export default function PreviewTable({
  copiedOrders,
  orderColors,
}: {
  copiedOrders: CopiedOrder[]
  orderColors: IcuOrderColors
}) {
  return (
    <div className="max-h-[800px] overflow-y-auto">
      <DesktopChartTable
        orderColors={orderColors}
        selectedChartOrders={copiedOrders}
        preview
      />
    </div>
  )
}
