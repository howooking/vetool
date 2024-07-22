import { bookmarkColumns } from '@/components/hospital/icu/main/chart/add-chart-dialogs/bookmark/bookmark-columns'
import SelectBookmarkSkeleton from '@/components/hospital/icu/main/chart/add-chart-dialogs/bookmark/select-bookmark-skeleton'
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
import { useIcuBookmarkStore } from '@/lib/store/icu/bookmark'
import { useOrderPreviewStore } from '@/lib/store/icu/order-preview'
import type { IcuChartBookmarkJoined } from '@/types/icu'
import { Bookmark } from 'lucide-react'
import { useState } from 'react'

export default function AddBookmarkChartDialog() {
  const { isPreviewModalOpen } = useOrderPreviewStore()
  const { isBookmarkModalOpen, setBookmarkModalOpen } = useIcuBookmarkStore()

  const [isFetching, setIsFetching] = useState(false)
  const [bookmarkCharts, setBookmarkCharts] = useState<
    IcuChartBookmarkJoined[]
  >([])

  const fetchBookmarkData = async () => {
    setIsFetching(true)

    const bookmarkData = await getBookmarkChart()
    setBookmarkCharts(bookmarkData)

    setIsFetching(false)
  }

  const handleDialogOpen = () => {
    setBookmarkModalOpen(true)
    fetchBookmarkData()
  }

  return (
    <Dialog open={isBookmarkModalOpen} onOpenChange={setBookmarkModalOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="flex h-1/3 w-1/4 items-center justify-center gap-2"
          onClick={handleDialogOpen}
        >
          <Bookmark />
          <span>즐겨찾기 차트 선택</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[1040px]">
        <DialogHeader>
          <DialogTitle>즐겨찾기 차트 붙여넣기</DialogTitle>
          <DialogDescription>
            저장한 차트를 붙여넣어 차트가 생성됩니다
          </DialogDescription>
        </DialogHeader>
        {isFetching ? (
          <SelectBookmarkSkeleton />
        ) : (
          <DataTable
            columns={bookmarkColumns}
            data={bookmarkCharts}
            rowLength={10}
            searchPlaceHolder="즐겨찾기 이름 · 즐겨찾기 설명 · 환자명으로 조회하세요"
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
