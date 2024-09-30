'use client'

import PreviewDialog from '@/components/hospital/icu/common-dialogs/preview/preview-dialog'
import DataTable from '@/components/ui/data-table'
import { usePreviewDialogStore } from '@/lib/store/icu/preview-dialog'
import { BookmarkedChart } from '@/types/icu/bookmark'
import { bookmarkColumns } from './bookmark-columns'

export default function Bookmark({
  bookmarkedCharts,
}: {
  bookmarkedCharts: BookmarkedChart[]
}) {
  const { isPreviewDialogOpen } = usePreviewDialogStore()

  return (
    <div className="p-2">
      <DataTable
        columns={bookmarkColumns}
        data={bookmarkedCharts}
        searchPlaceHolder="북마크 검색"
        rowLength={10}
      />

      {isPreviewDialogOpen && <PreviewDialog />}
    </div>
  )
}
