'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { IcuTxTableData } from '@/types/icu'

export const getIcuTxTableData = async (hosId: string, targetDate: string) => {
  const supabase = createClient()

  const { data, error } = await supabase
    .rpc('get_icu_tx_table_data', {
      hos_id_input: hosId,
      target_date_input: targetDate,
    })
    .returns<IcuTxTableData[]>()

  if (error) {
    console.error(error)
    redirect(`/error?message=${error?.message}`)
  }

  return data
}
