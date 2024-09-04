'use server'

import { createClient } from '@/lib/supabase/server'
import { format } from 'date-fns'
import { redirect } from 'next/navigation'

export const hasPrevChart = async (
  targetDate: string,
  selectedPatientId: string,
) => {
  const supabase = createClient()

  const newDate = new Date(targetDate)
  const prevDate = format(newDate.setDate(newDate.getDate() - 1), 'yyyy-MM-dd')

  const { data: prevChartData, error } = await supabase
    .from('icu_chart')
    .select('icu_chart_id')
    .match({ patient_id: selectedPatientId, target_date: prevDate })
    .maybeSingle()

  if (error) {
    console.log(error)
    redirect(`/error?message=${error.message}`)
  }

  return !!prevChartData
}

export const copyPrevChart = async (
  targetDate: string,
  selectedPatientId: string,
) => {
  const supabase = createClient()

  const newDate = new Date(targetDate)
  const prevDate = format(newDate.setDate(newDate.getDate() - 1), 'yyyy-MM-dd')

  const { data: prevChartData, error: prevChartDataError } = await supabase
    .from('icu_chart')
    .select(
      `
        icu_io_id,
        icu_chart_id,
        hos_id, 
        main_vet,
        sub_vet,
        memo_a,
        memo_b,
        memo_c,
        weight_measured_date,
        weight
      `,
    )
    .match({ patient_id: selectedPatientId, target_date: prevDate })
    .maybeSingle()

  if (prevChartDataError) {
    console.log(prevChartDataError)
    redirect(`/error?message=${prevChartDataError.message}`)
  }
  //  전일 차트 데이터가 없으면 클라이언트에서 토스트 띄우기 위해
  if (prevChartData === null) {
    return { error: 'prev chart not found' }
  }

  const { data: prevChartOrdersData, error: prevChartOrdersDataError } =
    await supabase.from('icu_chart_order').select('*').match({
      icu_chart_id: prevChartData.icu_chart_id,
    })

  if (prevChartOrdersDataError) {
    console.log(prevChartOrdersDataError)
    redirect(`/error?message=${prevChartOrdersDataError.message}`)
  }

  // 첫째날 차트는 오더가 없고 차트는 있기 때문에 확인해야함
  if (prevChartOrdersData.length === 0) {
    return { error: 'prev orders not found' }
  }

  // 전날의 차트와 오더가 있다는 것을 모두 확인 후에 target날의 차트 생성
  const { data: newIcuChartId, error: creatingNewIcuChartError } =
    await supabase
      .from('icu_chart')
      .insert({
        icu_io_id: prevChartData.icu_io_id,
        hos_id: prevChartData.hos_id,
        main_vet: prevChartData.main_vet,
        sub_vet: prevChartData.sub_vet,
        target_date: targetDate,
        memo_a: prevChartData.memo_a,
        memo_b: prevChartData.memo_b,
        memo_c: prevChartData.memo_c,
        weight_measured_date: prevChartData.weight_measured_date,
        weight: prevChartData.weight,
        patient_id: selectedPatientId,
      })
      .select('icu_chart_id')
      .single()

  if (creatingNewIcuChartError) {
    console.log(creatingNewIcuChartError)
    redirect(`/error?message=${creatingNewIcuChartError.message}`)
  }

  prevChartOrdersData.forEach(async (order) => {
    const { error: icuChartOrderError } = await supabase
      .from('icu_chart_order')
      .insert({
        hos_id: order.hos_id,
        icu_chart_order_type: order.icu_chart_order_type,
        icu_chart_id: newIcuChartId.icu_chart_id,
        icu_io_id: prevChartData!.icu_io_id,
        icu_chart_order_name: order.icu_chart_order_name,
        icu_chart_order_comment: order.icu_chart_order_comment,
        icu_chart_order_time: order.icu_chart_order_time,
      })

    if (icuChartOrderError) {
      console.log(icuChartOrderError)
      return { error: icuChartOrderError }
    }
  })
  return { error: null }
}

export const registerDefaultChart = async (
  hosId: string,
  chartId: string,
  ioId: string,
) => {
  const supabase = createClient()

  const { data: defaultChartOrderData, error: defaultChartOrderError } =
    await supabase
      .from('icu_default_chart')
      .select(
        'default_chart_order_name, default_chart_order_comment, default_chart_order_type',
      )
      .match({ hos_id: hosId })

  if (defaultChartOrderError) {
    console.log(defaultChartOrderError)
    redirect(`/error?message=${defaultChartOrderError.message}`)
  }

  defaultChartOrderData.forEach(async (order) => {
    const { error: icuChartOrderError } = await supabase
      .from('icu_chart_order')
      .insert({
        hos_id: hosId,
        icu_chart_id: chartId,
        icu_io_id: ioId,
        icu_chart_order_name: order.default_chart_order_name,
        icu_chart_order_comment: order.default_chart_order_comment,
        icu_chart_order_type: order.default_chart_order_type,
      })

    if (icuChartOrderError) {
      console.log(icuChartOrderError)
      redirect(`/error?message=${icuChartOrderError.message}`)
    }
  })
}
