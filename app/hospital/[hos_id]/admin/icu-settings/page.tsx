import SettingTabs from '@/components/hospital/admin/icu/setting-tabs'
import { getMemoNames } from '@/lib/services/admin/icu'
import { getBookmarkCharts } from '@/lib/services/icu/bookmark'

export default async function AdminIcuSettingsPage({
  params,
}: {
  params: { hos_id: string }
}) {
  const memoNames = await getMemoNames(params.hos_id)
  // const hospitalOrder = await getHospitalOrder(params.hos_id)
  const bookmarkCharts = await getBookmarkCharts(params.hos_id)

  return <SettingTabs memoNames={memoNames} bookmarkCharts={bookmarkCharts} />
}
