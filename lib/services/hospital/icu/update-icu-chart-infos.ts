'use server'

import { createClient } from '@/lib/supabase/server'
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

export const updateChiefComplaint = async (
  icuIoId: string,
  chiefComplaint: string,
) => {
  const supabase = createClient()
  const { error: updateChiefComplaintError } = await supabase
    .from('icu_io')
    .update({ cc: chiefComplaint })
    .match({ icu_io_id: icuIoId })

  if (updateChiefComplaintError) {
    console.log(updateChiefComplaintError)
    redirect(`/error/?message=${updateChiefComplaintError.message}`)
  }
}

// export const updateIcuChart = async (
//   patientId: string,
//   targetDate: string,
//   updates: Record<string, string | null>,
// ) => {
//   const { error: icuChartError } = await supabase
//     .from('icu_chart')
//     .update(updates)
//     .match({ patient_id: patientId, target_date: targetDate })

//   if (icuChartError) {
//     console.log(icuChartError)
//     throw new Error(icuChartError.message)
//   }
// }

// export const updateWeight = async (
//   patientId: string,
//   targetDate: string,
//   weight: string,
// ) => {
//   const supabase = createClient()

//   const { error: weightError } = await supabase.rpc(
//     'update_icu_chart_with_vitals',
//     {
//       patient_id_input: patientId,
//       target_date_input: targetDate,
//       weight_input: weight,
//     },
//   )

//   if (weightError) {
//     console.log(weightError)
//     throw new Error(weightError.message)
//   }
// }

// export const updateMemo = async (
//   patientId: string | null,
//   targetDate: string,
//   memoState: {
//     memoA: string | null
//     memoB: string | null
//     memoC: string | null
//   },
// ) => {
//   const supabase = createClient()

//   const { error: memoError } = await supabase
//     .from('icu_chart')
//     .update({
//       memo_a: memoState.memoA?.trim(),
//       memo_b: memoState.memoB?.trim(),
//       memo_c: memoState.memoC?.trim(),
//     })
//     .match({ patient_id: patientId, target_date: targetDate })

//   if (memoError) {
//     console.log(memoError)
//     throw new Error(memoError.message)
//   }
// }
