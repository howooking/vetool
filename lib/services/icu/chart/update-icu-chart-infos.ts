'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export const updateDiagnosis = async (
  icuIoId: string,
  diagnosisInput: string,
) => {
  const supabase = createClient()

  const { error } = await supabase
    .from('icu_io')
    .update({
      icu_io_dx: diagnosisInput,
    })
    .match({ icu_io_id: icuIoId })

  if (error) {
    console.error(error)
    redirect(`/error/?message=${error.message}`)
  }
}

export const updateChiefComplaint = async (
  icuIoId: string,
  chiefComplaint: string,
) => {
  const supabase = createClient()

  const { error } = await supabase
    .from('icu_io')
    .update({
      icu_io_cc: chiefComplaint,
    })
    .match({ icu_io_id: icuIoId })

  if (error) {
    console.error(error)
    redirect(`/error/?message=${error.message}`)
  }
}

export const updateMainSubVet = async (
  icuChartId: string,
  mainVetId: string,
  subVetId?: string,
) => {
  const supabase = createClient()

  const { error } = await supabase
    .from('icu_charts')
    .update({
      main_vet: mainVetId,
      sub_vet: subVetId === 'null' ? null : subVetId,
    })
    .match({ icu_chart_id: icuChartId })
  if (error) {
    console.error(error)
    redirect(`/error/?message=${error.message}`)
  }
}

export const updateGroup = async (icuIoId: string, groupList: string[]) => {
  const supabase = createClient()

  const { error } = await supabase
    .from('icu_io')
    .update({
      group_list: groupList,
    })
    .match({ icu_io_id: icuIoId })
  if (error) {
    console.error(error)
    redirect(`/error/?message=${error.message}`)
  }
}

export const updateWeight = async (
  patientId: string,
  icuChartId: string,
  weight: string,
  weightMesuredDate: string,
) => {
  const supabase = createClient()

  const { error } = await supabase.rpc('update_icu_patient_weight', {
    icu_chart_id_input: icuChartId,
    patient_id_input: patientId,
    weight_input: weight,
    weight_measured_date_input: weightMesuredDate,
  })

  if (error) {
    console.error(error)
    redirect(`/error/?message=${error.message}`)
  }
}
export const updateOutDueDate = async (icuIoId: string, outDueDate: string) => {
  const supabase = createClient()

  const { error } = await supabase
    .from('icu_io')
    .update({ out_due_date: outDueDate })
    .match({ icu_io_id: icuIoId })

  if (error) {
    console.error(error)
    redirect(`/error/?message=${error.message}`)
  }
}

export const updateMemoName = async (
  hosId: string,
  hosIcuMemoNamesInput: string[],
) => {
  const supabase = createClient()

  const { error } = await supabase
    .from('hospitals')
    .update({ icu_memo_names: hosIcuMemoNamesInput })
    .match({ hos_id: hosId })

  if (error) {
    console.error(error)
    redirect(`/error/?message=${error.message}`)
  }
}

export const updateMemo = async (
  query: { [key: string]: string },
  icuChartId: string,
) => {
  const supabase = createClient()

  const { error } = await supabase
    .from('icu_charts')
    .update(query)
    .match({ icu_chart_id: icuChartId })

  if (error) {
    console.error(error)
    redirect(`/error/?message=${error.message}`)
  }
}

export const toggleOutPatient = async (
  icuIoId: string,
  isPatientOut: boolean,
  chartOrders: string,
  patientId: string,
  hashtaggedDxCc: string,
  patientSpecies: string,
  patientBreed: string,
  patientName: string,
  ageInDays: number,
) => {
  const supabase = createClient()

  const { error } = await supabase.rpc('toggle_patient_out', {
    icu_io_id_input: icuIoId,
    is_patient_out_input: isPatientOut,
    chart_orders_input: chartOrders,
    patient_id_input: patientId,
    keywords_input: hashtaggedDxCc,
    patient_species_input: patientSpecies,
    patient_breed_input: patientBreed,
    patient_name_input: patientName,
    age_in_days_input: ageInDays,
  })

  if (error) {
    console.error(error)
    redirect(`/error/?message=${error.message}`)
  }
}

export const updateOwnerName = async (
  patientId: string,
  ownerNameInput: string,
) => {
  const supabase = createClient()

  const { error } = await supabase
    .from('patients')
    .update({ owner_name: ownerNameInput })
    .match({ patient_id: patientId })

  if (error) {
    console.error(error)
    redirect(`/error/?message=${error.message}`)
  }
}

export const updateCpcr = async (icuIoId: string, cpcr: string) => {
  const supabase = createClient()

  const { error } = await supabase
    .from('icu_io')
    .update({ cpcr })
    .match({ icu_io_id: icuIoId })

  if (error) {
    console.error(error)
    redirect(`/error/?message=${error.message}`)
  }
}
