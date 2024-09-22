import { handleExport } from '@/components/hospital/icu/main/chart/selected-chart/chart-header/header-right-buttons/export-dialog/export-dialog-utils'
import { Button } from '@/components/ui/button'
import { useIcuSelectedPatientIdStore } from '@/lib/store/icu/icu-selected-patient'
import { cn } from '@/lib/utils'
import type { IcuOrderColors } from '@/types/adimin'
import type { IcuChartJoined, IcuUserList } from '@/types/icu'
import { LoaderCircle } from 'lucide-react'
import { useParams } from 'next/navigation'
import { Dispatch, RefObject, SetStateAction, useState } from 'react'

export default function ExportPngButton({
  captureRef,
  chartData,
  setIsDialogOpen,
  isEntireChecked,
  vetsList,
  orderColors,
}: {
  captureRef: RefObject<HTMLDivElement>
  chartData: Omit<IcuChartJoined, 'memo_a' | 'memo_b' | 'memo_c'>
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>
  isEntireChecked: boolean
  vetsList: IcuUserList[]
  orderColors: IcuOrderColors
}) {
  const [isExporting, setIsExporting] = useState(false)
  const { hos_id } = useParams()
  const { selectedPatientId } = useIcuSelectedPatientIdStore()
  const { icu_io_id } = chartData.icu_io_id
  const { name } = chartData.patient_id

  const downloadPng = (canvas: HTMLCanvasElement, fileName: string) => {
    const link = document.createElement('a')
    link.download = fileName
    link.href = canvas.toDataURL('image/png')
    link.click()
  }

  const handleExportPng = async () => {
    setIsExporting(true)
    await handleExport(
      isEntireChecked,
      icu_io_id,
      hos_id as string,
      selectedPatientId as string,
      vetsList,
      orderColors,
      captureRef,
      (canvas) => downloadPng(canvas, `${chartData.target_date}_${name}.png`),
      (canvases) =>
        canvases.forEach((canvas, index) =>
          downloadPng(
            canvas,
            `${chartData.target_date}_${index + 1}_${name}.png`,
          ),
        ),
    )
    setIsExporting(false)
    setIsDialogOpen(false)
  }

  return (
    <Button variant="outline" onClick={handleExportPng} disabled={isExporting}>
      사진 저장
      <LoaderCircle
        className={cn(isExporting ? 'ml-2 animate-spin' : 'hidden')}
      />
    </Button>
  )
}
