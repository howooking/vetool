'use server'

const SPECIAL_CHAR_REGEX = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]+/g

import { DEFAULT_ICU_ORDER_TYPE } from '@/constants/hospital/icu/chart/order'
import { createClient } from '@/lib/supabase/server'
import { CopiedOrder, SearchedChart } from '@/types/icu'
import { redirect } from 'next/navigation'

const supabase = createClient()

export const searchIcuChart = async (searchInput: string, hosId: string) => {
  const safeWords = searchInput
    .replace(SPECIAL_CHAR_REGEX, ' ')
    .split(' ')
    .filter((word) => word)

  let queryBuilder = supabase.from('icu_chart').select(
    `
      icu_io_id!inner(
        age_in_days,
        icu_io_id,
        in_date,
        out_date
      ),
      icu_chart_id,
      target_date,
      icu_chart_dx,
      icu_chart_cc,
      patient_id(
        name,
        owner_name,
        species,
        breed
      )

    `,
  )

  // 각 단어에 대해 개별적인 ilike 조건 추가 (AND 방식)
  safeWords.forEach((word) => {
    queryBuilder = queryBuilder.ilike('icu_chart_tags', `%${word}%`)
  })

  const { data: icuChartData, error: icuChartDataError } = await queryBuilder
    .match({ hos_id: hosId })
    .not('icu_io_id.out_date', 'is', null)
    .order('target_date')
    .order('icu_io_id')
    .returns<SearchedChart[]>()

  if (icuChartDataError) {
    console.log(icuChartDataError)
    redirect(`/error?message=${icuChartDataError.message}`)
  }

  return icuChartData
}

export const getSelectedChartOrders = async (chartId: string) => {
  const { data: icuChartOrderData, error: icuChartOrderDataError } =
    await supabase
      .from('icu_chart_order')
      .select(
        `
          *,
          icu_io_id!inner(*)
        `,
      )
      .match({ icu_chart_id: chartId })
      .order('icu_chart_order_name', { ascending: true })
      .returns<CopiedOrder[]>()

  if (icuChartOrderDataError) {
    console.log(icuChartOrderDataError)
    redirect(`/error?message=${icuChartOrderDataError.message}`)
  }

  const sortedChartOrders = icuChartOrderData.sort(
    (prev, next) =>
      DEFAULT_ICU_ORDER_TYPE.map((order) => order.value).findIndex(
        (order) => order === prev.icu_chart_order_type,
      ) -
      DEFAULT_ICU_ORDER_TYPE.map((order) => order.value).findIndex(
        (order) => order === next.icu_chart_order_type,
      ),
  )

  return sortedChartOrders
}
