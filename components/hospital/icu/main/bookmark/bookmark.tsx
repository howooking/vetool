'use client'

import LargeLoaderCircle from '@/components/common/large-loader-circle'
import PreviewDialog from '@/components/hospital/icu/common-dialogs/preview/preview-dialog'
import { bookmarkColumns } from '@/components/hospital/icu/main/bookmark/bookmark-columns'
import DataTable from '@/components/ui/data-table'
import { getBookmarkCharts } from '@/lib/services/icu/bookmark'
import { usePreviewDialogStore } from '@/lib/store/icu/preview-dialog'
import type { IcuOrderColors } from '@/types/adimin'
import type { IcuChartBookmarkJoined } from '@/types/icu'
import { useParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

export default function Bookmark({
  orderColors,
}: {
  orderColors: IcuOrderColors
}) {
  const { isPreviewDialogOpen } = usePreviewDialogStore()
  const [isFetching, setIsFetching] = useState(true)
  const [bookmarkCharts, setBookmarkCharts] = useState<
    IcuChartBookmarkJoined[]
  >([])
  const { hos_id } = useParams()

  const fetchBookmarks = useCallback(async () => {
    setIsFetching(true)

    const charts = await getBookmarkCharts(hos_id as string)
    setBookmarkCharts(charts)

    setIsFetching(false)
  }, [hos_id])

  useEffect(() => {
    fetchBookmarks()
  }, [fetchBookmarks])

  if (isFetching) {
    return <LargeLoaderCircle className="h-icu-chart" />
  }

  return (
    <div className="p-2">
      <DataTable
        columns={bookmarkColumns(fetchBookmarks)}
        data={bookmarkCharts}
        searchPlaceHolder="북마크 검색"
        rowLength={10}
      />

      {isPreviewDialogOpen && <PreviewDialog />}
    </div>
  )
}
