'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { getUser } from '../auth/authorization'

export const sendFeedback = async (
  feedbackCategory: string,
  feedbackDescription: string,
) => {
  const supabase = await createClient()
  const authUser = await getUser()

  const { error } = await supabase.from('vetool_feedbacks').insert({
    feedback_category: feedbackCategory,
    feedback_description: feedbackDescription,
    user_id: authUser?.id,
  })

  if (error) {
    console.error(error)
    redirect(`/error?message=${error.message}`)
  }
}
