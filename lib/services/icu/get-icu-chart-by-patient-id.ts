'use server'

import { createClient } from '@/lib/supabase/server'
import { SelectedChart } from '@/types/icu'
import { redirect } from 'next/navigation'

export const getIcuChartByPatientId = async (
  hosId: string,
  targetDate: string,
  patient_id: string,
) => {
  const supabase = createClient()

  const { data: icuChartData, error: icuChartDataError } = await supabase
    .rpc('get_icu_chart_data', {
      hos_id_input: hosId,
      target_date_input: targetDate,
      patient_id_input: patient_id,
    })
    .returns<SelectedChart>()

  if (icuChartDataError) {
    console.error(icuChartDataError)
    redirect(`/error?message=${icuChartDataError?.message}`)
  }
  return icuChartData
}
