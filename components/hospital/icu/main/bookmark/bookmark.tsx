import LargeLoaderCircle from '@/components/common/large-loader-circle'
import DataTable from '@/components/ui/data-table'
import { getBookmarkCharts } from '@/lib/services/icu/bookmark'
import { useOrderPreviewStore } from '@/lib/store/icu/order-preview'
import type { IcuOrderColors } from '@/types/adimin'
import type { IcuChartBookmarkJoined } from '@/types/icu'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import PreviewDialog from '../../common-dialogs/preview/preview-dialog'
import { bookmarkColumns } from './bookmark-columns'

export default function Bookmark({
  orderColors,
}: {
  orderColors: IcuOrderColors
}) {
  const { isPreviewModalOpen } = useOrderPreviewStore()
  const [isFetching, setIsFetching] = useState(true)
  const [bookmarkCharts, setBookmarkCharts] = useState<
    IcuChartBookmarkJoined[]
  >([])
  const { hos_id } = useParams()

  useEffect(() => {
    setIsFetching(true)
    getBookmarkCharts(hos_id as string)
      .then(setBookmarkCharts)
      .finally(() => setIsFetching(false))
  }, [hos_id])

  if (isFetching) {
    return <LargeLoaderCircle className="h-icu-chart" />
  }

  return (
    <div className="p-2">
      <DataTable
        columns={bookmarkColumns}
        data={bookmarkCharts}
        searchPlaceHolder="북마크 검색"
        rowLength={10}
      />

      {isPreviewModalOpen && <PreviewDialog orderColors={orderColors} />}
    </div>
  )
}
