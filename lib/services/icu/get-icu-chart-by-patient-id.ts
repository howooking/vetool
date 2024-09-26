'use server'

import { createClient } from '@/lib/supabase/server'
import { SelectedChart } from '@/types/icu'
import { redirect } from 'next/navigation'

export const getIcuChartByPatientId = async (
  hosId: string,
  targetDate: string,
  patient_id: string,
) => {
  const supabase = createClient()

  const { data: icuChartData, error: icuChartDataError } = await supabase
    .rpc('get_icu_chart_data', {
      hos_id_input: hosId,
      target_date_input: targetDate,
      patient_id_input: patient_id,
    })
    .returns<SelectedChart>()

  if (icuChartDataError) {
    console.error(icuChartDataError)
    redirect(`/error?message=${icuChartDataError?.message}`)
  }
  return icuChartData
}

// export const getIcuChart = async (hosId: string, targetDate: string) => {
//   const supabase = createClient()

//   const { data: icuChartData, error: icuChartDataError } = await supabase
//     .from('icu_chart')
//     .select(
//       `
//           icu_chart_id,
//           target_date,
//           memo_a,
//           memo_b,
//           memo_c,
//           weight_measured_date,
//           weight,
//           icu_io_id!inner(out_date, in_date, created_at, icu_io_id, icu_io_dx, icu_io_cc),
//           patient_id(name, gender, breed, patient_id, species, owner_name),
//           main_vet(name, user_id, avatar_url),
//           sub_vet(name, user_id, avatar_url),
//           bookmark_id(bookmark_name, bookmark_comment, bookmark_id)
//         `,
//     )
//     .match({ hos_id: hosId, target_date: targetDate })
//     .order('icu_io_id(out_date)', { ascending: false })
//     .order('icu_io_id(in_date)', { ascending: true })
//     .order('icu_io_id(created_at)', { ascending: true })
//     .returns<IcuChartJoined[]>()

//   if (icuChartDataError) {
//     console.error(icuChartDataError)
//     redirect(`/error?message=${icuChartDataError?.message}`)
//   }
//   return icuChartData
// }
