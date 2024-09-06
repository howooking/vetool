import IcuEntry from '@/components/hospital/icu/icu-entry'
import { getAllIcuData } from '@/lib/services/icu/get-all-icu-data'
import type { IcuData } from '@/types/icu'

export default async function IcuPage({
  params,
}: {
  params: { hos_id: string; target_date: string }
}) {
  const icuData = await getAllIcuData(params.hos_id, params.target_date)

  return <IcuEntry hosId={params.hos_id} icuData={icuData} />
}
