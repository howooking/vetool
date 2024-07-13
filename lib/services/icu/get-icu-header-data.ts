'use server'

import { createClient } from '@/lib/supabase/server'
import type { IcuUserList } from '@/types/icu'
import type { PatientData } from '@/types/patients'
import { redirect } from 'next/navigation'

export const getIcuHeaderData = async (hosId: string) => {
  const supabase = createClient()

  const promiseArray = Promise.all([
    supabase
      .from('hospitals')
      .select('group_list')
      .match({ hos_id: hosId })
      .single(),

    supabase
      .from('users')
      .select('name, position, user_id, avatar_url')
      .match({ hos_id: hosId, is_vet: true })
      .returns<IcuUserList[]>(),

    supabase
      .from('patients')
      .select('*')
      .match({ hos_id: hosId })
      .match({ is_alive: true })
      .order('created_at', { ascending: false })
      .returns<PatientData[]>(),
  ])

  const [
    { data: hosGroupListData, error: hosGroupListDataError },
    { data: vetsData, error: vetsDataError },
    { data: patientsData, error: patientsDataError },
  ] = await promiseArray

  if (vetsDataError || patientsDataError || hosGroupListDataError) {
    console.log({
      vetsDataError,
      patientsDataError,
      hosGroupListDataError,
    })
    redirect(
      `/error/?message=${vetsDataError?.message || patientsDataError?.message || hosGroupListDataError?.message}`,
    )
  }
  return {
    vetsData,
    patientsData,
    hosGroupList: hosGroupListData.group_list,
  }
}
