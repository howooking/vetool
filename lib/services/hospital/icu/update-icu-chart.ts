import { createClient } from '@/lib/supabase/client'

const supabase = createClient()

export const updateIcuIo = async (
  patientId: string,
  field: string,
  value: string | null,
) => {
  const { error: icuIoError } = await supabase
    .from('icu_io')
    .update({ [field]: value })
    .match({ patient_id: patientId })

  if (icuIoError) {
    console.log(icuIoError)
    throw new Error(icuIoError.message)
  }
}

export const updateIcuChart = async (
  patientId: string,
  targetDate: string,
  updates: Record<string, string | null>,
) => {
  const { error: icuChartError } = await supabase
    .from('icu_chart')
    .update(updates)
    .match({ patient_id: patientId, target_date: targetDate })

  if (icuChartError) {
    console.log(icuChartError)
    throw new Error(icuChartError.message)
  }
}

export const updateWeight = async (
  patientId: string,
  targetDate: string,
  weight: string,
) => {
  const { error: weightError } = await supabase.rpc(
    'update_icu_chart_with_vitals',
    {
      patient_id_input: patientId,
      target_date_input: targetDate,
      weight_input: weight,
    },
  )

  if (weightError) {
    console.log(weightError)
    throw new Error(weightError.message)
  }
}

export const updateMemo = async (
  patientId: string | null,
  targetDate: string,
  memoState: {
    memoA: string | null
    memoB: string | null
    memoC: string | null
  },
) => {
  const { error: memoError } = await supabase
    .from('icu_chart')
    .update({
      memo_a: memoState.memoA?.trim(),
      memo_b: memoState.memoB?.trim(),
      memo_c: memoState.memoC?.trim(),
    })
    .match({ patient_id: patientId, target_date: targetDate })

  if (memoError) {
    console.log(memoError)
    throw new Error(memoError.message)
  }
}
