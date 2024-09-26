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

  const { error } = await supabase.from('icu_bookmarks').upsert(
    {
      hos_id: hosId,
      bookmark_name: name,
      bookmark_comment: comment,
      icu_chart_id: icuChartId,
    },
    {
      onConflict: 'icu_chart_id',
      ignoreDuplicates: false,
    },
  )

  if (error) {
    console.error(error)
    redirect(`/error/?message=${error.message}`)
  }
}

export const deleteBookmarkChart = async (bookmarkId: string) => {
  const supabase = createClient()

  const { error } = await supabase
    .from('icu_bookmarks')
    .delete()
    .match({ bookmark_id: bookmarkId })

  if (error) {
    console.error(error)
    redirect(`/error/?message=${error.message}`)
  }
}

export const getBookmarkCharts = async (hosId: string) => {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('icu_bookmarks')
    .select(
      `
          bookmark_id,
          bookmark_name,
          bookmark_comment,
          icu_chart_id
          (
            icu_chart_id, 
            target_date, 
            patient_id
            (
              name, 
              patient_id
            )
          )
        `,
    )
    .match({ hos_id: hosId })
    .order('created_at', {
      ascending: false,
    })
    .returns<IcuChartBookmarkJoined[]>()

  if (error) {
    console.error(error)
    redirect(`/error/?message=${error.message}`)
  }

  return data
}
