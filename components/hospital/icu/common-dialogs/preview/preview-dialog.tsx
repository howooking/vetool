import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useCopiedChartStore } from '@/lib/store/icu/copied-chart'
import { usePreviewDialogStore } from '@/lib/store/icu/preview-dialog'
import { DialogDescription } from '@radix-ui/react-dialog'
import ChartTable from '../../main/chart/selected-chart/chart-body/table/chart-table'

export default function PreviewDialog() {
  const { copiedChart } = useCopiedChartStore()
  const { isPreviewDialogOpen, setPreviewDialogOpen } = usePreviewDialogStore()

  return (
    <Dialog open={isPreviewDialogOpen} onOpenChange={setPreviewDialogOpen}>
      <DialogContent className="sm:min-w-[1200px]">
        <DialogHeader>
          <DialogTitle>차트 미리보기</DialogTitle>
          <DialogDescription />
        </DialogHeader>

        <div className="max-h-[800px] overflow-y-auto">
          <ChartTable preview chartData={copiedChart!} />
        </div>
      </DialogContent>
    </Dialog>
  )
}
