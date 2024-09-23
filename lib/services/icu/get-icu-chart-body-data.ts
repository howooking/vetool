'use server'

import { createClient } from '@/lib/supabase/server'
import type {
  IcuChartJoined,
  IcuChartOrderJoined,
  IcuIoJoined,
} from '@/types/icu'
import { redirect } from 'next/navigation'

export const getIcuChartBodyData = async (
  hosId: string,
  patientId: string,
  targetDate: string,
) => {
  const supabase = createClient()

  const { data: selectedChartData, error: selectedChartError } = await supabase
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
        icu_io_id!inner(out_date, in_date, created_at, icu_io_id, icu_io_dx, icu_io_cc, cpcr),
        patient_id(name, gender, breed, patient_id, species, owner_name),
        main_vet(name, user_id, avatar_url),
        sub_vet(name, user_id, avatar_url),
        bookmark_id(bookmark_name, bookmark_comment, bookmark_id)
      `,
    )
    .match({ hos_id: hosId, target_date: targetDate, patient_id: patientId })
    .order('icu_io_id(out_date)', { ascending: false })
    .order('icu_io_id(in_date), icu_io_id(created_at)', { ascending: true })
    .returns<IcuChartJoined[]>()

  if (selectedChartError) {
    console.error({ selectedChartError })
    redirect(`/error?message=${selectedChartError.message}`)
  }

  const [
    { data: selectedIoData, error: selectedIoError },
    { data: selectedChartOrdersData, error: selectedChartOrdersError },
  ] = await Promise.all([
    supabase
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
      .match({ hos_id: hosId, patient_id: patientId })
      .lte('in_date', targetDate)
      .or(`out_date.is.null, out_date.gte.${targetDate}`)
      .order('out_date', { ascending: false })
      .order('in_date, created_at', { ascending: true })
      .returns<IcuIoJoined[]>(),

    supabase
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
      .match({
        hos_id: hosId,
        icu_chart_id: selectedChartData[0].icu_chart_id,
      })
      .eq('icu_chart_id.target_date', targetDate)
      .order('icu_chart_order_name', { ascending: true })
      .returns<IcuChartOrderJoined[]>(),
  ])

  console.log

  if (selectedIoError || selectedChartOrdersError) {
    console.error({
      selectedIoError,
      selectedChartOrdersError,
    })
    redirect(
      `/error?message=${
        selectedIoError?.message || selectedChartOrdersError?.message
      }`,
    )
  }

  return {
    selectedIoData: selectedIoData[0],
    selectedChartData: selectedChartData[0],
    selectedChartOrdersData: selectedChartOrdersData,
  }
}
