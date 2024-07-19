'use server'

import { DEFAULT_ICU_ORDER_NAME } from '@/constants/hospital/icu/chart/order'
import { createClient } from '@/lib/supabase/server'
import { format } from 'date-fns'

export const copyPrevChart = async (
  targetDate: string,
  selectedPatientId: string,
) => {
  const supabase = createClient()

  const newDate = new Date(targetDate)
  const prevDate = format(newDate.setDate(newDate.getDate() - 1), 'yyyy-MM-dd')

  const { data: returningIcuChartIds, error: rpcError } = await supabase.rpc(
    'copy_prev_chart',
    {
      patient_id_input: selectedPatientId,
      prev_target_date_input: prevDate,
      target_date_input: targetDate,
    },
  )

  if (rpcError) {
    console.log(rpcError)
    return { error: rpcError }
  }

  const { newIcuChartId, prevIcuChartId, icuIoId } = returningIcuChartIds as {
    newIcuChartId: string
    prevIcuChartId: string
    icuIoId: string
  }

  const {
    data: preSelectedChartOrdersData,
    error: preSelectedChartOrdersDataError,
  } = await supabase.from('icu_chart_order').select('*').match({
    icu_chart_id: prevIcuChartId,
  })

  if (preSelectedChartOrdersDataError) {
    console.log(preSelectedChartOrdersDataError)
    return { error: preSelectedChartOrdersDataError }
  }

  preSelectedChartOrdersData.forEach(async (order) => {
    const { error: icuChartOrderError } = await supabase
      .from('icu_chart_order')
      .insert({
        hos_id: order.hos_id,
        icu_chart_order_type: order.icu_chart_order_type,
        icu_chart_id: newIcuChartId,
        icu_io_id: icuIoId,
        icu_chart_order_name: order.icu_chart_order_name,
        icu_chart_order_comment: order.icu_chart_order_comment,
      })

    if (icuChartOrderError) {
      console.log(icuChartOrderError)
      return { error: icuChartOrderError }
    }
  })
  return { error: null }
}

export const addDefaultChart = async (
  hosId: string,
  targetDate: string,
  selectedPatientId: string,
) => {
  const supabase = createClient()

  const newDate = new Date(targetDate)
  const prevDate = format(newDate.setDate(newDate.getDate() - 1), 'yyyy-MM-dd')

  const { data: returningIcuChartIds, error: rpcError } = await supabase.rpc(
    'copy_prev_chart',
    {
      patient_id_input: selectedPatientId,
      prev_target_date_input: prevDate,
      target_date_input: targetDate,
    },
  )

  if (rpcError) {
    console.log(rpcError)
    return { error: rpcError }
  }

  const { newIcuChartId, icuIoId } = returningIcuChartIds as {
    newIcuChartId: string
    icuIoId: string
  }

  DEFAULT_ICU_ORDER_NAME.forEach(async (order) => {
    const { error: icuChartOrderError } = await supabase
      .from('icu_chart_order')
      .insert({
        hos_id: hosId,
        icu_chart_order_type: order.dataType,
        icu_chart_id: newIcuChartId,
        icu_io_id: icuIoId,
        icu_chart_order_name: order.orderName,
        icu_chart_order_comment: order.orderComment,
      })

    if (icuChartOrderError) {
      console.log(icuChartOrderError)
      return { error: icuChartOrderError }
    }
  })

  return { error: null }
}
