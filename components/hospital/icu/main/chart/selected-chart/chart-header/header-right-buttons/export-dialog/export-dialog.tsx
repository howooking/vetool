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
import { IcuChartJoined, IcuChartOrderJoined } from '@/types/icu'
import { Share } from 'lucide-react'
import { useState } from 'react'
import ExportPdfButton from './export-pdf-button'
import ExportTextButton from './export-text-button'

export default function ExportDioalog({
  name,
  pdfRef,
  chartData,
  selectedChartOrders,
}: {
  name: string
  pdfRef: React.RefObject<HTMLDivElement>
  chartData: Omit<IcuChartJoined, 'memo_a' | 'memo_b' | 'memo_c'>
  selectedChartOrders: IcuChartOrderJoined[]
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
        <DialogHeader>
          <DialogTitle>
            {chartData.target_date} {name} 차트 내보내기
          </DialogTitle>
          <DialogDescription className="flex flex-col gap-1">
            <span>PDF 저장 : PDF파일을 저장합니다</span>
            <span>텍스트로 복사 : 텍스트형식으로 클립보드에 저장됩니다</span>
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <ExportPdfButton
            pdfRef={pdfRef}
            chartData={chartData}
            setIsDialogOpen={setIsDialogOpen}
          />

          <ExportTextButton
            chartData={chartData}
            selectedChartOrders={selectedChartOrders}
            setIsDialogOpen={setIsDialogOpen}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
