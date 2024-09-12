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
import { getBookmarkCharts } from '@/lib/services/icu/bookmark'
import { useIcuBookmarkStore } from '@/lib/store/icu/bookmark'
import { useCopiedChartStore } from '@/lib/store/icu/copied-chart'
import { useOrderPreviewStore } from '@/lib/store/icu/order-preview'
import { cn } from '@/lib/utils'
import type { IcuOrderColors } from '@/types/adimin'
import type { IcuChartBookmarkJoined } from '@/types/icu'
import { LoaderCircle, Star } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useState } from 'react'

export default function AddBookmarkChartDialog({
  orderColors,
  selectedIoId,
}: {
  orderColors: IcuOrderColors
  selectedIoId: string
}) {
  const [isFetching, setIsFetching] = useState(false)
  const [bookmarkCharts, setBookmarkCharts] = useState<
    IcuChartBookmarkJoined[]
  >([])

  const { hos_id } = useParams()
  const { isPreviewModalOpen } = useOrderPreviewStore()
  const { isBookmarkModalOpen, setBookmarkModalOpen } = useIcuBookmarkStore()
  const { isConfirmCopyDialogOpen } = useCopiedChartStore()

  const handleOpenBookmarkDialog = async () => {
    setIsFetching(true)
    getBookmarkCharts(hos_id as string)
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

        {isPreviewModalOpen && <PreviewDialog orderColors={orderColors} />}
        {isConfirmCopyDialogOpen && (
          <ConfirmCopyDialog selectedIoId={selectedIoId} />
        )}

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
