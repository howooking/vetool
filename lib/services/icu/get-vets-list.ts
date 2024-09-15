'use server'

import { createClient } from '@/lib/supabase/server'
import type { Vet } from '@/types/icu'
import { redirect } from 'next/navigation'

export const getVetsList = async (hosId: string) => {
  const supabase = createClient()

  const { data: vetsListData, error: vetsListDataError } = await supabase
    .from('users')
    .select('name, position, user_id, avatar_url')
    .match({ hos_id: hosId, is_vet: true })
    .returns<Vet[]>()

  if (vetsListDataError) {
    console.log(vetsListDataError)
    redirect(`/error?message=${vetsListDataError.message}`)
  }

  return vetsListData
}
