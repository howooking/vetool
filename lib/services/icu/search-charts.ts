'use server'

const SPECIAL_CHAR_REGEX = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]+/g

import { createClient } from '@/lib/supabase/server'
import { SearchedChart, IcuChartOrderJoined } from '@/types/icu'
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
    // !! 병원 별, 퇴원한 환자만
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

export const selectedChartOrderList = async (chartId: string) => {
  const { data: icuChartOrderData, error: icuChartOrderDataError } =
    await supabase
      .from('icu_chart_order')
      // !! 필요한 데이터만 가져오기
      .select(
        `
          *,
          icu_io_id!inner(*)
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
