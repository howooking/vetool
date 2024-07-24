'use server'

import { createClient } from '@/lib/supabase/server'
import { IcuChartListJoined, IcuChartOrderJoined } from '@/types/icu'
import { redirect } from 'next/navigation'

const supabase = createClient()

export const selectChartList = async (query: string) => {
  // 특수문자 제거 및 공백으로 단어 분리
  const safeWords = query
    .replace(/[,;'"\\%_\[\]{}|&]/g, ' ')
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0)

  let queryBuilder = supabase.from('icu_chart').select(`
      icu_chart_id,
      target_date,
      icu_chart_dx,
      icu_chart_cc,
      icu_io_id,
      patient_id(name)
    `)

  // 각 단어에 대해 개별적인 ilike 조건 추가 (AND 방식)
  safeWords.forEach((word) => {
    queryBuilder = queryBuilder.ilike('icu_chart_tags', `%${word}%`)
  })

  const { data: icuChartData, error: icuChartDataError } = await queryBuilder
    .order('target_date')
    .order('icu_io_id')
    .returns<IcuChartListJoined[]>()

  if (icuChartDataError) {
    console.log(icuChartDataError)
    redirect(`/error?message=${icuChartDataError.message}`)
  }

  return icuChartData
}

export const selectedChartOrderList = async (chartId: string) => {
  const { data: icuChartOrderData, error: icuChartOrderDataError } =
    await supabase
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
      .match({ icu_chart_id: chartId })
      .order('icu_chart_order_name', { ascending: true })
      .returns<IcuChartOrderJoined[]>()

  if (icuChartOrderDataError) {
    console.log(icuChartOrderDataError)
    redirect(`/error?message=${icuChartOrderDataError.message}`)
  }

  return icuChartOrderData
}
