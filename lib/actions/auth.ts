'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
// import { revalidatePath } from 'next/cache'

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
    throw new Error(`구글 로그인 중 에러 발생 : ${error.message}`)
  }

  if (data.url) {
    redirect(data.url) // use the redirect API for your server framework
  }
}

export async function logout() {
  const supabase = createClient()

  const { error } = await supabase.auth.signOut()

  if (error) {
    throw new Error(`로그아웃 중 에러 발생 : ${error.message}`)
  }

  // 캐싱 초기화 불필요한 듯
  // revalidatePath('/', 'layout')
  redirect('/')
}
