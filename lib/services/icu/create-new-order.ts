'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

const supabase = createClient()

export const deleteOrder = async (chartOrderId: string) => {
  const { error: deleteOrderError } = await supabase
    .from('icu_chart_order')
    .delete()
    .match({ icu_chart_order_id: chartOrderId })

  if (deleteOrderError) {
    console.log(deleteOrderError)
    redirect(`/error?message=${deleteOrderError.message}`)
  }
}

export const upsertOrder = async (
  icuChartId: string,
  icuIoId: string,
  icuChartOrderId: string,
  orderTime: string[],
  hos_id: string,
  order: {
    icu_chart_order_name: string
    icu_chart_order_comment: string | null
    icu_chart_order_type: string
  },
) => {
  const { error: upsertOrderError } = await supabase
    .from('icu_chart_order')
    .upsert({
      icu_chart_order_id: icuChartOrderId,
      icu_chart_id: icuChartId,
      icu_io_id: icuIoId,
      icu_chart_order_time: orderTime,
      hos_id,
      ...order,
    })

  if (upsertOrderError) {
    console.log(upsertOrderError)
    redirect(`/error?message=${upsertOrderError.message}`)
  }
}
