'use server'

import { createClient } from '@/lib/supabase/server'
import { SummaryData } from '@/types/icu/summary'
import { redirect } from 'next/navigation'

export const getIcuSummaryData = async (hosId: string, targetDate: string) => {
  const supabase = await createClient()

  const { data, error } = await supabase
    .rpc('get_icu_summary_data', {
      hos_id_input: hosId,
      target_date_input: targetDate,
    })
    .returns<SummaryData[]>()

  if (error) {
    console.error(error)
    redirect(`/error?message=${error?.message}`)
  }
  return data
}
