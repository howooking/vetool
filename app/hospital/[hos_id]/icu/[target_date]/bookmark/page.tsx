import Bookmark from '@/components/hospital/icu/main/bookmark/bookmark'
import { getBookmarkedCharts } from '@/lib/services/icu/bookmark/bookmark'

export default async function BookmarkPage({
  params,
}: {
  params: {
    hos_id: string
    target_date: string
  }
}) {
  const bookmarkedCharts = await getBookmarkedCharts(params.hos_id as string)

  return <Bookmark bookmarkedCharts={bookmarkedCharts} />
}
