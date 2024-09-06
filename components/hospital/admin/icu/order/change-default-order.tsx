import OrderTableBody from '@/components/hospital/admin/icu/order/order-table-body'
import OrderTableHeader from '@/components/hospital/admin/icu/order/order-table-header'
import OrderTypeColorSetting from '@/components/hospital/admin/icu/order/order-type-color-setting'
import { Table } from '@/components/ui/table'
import { IcuOrderColors } from '@/types/adimin'
import { IcuDefaultChartJoined } from '@/types/icu'
import { useState } from 'react'

export default function ChangeDefaultOrder({
  defaultChartOrders,
}: {
  defaultChartOrders: IcuDefaultChartJoined[]
}) {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <div className="space-y-4">
      <Table className="h-full border">
        <OrderTableHeader />
        <OrderTableBody
          defaultChartOrders={defaultChartOrders}
          isLoading={isLoading}
        />
      </Table>

      <OrderTypeColorSetting
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        orderTypeColors={
          defaultChartOrders[0].hos_id.order_color as IcuOrderColors
        }
      />
    </div>
  )
}
