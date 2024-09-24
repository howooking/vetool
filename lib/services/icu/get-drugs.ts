'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

const supabase = createClient()

export const getDrugs = async (hosId: string) => {
  const { data: searchedDrugData, error: searchedDrugDataError } =
    await supabase
      .from('drug_products_rows')
      .select('*')
      .or(`hos_id.eq.${hosId},hos_id.is.null`)

  if (searchedDrugDataError) {
    console.log(searchedDrugDataError)
    redirect(`/error?message=${searchedDrugDataError.message}`)
  }

  return searchedDrugData
}
