import { Button } from '@/components/ui/button'

export default function SaveChartButton({
  handleSaveChart,
}: {
  handleSaveChart: () => Promise<void>
}) {
  return (
    <Button variant="outline" onClick={handleSaveChart}>
      차트 저장
    </Button>
  )
}
