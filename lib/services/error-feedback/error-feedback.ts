'use server'

import type { Json } from '@/lib/supabase/database.types'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export const sendErrorFeedback = async (
  userId: string,
  description: string,
  isServer: boolean,
  errorJson: Json,
) => {
  const supabase = await createClient()

  const { error } = await supabase.from('vetool_errors').insert({
    user_id: userId,
    description,
    is_server: isServer,
    error_json: errorJson,
  })

  if (error) {
    console.error(error)
    redirect(`/error?message=${error.message}`)
  }
}

export const getErrorFeedback = async () => {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('vetool_errors')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    throw new Error(error.message)
  }

  return data ?? []
}
