import OrderPreviewTable from '@/components/hospital/icu/main/search/table/preview/order-preview-table'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useCopiedChartStore } from '@/lib/store/icu/copied-chart'
import { useOrderPreviewStore } from '@/lib/store/icu/order-preview'
import { DialogDescription } from '@radix-ui/react-dialog'

export default function OrderPreviewDialog() {
  const { copiedChartOrder } = useCopiedChartStore()
  const { isPreviewModalOpen, setPreviewModalOpen } = useOrderPreviewStore()

  return (
    <Dialog open={isPreviewModalOpen} onOpenChange={setPreviewModalOpen}>
      <DialogContent className="sm:min-w-[1200px]">
        <DialogHeader>
          <DialogTitle>차트 미리보기</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <OrderPreviewTable selectedChartOrders={copiedChartOrder!} />
      </DialogContent>
    </Dialog>
  )
}
