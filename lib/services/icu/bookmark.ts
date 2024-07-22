'use server'

import { createClient } from '@/lib/supabase/server'
import type { IcuChartBookmarkJoined } from '@/types/icu'
import { redirect } from 'next/navigation'

const supabase = createClient()

export const upsertBookmarkChart = async (
  name: string,
  comment: string | null,
  icuChartId: string,
) => {
  const { error: rpcError } = await supabase.rpc('upsert_chart_bookmark', {
    bookmark_name_input: name,
    bookmark_comment_input: comment ?? '',
    icu_chart_id_input: icuChartId,
  })

  if (rpcError) {
    console.log(rpcError)
    redirect(`/error/?message=${rpcError.message}`)
  }
}

export const deleteBookmarkChart = async (bookmarkId: string) => {
  const { error: deleteBookmarkError } = await supabase
    .from('icu_chart_bookmark')
    .delete()
    .match({ bookmark_id: bookmarkId })

  if (deleteBookmarkError) {
    console.log(deleteBookmarkError)
    redirect(`/error/?message=${deleteBookmarkError.message}`)
  }
}

export const getBookmarkChart = async () => {
  const { data: selectedBookmarkChart, error: selectedBookmarkChartError } =
    await supabase
      .from('icu_chart_bookmark')
      .select(
        `
          *,
          icu_chart_id("icu_chart_id", "patient_id"("name"))
        `,
      )
      .order('updated_at', {
        ascending: false,
      })
      .returns<IcuChartBookmarkJoined[]>()

  if (selectedBookmarkChartError) {
    console.log(selectedBookmarkChartError)
    redirect(`/error/?message=${selectedBookmarkChartError.message}`)
  }

  return selectedBookmarkChart
}
