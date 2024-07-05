import { DEFAULT_ICU_ORDER_NAME } from '@/constants/hospital/icu/chart'
import { createClient } from '@/lib/supabase/client'
import type { IcuChart, IcuChartJoined, IcuIo } from '@/types/hospital'

const supabase = createClient()

export const createNewChart = async (
  chartData: Partial<IcuChart>,
  selectedDate: string,
) => {
  const { data: icuChartData, error: icuChartError } = await supabase
    .from('icu_chart')
    .insert({
      icu_io_id: chartData?.icu_io_id!,
      hos_id: chartData?.hos_id!,
      main_vet: chartData?.main_vet,
      sub_vet: chartData?.sub_vet,
      weight: chartData?.weight,
      weight_measured_date: chartData?.weight_measured_date,
      target_date: selectedDate,
      patient_id: chartData?.patient_id!,
      caution: chartData.caution,
    })
    .select('icu_chart_id, icu_io_id')
    .single()

  if (icuChartError) {
    console.log(icuChartError)
    throw new Error(icuChartError.message)
  }

  return icuChartData
}

export const createNewChartWithJoinedData = async (
  chartData: Partial<IcuChartJoined>,
  selectedDate: string,
) => {
  const { data: icuChartData, error: icuChartError } = await supabase
    .from('icu_chart')
    .insert({
      icu_io_id: chartData?.icu_io_id?.icu_io_id!,
      hos_id: chartData?.patient_id?.hos_id!,
      main_vet: chartData?.main_vet?.user_id,
      sub_vet: chartData?.sub_vet?.user_id,
      weight: chartData?.weight,
      weight_measured_date: chartData?.weight_measured_date,
      target_date: selectedDate,
      patient_id: chartData?.patient_id?.patient_id!,
    })
    .select('icu_chart_id, icu_io_id')
    .single()

  if (icuChartError) {
    console.log(icuChartError)
    throw new Error(icuChartError.message)
  }

  return icuChartData
}

export const createDefaultOrder = async (
  icuChartId: string,
  icuIoId: IcuIo,
) => {
  DEFAULT_ICU_ORDER_NAME.forEach(async (element) => {
    const { error: icuChartOrderError } = await supabase
      .from('icu_chart_order')
      .insert({
        icu_chart_order_type: element.dataType,
        icu_chart_id: icuChartId,
        icu_io_id: icuIoId.icu_io_id,
        icu_chart_order_name: element.orderName,
        icu_chart_order_comment: element.orderComment,
      })

    if (icuChartOrderError) {
      console.log(icuChartOrderError)
      throw new Error(icuChartOrderError.message)
    }
  })
}

export const getPreviousChart = async (patientId: string, prevDate: string) => {
  const { data: icuChartData, error: icuChartError } = await supabase
    .from('icu_chart')
    .select('*')
    .match({ patient_id: patientId, target_date: prevDate })

  if (icuChartError) {
    console.log(icuChartError)
    throw new Error(icuChartError.message)
  }

  return icuChartData
}

export const getPreviousOrders = async (icuChartId: string) => {
  const { data: icuChartOrderData, error: icuChartOrderError } = await supabase
    .from('icu_chart_order')
    .select('*')
    .match({ icu_chart_id: icuChartId })

  if (icuChartOrderError) {
    console.log(icuChartOrderError)
    throw new Error(icuChartOrderError.message)
  }

  return icuChartOrderData
}

export const createOrderFromPrevOrder = async (
  newChartId: string,
  icuIoId: string | null,
  prevOrders: any[],
) => {
  for (const element of prevOrders) {
    const { error: icuChartOrderError } = await supabase
      .from('icu_chart_order')
      .insert({
        icu_chart_order_type: element.icu_chart_order_type,
        icu_chart_id: newChartId,
        icu_io_id: icuIoId,
        icu_chart_order_name: element.icu_chart_order_name,
        icu_chart_order_comment: element.icu_chart_order_comment,
        icu_chart_order_time: element.icu_chart_order_time,
      })

    if (icuChartOrderError) {
      console.log(icuChartOrderError)
      throw new Error(icuChartOrderError.message)
    }
  }
}
