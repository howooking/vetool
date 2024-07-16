'use server'

import { DEFAULT_ICU_ORDER_NAME } from '@/constants/hospital/icu/chart'
import { createClient } from '@/lib/supabase/server'
import { getDaysSince } from '@/lib/utils'
import { format } from 'date-fns'
import { redirect } from 'next/navigation'

export const registerIcuPatient = async (
  hosId: string,
  registeringPatient: {
    patientId: string
    birth: string
    patientName: string
  },
  dx: string,
  cc: string,
  in_date: Date,
  out_due_date: Date,
  group_list: string[],
  main_vet: string,
  sub_vet?: string,
) => {
  const supabase = createClient()

  const { data: returningValue, error: rpcError } = await supabase.rpc(
    'insert_icu_io_and_icu_chart_when_register_icu_patient',
    {
      hos_id_input: hosId,
      dx_input: dx,
      cc_input: cc,
      in_date_input: format(in_date, 'yyyy-MM-dd'),
      out_due_date_input: format(out_due_date, 'yyyy-MM-dd'),
      group_list_input: JSON.stringify(group_list),
      age_in_days_input: getDaysSince(registeringPatient.birth),
      patient_id_input: registeringPatient.patientId!,
      main_vet_input: main_vet,
      sub_vet_input: sub_vet ?? '',
    },
  )

  if (rpcError) {
    console.log(rpcError)
    redirect(`/error?message=${rpcError.message}`)
  }

  const [icuIoId, icuChartId] = returningValue.split(',')

  DEFAULT_ICU_ORDER_NAME.forEach(async (order) => {
    const { error: icuChartOrderError } = await supabase
      .from('icu_chart_order')
      .insert({
        icu_chart_order_type: order.dataType,
        icu_chart_id: icuChartId,
        icu_io_id: icuIoId,
        icu_chart_order_name: order.orderName,
        icu_chart_order_comment: order.orderComment,
      })

    if (icuChartOrderError) {
      console.log(icuChartOrderError)
      redirect(`/error?message=${icuChartOrderError.message}`)
    }
  })
}
