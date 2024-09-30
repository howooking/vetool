import ExportPdfButton from '@/components/hospital/icu/main/chart/selected-chart/chart-header/header-right-buttons/export-dialog/export-pdf-button'
import ExportPngButton from '@/components/hospital/icu/main/chart/selected-chart/chart-header/header-right-buttons/export-dialog/export-png-button'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import type { SelectedChart } from '@/types/icu/chart'
import { Share } from 'lucide-react'
import { useState } from 'react'

export default function ExportDialog({
  chartData,
}: {
  chartData: SelectedChart
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Share size={18} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="gap-2">
          <DialogTitle>{chartData.patient.name} 차트 내보내기</DialogTitle>
          <DialogDescription className="flex flex-col gap-1">
            <span>입원 기간 동안의 차트를 저장합니다</span>
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <ExportPngButton
            chartData={chartData}
            setIsDialogOpen={setIsDialogOpen}
          />

          <ExportPdfButton
            chartData={chartData}
            setIsDialogOpen={setIsDialogOpen}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
