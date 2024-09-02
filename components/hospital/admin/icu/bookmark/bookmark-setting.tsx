import PreviewDialog from '@/components/hospital/icu/common-dialogs/preview/preview-dialog'
import DataTable from '@/components/ui/data-table'
import { useOrderPreviewStore } from '@/lib/store/icu/order-preview'
import type { IcuChartBookmarkJoined } from '@/types/icu'
import { bookmarkColumns } from './bookmark-columns'

export default function BookmarkSetting({
  bookmarkCharts,
}: {
  bookmarkCharts: IcuChartBookmarkJoined[]
}) {
  const { isPreviewModalOpen } = useOrderPreviewStore()
  return (
    <>
      <DataTable
        columns={bookmarkColumns}
        data={bookmarkCharts}
        searchPlaceHolder="북마크 검색"
        rowLength={8}
      />

      {isPreviewModalOpen && <PreviewDialog />}
    </>
  )
}
