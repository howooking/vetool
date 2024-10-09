'use server'

import { createClient } from '@/lib/supabase/server'
import type { SelectedChart } from '@/types/icu/chart'
import type { PatientData } from '@/types/patients'
import { redirect } from 'next/navigation'

export const getIcuChart = async (
  hosId: string,
  targetDate: string,
  patient_id: string,
) => {
  const supabase = createClient()

  const promiseArray = Promise.all([
    supabase
      .rpc('get_icu_chart_data', {
        hos_id_input: hosId,
        target_date_input: targetDate,
        patient_id_input: patient_id,
      })
      .returns<SelectedChart>(),

    supabase
      .from('patients')
      .select('*')
      .match({ hos_id: hosId })
      .match({ is_alive: true })
      .order('created_at', { ascending: false })
      .returns<PatientData[]>(),
  ])

  const [
    { data: selectedChartData, error: selectedChartDataError },
    { data: patientsData, error: patientsDataError },
  ] = await promiseArray

  if (selectedChartDataError || patientsDataError) {
    console.error({
      selectedChartDataError,
      patientsDataError,
    })
    redirect(
      `/error?message=${
        selectedChartDataError?.message || patientsDataError?.message
      }`,
    )
  }
  return {
    selectedChartData,
    patientsData,
  }
}
