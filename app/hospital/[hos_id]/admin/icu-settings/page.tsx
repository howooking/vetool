import SettingTabs from '@/components/hospital/admin/icu/setting-tabs'
import { getMemoNames } from '@/lib/services/admin/icu'

export default async function AdminIcuSettingsPage({
  params,
}: {
  params: { hos_id: string }
}) {
  const memoNames = await getMemoNames(params.hos_id)

  return <SettingTabs memoNames={memoNames} />
}
