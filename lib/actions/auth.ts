'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function googleLogin(formData: FormData) {
  const path = formData.get('path') as string

  const supabase = createClient()

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${path}/auth/callback`,
    },
  })

  if (error) {
    console.log(error)
    throw new Error(`구글 로그인 중 에러 발생 : ${error.message}`)
  }

  if (data.url) {
    redirect(data.url)
  }
}

export async function logout() {
  const supabase = createClient()

  const { error } = await supabase.auth.signOut()

  if (error) {
    console.log(error)
    throw new Error(`로그아웃 중 에러 발생 : ${error.message}`)
  }

  redirect('/')
}

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
  const userApprovalId = formData.get('user_approval_id') as string
  const supabase = createClient()

  const { error } = await supabase.from('user_approvals').delete().match({
    user_approval_id: userApprovalId,
  })

  if (error) {
    console.log(error)
    throw new Error(error.message)
  }

  redirect('/on-boarding')
}
