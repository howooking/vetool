import type { IcuChartOrderJoined } from '@/types/icu'
import ChartTable from '../../../chart/selected-chart/table/chart-table'

export default function OrderPreviewTable({
  selectedChartOrders,
}: {
  selectedChartOrders: IcuChartOrderJoined[]
}) {
  return <ChartTable selectedChartOrders={selectedChartOrders} preview />
}
