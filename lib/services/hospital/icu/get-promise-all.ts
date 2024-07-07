'use server'

import { createClient } from '@/lib/supabase/server'
import type { IcuChartJoined, IcuChartOrderJoined } from '@/types/hospital'
import type { PatientData } from '@/types/hospital/patients'

export const getPromiseAll = async (hosId: string, targetDate: string) => {
  const supabase = createClient()

  const promiseArray = Promise.all([
    supabase
      .from('icu_chart')
      .select(
        `
          *,
          icu_io_id(*),
          patient_id("name", "gender", "breed", "patient_id"),
          main_vet("name", "user_id", "avatar_url"),
          sub_vet("name", "user_id", "avatar_url")
        `,
      )
      .match({ hos_id: hosId, target_date: targetDate })
      .order('created_at', { ascending: true })
      // !! 리턴 타입 쿼리문 보고 정하기
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

    // 병원 그룹리스트
    supabase.from('hospitals').select('group_list').match({ hos_id: hosId }),

    // 수의사
    supabase
      .from('users')
      .select('name, position, user_id')
      .match({ hos_id: hosId, is_vet: true }),

    supabase
      .from('patients')
      .select(
        `
          *,
          owner_id(*)
        `,
      )
      .match({ hos_id: hosId })
      .match({ is_alive: true })
      .order('created_at', { ascending: false })
      .returns<PatientData[]>(),

    supabase
      .from('owners')
      .select('*')
      .match({ hos_id: hosId })
      .order('created_at', { ascending: false }),
  ])

  const [
    { data: icuChartData, error: icuChartDataError },
    { data: icuChartOrderData, error: icuChartOrderDataError },
    { data: groupListData, error: groupListDataError },
    { data: vetsData, error: vetsDataError },
    { data: patientsData, error: patientsDataError },
    { data: ownersData, error: ownersDataError },
  ] = await promiseArray

  if (
    icuChartDataError ||
    icuChartOrderDataError ||
    groupListDataError ||
    vetsDataError ||
    patientsDataError ||
    ownersDataError
  ) {
    console.log({
      icuChartDataError,
      icuChartOrderDataError,
      groupListDataError,
      vetsDataError,
      patientsDataError,
      ownersDataError,
    })
    throw new Error(
      icuChartDataError?.message ||
        icuChartOrderDataError?.message ||
        groupListDataError?.message ||
        vetsDataError?.message ||
        patientsDataError?.message ||
        ownersDataError?.message,
    )
  }
  return {
    icuChartData,
    icuChartOrderData,
    groupListData,
    vetsData,
    patientsData,
    ownersData,
  }
}
