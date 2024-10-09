'use server'

import { createClient } from '@/lib/supabase/server'
import type { NotOutDuePatientsData } from '@/types/icu/movement'
import { redirect } from 'next/navigation'

export const getNotOutDuePatients = async (
  hosId: string,
  targetDate: string,
) => {
  const supabase = createClient()

  const { data, error } = await supabase
    .rpc('get_not_out_due_patients', {
      hos_id_input: hosId,
      target_date_input: targetDate,
    })
    .returns<NotOutDuePatientsData[]>()

  if (error) {
    console.error(error)
    redirect(`/error?message=${error?.message}`)
  }

  return data || []
}
