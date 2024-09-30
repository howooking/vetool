'use server'

import { createClient } from '@/lib/supabase/server'
import type { SelectedChart } from '@/types/icu/chart'
import { redirect } from 'next/navigation'

export const getIcuChart = async (
  hosId: string,
  targetDate: string,
  patient_id: string,
) => {
  const supabase = createClient()

  const { data, error } = await supabase
    .rpc('get_icu_chart_data', {
      hos_id_input: hosId,
      target_date_input: targetDate,
      patient_id_input: patient_id,
    })
    .returns<SelectedChart>()

  if (error) {
    console.error(error)
    redirect(`/error?message=${error?.message}`)
  }
  return data
}
