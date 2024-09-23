import ExportPdfButton from '@/components/hospital/icu/main/chart/selected-chart/chart-header/header-right-buttons/export-dialog/export-pdf-button'
import ExportPngButton from '@/components/hospital/icu/main/chart/selected-chart/chart-header/header-right-buttons/export-dialog/export-png-button'
import ExportRadioGroup from '@/components/hospital/icu/main/chart/selected-chart/chart-header/header-right-buttons/export-dialog/export-radio-group'
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
import type { IcuOrderColors } from '@/types/adimin'
import type { IcuChartJoined, IcuChartOrderJoined, Vet } from '@/types/icu'
import { Share } from 'lucide-react'
import { RefObject, useState } from 'react'

export default function ExportDioalog({
  name,
  captureRef,
  chartData,
  vetsList,
  orderColors,
}: {
  name: string
  captureRef: RefObject<HTMLDivElement>
  chartData: Omit<IcuChartJoined, 'memo_a' | 'memo_b' | 'memo_c'>
  selectedChartOrders: IcuChartOrderJoined[]
  vetsList: Vet[]
  orderColors: IcuOrderColors
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isEntireChecked, setIsEntireChecked] = useState(false)

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Share size={18} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="gap-2">
          <DialogTitle>
            {chartData.target_date} {name} 차트 내보내기
          </DialogTitle>
          <DialogDescription className="flex flex-col gap-1">
            <span>사진 저장 : PNG파일을 저장합니다</span>
            <span>PDF 저장 : PDF파일을 저장합니다</span>
            {/* <span>텍스트로 복사 : 텍스트형식으로 클립보드에 저장됩니다</span> */}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <ExportRadioGroup
            isEntireChecked={isEntireChecked}
            setIsEntireChecked={setIsEntireChecked}
          />

          <ExportPngButton
            captureRef={captureRef}
            chartData={chartData}
            setIsDialogOpen={setIsDialogOpen}
            isEntireChecked={isEntireChecked}
            vetsList={vetsList}
            orderColors={orderColors}
          />

          <ExportPdfButton
            captureRef={captureRef}
            chartData={chartData}
            setIsDialogOpen={setIsDialogOpen}
            isEntireChecked={isEntireChecked}
            vetsList={vetsList}
            orderColors={orderColors}
          />

          {/* <ExportTextButton
            chartData={chartData}
            selectedChartOrders={selectedChartOrders}
            setIsDialogOpen={setIsDialogOpen}
          /> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
