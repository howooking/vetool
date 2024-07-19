import { bookmarkColumns } from '@/components/hospital/icu/main/chart/selected-chart-not-found/add-chart-dialogs/bookmark/bookmark-columns'
import SelectBookmarkSkeleton from '@/components/hospital/icu/main/chart/selected-chart-not-found/add-chart-dialogs/bookmark/select-bookmark-skeleton'
import OrderPreviewDialog from '@/components/hospital/icu/main/search/order-preview-dialog'
import { Button } from '@/components/ui/button'
import DataTable from '@/components/ui/data-table'
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
import { getBookmarkChart } from '@/lib/services/icu/bookmark'
import { useCopiedChartStore } from '@/lib/store/icu/copied-chart'
import { useOrderPreviewStore } from '@/lib/store/icu/order-preview'
import type { IcuChartBookmarkJoined, IcuChartJoined } from '@/types/icu'
import { Bookmark } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function AddBookmarkChartDialog({
  targetDate,
  selectedPatient,
  icuChartData,
}: {
  targetDate: string
  icuChartData: IcuChartJoined[]
  selectedPatient: {
    patientName: string
    patientId: string
  }
}) {
  const { target_date } = useParams()
  const { refresh } = useRouter()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { setCopiedChartId, copiedChartOrder } = useCopiedChartStore()
  const { isPreviewModalOpen, onOpenChange } = useOrderPreviewStore()
  const [bookmarkCharts, setBookmarkCharts] = useState<
    IcuChartBookmarkJoined[]
  >([])
  const [isFetching, setIsFetching] = useState(false)

  const fetchBookmarkData = async () => {
    setIsFetching(true)

    const bookmarkData = await getBookmarkChart()
    setBookmarkCharts(bookmarkData)

    setIsFetching(false)
  }

  const handleDialogOpen = () => {
    setIsDialogOpen(true)
    fetchBookmarkData()
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="flex h-1/3 w-1/4 items-center justify-center gap-2"
          onClick={handleDialogOpen}
        >
          <Bookmark />
          <span>북마크 차트 선택</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[1040px]">
        <DialogHeader>
          <DialogTitle>북마크 차트 붙여넣기</DialogTitle>
          <DialogDescription>
            북마크한 차트를 붙여넣어 차트가 생성됩니다
          </DialogDescription>
        </DialogHeader>
        {isFetching ? (
          <SelectBookmarkSkeleton />
        ) : (
          <DataTable
            columns={bookmarkColumns}
            data={bookmarkCharts}
            rowLength={10}
          />
        )}
        {isPreviewModalOpen && <OrderPreviewDialog type="bookmark" />}
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              취소
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
