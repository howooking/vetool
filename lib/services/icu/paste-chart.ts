'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

const supabase = createClient()

const pasteOrders = async (
  prev_chart_id: string,
  new_chart_id: string,
  selectedIoId: string,
) => {
  const { error: rpcError } = await supabase.rpc('copy_prev_chart_orders', {
    prev_chart_id_input: prev_chart_id,
    new_chart_id_input: new_chart_id,
    selected_io_id_input: selectedIoId,
  })

  if (rpcError) {
    console.log(rpcError)
    redirect(`/error?message=${rpcError.message}`)
  }
}

export const pasteChart = async (
  patientId: string,
  prev_chart_id: string,
  targetDate: string,
  selectedIoId: string,
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
    memo_a,
    memo_b,
    memo_c,
    weight_measured_date,
    weight,
  } = returningData

  // 첫 차트인 경우 : chart 복사할 필요가 없고 order만 복사
  if (target_date === targetDate) {
    await pasteOrders(prev_chart_id, icu_chart_id, selectedIoId)
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
          memo_a,
          memo_b,
          memo_c,
          weight_measured_date,
          weight,
          icu_io_id,
        })
        .select('icu_chart_id')
        .single()

    if (insertingNewChartError) {
      console.log(insertingNewChartError)
      redirect(`/error?message=${insertingNewChartError.message}`)
    }

    await pasteOrders(
      prev_chart_id,
      returningIcuChartId.icu_chart_id,
      selectedIoId,
    )
  }
}
