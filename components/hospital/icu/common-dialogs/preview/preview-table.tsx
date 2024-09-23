import DesktopChartTable from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/desktop-chart-table'
import { IcuOrderColors } from '@/types/adimin'
import type { CopiedOrder } from '@/types/icu'

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
