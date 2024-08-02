'use server'

import { createClient } from '@/lib/supabase/server'
import type { CopiedOrder } from '@/types/icu'
import { redirect } from 'next/navigation'

const supabase = createClient()

const pasteOrders = async (
  copiedOrders: CopiedOrder[],
  icu_chart_id: string,
  icu_io_id: string,
) => {
  copiedOrders.forEach(async (order) => {
    const { error: icuChartOrderError } = await supabase
      .from('icu_chart_order')
      .insert({
        icu_chart_order_type: order.icu_chart_order_type,
        icu_chart_id,
        icu_io_id,
        hos_id: order.hos_id,
        icu_chart_order_name: order.icu_chart_order_name,
        icu_chart_order_comment: order.icu_chart_order_comment,
        icu_chart_order_time: order.icu_chart_order_time,
      })

    if (icuChartOrderError) {
      console.log(icuChartOrderError)
      redirect(`/error?message=${icuChartOrderError.message}`)
    }
  })
}
export const pasteChart = async (
  patientId: string,
  copiedChartOrder: CopiedOrder[],
  targetDate: string,
) => {
  const { data: returningData, error: returningDataError } = await supabase
    .from('icu_chart')
    .select('*')
    .match({ patient_id: patientId })
    .order('created_at', { ascending: false })
    .limit(1)
    .single()

  if (returningDataError) {
    console.log(returningDataError)
    redirect(`/error?message=${returningDataError.message}`)
  }

  const {
    icu_chart_id,
    icu_io_id,
    hos_id,
    patient_id,
    main_vet,
    sub_vet,
    target_date,
    search_tags,
    memo_a,
    memo_b,
    memo_c,
    weight_measured_date,
    weight,
    icu_chart_dx,
    icu_chart_cc,
    icu_chart_tags,
  } = returningData

  // 첫 차트인 경우 : chart 복사할 필요가 없고 order만 복사
  if (target_date === targetDate) {
    await pasteOrders(copiedChartOrder, icu_chart_id, icu_io_id)
  }

  // 첫차트가 아닌 경우 : 첫차트의 chart data와 order 모두 복사
  if (target_date !== targetDate) {
    const { data: returningIcuChartId, error: insertingNewChartError } =
      await supabase
        .from('icu_chart')
        .insert({
          hos_id,
          patient_id,
          main_vet,
          sub_vet,
          target_date: targetDate,
          search_tags,
          memo_a,
          memo_b,
          memo_c,
          weight_measured_date,
          weight,
          icu_chart_dx,
          icu_chart_cc,
          icu_chart_tags,
          icu_io_id,
        })
        .select('icu_chart_id')
        .single()

    if (insertingNewChartError) {
      console.log(insertingNewChartError)
      redirect(`/error?message=${insertingNewChartError.message}`)
    }

    await pasteOrders(
      copiedChartOrder,
      returningIcuChartId.icu_chart_id,
      icu_io_id,
    )
  }
}
