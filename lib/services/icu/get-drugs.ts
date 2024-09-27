'use server'

import { createClient } from '@/lib/supabase/server'
import type { DrugProductsJoined } from '@/types/icu'
import { redirect } from 'next/navigation'

export const getDrugs = async (hosId: string) => {
  const supabase = createClient()

  const { data: searchedDrugData, error: searchedDrugDataError } =
    await supabase
      .rpc('get_drugs', {
        hos_id_input: hosId,
      })
      .returns<DrugProductsJoined[]>()

  if (searchedDrugDataError) {
    console.log(searchedDrugDataError)
    redirect(`/error?message=${searchedDrugDataError.message}`)
  }

  return searchedDrugData
}
