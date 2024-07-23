'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function getUser() {
  const supabase = createClient()
  const {
    data: { user: authUser },
    error,
  } = await supabase.auth.getUser()

  if (error) {
    console.log(error)
    redirect('/login')
  }

  return { authUser }
}

// 현재 로그인 된 사용자가 admin인지를 boolean으로 반환
export async function checkIsAdmin() {
  const supabase = createClient()
  const {
    data: { user: authUser },
    error: authUsererror,
  } = await supabase.auth.getUser()

  if (authUsererror) {
    console.log(authUsererror)
    throw new Error(authUsererror.message)
  }

  const { data: userAdminData, error: userAdminDataError } = await supabase
    .from('users')
    .select('is_admin')
    .match({ user_id: authUser?.id })

  if (userAdminDataError) {
    console.log(userAdminDataError)
    throw new Error(userAdminDataError.message)
  }

  const isAdmin = userAdminData.at(0)?.is_admin ?? false

  return isAdmin
}

export const cancelApproval = async (formData: FormData) => {
  const supabase = createClient()
  const userApprovalId = formData.get('user_approval_id') as string

  const { error } = await supabase.from('user_approvals').delete().match({
    user_approval_id: userApprovalId,
  })

  if (error) {
    console.log(error)
    throw new Error(error.message)
  }

  redirect('/on-boarding')
}
