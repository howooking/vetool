'use client'

import LargeLoaderCircle from '@/components/common/large-loader-circle'
import { ConfirmCopyDialog } from '@/components/hospital/icu/common-dialogs/confirm-copy-dialog'
import PreviewDialog from '@/components/hospital/icu/common-dialogs/preview/preview-dialog'
import { pasteBookmarkColumns } from '@/components/hospital/icu/main/chart/add-chart-dialogs/bookmark/paste-bookmark-columns'
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
import { getBookmarkedChartData } from '@/lib/services/icu/bookmark/bookmark'
import { useCopiedChartStore } from '@/lib/store/icu/copied-chart'
import { usePreviewDialogStore } from '@/lib/store/icu/preview-dialog'
import type { TemplateChart } from '@/types/icu/template'
import { LoaderCircle, Star } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useState } from 'react'

export default function AddBookmarkChartDialog() {
  const { isPreviewDialogOpen } = usePreviewDialogStore()
  const { isConfirmCopyDialogOpen } = useCopiedChartStore()
  const { hos_id } = useParams()

  const [bookmarkCharts, setBookmarkCharts] = useState<TemplateChart[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleOpenTemplateDialog = async () => {
    setIsLoading(true)

    if (bookmarkCharts?.length === 0) {
      const bookmarkChartData = await getBookmarkedChartData(hos_id as string)
      setBookmarkCharts(bookmarkChartData)
    }

    setIsLoading(false)
    setIsDialogOpen(!isDialogOpen)
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <Button
        variant="outline"
        className="hidden h-[200px] w-full items-center justify-center gap-2 md:flex md:h-1/3 md:w-1/4"
        onClick={handleOpenTemplateDialog}
        disabled={isLoading}
      >
        <Star size={20} />
        <span>북마크 차트 선택</span>
        {isLoading && <LoaderCircle className="ml-2 h-4 w-4 animate-spin" />}
      </Button>

      <DialogContent className="md:max-w-[1040px]">
        <DialogHeader>
          <DialogTitle>북마크 차트 붙여넣기</DialogTitle>
          <DialogDescription>복사할 차트를 선택해주세요</DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <LargeLoaderCircle className="h-96" />
        ) : (
          <DataTable
            columns={pasteBookmarkColumns}
            data={bookmarkCharts ?? []}
            rowLength={10}
            searchPlaceHolder="북마크 이름 · 북마크 설명 · 환자명 검색"
          />
        )}

        {isPreviewDialogOpen && <PreviewDialog />}
        {isConfirmCopyDialogOpen && (
          <ConfirmCopyDialog setTemplateDialogOpen={setIsDialogOpen} />
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
