'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

const supabase = createClient()
export const deleteChart = async (
  icuChartId: string,
  icuIoId: string,
  targetDate: string,
  patientId: string,
) => {
  const { data: returningResult, error: deleteChartError } = await supabase.rpc(
    'delete_icu_chart',
    {
      icu_chart_id_input: icuChartId,
      icu_io_id_input: icuIoId,
      target_date_input: targetDate,
      patient_id_input: patientId,
    },
  )

  if (deleteChartError) {
    console.log(deleteChartError)
    redirect(`/error/?message=${deleteChartError.message}`)
  }
  const { isIcuIoDeleted } = returningResult as { isIcuIoDeleted: boolean }
  return isIcuIoDeleted
}

export const deleteAllCharts = async (icuIoId: string) => {
  const { error: deleteAllChartError } = await supabase
    .from('icu_io')
    .delete()
    .match({ icu_io_id: icuIoId })

  if (deleteAllChartError) {
    console.log(deleteAllChartError)
    redirect(`/error/?message=${deleteAllChartError.message}`)
  }
}
