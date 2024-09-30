import IcuSettingsTab from '@/components/hospital/admin/icu-settings/icu-settings-tab'

export default async function AdminIcuSettingsPage({
  params,
}: {
  params: { hos_id: string }
}) {
  return <IcuSettingsTab hosId={params.hos_id} />
}
