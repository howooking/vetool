import { ConfirmCopyDialog } from '@/components/hospital/icu/common-dialogs/confirm-copy-dialog'
import PreviewDialog from '@/components/hospital/icu/common-dialogs/preview/preview-dialog'
import { bookmarkColumns } from '@/components/hospital/icu/main/chart/add-chart-dialogs/bookmark/bookmark-columns'
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
} from '@/components/ui/dialog'
import { getBookmarkedCharts } from '@/lib/services/icu/bookmark/bookmark'
import { useIcuBookmarkStore } from '@/lib/store/icu/bookmark'
import { useCopiedChartStore } from '@/lib/store/icu/copied-chart'
import { usePreviewDialogStore } from '@/lib/store/icu/preview-dialog'
import { cn } from '@/lib/utils'
import { BookmarkedChart } from '@/types/icu/bookmark'
import { LoaderCircle, Star } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useState } from 'react'

export default function AddBookmarkChartDialog() {
  const [isFetching, setIsFetching] = useState(false)
  const [bookmarkCharts, setBookmarkCharts] = useState<BookmarkedChart[]>([])

  const { hos_id } = useParams()
  const { isPreviewDialogOpen } = usePreviewDialogStore()
  const { isBookmarkModalOpen, setBookmarkModalOpen } = useIcuBookmarkStore()
  const { isConfirmCopyDialogOpen } = useCopiedChartStore()

  const handleOpenBookmarkDialog = async () => {
    setIsFetching(true)
    getBookmarkedCharts(hos_id as string)
      .then(setBookmarkCharts)
      .then(() => setBookmarkModalOpen(true))
      .then(() => setIsFetching(false))
  }

  return (
    <Dialog open={isBookmarkModalOpen} onOpenChange={setBookmarkModalOpen}>
      <Button
        variant="outline"
        className="hidden h-[200px] w-full items-center justify-center gap-2 md:flex md:h-1/3 md:w-1/4"
        onClick={handleOpenBookmarkDialog}
        disabled={isFetching}
      >
        <Star size={20} />
        <span>즐겨찾기 차트 선택</span>
        <LoaderCircle
          className={cn(isFetching ? 'block animate-spin' : 'hidden')}
        />
      </Button>

      <DialogContent className="md:max-w-[1040px]">
        <DialogHeader>
          <DialogTitle>즐겨찾기 차트 붙여넣기</DialogTitle>
          <DialogDescription>복사할 차트를 선택해주세요</DialogDescription>
        </DialogHeader>

        <DataTable
          columns={bookmarkColumns}
          data={bookmarkCharts}
          rowLength={10}
          searchPlaceHolder="즐겨찾기 이름 · 즐겨찾기 설명 · 환자명 검색"
        />

        {isPreviewDialogOpen && <PreviewDialog />}
        {isConfirmCopyDialogOpen && <ConfirmCopyDialog />}

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
