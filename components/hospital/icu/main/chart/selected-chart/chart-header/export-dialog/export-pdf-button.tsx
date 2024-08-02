import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'
import type { IcuChartJoined } from '@/types/icu'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { LoaderCircle } from 'lucide-react'
import { useState } from 'react'

export default function ExportPdfButton({
  pdfRef,
  chartData,
  setIsDialogOpen,
}: {
  pdfRef: React.RefObject<HTMLDivElement>
  chartData: Omit<IcuChartJoined, 'memo_a' | 'memo_b' | 'memo_c'>
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const [isExportingPdf, setIsExportingPdf] = useState(false)
  const handleExportPdf = async () => {
    if (!pdfRef.current) return

    try {
      setIsExportingPdf(true)

      const content = pdfRef.current
      const canvas = await html2canvas(pdfRef.current, {
        width: content.clientWidth,
        height: content.scrollHeight,
        scale: 2,
      })
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [canvas.width / 2, canvas.height / 2],
      })

      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width / 2, canvas.height / 2)
      pdf.save(`${chartData.target_date}/${chartData.patient_id.name}.pdf`)
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'PDF 저장 실패',
        description: 'PDF 저장에 실패하였습니다 나중에 다시 시도해주세요',
      })
    } finally {
      setIsExportingPdf(false)
      setIsDialogOpen(false)
    }
  }
  return (
    <Button
      variant="outline"
      onClick={handleExportPdf}
      disabled={isExportingPdf}
    >
      PDF 저장
      <LoaderCircle
        className={cn(isExportingPdf ? 'ml-2 animate-spin' : 'hidden')}
      />
    </Button>
  )
}
