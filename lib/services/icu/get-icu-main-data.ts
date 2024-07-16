'use server'

import { createClient } from '@/lib/supabase/server'
import type {
  IcuChartJoined,
  IcuChartOrderJoined,
  IcuIoPatientJoined,
  IcuUserList,
} from '@/types/icu'
import type { PatientData } from '@/types/patients'
import { redirect } from 'next/navigation'

export const getIcuMainData = async (hosId: string, targetDate: string) => {
  const supabase = createClient()

  const promiseArray = Promise.all([
    supabase
      .from('icu_chart')
      .select(
        `
          *,
          icu_io_id(*),
          hos_id("group_list", "icu_memo_names"),
          patient_id("name", "gender", "breed", "patient_id", "species", "owner_name"),
          main_vet("name", "user_id", "avatar_url"),
          sub_vet("name", "user_id", "avatar_url")
        `,
      )
      .match({ hos_id: hosId, target_date: targetDate })
      .order('created_at', { ascending: true })
      .returns<IcuChartJoined[]>(),

    supabase
      .from('icu_chart_order')
      .select(
        `
          *,
          icu_io_id!inner(*),
          icu_chart_order_tx_1(*),
          icu_chart_order_tx_2(*),
          icu_chart_order_tx_3(*),
          icu_chart_order_tx_4(*),
          icu_chart_order_tx_5(*),
          icu_chart_order_tx_6(*),
          icu_chart_order_tx_7(*),
          icu_chart_order_tx_8(*),
          icu_chart_order_tx_9(*),
          icu_chart_order_tx_10(*),
          icu_chart_order_tx_11(*),
          icu_chart_order_tx_12(*),
          icu_chart_order_tx_13(*),
          icu_chart_order_tx_14(*),
          icu_chart_order_tx_15(*),
          icu_chart_order_tx_16(*),
          icu_chart_order_tx_17(*),
          icu_chart_order_tx_18(*),
          icu_chart_order_tx_19(*),
          icu_chart_order_tx_20(*),
          icu_chart_order_tx_21(*),
          icu_chart_order_tx_22(*),
          icu_chart_order_tx_23(*),
          icu_chart_order_tx_24(*)
        `,
      )
      .match({ 'icu_io_id.hos_id': hosId })
      .order('icu_chart_order_name', { ascending: true })
      .returns<IcuChartOrderJoined[]>(),

    supabase
      .from('users')
      .select('name, position, user_id, avatar_url, is_vet')
      .match({ hos_id: hosId })
      .returns<IcuUserList[]>(),

    supabase
      .from('icu_io')
      .select(
        `
          *,
          patient_id("name", "breed", "patient_id")
        `,
      )
      .match({ hos_id: hosId })
      .lte('in_date', targetDate)
      .or(`out_date.is.null, out_date.gte.${targetDate}`)
      .order('in_date', { ascending: true })
      .returns<IcuIoPatientJoined[]>(),
  ])

  const [
    { data: icuChartData, error: icuChartDataError },
    { data: icuChartOrderData, error: icuChartOrderDataError },
    { data: icuUsersData, error: icuUsersDataError },
    { data: icuIoData, error: icuIoDataError },
  ] = await promiseArray

  if (
    icuChartDataError ||
    icuChartOrderDataError ||
    icuUsersDataError ||
    icuIoDataError
  ) {
    console.log({
      icuChartDataError,
      icuChartOrderDataError,
      IcuUsersData: icuUsersDataError,
      icuIoDataError,
    })
    redirect(
      `/error?message=${icuChartDataError?.message || icuIoDataError?.message || icuChartOrderDataError?.message || icuUsersDataError?.message}`,
    )
  }
  return {
    icuChartData,
    icuChartOrderData,
    icuUsersData,
    icuIoData,
  }
}