'use server'

import { createClient } from '@/lib/supabase/server'
import { getDaysSince } from '@/lib/utils'
import { format } from 'date-fns'
import { redirect } from 'next/navigation'

export const registerIcuPatient = async (
  hosId: string,
  patientId: string,
  birth: string,
  dx: string,
  cc: string,
  in_date: Date,
  out_due_date: Date,
  group_list: string[],
  main_vet: string,
  sub_vet?: string,
) => {
  const supabase = createClient()

  const { error: rpcError } = await supabase.rpc('register_icu_patient', {
    hos_id_input: hosId,
    icu_io_dx_input: dx,
    icu_io_cc_input: cc,
    in_date_input: format(in_date, 'yyyy-MM-dd'),
    out_due_date_input: format(out_due_date, 'yyyy-MM-dd'),
    group_list_input: JSON.stringify(group_list),
    age_in_days_input: getDaysSince(birth),
    patient_id_input: patientId,
    main_vet_input: main_vet,
    sub_vet_input: sub_vet ?? '',
  })

  if (rpcError) {
    console.log(rpcError)
    redirect(`/error?message=${rpcError.message}`)
  }
}
