import SelectHospitalForm from '@/components/on-boarding/select-hospital/select-hospital-form'
import { getUser } from '@/lib/actions/auth'
import { createClient } from '@/lib/supabase/server'

export default async function SelectHospitalPage() {
  const supabase = createClient()

  const { authUser } = await getUser()

  const { data: hospitalData } = await supabase
    .from('hospitals')
    .select('hos_id, name, city, district')

  return (
    <div>
      <h1>병원 선택</h1>
      {hospitalData?.length ? (
        <SelectHospitalForm hospitalData={hospitalData} authUser={authUser!} />
      ) : (
        <p>등록된 병원이 존재하지 않습니다.</p>
      )}
    </div>
  )
}
