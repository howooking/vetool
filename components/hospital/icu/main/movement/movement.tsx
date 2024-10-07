import { outDueColumns } from '@/components/hospital/icu/main/movement/out-due/out-due-columns'
import { visitColumns } from '@/components/hospital/icu/main/movement/visit/visit-columns'
import { Badge } from '@/components/ui/badge'
import DataTable from '@/components/ui/data-table'
import { Separator } from '@/components/ui/separator'
import type { OutDuePatientsData, VisitPatientData } from '@/types/icu/movement'

export default function Movement({
  outDuePatients,
  visitPatients,
}: {
  outDuePatients: OutDuePatientsData[]
  visitPatients: VisitPatientData[]
}) {
  return (
    <div className="p-2">
      <Badge className="md:text-md mb-2 text-sm">퇴원 예정 관리</Badge>
      <DataTable columns={outDueColumns} data={outDuePatients} />

      <Separator className="my-8" />

      <Badge className="md:text-md mb-2 text-sm">면회 관리</Badge>
      <DataTable columns={visitColumns} data={visitPatients} />
    </div>
  )
}
