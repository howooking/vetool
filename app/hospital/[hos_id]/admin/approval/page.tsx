import { columns } from '@/components/hospital/admin/approval/column'
import DataTable from '@/components/ui/data-table'
import { createClient } from '@/lib/supabase/server'
import { ApprovalData, ApprovalDataTable } from '@/types/hospital/adimin'

export default async function AdminApprovalPage({
  params,
}: {
  params: { hos_id: string }
}) {
  const supabase = createClient()

  const { data: approvalData, error: approvalDataError } = await supabase
    .from('user_approval')
    .from('user_approvals')
    .select(
      `
        is_approved, created_at, updated_at,
        user_id(user_id, name, avatar_url)
      `,
    )
    .match({ hos_id: params.hos_id })
    .order('is_approved')
    .returns<ApprovalData[]>()

  if (approvalDataError) {
    console.log(approvalDataError)
    throw new Error(approvalDataError.message)
  }

  if (approvalData.length === 0) {
    return <>승인요청 없음</>
  }

  const data: ApprovalDataTable[] = approvalData.map((approval) => ({
    is_approved: approval.is_approved,
    created_at: approval.created_at,
    updated_at: approval.updated_at,
    name: approval.user_id.name,
    user_id: approval.user_id.user_id,
    avatar_url: approval.user_id.avatar_url,
  }))

  return <DataTable columns={columns} data={data} />
}
