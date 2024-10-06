'use server'

import { createClient } from '@/lib/supabase/server'
import type { OutDuePatientsData } from '@/types/icu/out-due'
import { redirect } from 'next/navigation'

export const updateIcuOutDuePatient = async (
  hosId: string,
  icuIoId: string,
  value: string,
  checkType:
    | 'basic_care'
    | 'belongings'
    | 'prescription'
    | 'medication'
    | 'out_time'
    | 'etc',
) => {
  const supabase = createClient()

  const updateData: Partial<OutDuePatientsData> = {
    [checkType]: value,
  }

  const { error } = await supabase
    .from('icu_out')
    .update(updateData)
    .match({ hos_id: hosId, icu_io_id: icuIoId })

  if (error) {
    console.error(error)
    redirect(`/error?message=${error?.message}`)
  }
}
