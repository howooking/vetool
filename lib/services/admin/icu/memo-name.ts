'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export const getMemoNames = async (hosId: string) => {
  const supabase = createClient()

  const { data: memoNamesData, error: memoNamesDataError } = await supabase
    .from('hospitals')
    .select('icu_memo_names')
    .match({ hos_id: hosId })
    .single()

  if (memoNamesDataError) {
    console.log(memoNamesDataError)
    redirect(`/error/?message=${memoNamesDataError.message}`)
  }

  return memoNamesData.icu_memo_names
}

export const updateMemoNames = async (memoNames: string[], hosId: string) => {
  const supabase = createClient()

  const { error: memoNamesError } = await supabase
    .from('hospitals')
    .update({ icu_memo_names: memoNames })
    .match({ hos_id: hosId })

  if (memoNamesError) {
    console.log(memoNamesError)
    redirect(`/error/?message=${memoNamesError.message}`)
  }
}
