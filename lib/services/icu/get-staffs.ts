'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

const supabase = createClient()

export const getVetList = async (hosId: string) => {
  const { data: vetsData, error: vetsDataError } = await supabase
    .from('users')
    .select('avatar_url, name, position, user_id, is_vet')
    .match({ hos_id: hosId, is_vet: true })

  if (vetsDataError) {
    console.log(vetsDataError)
    redirect(`/error?message=${vetsDataError.message}`)
  }
  return vetsData
}
export const getStaffList = async (hosId: string) => {
  const { data: vetsData, error: vetsDataError } = await supabase
    .from('users')
    .select('avatar_url, name, position, user_id, is_vet')
    .match({ hos_id: hosId })

  if (vetsDataError) {
    console.log(vetsDataError)
    redirect(`/error?message=${vetsDataError.message}`)
  }
  return vetsData
}
