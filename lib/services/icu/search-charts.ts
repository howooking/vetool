'use server'

const SPECIAL_CHAR_REGEX = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]+/g

import { DEFAULT_ICU_ORDER_TYPE } from '@/constants/hospital/icu/chart/order'
import { createClient } from '@/lib/supabase/server'
import { getDateMonthsAgo } from '@/lib/utils'
import { CopiedOrder, SearchedIcuIos } from '@/types/icu'
import { redirect } from 'next/navigation'

export const searchIos = async (
  searchInput: string,
  hosId: string,
  timeRange: string,
  order: string,
) => {
  const supabase = createClient()

  const safeWords = searchInput
    .trim()
    .replace(SPECIAL_CHAR_REGEX, ' ')
    .split(' ')
    .filter((word) => word)

  let queryBuilder = supabase.from('icu_io').select(
    `
      age_in_days,
      icu_io_id,
      in_date,
      out_date,
      icu_io_tags,
      icu_io_dx,
      icu_io_cc,
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
    queryBuilder = queryBuilder.ilike('icu_io_tags', `%${word}%`)
  })

  if (timeRange !== 'all') {
    const monthsAgo = getDateMonthsAgo(timeRange)

    queryBuilder = queryBuilder.gte('out_date', monthsAgo)
  }

  const { data: searchedIcuIoData, error: searchedIcuIoDataError } =
    await queryBuilder
      .match({ hos_id: hosId })
      .not('out_date', 'is', null)
      .order('out_date', { ascending: order === 'asc' })
      .returns<SearchedIcuIos[]>()

  if (searchedIcuIoDataError) {
    console.log(searchedIcuIoDataError)
    redirect(`/error?message=${searchedIcuIoDataError.message}`)
  }

  return searchedIcuIoData
}

export const getSelectedCharts = async (icuIoId: string) => {
  const supabase = createClient()

  const { data: selectedIcuChartData, error: selectedIcuChartDataError } =
    await supabase
      .from('icu_charts')
      .select('icu_chart_id, target_date, patient_id')
      .order('target_date', { ascending: true })
      .match({ icu_io_id: icuIoId })

  if (selectedIcuChartDataError) {
    console.log(selectedIcuChartDataError)
    redirect(`/error?message=${selectedIcuChartDataError.message}`)
  }

  return selectedIcuChartData
}

// 삭제
export const getSelectedChartOrders = async (chartId: string) => {
  const supabase = createClient()

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
