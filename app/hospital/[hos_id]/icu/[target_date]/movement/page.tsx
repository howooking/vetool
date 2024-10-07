import Movement from '@/components/hospital/icu/main/movement/movement'

import { getIcuOutDuePatients } from '@/lib/services/icu/movement/out-due/get-out-due-patients'
import { getVisitPatients } from '@/lib/services/icu/movement/visit/get-visit-patients'

// 퇴원과 면회를 아우르는 영단어 ? 임시로 'out-due'으로 처리
export default async function MovementPage({
  params,
}: {
  params: {
    hos_id: string
    target_date: string
  }
}) {
  const outDuePatients = await getIcuOutDuePatients(
    params.hos_id,
    params.target_date,
  )

  const visitPatients = await getVisitPatients(
    params.hos_id,
    params.target_date,
  )

  return (
    <Movement outDuePatients={outDuePatients} visitPatients={visitPatients} />
  )
}
