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

  return authUser
}

export async function checkIsAdmin(hosId: string) {
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
    redirect(`/error?message=${userAdminDataError.message}`)
  }

  const isAdmin = userAdminData[0].is_admin ?? false

  if (!isAdmin) {
    redirect(`/hospital/${hosId}`)
  }
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
