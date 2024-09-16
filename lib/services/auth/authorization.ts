'use server'

import { createClient } from '@/lib/supabase/server'
import { UserProfile } from '@/types'
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

export async function checkIsAdmin(hosId: string, userId: string) {
  const supabase = createClient()

  const { data: userAdminData, error: userAdminDataError } = await supabase
    .from('users')
    .select('is_admin')
    .match({ user_id: userId })

  if (userAdminDataError) {
    console.log(userAdminDataError)
    redirect(`/error?message=${userAdminDataError.message}`)
  }

  const isAdmin = userAdminData[0].is_admin ?? false

  if (!isAdmin) {
    redirect(`/hospital/${hosId}`)
  }
}

export const getUserData = async () => {
  const supabase = createClient()
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError) {
    console.log(userError)
    redirect(`/error?message=${userError.message}`)
  }

  const { data: userData, error: userDataError } = await supabase
    .from('users')
    .select('email, name, avatar_url, position, is_admin, user_id')
    .match({ user_id: user?.id })
    .single()

  if (userDataError) {
    console.log(userDataError)
    redirect(`/error?message=${userDataError.message}`)
  }

  return userData
}
