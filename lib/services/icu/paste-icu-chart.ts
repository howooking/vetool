'use server'

import { DEFAULT_ICU_ORDER_NAME } from '@/constants/hospital/icu/chart'
import { createClient } from '@/lib/supabase/server'
import type { IcuChartOrderJoined } from '@/types/icu'
import { format } from 'date-fns'
import { redirect } from 'next/navigation'

export const pasteIcuChart = async (
  targetDate: string,
  selectedPatient: {
    patientName: string
    patientId: string
  },
  copiedTargetDate: string,
  copiedChartOrder: IcuChartOrderJoined[],
) => {
  const supabase = createClient()

  const { data: returningIcuChartIds, error: rpcError } = await supabase.rpc(
    'paste_icu_chart',
    {
      patient_id_input: selectedPatient.patientId,
      target_date_input: targetDate,
      // copied_target_date_input: copiedTargetDate,
    },
  )

  if (rpcError) {
    console.log(rpcError)
    redirect(`/error?message=${rpcError.message}`)
  }

  const { newIcuChartId, icuIoId } = returningIcuChartIds as {
    newIcuChartId: string
    icuIoId: string
  }

  copiedChartOrder.forEach(async (order) => {
    const { error: icuChartOrderError } = await supabase
      .from('icu_chart_order')
      .insert({
        icu_chart_order_type: order.icu_chart_order_type,
        icu_chart_id: newIcuChartId,
        icu_io_id: icuIoId,
        icu_chart_order_name: order.icu_chart_order_name,
        icu_chart_order_comment: order.icu_chart_order_comment,
      })

    if (icuChartOrderError) {
      console.log(icuChartOrderError)
      redirect(`/error?message=${icuChartOrderError.message}`)
    }
  })
}
