'use server'

import { DEFAULT_ICU_ORDER_NAME } from '@/constants/hospital/icu/chart'
import { createClient } from '@/lib/supabase/server'
import type {
  IcuChart,
  IcuChartJoined,
  IcuChartOrderJoined,
  IcuIo,
} from '@/types/hospital'

const supabase = createClient()

export const copyPrevSelectedChart = async (
  chartData: IcuChartJoined,
  preSelectedChartOrders: IcuChartOrderJoined[],
  selectedDate: string,
) => {
  const { data: returningIcuChartId, error: rpcError } = await supabase.rpc(
    'copy_prev_selected_chart',
    {
      icu_io_id_input: chartData.icu_io_id.icu_io_id,
      hos_id_input: chartData.hos_id!,
      patient_id_input: chartData.patient_id.patient_id,
      main_vet_input: chartData.main_vet.user_id,
      sub_vet_input: chartData.sub_vet?.user_id ?? '',
      target_date_input: selectedDate,
      caution_input: chartData.caution,
      memo_a_input: chartData.memo_a,
      memo_b_input: chartData.memo_b,
      memo_c_input: chartData.memo_c,
      weight_input: chartData.weight,
      weight_measured_date_input: chartData.weight_measured_date ?? '',
    },
  )

  if (rpcError) {
    console.log(rpcError)
    throw new Error(rpcError.message)
  }

  preSelectedChartOrders.forEach(async (order) => {
    const { error: icuChartOrderError } = await supabase
      .from('icu_chart_order')
      .insert({
        icu_chart_order_type: order.icu_chart_order_type,
        icu_chart_id: returningIcuChartId,
        icu_io_id: chartData.icu_io_id.icu_io_id,
        icu_chart_order_name: order.icu_chart_order_name,
        icu_chart_order_comment: order.icu_chart_order_comment,
      })

    if (icuChartOrderError) {
      console.log(icuChartOrderError)
      throw new Error(icuChartOrderError.message)
    }
  })
}

export const addDefaultChart = async (
  chartData: IcuChartJoined,
  selectedDate: string,
) => {
  const supabase = createClient()

  const { data: returningIcuChartId, error: rpcError } = await supabase.rpc(
    'copy_prev_selected_chart',
    {
      icu_io_id_input: chartData.icu_io_id.icu_io_id,
      hos_id_input: chartData.hos_id!,
      patient_id_input: chartData.patient_id.patient_id,
      main_vet_input: chartData.main_vet.user_id,
      sub_vet_input: chartData.sub_vet?.user_id ?? '',
      target_date_input: selectedDate,
      caution_input: chartData.caution,
      memo_a_input: chartData.memo_a,
      memo_b_input: chartData.memo_b,
      memo_c_input: chartData.memo_c,
      weight_input: chartData.weight,
      weight_measured_date_input: chartData.weight_measured_date ?? '',
    },
  )

  if (rpcError) {
    console.log(rpcError)
    throw new Error(rpcError.message)
  }

  // 기본차트 삽입
  DEFAULT_ICU_ORDER_NAME.forEach(async (order) => {
    const { error: icuChartOrderError } = await supabase
      .from('icu_chart_order')
      .insert({
        icu_chart_order_type: order.dataType,
        icu_chart_id: returningIcuChartId,
        icu_io_id: chartData.icu_io_id.icu_io_id,
        icu_chart_order_name: order.orderName,
        icu_chart_order_comment: order.orderComment,
      })

    if (icuChartOrderError) {
      console.log(icuChartOrderError)
      throw new Error(icuChartOrderError.message)
    }
  })
}
