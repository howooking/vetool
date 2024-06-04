import UserGrid from '@/components/hospital/admin/user-grid'
import { createClient } from '@/lib/supabase/server'

export default async function HospitalAdminPage({
  params,
}: {
  params: { id: string }
}) {
  const { data: users } = await createClient()
    .from('users')
    .select('name, position, user_approved, rank, group, is_admin, user_id')
    .eq('hos_id', params.id)

  return (
    <div className="flex flex-col justify-center">
      {users?.map((user) => <UserGrid key={user?.user_id} {...user} />)}
    </div>
  )
}
