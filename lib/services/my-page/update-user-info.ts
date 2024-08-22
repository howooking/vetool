'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

const supabase = createClient()

export const updateUserInfo = async (
  userId: string,
  name: string | null,
  avatarUrl: string | null,
) => {
  if (name === null) {
    const { error: updateUserError } = await supabase
      .from('users')
      .update({
        avatar_url: avatarUrl,
      })
      .match({ user_id: userId })

    if (updateUserError) {
      console.log(updateUserError)
      redirect(`/error/?message=${updateUserError.message}`)
    }
  } else {
    const { error: updateUserError } = await supabase
      .from('users')
      .update({
        name,
      })
      .match({ user_id: userId })

    if (updateUserError) {
      console.log(updateUserError)
      redirect(`/error/?message=${updateUserError.message}`)
    }
  }
}
