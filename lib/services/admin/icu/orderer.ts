'use server'

import { createClient } from '@/lib/supabase/server'
import { IcuOrderColors } from '@/types/adimin'
import { redirect } from 'next/navigation'

export const getShowOrderer = async (hosId: string) => {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('hospitals')
    .select('show_orderer')
    .match({ hos_id: hosId })
    .single()

  if (error) {
    console.error(error)
    redirect(`/error/?message=${error.message}`)
  }

  return data.show_orderer
}

export const updateShowOrderer = async (
  hosId: string,
  showOrderInput: boolean,
) => {
  const supabase = createClient()

  const { error } = await supabase
    .from('hospitals')
    .update({ show_orderer: showOrderInput })
    .match({ hos_id: hosId })

  if (error) {
    console.error(error)
    redirect(`/error/?message=${error.message}`)
  }
}
