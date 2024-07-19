'use server'

import { createClient } from '@/lib/supabase/server'
import type { IcuChartOrderJoined } from '@/types/icu'
import { redirect } from 'next/navigation'

export const pasteIcuChart = async (
  targetDate: string,
  patientId: string,
  selectedIcuChartId: string,
  copiedChartOrder: IcuChartOrderJoined[],
) => {
  const supabase = createClient()

  // const { data: returningIcuChartIds, error: rpcError } = await supabase.rpc(
  //   'paste_icu_chart',
  //   {
  //     target_date_input: targetDate,
  //     patient_id_input: patientId,
  //     icu_chart_id_input: selectedIcuChartId,
  //   },
  // )

  // if (rpcError) {
  //   console.log(rpcError)
  //   redirect(`/error?message=${rpcError.message}`)
  // }

  // const { newIcuChartId, icuIoId } = returningIcuChartIds as {
  //   newIcuChartId: string
  //   icuIoId: string
  // }

  // copiedChartOrder.forEach(async (order) => {
  //   const { error: icuChartOrderError } = await supabase
  //     .from('icu_chart_order')
  //     .insert({
  //       hos_id: order.hos_id,
  //       icu_chart_order_type: order.icu_chart_order_type,
  //       icu_chart_id: newIcuChartId,
  //       icu_io_id: icuIoId,
  //       icu_chart_order_name: order.icu_chart_order_name,
  //       icu_chart_order_comment: order.icu_chart_order_comment,
  //       icu_chart_order_time: order.icu_chart_order_time,
  //     })

  //   if (icuChartOrderError) {
  //     console.log(icuChartOrderError)
  //     redirect(`/error?message=${icuChartOrderError.message}`)
  //   }
  // })
}
