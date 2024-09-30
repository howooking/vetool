'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export const getIcuIoByPatientId = async (patientId: string) => {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('icu_io')
    .select('in_date, out_date')
    .match({ patient_id: patientId })
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  if (error) {
    console.error(error)
    redirect(`/error?message=${error.message}`)
  }

  return data
}
