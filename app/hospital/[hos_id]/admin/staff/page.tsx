import { columns } from '@/components/hospital/admin/staff/columns'
import DataTable from '@/components/ui/data-table'
import { checkIsAdmin } from '@/lib/actions/auth'
import { createClient } from '@/lib/supabase/server'
import type {
  HospitalUserDataTable,
  UserHospitalJoined,
} from '@/types/hospital/adimin'
import { redirect } from 'next/navigation'

export default async function AdminStaffPage({
  params,
}: {
  params: { hos_id: string }
}) {
  const isAdmin = await checkIsAdmin()

  if (!isAdmin) {
    redirect(`/hospital/${params.hos_id}`)
  }

  const supabase = createClient()
  const { data: hospitalUsersData, error: hospitalUsersDataError } =
    await supabase
      .from('users')
      .select(
        `
          name, position, rank, group, is_admin, user_id, is_vet, avatar_url,
          hos_id(master_user_id, group_list)
        `,
      )
      .match({ hos_id: params.hos_id })
      .returns<UserHospitalJoined[]>()
      .order('rank', { ascending: true })

  if (hospitalUsersDataError) {
    console.log(hospitalUsersDataError)
    throw new Error(hospitalUsersDataError.message)
  }

  const {
    data: { user: authUser },
    error: authUserError,
  } = await supabase.auth.getUser()

  if (authUserError) {
    console.log(authUserError)
    throw new Error(authUserError.message)
  }

  const isMaster =
    hospitalUsersData.at(0)?.hos_id.master_user_id === authUser?.id

  const data: HospitalUserDataTable[] = hospitalUsersData!.map((user) => ({
    group: user.group,
    name: user.name,
    position: user.position,
    rank: user.rank,
    is_admin: user.is_admin,
    is_vet: user.is_vet,
    user_id: user.user_id,
    avatar_url: user.avatar_url,
    master_user_id: user.hos_id.master_user_id,
    group_list: user.hos_id.group_list,
    isMaster,
  }))

  return <DataTable columns={columns} data={data} />
}
