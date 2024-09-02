import SettingTabs from '@/components/hospital/admin/icu/setting-tabs'
import { getMemoNames } from '@/lib/services/admin/icu'
import { getHospitalOrder } from '@/lib/services/icu/hospital-orders'

export default async function AdminIcuSettingsPage({
  params,
}: {
  params: { hos_id: string }
}) {
  const memoNames = await getMemoNames(params.hos_id)
  const hospitalOrder = await getHospitalOrder(params.hos_id)

  return <SettingTabs memoNames={memoNames} hospitalOrder={hospitalOrder} />
}
