'use server'

import { createClient } from '@/lib/supabase/server'
import { format } from 'date-fns'
import { redirect } from 'next/navigation'

const supabase = createClient()

// 'search_tags column 삭제'
// const getTags = async (icuIoId: string) => {
//   const { data: searchedTagsData, error: searchedTagsDataError } =
//     await supabase
//       .from('icu_io')
//       .select('search_tags')
//       .match({ icu_io_id: icuIoId })
//       .single()

//   if (searchedTagsDataError) {
//     console.log(searchedTagsDataError)
//     redirect(`/error/?message=${searchedTagsDataError.message}`)
//   }

//   return searchedTagsData.search_tags
// }

export const updateDiagnosis = async (
  icuChartId: string,
  diagnosis: string,
) => {
  const { error: updateDiagnosisError } = await supabase
    .from('icu_chart')
    .update({
      icu_chart_dx: diagnosis,
    })
    .match({ icu_chart_id: icuChartId })

  if (updateDiagnosisError) {
    console.log(updateDiagnosisError)
    redirect(`/error/?message=${updateDiagnosisError.message}`)
  }
}

export const updateChiefComplaint = async (
  icuChartId: string,
  chiefComplaint: string,
) => {
  const { error: updateChiefComplaintError } = await supabase
    .from('icu_chart')
    .update({
      icu_chart_cc: chiefComplaint,
    })
    .match({ icu_chart_id: icuChartId })

  if (updateChiefComplaintError) {
    console.log(updateChiefComplaintError)
    redirect(`/error/?message=${updateChiefComplaintError.message}`)
  }
}

export const updateSearchTags = async (
  icuChartId: string,
  searchTags: string,
) => {
  const { error: updateSearchTagsError } = await supabase
    .from('icu_io')
    .update({ search_tags: searchTags })
    .match({ icu_chart_id: icuChartId })

  if (updateSearchTagsError) {
    console.log(updateSearchTagsError)
    redirect(`/error/?message=${updateSearchTagsError.message}`)
  }
}

export const updateMainSubVet = async (
  icuChartId: string,
  mainVetId: string,
  subVetId?: string,
) => {
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
    .from('icu_chart')
    .update(query)
    .match({ icu_chart_id: icuChartId })

  if (memoError) {
    console.log(memoError)
    redirect(`/error/?message=${memoError.message}`)
  }
}

export const toggleOutPatient = async (
  icuIoId: string,
  icuChartId: string,
  isPatientOut: boolean,
  targetDate: string,
  chartOrders: string,
  patientId: string,
  symptoms: string,
) => {
  const supabase = createClient()

  const { error: updateOutDateError } = await supabase.rpc('icu_out_patient', {
    icu_io_id_input: icuIoId,
    icu_chart_id_input: icuChartId,
    is_patient_out_input: isPatientOut,
    target_date_input: targetDate,
    chart_orders_input: chartOrders,
    patient_id_input: patientId,
    symptoms_input: symptoms,
  })

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

export const updateWithMainKeyword = async (
  symptomTags: string,
  icuIoId: string,
) => {
  const prevIoTags = await selectIcuIoTags(icuIoId)

  const { error: updateWithMainKeywordError } = await supabase
    .from('icu_io')
    .update({ icu_io_tags: prevIoTags + '#' + symptomTags })
    .match({ icu_io_id: icuIoId })
    .single()

  if (updateWithMainKeywordError) {
    console.log(updateWithMainKeywordError)
    redirect(`/error/?message=${updateWithMainKeywordError.message}`)
  }
}
