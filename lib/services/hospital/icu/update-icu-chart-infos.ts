'use server'

import { createClient } from '@/lib/supabase/client'
import { redirect } from 'next/navigation'

export const updateDiagnosis = async (icuIoId: string, diagnosis: string) => {
  const supabase = createClient()
  const { error: updateDiagnosisError } = await supabase
    .from('icu_io')
    .update({ dx: diagnosis })
    .match({ icu_io_id: icuIoId })

  if (updateDiagnosisError) {
    console.log(updateDiagnosisError)
    redirect(`/error/?message=${updateDiagnosisError.message}`)
  }
}
