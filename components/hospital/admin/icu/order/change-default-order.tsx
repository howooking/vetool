import OrderTableBody from '@/components/hospital/admin/icu/order/order-table-body'
import OrderTableHeader from '@/components/hospital/admin/icu/order/order-table-header'
import { Table } from '@/components/ui/table'
import { IcuOrderTypeColor } from '@/types/adimin'
import { IcuDefaultChartJoined } from '@/types/icu'
import OrderTypeColorSetting from './order-type-color-setting'

export default function ChangeDefaultOrder({
  defaultChartOrders,
}: {
  defaultChartOrders: IcuDefaultChartJoined[]
}) {
  return (
    <div className="space-y-4">
      <Table className="h-full border">
        <OrderTableHeader />
        <OrderTableBody defaultChartOrders={defaultChartOrders} />
      </Table>

      <OrderTypeColorSetting
        orderTypeColors={
          defaultChartOrders[0].hos_id.order_color as IcuOrderTypeColor
        }
      />
    </div>
  )
}
