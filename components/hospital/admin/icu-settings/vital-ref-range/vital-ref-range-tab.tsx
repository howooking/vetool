import { getVitalRefRange } from '@/lib/services/admin/icu/vital-ref-range'
import VitalRefRangeSettings from './vital-ref-range-settings'
import type { VitalRefRange } from '@/types/adimin'

export default async function VitalRefRangeTab({ hosId }: { hosId: string }) {
  const vitalRefRangeData = await getVitalRefRange(hosId)
  console.log(vitalRefRangeData)

  return (
    <VitalRefRangeSettings
      hosId={hosId}
      vitalRefRangeData={vitalRefRangeData as VitalRefRange[]}
    />
  )
}
