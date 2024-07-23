'use server'

import { createClient } from '@/lib/supabase/server'
import type { UserHospitalJoined } from '@/types/adimin'
import { redirect } from 'next/navigation'

export const updateHosGroupList = async (
  hosId: string,
  groupList: string[],
) => {
  const supabase = createClient()
  const { error: groupListUpdateError } = await supabase
    .from('hospitals')
    .update({ group_list: groupList })
    .match({ hos_id: hosId })

  if (groupListUpdateError) {
    console.log(groupListUpdateError)
    redirect(`/error/?message=${groupListUpdateError.message}`)
  }
}

export const getStaffs = async (hosId: string) => {
  const supabase = createClient()
  const { data: hospitalUsersData, error: hospitalUsersDataError } =
    await supabase
      .from('users')
      .select(
        `
      name, position, rank, group, is_admin, user_id, is_vet, avatar_url,
      hos_id(master_user_id, group_list)
    `,
      )
      .match({ hos_id: hosId })
      .returns<UserHospitalJoined[]>()
      .order('rank', { ascending: true })

  if (hospitalUsersDataError) {
    console.log(hospitalUsersDataError)
    redirect(`/error/?message=${hospitalUsersDataError.message}`)
  }

  return hospitalUsersData
}

export const updateStaffRank = async (userId: string, rankInput: string) => {
  const supabase = createClient()

  const { error: rankUpdateError } = await supabase
    .from('users')
    .update({ rank: Number(rankInput) })
    .match({ user_id: userId })

  if (rankUpdateError) {
    console.log(rankUpdateError)
    redirect(`/error/?message=${rankUpdateError.message}`)
  }
}

export const updateStaffPosition = async (
  userId: string,
  positionInput: string,
) => {
  const supabase = createClient()

  const { error: positionUpdateError } = await supabase
    .from('users')
    .update({ position: positionInput })
    .match({ user_id: userId })

  if (positionUpdateError) {
    console.log(positionUpdateError)
    redirect(`/error/?message=${positionUpdateError.message}`)
  }
}

export const updateStaffGroup = async (
  userId: string,
  groupInput: string[],
) => {
  const supabase = createClient()

  const { error: groupUpdateError } = await supabase
    .from('users')
    .update({ group: groupInput })
    .match({ user_id: userId })

  if (groupUpdateError) {
    console.log(groupUpdateError)
    redirect(`/error/?message=${groupUpdateError.message}`)
  }
}

export const updateStaffIsVet = async (userId: string, isVetInput: boolean) => {
  const supabase = createClient()

  const { error: isVetUpdateError } = await supabase
    .from('users')
    .update({ is_vet: isVetInput })
    .match({ user_id: userId })

  if (isVetUpdateError) {
    console.log(isVetUpdateError)
    redirect(`/error/?message=${isVetUpdateError.message}`)
  }
}

export const updateStaffIsAdmin = async (
  userId: string,
  isAdminInput: boolean,
) => {
  const supabase = createClient()

  const { error: isAdminUpdateError } = await supabase
    .from('users')
    .update({ is_admin: isAdminInput })
    .match({ user_id: userId })

  if (isAdminUpdateError) {
    console.log(isAdminUpdateError)
    redirect(`/error/?message=${isAdminUpdateError.message}`)
  }
}
