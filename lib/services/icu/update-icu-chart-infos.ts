'use server'

import { createClient } from '@/lib/supabase/server'
import { format } from 'date-fns'
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

export const updateCaution = async (icuChartId: string, caution: string) => {
  const supabase = createClient()
  const { error: updataCautionError } = await supabase
    .from('icu_chart')
    .update({ caution })
    .match({ icu_chart_id: icuChartId })

  if (updataCautionError) {
    console.log(updataCautionError)
    redirect(`/error/?message=${updataCautionError.message}`)
  }
}

export const updateMainSubVet = async (
  icuChartId: string,
  mainVetId: string,
  subVetId?: string,
) => {
  const supabase = createClient()
  const { error: updateMainSubVetError } = await supabase
    .from('icu_chart')
    .update({
      main_vet: mainVetId,
      sub_vet: subVetId === 'null' ? null : subVetId,
    })
    .match({ icu_chart_id: icuChartId })
  if (updateMainSubVetError) {
    console.log(updateMainSubVetError)
    redirect(`/error/?message=${updateMainSubVetError.message}`)
  }
}

export const updateGroup = async (icuIoId: string, groupList: string[]) => {
  const supabase = createClient()
  const { error: updateGroupError } = await supabase
    .from('icu_io')
    .update({
      group_list: groupList,
    })
    .match({ icu_io_id: icuIoId })
  if (updateGroupError) {
    console.log(updateGroupError)
    redirect(`/error/?message=${updateGroupError.message}`)
  }
}

export const updateWeight = async (
  patientId: string,
  icuChartId: string,
  weight: string,
) => {
  const supabase = createClient()

  const { error: updateWeightError } = await supabase.rpc('update_weight', {
    icu_chart_id_input: icuChartId,
    patient_id_input: patientId,
    weight_input: weight,
    weight_measured_date_input: format(new Date(), 'yyyy-MM-dd'),
  })

  if (updateWeightError) {
    console.log(updateWeightError)
    redirect(`/error/?message=${updateWeightError.message}`)
  }
}

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
