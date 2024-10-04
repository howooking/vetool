'use server'

import { createClient } from '@/lib/supabase/server'
import type { OutDuePatientsData } from '@/types/icu/out-due'
import { redirect } from 'next/navigation'

export const getIcuOutDuePatients = async (
  hosId: string,
  targetDate: string,
) => {
  const supabase = createClient()

  const { data, error } = await supabase
    .rpc('get_icu_out_due_patients', {
      hos_id_input: hosId,
      target_date_input: targetDate,
    })
    .returns<OutDuePatientsData[]>()

  if (error) {
    console.error(error)
    redirect(`/error?message=${error?.message}`)
  }

  return data
}
