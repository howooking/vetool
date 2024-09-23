import { handleExport } from '@/components/hospital/icu/main/chart/selected-chart/chart-header/header-right-buttons/export-dialog/export-dialog-utils'
import { Button } from '@/components/ui/button'
import { useIcuSelectedPatientIdStore } from '@/lib/store/icu/icu-selected-patient'
import { cn } from '@/lib/utils'
import type { IcuOrderColors } from '@/types/adimin'
import type { IcuChartJoined, Vet } from '@/types/icu'
import { LoaderCircle } from 'lucide-react'
import { useParams } from 'next/navigation'
import { Dispatch, RefObject, SetStateAction, useState } from 'react'
import jsPDF from 'jspdf'

export default function ExportPdfButton({
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
  vetsList: Vet[]
  orderColors: IcuOrderColors
}) {
  const [isExporting, setIsExporting] = useState(false)
  const { hos_id } = useParams()
  const { selectedPatientId } = useIcuSelectedPatientIdStore()
  const { icu_io_id, in_date } = chartData.icu_io_id
  const { name } = chartData.patient_id

  const generatePdf = (canvases: HTMLCanvasElement[]) => {
    const firstCanvas = canvases[0]
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'px',
      format: [firstCanvas.width / 2, firstCanvas.height / 2],
    })

    canvases.forEach((canvas, index) => {
      if (index > 0) pdf.addPage()
      const imgData = canvas.toDataURL('image/png')
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width / 2, canvas.height / 2)
    })

    return pdf
  }

  const handleExportPdf = async () => {
    setIsExporting(true)
    await handleExport(
      isEntireChecked,
      icu_io_id,
      hos_id as string,
      selectedPatientId as string,
      vetsList,
      orderColors,
      captureRef,
      (canvas) => {
        const pdf = generatePdf([canvas])
        pdf.save(`${chartData.target_date}_${name}.pdf`)
      },
      (canvases) => {
        const pdf = generatePdf(canvases)
        pdf.save(`(입원일_${in_date})_${name}.pdf`)
      },
    )
    setIsExporting(false)
    setIsDialogOpen(false)
  }

  return (
    <Button onClick={handleExportPdf} disabled={isExporting}>
      PDF 저장
      <LoaderCircle
        className={cn(isExporting ? 'ml-2 animate-spin' : 'hidden')}
      />
    </Button>
  )
}
