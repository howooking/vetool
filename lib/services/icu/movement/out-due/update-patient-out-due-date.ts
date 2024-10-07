'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export const updatePatientOutDueDate = async (
  icuIoId: string,
  hosId: string,
  targetDate: string,
) => {
  const supabase = createClient()

  const { error } = await supabase
    .from('icu_io')
    .update({ out_due_date: targetDate })
    .match({ hos_id: hosId, icu_io_id: icuIoId })

  if (error) {
    console.error(error)
    redirect(`/error?message=${error?.message}`)
  }
}
