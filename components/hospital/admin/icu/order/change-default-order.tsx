import OrderTableBody from '@/components/hospital/admin/icu/order/order-table-body'
import OrderTableHeader from '@/components/hospital/admin/icu/order/order-table-header'
import { Table } from '@/components/ui/table'
import { IcuDefaultChartJoined } from '@/types/icu'

export default function ChangeDefaultOrder({
  defaultChartOrders,
}: {
  defaultChartOrders: IcuDefaultChartJoined[]
}) {
  return (
    <Table className="h-full border">
      <OrderTableHeader orderColor={defaultChartOrders[0].hos_id.order_color} />
      <OrderTableBody defaultChartOrders={defaultChartOrders} />
    </Table>
  )
}
