import AddTemplateOrdersDialog from '@/components/hospital/icu/main/template/add/add-template-orders-dialog'
import TemplateOrdersTable from '@/components/hospital/icu/main/template/add/template-orders-table'
import { Button } from '@/components/ui/button'
import { useIcuOrderStore } from '@/lib/store/icu/icu-order'
import { useTemplateStore } from '@/lib/store/icu/template'

export default function AddTemplateOrders() {
  const { templateOrders, reset } = useTemplateStore()

  return (
    <div className="flex max-w-3xl flex-col gap-2">
      <TemplateOrdersTable />

      <div className="flex gap-2">
        <Button
          disabled={!templateOrders.length}
          variant="outline"
          className="ml-auto"
          onClick={() => reset()}
        >
          초기화
        </Button>

        <AddTemplateOrdersDialog />
      </div>
    </div>
  )
}
