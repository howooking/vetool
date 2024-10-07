'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export const updateIsVisitDone = async (visitId: string, isDone: boolean) => {
  const supabase = createClient()

  const { error } = await supabase
    .from('icu_visit')
    .update({
      is_done: isDone,
    })
    .match({ icu_visit_id: visitId })

  if (error) {
    console.error(error)
    redirect(`/error?message=${error?.message}`)
  }
}
