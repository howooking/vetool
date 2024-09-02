import OrderTableBody from '@/components/hospital/admin/icu/order/order-table-body'
import OrderTableHeader from '@/components/hospital/admin/icu/order/order-table-header'
import { Table } from '@/components/ui/table'
import { HospitalIcuOrder } from '@/types/icu'

export default function ChangeHosOrder({
  hospitalOrder,
}: {
  hospitalOrder: HospitalIcuOrder
}) {
  return (
    <Table className="h-full border">
      <OrderTableHeader />
      <OrderTableBody hospitalOrder={hospitalOrder} />
    </Table>
  )
}
