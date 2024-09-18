'use client'

import { getLogColor } from '@/hooks/use-query-icu-realtime'
import { createClient } from '@/lib/supabase/client'
import type {
  IcuChartJoined,
  IcuChartOrderJoined,
  IcuIoJoined,
} from '@/types/icu'
import { redirect } from 'next/navigation'

const supabase = createClient()

export const getIcuIo = async (hosId: string, targetDate: string) => {
  console.log(
    `%cIO refetching`,
    `background:${getLogColor('icu_io')}; color:white`,
  )
  const { data: icuIoData, error: icuIoDataError } = await supabase
    .from('icu_io')
    .select(
      `
        icu_io_id,
        in_date,
        out_date,
        out_due_date,
        group_list,
        age_in_days,
        icu_io_dx,
        icu_io_cc,
        cpcr,
        patient_id(name, breed, patient_id),
        hos_id(group_list, icu_memo_names, order_color)
      `,
    )
    .match({ hos_id: hosId })
    .lte('in_date', targetDate)
    .or(`out_date.is.null, out_date.gte.${targetDate}`)
    .order('out_date', { ascending: false })
    .order('in_date', { ascending: true })
    .order('created_at', { ascending: true })
    .returns<IcuIoJoined[]>()

  if (icuIoDataError) {
    console.error(icuIoDataError)
    redirect(`/error?message=${icuIoDataError?.message}`)
  }
  return icuIoData
}

export const getIcuChart = async (hosId: string, targetDate: string) => {
  console.log(
    `%cCHART refetching`,
    `background:${getLogColor('icu_chart')}; color:white`,
  )
  const { data: icuChartData, error: icuChartDataError } = await supabase
    .from('icu_chart')
    .select(
      `
        icu_chart_id,
        target_date,
        memo_a,
        memo_b,
        memo_c,
        weight_measured_date,
        weight,
        icu_io_id!inner(out_date, in_date, created_at, icu_io_id, icu_io_dx, icu_io_cc),
        patient_id(name, gender, breed, patient_id, species, owner_name),
        main_vet(name, user_id, avatar_url),
        sub_vet(name, user_id, avatar_url),
        bookmark_id(bookmark_name, bookmark_comment, bookmark_id)
      `,
    )
    .match({ hos_id: hosId, target_date: targetDate })
    .order('icu_io_id(out_date)', { ascending: false })
    .order('icu_io_id(in_date)', { ascending: true })
    .order('icu_io_id(created_at)', { ascending: true })
    .returns<IcuChartJoined[]>()

  if (icuChartDataError) {
    console.error(icuChartDataError)
    redirect(`/error?message=${icuChartDataError?.message}`)
  }
  return icuChartData
}

export const getIcuOrder = async (hosId: string, targetDate: string) => {
  console.log(
    `%cORDER refetching`,
    `background:${getLogColor('icu_chart_order')}; color:white`,
  )
  const { data: icuOrderData, error: icuChartOrderDataError } = await supabase
    .from('icu_chart_order')
    .select(
      `
        icu_chart_order_id,
        icu_chart_order_type,
        icu_chart_order_name,
        icu_chart_order_comment,
        icu_chart_order_time,
        icu_io_id(icu_io_id, in_date, created_at, patient_id, out_date),
        icu_chart_id!inner(target_date, icu_chart_id),
        icu_chart_order_tx_1(icu_chart_tx_id, icu_chart_order_id, icu_chart_tx_result, icu_chart_tx_comment, icu_chart_tx_log, created_at, updated_at),
        icu_chart_order_tx_2(icu_chart_tx_id, icu_chart_order_id, icu_chart_tx_result, icu_chart_tx_comment, icu_chart_tx_log, created_at, updated_at),
        icu_chart_order_tx_3(icu_chart_tx_id, icu_chart_order_id, icu_chart_tx_result, icu_chart_tx_comment, icu_chart_tx_log, created_at, updated_at),
        icu_chart_order_tx_4(icu_chart_tx_id, icu_chart_order_id, icu_chart_tx_result, icu_chart_tx_comment, icu_chart_tx_log, created_at, updated_at),
        icu_chart_order_tx_5(icu_chart_tx_id, icu_chart_order_id, icu_chart_tx_result, icu_chart_tx_comment, icu_chart_tx_log, created_at, updated_at),
        icu_chart_order_tx_6(icu_chart_tx_id, icu_chart_order_id, icu_chart_tx_result, icu_chart_tx_comment, icu_chart_tx_log, created_at, updated_at),
        icu_chart_order_tx_7(icu_chart_tx_id, icu_chart_order_id, icu_chart_tx_result, icu_chart_tx_comment, icu_chart_tx_log, created_at, updated_at),
        icu_chart_order_tx_8(icu_chart_tx_id, icu_chart_order_id, icu_chart_tx_result, icu_chart_tx_comment, icu_chart_tx_log, created_at, updated_at),
        icu_chart_order_tx_9(icu_chart_tx_id, icu_chart_order_id, icu_chart_tx_result, icu_chart_tx_comment, icu_chart_tx_log, created_at, updated_at),
        icu_chart_order_tx_10(icu_chart_tx_id, icu_chart_order_id, icu_chart_tx_result, icu_chart_tx_comment, icu_chart_tx_log, created_at, updated_at),
        icu_chart_order_tx_11(icu_chart_tx_id, icu_chart_order_id, icu_chart_tx_result, icu_chart_tx_comment, icu_chart_tx_log, created_at, updated_at),
        icu_chart_order_tx_12(icu_chart_tx_id, icu_chart_order_id, icu_chart_tx_result, icu_chart_tx_comment, icu_chart_tx_log, created_at, updated_at),
        icu_chart_order_tx_13(icu_chart_tx_id, icu_chart_order_id, icu_chart_tx_result, icu_chart_tx_comment, icu_chart_tx_log, created_at, updated_at),
        icu_chart_order_tx_14(icu_chart_tx_id, icu_chart_order_id, icu_chart_tx_result, icu_chart_tx_comment, icu_chart_tx_log, created_at, updated_at),
        icu_chart_order_tx_15(icu_chart_tx_id, icu_chart_order_id, icu_chart_tx_result, icu_chart_tx_comment, icu_chart_tx_log, created_at, updated_at),
        icu_chart_order_tx_16(icu_chart_tx_id, icu_chart_order_id, icu_chart_tx_result, icu_chart_tx_comment, icu_chart_tx_log, created_at, updated_at),
        icu_chart_order_tx_17(icu_chart_tx_id, icu_chart_order_id, icu_chart_tx_result, icu_chart_tx_comment, icu_chart_tx_log, created_at, updated_at),
        icu_chart_order_tx_18(icu_chart_tx_id, icu_chart_order_id, icu_chart_tx_result, icu_chart_tx_comment, icu_chart_tx_log, created_at, updated_at),
        icu_chart_order_tx_19(icu_chart_tx_id, icu_chart_order_id, icu_chart_tx_result, icu_chart_tx_comment, icu_chart_tx_log, created_at, updated_at),
        icu_chart_order_tx_20(icu_chart_tx_id, icu_chart_order_id, icu_chart_tx_result, icu_chart_tx_comment, icu_chart_tx_log, created_at, updated_at),
        icu_chart_order_tx_21(icu_chart_tx_id, icu_chart_order_id, icu_chart_tx_result, icu_chart_tx_comment, icu_chart_tx_log, created_at, updated_at),
        icu_chart_order_tx_22(icu_chart_tx_id, icu_chart_order_id, icu_chart_tx_result, icu_chart_tx_comment, icu_chart_tx_log, created_at, updated_at),
        icu_chart_order_tx_23(icu_chart_tx_id, icu_chart_order_id, icu_chart_tx_result, icu_chart_tx_comment, icu_chart_tx_log, created_at, updated_at),
        icu_chart_order_tx_24(icu_chart_tx_id, icu_chart_order_id, icu_chart_tx_result, icu_chart_tx_comment, icu_chart_tx_log, created_at, updated_at)
      `,
    )
    .match({ hos_id: hosId })
    .eq('icu_chart_id.target_date', targetDate)
    .order('icu_chart_order_name', { ascending: true })
    .returns<IcuChartOrderJoined[]>()

  if (icuChartOrderDataError) {
    console.error(icuChartOrderDataError)
    redirect(`/error?message=${icuChartOrderDataError?.message}`)
  }
  return icuOrderData
}
