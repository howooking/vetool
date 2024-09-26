'use server'

import { createClient } from '@/lib/supabase/server'
import type { IcuOrderColors } from '@/types/adimin'
import type { IcuSidebarData, Vet } from '@/types/icu'
import type { PatientData } from '@/types/patients'
import { redirect } from 'next/navigation'

export const getInitialIcuData = async (hosId: string, targetDate: string) => {
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
      .select('order_color')
      .match({ hos_id: hosId })
      .single(),

    supabase
      .from('patients')
      .select('*')
      .match({ hos_id: hosId })
      .match({ is_alive: true })
      .order('created_at', { ascending: false })
      .returns<PatientData[]>(),

    supabase
      .from('hospitals')
      .select('group_list')
      .match({ hos_id: hosId })
      .single(),
  ])

  const [
    { data: icuSidebarData, error: icuSidebarDataError },
    { data: vetsListData, error: vetsListDataError },
    { data: orderColorsData, error: orderColorsDataError },
    { data: patientsData, error: patientsDataError },
    { data: groupListData, error: groupListDataError },
  ] = await promiseArray

  if (
    icuSidebarDataError ||
    vetsListDataError ||
    orderColorsDataError ||
    patientsDataError ||
    groupListDataError
  ) {
    console.error({
      icuSidebarDataError,
      vetsListDataError,
      orderColorsDataError,
      patientsDataError,
      hosGroupListDataError: groupListDataError,
    })
    redirect(
      `/error?message=${
        icuSidebarDataError?.message ||
        vetsListDataError?.message ||
        orderColorsDataError?.message ||
        patientsDataError?.message ||
        groupListDataError?.message
      }`,
    )
  }
  return {
    icuSidebarData,
    vetsListData,
    orderColorsData: orderColorsData.order_color as IcuOrderColors,
    patientsData,
    groupListData: groupListData.group_list,
  }
}
