import { Button } from '@/components/ui/button'
import { ChevronDown } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'

export default function IcuSearchDataTableRow({
  name,
  dx,
  cc,
  targetDate,
  chartId,
  setIsDialogOpen,
  setChartId,
  onRefClick,
}: {
  name: string
  dx: string | null
  cc: string | null
  targetDate: string
  chartId: string
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>
  setChartId: Dispatch<SetStateAction<string>>
  onRefClick?: () => void
}) {
  const rowData = [name, dx, cc, targetDate]
  const handleButtonClick = () => {
    if (setIsDialogOpen) {
      setIsDialogOpen(true)
      setChartId(chartId)
    }
  }

  return (
    <div className="relative flex w-full items-center border-b text-sm transition-colors hover:bg-accent hover:text-accent-foreground">
      {rowData.map((data, index) => (
        <span
          key={index}
          className="flex h-10 w-full items-center justify-center font-normal text-foreground"
        >
          {data ?? '없음'}
        </span>
      ))}

      <div className="flex w-full justify-center">
        <Button onClick={handleButtonClick} className="h-6">
          차트보기
        </Button>
      </div>

      {/* Accordion Trigger */}
      {onRefClick && (
        <ChevronDown
          className="absolute right-4 top-2 shrink-0 text-muted-foreground transition-transform duration-200 hover:cursor-pointer"
          size={24}
          onClick={onRefClick}
        />
      )}
    </div>
  )
}
