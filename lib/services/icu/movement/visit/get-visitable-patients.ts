'use server'

import { createClient } from '@/lib/supabase/server'
import type { VisitablePatientsData } from '@/types/icu/movement'
import { redirect } from 'next/navigation'

export const getVisitablePatients = async (
  hosId: string,
  targetDate: string,
) => {
  const supabase = createClient()

  const { data, error } = await supabase
    .rpc('get_icu_visitable_patients', {
      hos_id_input: hosId,
      target_date_input: targetDate,
    })
    .returns<VisitablePatientsData[]>()

  if (error) {
    console.error(error)
    redirect(`/error?message=${error?.message}`)
  }

  return data || []
}
