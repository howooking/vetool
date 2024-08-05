import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'
import type { IcuChartJoined, IcuChartOrderJoined } from '@/types/icu'
import { LoaderCircle } from 'lucide-react'
import { useState } from 'react'

export default function ExportTextButton({
  chartData,
  selectedChartOrders,
  setIsDialogOpen,
}: {
  chartData: Omit<IcuChartJoined, 'memo_a' | 'memo_b' | 'memo_c'>
  selectedChartOrders: IcuChartOrderJoined[]
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const [isExportingText, setIsExportingText] = useState(false)

  const handleExportText = async () => {
    // TODO 언제 무슨 오더가 들어갔는지 줄글 형식으로
    const textContents = `
환자명: ${chartData.patient_id.name}
입원일: ${chartData.target_date}
DX: ${chartData.icu_chart_dx}
CC: ${chartData.icu_chart_cc}
`

    try {
      setIsExportingText(true)

      await navigator.clipboard.writeText(textContents.trim())

      toast({
        title: '클립보드에 복사되었습니다',
        description: '메인차트로 이동하여 붙여넣기 해주세요',
      })
    } catch (error) {
      console.log(error)
      toast({
        title: '텍스트 복사 실패',
        description: '관리자에게 문의하세요',
        variant: 'destructive',
      })
    } finally {
      setIsDialogOpen(false)
      setIsExportingText(false)
    }
  }

  return (
    <Button onClick={handleExportText} disabled={isExportingText}>
      텍스트로 복사
      <LoaderCircle
        className={cn(isExportingText ? 'ml-2 animate-spin' : 'hidden')}
      />
    </Button>
  )
}
