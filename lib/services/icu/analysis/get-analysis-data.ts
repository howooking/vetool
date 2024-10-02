'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import type { IcuAnalysisData } from '@/types/icu/analysis'

export const getAnalysisData = async (hosId: string, targetDate: string) => {
  const supabase = createClient()

  const { data, error } = await supabase
    .rpc('get_icu_analysis_data', {
      hos_id_input: hosId,
      target_date_input: targetDate,
    })
    .returns<IcuAnalysisData[]>()

  if (error) {
    console.error(error)
    redirect(`/error?message=${error?.message}`)
  }

  return data
}
