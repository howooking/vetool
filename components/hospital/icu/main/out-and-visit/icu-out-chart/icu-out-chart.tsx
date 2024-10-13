import DataTable from '@/components/ui/data-table'
import { getIcuOutDuePatients } from '@/lib/services/icu/movement/out-due/get-out-due-patients'
import { outDueColumns } from './out-due-columns'

export default async function IcuOutChart({
  hosId,
  targetDate,
}: {
  hosId: string
  targetDate: string
}) {
  const outDuePatients = await getIcuOutDuePatients(hosId, targetDate)

  return <DataTable columns={outDueColumns} data={outDuePatients} />
}
