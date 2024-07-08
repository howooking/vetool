'use server'

import { createClient } from '@/lib/supabase/server'

export const getIcuIoByPatientId = async (patientId: string) => {
  const supabase = createClient()
  const { data: icuIoData, error: icuIoError } = await supabase
    .from('icu_io')
    .select('in_date, out_date')
    .match({ patient_id: patientId })
    .order('created_at', { ascending: false })
    .maybeSingle()

  if (icuIoError) {
    console.log(icuIoError)
    throw new Error(icuIoError.message)
  }

  return icuIoData
}
