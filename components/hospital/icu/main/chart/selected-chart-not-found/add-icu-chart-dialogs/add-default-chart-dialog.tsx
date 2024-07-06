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
import { addDefaultChart } from '@/lib/services/hospital/icu/add-icu-chart'

import { cn } from '@/lib/utils'
import type { IcuChartJoined } from '@/types/hospital'
import { File, LoaderCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function AddDefaultChartDialog({
  selectedDate,
  prevSelectedChart,
}: {
  selectedDate: string
  prevSelectedChart: IcuChartJoined
}) {
  const { refresh } = useRouter()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleAddDefaultChart = async () => {
    setIsSubmitting(true)

    await addDefaultChart(prevSelectedChart, selectedDate)

    toast({
      title: `${selectedDate} 기본차트를 생성했습니다`,
    })

    refresh()
    setIsDialogOpen(false)
    setIsSubmitting(false)
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="flex h-1/3 w-1/4 items-center justify-center gap-2"
        >
          <File />
          <span>새로운 차트생성</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>새로운 차트 생성</DialogTitle>
          <DialogDescription>
            기본형식의 {selectedDate} 차트가 생성됩니다
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              취소
            </Button>
          </DialogClose>
          <Button onClick={handleAddDefaultChart} disabled={isSubmitting}>
            생성
            <LoaderCircle
              className={cn(isSubmitting ? 'ml-2 animate-spin' : 'hidden')}
            />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
