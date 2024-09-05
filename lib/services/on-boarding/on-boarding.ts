'use server'

import { getUser } from '@/lib/services/auth/authorization'
import { createClient } from '@/lib/supabase/server'
import type { UserApprovalHosJoined } from '@/types/on-boarding'
import { redirect } from 'next/navigation'

export const getUserAppoval = async () => {
  const supabase = createClient()
  const authUser = await getUser()

  const { data: userApprovalData, error: userApprovalDataError } =
    await supabase
      .from('user_approvals')
      .select(
        `
      user_approval_id,
      hos_id (
        name
      )
    `,
      )
      .match({
        user_id: authUser?.id,
      })
      .returns<UserApprovalHosJoined[]>()

  if (userApprovalDataError) {
    console.log(userApprovalDataError)
    redirect(`/error/?message=${userApprovalDataError.message}`)
  }

  return userApprovalData
}
export const cancelApproval = async (formData: FormData) => {
  const supabase = createClient()
  const userApprovalId = formData.get('user_approval_id') as string

  const { error } = await supabase.from('user_approvals').delete().match({
    user_approval_id: userApprovalId,
  })

  if (error) {
    console.log(error)
    throw new Error(error.message)
  }

  redirect('/on-boarding')
}

export const getHospitals = async () => {
  const supabase = createClient()
  const { data: hospitalsData, error: hospitalsDataError } = await supabase
    .from('hospitals')
    .select('hos_id, name, city, district')
    .order('name', { ascending: true })

  if (hospitalsDataError) {
    console.log(hospitalsDataError)
    redirect(`/error?message=${hospitalsDataError.message}`)
  }

  return hospitalsData
}

export const sendApprovalToHospital = async (
  hosId: string,
  isVet: boolean,
  username: string,
) => {
  const supabase = createClient()
  const { error: rpcError } = await supabase.rpc(
    'update_user_info_when_sending_approval',
    {
      is_vet_input: isVet,
      name_input: username,
      hos_id_input: hosId,
    },
  )

  if (rpcError) {
    console.log(rpcError)
    redirect(`/error/?message=${rpcError.message}`)
  }
}

export const createHospital = async (
  name: string,
  username: string,
  isVet: boolean,
  city: string,
  district: string,
  businessNumber: string,
) => {
  const supabase = createClient()

  const { data: hosId, error } = await supabase.rpc(
    'update_user_info_when_create_new_hospital',
    {
      hos_name_input: name,
      user_name_input: username,
      is_vet_input: isVet,
      city_input: city,
      district_input: district,
      business_number_input: businessNumber,
    },
  )

  if (error) {
    console.log(error)
    redirect(`/error/?message=${error.message}`)
  }

  return hosId
}
