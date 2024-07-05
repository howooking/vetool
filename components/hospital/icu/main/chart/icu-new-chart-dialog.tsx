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
import {
  createDefaultOrder,
  createNewChart,
  createNewChartWithJoinedData,
  createOrderFromPrevOrder,
  getPreviousChart,
  getPreviousOrders,
} from '@/lib/services/hospital/icu/createNewChart'
import { useIcuSelectedDateStore } from '@/lib/store/hospital/icu/selected-date'
import { cn } from '@/lib/utils'
import type { IcuChartJoined } from '@/types/hospital'
import { format, parseISO, subDays } from 'date-fns'
import { LoaderCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function IcuNewChartDialog({
  prevSelectedChart,
}: {
  prevSelectedChart?: IcuChartJoined
}) {
  const { refresh } = useRouter()
  const { selectedDate } = useIcuSelectedDateStore()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isNewChartDialogOpen, setIsNewChartDialogOpen] = useState(false)
  const [isLoadPrevChartDialogOpen, setIsLoadPrevChartDialogOpen] =
    useState(false)

  // 새로운 차트 생성 Dialog OK Handler
  const handleCreateNewChart = async () => {
    setIsSubmitting(true)

    // icu_chart INSERT
    const icuChartData = await createNewChartWithJoinedData(
      prevSelectedChart!,
      selectedDate,
    )

    // icu_chart_order default values INSERT
    await createDefaultOrder(
      icuChartData.icu_chart_id,
      prevSelectedChart!.icu_io_id,
    )

    refresh()
    setIsNewChartDialogOpen(false)
    setIsSubmitting(false)
  }

  // 전일 차트 불러오기 Dialog OK Handler
  const handleLoadPrevChart = async () => {
    setIsSubmitting(true)
    const prevDate = format(subDays(parseISO(selectedDate), 1), 'yyyy-MM-dd')

    const prevChartData = await getPreviousChart(
      prevSelectedChart!.patient_id.patient_id!,
      prevDate,
    )

    if (prevChartData.length) {
      const newChartData = await createNewChart(prevChartData[0], selectedDate)
      const prevOrders = await getPreviousOrders(prevChartData[0].icu_chart_id)

      await createOrderFromPrevOrder(
        newChartData.icu_chart_id,
        newChartData.icu_io_id,
        prevOrders,
      )
    } else {
      toast({ title: '전일 차트가 존재하지 않아 새로운 차트를 추가합니다' })
      await handleCreateNewChart()
    }

    refresh()
    setIsLoadPrevChartDialogOpen(false)
    setIsSubmitting(false)
  }

  return (
    <>
      {/* 새로운 차트 생성 Dialog */}
      <Dialog
        open={isNewChartDialogOpen}
        onOpenChange={setIsNewChartDialogOpen}
      >
        <DialogTrigger asChild>
          <Button variant="outline">새로운 차트 생성하기</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>새로운 차트 생성</DialogTitle>
            <DialogDescription>
              {selectedDate} 날짜로 차트가 생성됩니다
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                취소
              </Button>
            </DialogClose>
            <Button onClick={handleCreateNewChart} disabled={isSubmitting}>
              생성
              <LoaderCircle
                className={cn(isSubmitting ? 'ml-2 animate-spin' : 'hidden')}
              />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 전일 차트 불러오기 Dialog */}
      <Dialog
        open={isLoadPrevChartDialogOpen}
        onOpenChange={setIsLoadPrevChartDialogOpen}
      >
        <DialogTrigger asChild>
          <Button variant="outline">전일 차트 불러오기</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>전일 차트 불러오기</DialogTitle>
            <DialogDescription>
              {selectedDate} 날짜로 차트가 생성됩니다
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                취소
              </Button>
            </DialogClose>
            <Button onClick={handleLoadPrevChart} disabled={isSubmitting}>
              불러오기
              <LoaderCircle
                className={cn(isSubmitting ? 'ml-2 animate-spin' : 'hidden')}
              />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
