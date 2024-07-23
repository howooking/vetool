'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

const supabase = createClient()

export const updateHosGroupList = async (
  hosId: string,
  groupList: string[],
) => {
  const { error: groupListUpdateError } = await supabase
    .from('hospitals')
    .update({ group_list: groupList })
    .match({ hos_id: hosId })

  if (groupListUpdateError) {
    console.log(groupListUpdateError)
    redirect(`/error/?message=${groupListUpdateError.message}`)
  }
}
