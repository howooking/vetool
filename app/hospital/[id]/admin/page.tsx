import UserGrid from '@/components/hospital/admin/user-grid'
import { TITLES } from '@/constants/hospital/admin/grid'
import { getUser } from '@/lib/actions/auth'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function HospitalAdminPage({
  params,
}: {
  params: { id: string }
}) {
  const supabase = createClient()
  const { data: users } = await supabase
    .from('users')
    .select('name, position, user_approved, rank, group, is_admin, user_id')
    .eq('hos_id', params.id)

  const { data: hospital } = await supabase
    .from('hospitals')
    .select('position_list')
    .eq('hos_id', params.id)
  const { user: userData } = await getUser()
  const positionList = hospital?.[0].position_list
  const currentUser = users?.find((user) => user.user_id === userData?.id)

  // Page Access Control
  if (currentUser && !currentUser.is_admin) {
    redirect(`/hospital/${params.id}`)
  }

  return (
    <div className="flex flex-col justify-center">
      <div className="hospital-admin-user-grid">
        {TITLES.map((title, index) => (
          <div key={index}>{title}</div>
        ))}
      </div>

      {users?.map((user) => (
        <UserGrid key={user.user_id} positionList={positionList} {...user} />
      ))}
    </div>
  )
}
