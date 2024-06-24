import { columns } from '@/components/on-boarding/select-hospital/columns'
import DataTable from '@/components/ui/data-table'
import { getUser } from '@/lib/actions/auth'
import { createClient } from '@/lib/supabase/server'
import { SelectHosptialDataTable } from '@/types/on-boarding'

export default async function SelectHospitalPage() {
  const supabase = createClient()

  const { authUser } = await getUser()

  const { data: hospitalData } = await supabase
    .from('hospitals')
    .select('hos_id, name, city, district')

  const data: SelectHosptialDataTable[] = hospitalData!.map((data) => ({
    city: data.city!,
    district: data.district!,
    hos_id: data.hos_id!,
    name: data.name!,
    authUserId: authUser?.id!,
  }))

  return (
    <div className="mt-16 w-full space-y-4 pt-4">
      <h2 className="text-xl font-semibold text-primary">병원 선택</h2>

      <DataTable
        columns={columns}
        data={data}
        searchKeyword="name"
        searchPlaceHolder="병원명을 검색하세요"
      />
    </div>
  )
}
