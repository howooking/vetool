import { IcuOrderColors } from '@/types/adimin'
import type { CopiedOrder } from '@/types/icu'
import ChartTable from '../../main/chart/selected-chart/chart-body/table/chart-table'

export default function PreviewTable({
  copiedOrders,
  orderColors,
}: {
  copiedOrders: CopiedOrder[]
  orderColors: IcuOrderColors
}) {
  return (
    <div className="max-h-[800px] overflow-y-auto">
      {/* <ChartTable chartData={copiedOrders} preview /> */}
    </div>
  )
}
