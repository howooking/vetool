import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { toast } from '@/components/ui/use-toast'
import { registerDefaultChart } from '@/lib/services/icu/add-icu-chart'
import type { IcuChartJoined } from '@/types/icu'
import { File } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useState } from 'react'

export default function AddDefaultChartDialog({
  selectedChart,
  setIsCreatingChart,
}: {
  selectedChart?: IcuChartJoined
  setIsCreatingChart: (isCreatingChart: boolean) => void
}) {
  const { hos_id } = useParams()
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleAddDefaultChart = async () => {
    setIsCreatingChart(true)
    setIsDialogOpen(false)

    await registerDefaultChart(
      hos_id as string,
      selectedChart?.icu_chart_id!,
      selectedChart?.icu_io_id.icu_io_id!,
    )

    toast({
      title: '기본형식의 차트를 생성했습니다',
    })
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="flex h-1/3 w-1/4 items-center justify-center gap-2"
        >
          <File />
          <span>기본형식 차트생성</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>기본형식 차트 생성</DialogTitle>
          <DialogDescription>기본 형식의 차트가 생성됩니다</DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline" tabIndex={-1}>
              취소
            </Button>
          </DialogClose>
          <Button onClick={handleAddDefaultChart}>생성</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
