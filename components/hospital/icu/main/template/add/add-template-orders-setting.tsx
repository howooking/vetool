import AddTemplateDialog from '@/components/hospital/icu/main/template/add/add-template-dialog'
import AddTemplateTable from '@/components/hospital/icu/main/template/add/add-template-table'
import { Button } from '@/components/ui/button'
import { useTemplateStore } from '@/lib/store/icu/template'

export default function AddTemplateOrdersSetting() {
  const { templateOrders, reset } = useTemplateStore()

  return (
    <div className="flex max-w-3xl flex-col gap-2">
      <AddTemplateTable />

      <div className="flex gap-2">
        <Button
          disabled={!templateOrders.length}
          variant="outline"
          className="ml-auto"
          onClick={() => reset()}
        >
          초기화
        </Button>

        <AddTemplateDialog />
      </div>
    </div>
  )
}
