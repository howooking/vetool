'use server'

import { createClient } from '@/lib/supabase/server'
import type { ApprovalData, UserHospitalJoined } from '@/types/adimin'
import { UserApprovalHosJoined } from '@/types/on-boarding'
import { redirect } from 'next/navigation'
import { getUser } from '../auth/authorization'

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

export const deleteStaff = async (userId: string) => {
  const supabase = createClient()
  const { error: deleteStaffError } = await supabase
    .from('users')
    .update({
      hos_id: null,
      position: '미분류',
      rank: 99,
      group: null,
      is_admin: false,
    })
    .match({ user_id: userId })

  if (deleteStaffError) {
    console.log(deleteStaffError)
    redirect(`/error/?message=${deleteStaffError.message}`)
  }
}

export const getStaffApprovals = async (hosId: string) => {
  const supabase = createClient()

  const { data: approvalData, error: approvalDataError } = await supabase
    .from('user_approvals')
    .select(
      `
        is_approved, created_at, updated_at,
        user_id(user_id, name, avatar_url, is_vet)
      `,
    )
    .match({ hos_id: hosId })
    .order('is_approved')
    .returns<ApprovalData[]>()

  if (approvalDataError) {
    console.log(approvalDataError)
    redirect(`/error/?message=${approvalDataError.message}`)
  }

  return approvalData
}

export const approveStaff = async (hosId: string, userId: string) => {
  const supabase = createClient()
  const { error: rpcError } = await supabase.rpc(
    'update_user_approval_and_user_hos_id_when_approved',
    {
      hos_id_input: hosId,
      user_id_input: userId,
    },
  )

  if (rpcError) {
    console.log(rpcError)
    redirect(`/error/?message=${rpcError.message}`)
  }
}

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
