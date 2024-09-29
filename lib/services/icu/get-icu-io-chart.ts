'use server'

import { createClient } from '@/lib/supabase/server'

export const getIoDateRange = async (ioId: string) => {
  const supabase = createClient()

  const { data: IcuIoDateRange, error: IcuIoDateRangeError } = await supabase
    .from('icu_chart')
    .select('target_date')
    .match({ icu_io_id: ioId })
    .order('target_date')

  if (IcuIoDateRangeError) {
    throw new Error(IcuIoDateRangeError.message)
  }

  return IcuIoDateRange
}
