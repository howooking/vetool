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
import { IcuChartJoined } from '@/types/icu'
import { Share } from 'lucide-react'
import { useState } from 'react'
import ExportPdfButton from './export-pdf-button'

export default function ExportDioalog({
  name,
  pdfRef,
  chartData,
}: {
  name: string
  pdfRef: React.RefObject<HTMLDivElement>
  chartData: Omit<IcuChartJoined, 'memo_a' | 'memo_b' | 'memo_c'>
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
            <span>텍스트로 복사 : 텍스트형식이 클립보드에 저장됩니다</span>
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <ExportPdfButton
            pdfRef={pdfRef}
            chartData={chartData}
            setIsDialogOpen={setIsDialogOpen}
          />

          <Button
          // onClick={handleDeleteAllCharts}
          // disabled={isDeletingAllCharts}
          >
            텍스트로 복사
            {/* <LoaderCircle
              className={
                cn()
                isDeletingAllCharts ? 'ml-2 animate-spin' : 'hidden',
              }
            /> */}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
