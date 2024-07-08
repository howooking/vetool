'use server'

import { createClient } from '@/lib/supabase/server'
import type { IcuIoPatientJoined } from '@/types/icu'

export const getIcuIoData = async (hosId: string, targetDate: string) => {
  const supabase = createClient()
  const { data: icuIoData, error: icuIoDataError } = await supabase
    .from('icu_io')
    .select(
      `
    *,
    patient_id("name", "breed", "patient_id")
  `,
    )
    .match({ hos_id: hosId })
    .lte('in_date', targetDate)
    .or(`out_date.is.null, out_date.gte.${targetDate}`)
    .order('in_date', { ascending: true })
    .returns<IcuIoPatientJoined[]>()

  if (icuIoDataError) {
    console.log(icuIoDataError)
    throw new Error(icuIoDataError.message)
  }

  return icuIoData
}
