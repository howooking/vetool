'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export const getIcuIoByPatientId = async (patientId: string) => {
  const supabase = createClient()
  const { data: icuIoData, error: icuIoError } = await supabase
    .from('icu_io')
    .select('in_date, out_date, age_in_days')
    .match({ patient_id: patientId })
    .order('created_at', { ascending: false })
    .maybeSingle()

  if (icuIoError) {
    console.log(icuIoError)
    redirect(`/error?message=${icuIoError.message}`)
  }

  return icuIoData
}
