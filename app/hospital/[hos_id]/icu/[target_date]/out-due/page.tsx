import NoResult from '@/components/common/no-result'
import { outDueColumns } from '@/components/hospital/icu/main/out-due/out-due-columns'
import DataTable from '@/components/ui/data-table'
import { getIcuOutDuePatients } from '@/lib/services/icu/out-due/get-icu-out-due-patients'

// 퇴원과 면회를 아우르는 영단어 ? 임시로 'out-due'으로 처리
export default async function OutDuePage({
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

  console.log(outDuePatientsData)

  if (!outDuePatientsData) {
    return (
      <NoResult
        title="퇴원 예정 환자가 존재하지 않습니다"
        className="h-icu-chart"
      />
    )
  }

  return (
    <div className="p-2">
      <DataTable columns={outDueColumns} data={outDuePatientsData} />
    </div>
  )
}
