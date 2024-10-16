import NoResultSquirrel from '@/components/common/no-result-squirrel'
import DataTable from '@/components/ui/data-table'
import { getVisitPatients } from '@/lib/services/icu/movement/visit/get-visit-patients'
import { visitColumns } from './visit-columns'

export default async function VisitChart({
  hosId,
  targetDate,
}: {
  hosId: string
  targetDate: string
}) {
  const visitPatients = await getVisitPatients(hosId, targetDate)

  if (visitPatients.length === 0) {
    return <NoResultSquirrel text="퇴원예정 환자 없음" />
  }

  return <DataTable columns={visitColumns} data={visitPatients} />
}
