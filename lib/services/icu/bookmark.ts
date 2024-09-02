'use server'

import { createClient } from '@/lib/supabase/server'
import type { IcuChartBookmarkJoined } from '@/types/icu'
import { redirect } from 'next/navigation'

export const upsertBookmarkChart = async (
  name: string,
  comment: string,
  icuChartId: string,
  hosId: string,
) => {
  const supabase = createClient()

  const { error: rpcError } = await supabase.rpc('upsert_chart_bookmark', {
    bookmark_name_input: name,
    bookmark_comment_input: comment,
    icu_chart_id_input: icuChartId,
    hos_id_input: hosId,
  })

  if (rpcError) {
    console.log(rpcError)
    redirect(`/error/?message=${rpcError.message}`)
  }
}

export const deleteBookmarkChart = async (bookmarkId: string) => {
  const supabase = createClient()

  const { error: deleteBookmarkError } = await supabase
    .from('icu_chart_bookmark')
    .delete()
    .match({ bookmark_id: bookmarkId })

  if (deleteBookmarkError) {
    console.log(deleteBookmarkError)
    redirect(`/error/?message=${deleteBookmarkError.message}`)
  }
}

export const getBookmarkCharts = async (hosId: string) => {
  const supabase = createClient()

  const { data: selectedBookmarkChart, error: selectedBookmarkChartError } =
    await supabase
      .from('icu_chart_bookmark')
      .select(
        `
          bookmark_id,
          bookmark_name,
          bookmark_comment,
          icu_chart_id(icu_chart_id, target_date, patient_id(name, patient_id))
        `,
      )
      .match({ hos_id: hosId })
      .order('created_at', {
        ascending: false,
      })
      .returns<IcuChartBookmarkJoined[]>()

  if (selectedBookmarkChartError) {
    console.error(selectedBookmarkChartError)
    redirect(`/error/?message=${selectedBookmarkChartError.message}`)
  }

  return selectedBookmarkChart
}
