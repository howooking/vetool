'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export const getHosGroupList = async (hosId: string) => {
  const supabase = createClient()

  const { data: hosGroupList, error } = await supabase
    .from('hospitals')
    .select('group_list')
    .match({ hos_id: hosId })
    .single()

  if (error) {
    console.error(error)
    redirect(`/error/?message=${error.message}`)
  }

  return hosGroupList.group_list
}
