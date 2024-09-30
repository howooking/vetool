'use server'

import { createClient } from '@/lib/supabase/server'
import { IcuOrderColors } from '@/types/adimin'
import { redirect } from 'next/navigation'

export const getHosOrderColor = async (hosId: string) => {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('hospitals')
    .select('order_color')
    .match({ hos_id: hosId })
    .single()

  if (error) {
    console.error(error)
    redirect(`/error/?message=${error.message}`)
  }

  return data.order_color
}
