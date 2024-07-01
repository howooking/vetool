import NoResult from '@/components/common/no-result'
import PrevButton from '@/components/on-boarding/prev-button'
import { columns } from '@/components/on-boarding/select-hospital/columns'
import DataTable from '@/components/ui/data-table'
import { createClient } from '@/lib/supabase/server'
import logoWhite from '@/public/logo-white.svg'
import type { SelectHosptialDataTable } from '@/types/on-boarding'
import Image from 'next/image'

export default async function SelectHospitalPage() {
  const supabase = createClient()

  const { data: hospitalData, error: hospitalDataError } = await supabase
    .from('hospitals')
    .select('hos_id, name, city, district')

  if (hospitalDataError) {
    console.log(hospitalDataError)
    throw new Error(hospitalDataError.message)
  }

  let noResult

  if (hospitalData?.length === 0) {
    noResult = true
  }

  const data: SelectHosptialDataTable[] = hospitalData.map((data) => ({
    city: data.city,
    district: data.district,
    hos_id: data.hos_id,
    name: data.name,
  }))

  return (
    <div className="flex h-screen w-full">
      <div className="flex h-screen w-3/5 items-center justify-center bg-primary">
        <Image alt="vetool logo" src={logoWhite} unoptimized width={320} />
      </div>

      <div className="relative flex h-screen w-2/5 flex-col items-center justify-center gap-10 p-8">
        <PrevButton />

        {noResult ? (
          <NoResult title="등록된 병원이 없습니다." />
        ) : (
          <>
            <h2 className="text-2xl font-bold tracking-wider">병원선택</h2>
            <DataTable
              columns={columns}
              data={data}
              searchPlaceHolder="병원을 검색해주세요."
              rowLength={5}
            />
          </>
        )}
      </div>
    </div>
  )
}
