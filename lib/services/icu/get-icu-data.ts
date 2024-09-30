'use server'

import { createClient } from '@/lib/supabase/server'
import type { IcuSidebarData, Vet } from '@/types/icu/chart'
import type { PatientData } from '@/types/patients'
import { redirect } from 'next/navigation'

export const getIcuData = async (hosId: string, targetDate: string) => {
  console.log('Initial Icu Data Fetching')
  const supabase = createClient()

  const promiseArray = Promise.all([
    supabase
      .rpc('get_icu_sidebar_data', {
        hos_id_input: hosId,
        target_date_input: targetDate,
      })
      .returns<IcuSidebarData[]>(),

    supabase
      .from('users')
      .select('name, position, user_id, avatar_url')
      .match({ hos_id: hosId, is_vet: true })
      .returns<Vet[]>(),

    supabase
      .from('hospitals')
      .select('order_color, group_list, icu_memo_names')
      .match({ hos_id: hosId })
      .single(),

    supabase
      .from('patients')
      .select('*')
      .match({ hos_id: hosId })
      .match({ is_alive: true })
      .order('created_at', { ascending: false })
      .returns<PatientData[]>(),
  ])

  const [
    { data: icuSidebarData, error: icuSidebarDataError },
    { data: vetsListData, error: vetsListDataError },
    { data: basicHosData, error: basicHosDataError },
    { data: patientsData, error: patientsDataError },
  ] = await promiseArray

  if (
    icuSidebarDataError ||
    vetsListDataError ||
    basicHosDataError ||
    patientsDataError
  ) {
    console.error({
      icuSidebarDataError,
      vetsListDataError,
      basicHosDataError,
      patientsDataError,
    })
    redirect(
      `/error?message=${
        icuSidebarDataError?.message ||
        vetsListDataError?.message ||
        basicHosDataError?.message ||
        patientsDataError?.message
      }`,
    )
  }
  return {
    icuSidebarData,
    vetsListData,
    basicHosData,
    patientsData,
  }
}
