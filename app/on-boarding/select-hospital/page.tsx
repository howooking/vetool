import PrevButton from '@/components/on-boarding/prev-button'
import { columns } from '@/components/on-boarding/select-hospital/columns'
import DataTable from '@/components/ui/data-table'
import { getHospitals } from '@/lib/services/on-boarding/on-boarding'
import type { SelectHosptialDataTable } from '@/types/on-boarding'

export default async function SelectHospitalPage() {
  const hospitalsData = await getHospitals()

  const data: SelectHosptialDataTable[] = hospitalsData.map((data) => ({
    city: data.city,
    district: data.district,
    hos_id: data.hos_id,
    name: data.name,
  }))

  return (
    <>
      <PrevButton />
      <>
        <h2 className="text-2xl font-bold tracking-wider">병원선택</h2>
        <DataTable
          columns={columns}
          data={data}
          searchPlaceHolder="병원을 검색해주세요"
          rowLength={8}
        />
      </>
    </>
  )
}
