import { outDueColumns } from '@/components/hospital/icu/main/movement/out-due-columns'
import { visitColumns } from '@/components/hospital/icu/main/movement/visit-columns'
import { Badge } from '@/components/ui/badge'
import DataTable from '@/components/ui/data-table'
import { Separator } from '@/components/ui/separator'
import { getIcuOutDuePatients } from '@/lib/services/icu/movement/get-icu-out-due-patients'

// 퇴원과 면회를 아우르는 영단어 ? 임시로 'out-due'으로 처리
export default async function MovementPage({
  params,
}: {
  params: {
    hos_id: string
    target_date: string
  }
}) {
  const outDuePatientsData = await getIcuOutDuePatients(
    params.hos_id,
    params.target_date,
  )

  // if (!outDuePatientsData) {
  //   return (
  //     <NoResult
  //       title="퇴원 예정 환자가 존재하지 않습니다"
  //       className="h-icu-chart"
  //     />
  //   )
  // }

  return (
    <div className="p-2">
      <Badge className="text-md mb-2">퇴원 관리</Badge>
      <DataTable columns={outDueColumns} data={outDuePatientsData} />

      <Separator className="my-4" />

      <Badge className="text-md mb-2">면회 관리</Badge>
      <DataTable columns={visitColumns} data={[]} />
    </div>
  )
}
