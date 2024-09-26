'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

const supabase = createClient()

export const updateDiagnosis = async (
  icuIoId: string,
  diagnosisInput: string,
) => {
  const { error: updateDiagnosisError } = await supabase
    .from('icu_io')
    .update({
      icu_io_dx: diagnosisInput,
    })
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
  const { error: updateChiefComplaintError } = await supabase
    .from('icu_io')
    .update({
      icu_io_cc: chiefComplaint,
    })
    .match({ icu_io_id: icuIoId })

  if (updateChiefComplaintError) {
    console.log(updateChiefComplaintError)
    redirect(`/error/?message=${updateChiefComplaintError.message}`)
  }
}

export const updateMainSubVet = async (
  icuChartId: string,
  mainVetId: string,
  subVetId?: string,
) => {
  const { error: updateMainSubVetError } = await supabase
    .from('icu_charts')
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
  weightMesuredDate: string,
) => {
  const { error: updateWeightError } = await supabase.rpc(
    'update_icu_patient_weight',
    {
      icu_chart_id_input: icuChartId,
      patient_id_input: patientId,
      weight_input: weight,
      weight_measured_date_input: weightMesuredDate,
    },
  )

  if (updateWeightError) {
    console.log(updateWeightError)
    redirect(`/error/?message=${updateWeightError.message}`)
  }
}
export const updateOutDueDate = async (icuIoId: string, outDueDate: string) => {
  const { error: updateOutDueDateError } = await supabase
    .from('icu_io')
    .update({ out_due_date: outDueDate })
    .match({ icu_io_id: icuIoId })

  if (updateOutDueDateError) {
    console.log(updateOutDueDateError)
    redirect(`/error/?message=${updateOutDueDateError.message}`)
  }
}

export const updateMemoName = async (
  hosId: string,
  hosIcuMemoNamesInput: string[],
) => {
  const { error: updateMemoNameError } = await supabase
    .from('hospitals')
    .update({ icu_memo_names: hosIcuMemoNamesInput })
    .match({ hos_id: hosId })

  if (updateMemoNameError) {
    console.log(updateMemoNameError)
    redirect(`/error/?message=${updateMemoNameError.message}`)
  }
}

export const updateMemo = async (
  query: { [key: string]: string },
  icuChartId: string,
) => {
  const supabase = createClient()

  const { error: memoError } = await supabase
    .from('icu_charts')
    .update(query)
    .match({ icu_chart_id: icuChartId })

  if (memoError) {
    console.log(memoError)
    redirect(`/error/?message=${memoError.message}`)
  }
}

export const toggleOutPatient = async (
  icuIoId: string,
  isPatientOut: boolean,
  chartOrders: string,
  patientId: string,
  hashtaggedDxCc: string,
) => {
  const supabase = createClient()

  const { error: updateOutDateError } = await supabase.rpc(
    'toggle_out_patient',
    {
      icu_io_id_input: icuIoId,
      is_patient_out_input: isPatientOut,
      chart_orders_input: chartOrders,
      patient_id_input: patientId,
      keywords_input: hashtaggedDxCc,
    },
  )

  if (updateOutDateError) {
    console.log(updateOutDateError)
    redirect(`/error/?message=${updateOutDateError.message}`)
  }
}

export const updateOwnerName = async (
  patientId: string,
  ownerNameInput: string,
) => {
  const { error: updataOwnerNameError } = await supabase
    .from('patients')
    .update({ owner_name: ownerNameInput })
    .match({ patient_id: patientId })

  if (updataOwnerNameError) {
    console.log(updataOwnerNameError)
    redirect(`/error/?message=${updataOwnerNameError.message}`)
  }
}

export const updateCpcr = async (icuIoId: string, cpcr: string) => {
  const { error: updateCpcrError } = await supabase
    .from('icu_io')
    .update({ cpcr })
    .match({ icu_io_id: icuIoId })

  if (updateCpcrError) {
    console.log(updateCpcrError)
    redirect(`/error/?message=${updateCpcrError.message}`)
  }
}

export const selectIcuIoTags = async (icuIoId: string) => {
  const { data: icuIoTagsData, error: icuIoTagsDataError } = await supabase
    .from('icu_io')
    .select('icu_io_tags')
    .match({ icu_io_id: icuIoId })
    .single()

  if (icuIoTagsDataError) {
    console.log(icuIoTagsDataError)
    redirect(`/error/?message=${icuIoTagsDataError.message}`)
  }

  return icuIoTagsData.icu_io_tags
}
